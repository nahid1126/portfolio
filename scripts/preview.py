#!/usr/bin/env python3
"""Serve the portfolio locally and reload browser tabs when assets change."""
import argparse
import hashlib
import json
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
ASSETS = {'.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.ico', '.woff', '.woff2'}
RELOAD = b'''<script>
(() => {
  let version;
  let checking = false;
  async function check() {
    if (checking || document.hidden) return;
    checking = true;
    try {
      const response = await fetch('/__preview_version', { cache: 'no-store' });
      if (!response.ok) return;
      const next = await response.json();
      if (version !== undefined && version !== next) location.reload();
      version = next;
    } catch (_) { /* Retry while the development server restarts. */ }
    finally { checking = false; }
  }
  check();
  setInterval(check, 1000);
  document.addEventListener('visibilitychange', check);
})();
</script>'''


def asset_version():
    digest = hashlib.sha256()
    files = [ROOT / 'index.html']
    for folder in ('css', 'js', 'image'):
        files.extend((ROOT / folder).rglob('*'))
    for path in sorted(files):
        if path.suffix.lower() not in ASSETS:
            continue
        try:
            stat = path.stat()
        except FileNotFoundError:
            continue
        digest.update(f'{path.relative_to(ROOT)}:{stat.st_mtime_ns}:{stat.st_size}'.encode())
    return digest.hexdigest()


class PreviewHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def do_GET(self):
        route = urlsplit(self.path).path
        if route == '/__preview_version':
            self.send_content(json.dumps(asset_version()).encode(), 'application/json')
        elif route in ('/', '/index.html'):
            # Inject only into responses; the portfolio files remain deployable as-is.
            page = (ROOT / 'index.html').read_bytes()
            page = page.replace(b'</body>', RELOAD + b'</body>')
            self.send_content(page, 'text/html; charset=utf-8')
        elif any(part.startswith('.') for part in route.split('/') if part):
            self.send_error(404)
        else:
            super().do_GET()

    def send_content(self, body, content_type):
        self.send_response(200)
        self.send_header('Content-Type', content_type)
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=8000)
    args = parser.parse_args()
    server = ThreadingHTTPServer(('127.0.0.1', args.port), partial(PreviewHandler, directory=str(ROOT)))
    print(f'Live preview: http://127.0.0.1:{args.port} (Ctrl+C to stop)', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
