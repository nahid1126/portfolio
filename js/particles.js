document.addEventListener("DOMContentLoaded", function () {
  // Create particles for hero section
  const heroParticles = document.getElementById("hero-particles");
  if (heroParticles) {
    createHeroParticles(heroParticles);
  }

  function createHeroParticles(container) {
    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    // Particles configuration
    const particles = [];
    const particleCount = 620;
    // const colors = ["rgba(255, 255, 255, 0.6)", "rgba(100, 200, 255, 0.6)"];
    const colors = ['rgba(255,255,255,0.8)', 'rgba(100,200,255,0.8)', 'rgba(200,200,255,0.8)'];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Mouse interaction
    const mouse = { x: null, y: null, radius: 50 };

    window.addEventListener("mousemove", function (event) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    });

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulse effect
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - distance) / mouse.radius;

          p.x -= Math.cos(angle) * force * 5;
          p.y -= Math.sin(angle) * force * 5;
        }

        // Boundary check with bounce
        if (p.x <= 0 || p.x >= canvas.width) p.speedX *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.speedY *= -1;

        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Draw connections between particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.sqrt(
            Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2)
          );

          if (dist < 90) {
            ctx.beginPath();
            // ctx.strokeStyle = `rgba(100, 200, 255, ${0.4 - dist / 250})`;
            ctx.strokeStyle = `rgba(200, 300, 385, ${0.4 - dist / 350})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    // Handle window resize
    window.addEventListener("resize", function () {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    });

    animate();
  }
});
