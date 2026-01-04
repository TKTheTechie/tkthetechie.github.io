<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  export let particleCount: number = 50;
  export let connectionDistance: number = 120;
  export let mouseRadius: number = 150;
  export let particleSpeed: number = 0.5;
  
  let canvasRef: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let particles: Particle[] = [];
  let mouseX = 0;
  let mouseY = 0;
  let animationId: number;
  let isMouseInside = false;
  
  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    baseOpacity: number;
    color: string;
  }
  
  onMount(() => {
    if (!browser || !canvasRef) return;
    
    ctx = canvasRef.getContext('2d')!;
    initParticles();
    resizeCanvas();
    animate();
    
    const handleResize = () => resizeCanvas();
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    
    const handleMouseEnter = () => {
      isMouseInside = true;
    };
    
    const handleMouseLeave = () => {
      isMouseInside = false;
    };
    
    window.addEventListener('resize', handleResize);
    canvasRef.addEventListener('mousemove', handleMouseMove);
    canvasRef.addEventListener('mouseenter', handleMouseEnter);
    canvasRef.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      canvasRef?.removeEventListener('mousemove', handleMouseMove);
      canvasRef?.removeEventListener('mouseenter', handleMouseEnter);
      canvasRef?.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  });
  
  function resizeCanvas() {
    if (!canvasRef) return;
    
    const rect = canvasRef.getBoundingClientRect();
    canvasRef.width = rect.width * window.devicePixelRatio;
    canvasRef.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    // Reinitialize particles on resize
    initParticles();
  }
  
  function initParticles() {
    if (!canvasRef) return;
    
    particles = [];
    const rect = canvasRef.getBoundingClientRect();
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * particleSpeed,
        vy: (Math.random() - 0.5) * particleSpeed,
        size: Math.random() * 3 + 1,
        opacity: 0.3,
        baseOpacity: Math.random() * 0.3 + 0.1,
        color: Math.random() > 0.5 ? '#0ea5e9' : '#22c55e'
      });
    }
  }
  
  function animate() {
    if (!ctx || !canvasRef) return;
    
    const rect = canvasRef.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    // Update particles
    particles.forEach(particle => {
      // Mouse interaction
      if (isMouseInside) {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * 0.02;
          particle.vy -= Math.sin(angle) * force * 0.02;
          particle.opacity = Math.min(1, particle.baseOpacity + force * 0.5);
        } else {
          particle.opacity = particle.baseOpacity;
        }
      } else {
        particle.opacity = particle.baseOpacity;
      }
      
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Boundary collision
      if (particle.x < 0 || particle.x > rect.width) {
        particle.vx *= -1;
        particle.x = Math.max(0, Math.min(rect.width, particle.x));
      }
      if (particle.y < 0 || particle.y > rect.height) {
        particle.vy *= -1;
        particle.y = Math.max(0, Math.min(rect.height, particle.y));
      }
      
      // Apply friction
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
      ctx.fill();
    });
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.2;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(14, 165, 233, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    
    animationId = requestAnimationFrame(animate);
  }
</script>

<canvas 
  bind:this={canvasRef}
  class="absolute inset-0 w-full h-full pointer-events-none"
  style="width: 100%; height: 100%;"
></canvas>