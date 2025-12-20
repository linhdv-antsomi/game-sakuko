import { useEffect, useRef } from "react";

const COUNT = 400; // tăng số lượng hạt tùy ý
const MODE_DURATION = 5000; // mỗi mode kéo dài 5s

const SIZE_MIN = 1;
const SIZE_MAX = 5;
const OPACITY_MIN = 0.2;
const OPACITY_MAX = 1;

const COLORS = ["#C78010", "#BE750F", "#FEF80F", "#F8F4B6"];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  opacityDir: number;
  targetX?: number;
  targetY?: number;
}

export function DynamicParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mode = useRef<"free" | "cluster" | "explode">("explode");
  const lastModeChange = useRef(0);
  const clusterTarget = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /** Create particles */
    particles.current = Array.from({ length: COUNT }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: SIZE_MIN + Math.random() * (SIZE_MAX - SIZE_MIN),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: OPACITY_MIN + Math.random() * (OPACITY_MAX - OPACITY_MIN),
      opacityDir: Math.random() > 0.5 ? 1 : -1,
    }));

    const pickClusterTarget = () => {
      clusterTarget.current = {
        x: (Math.random() * 0.5 + 0.25) * canvas.width,
        y: (Math.random() * 0.5 + 0.25) * canvas.height,
      };
    };

    pickClusterTarget();

    const switchMode = (t: number) => {
      if (t - lastModeChange.current < MODE_DURATION) return;

      lastModeChange.current = t;

      if (mode.current === "free") {
        mode.current = "cluster";
        pickClusterTarget();
      } else if (mode.current === "cluster") {
        mode.current = "explode";

        // assign each particle a random direction to explode
        particles.current.forEach((p) => {
          const angle = Math.random() * Math.PI * 2;
          p.vx = Math.cos(angle) * (Math.random() * 4 + 2);
          p.vy = Math.sin(angle) * (Math.random() * 4 + 2);
        });
      } else if (mode.current === "explode") {
        mode.current = "free";
      }
    };

    let anim: number;

    const loop = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      switchMode(t);

      particles.current.forEach((p, index) => {
        // twinkle (opacity breathing)
        p.opacity += p.opacityDir * 0.005;
        if (p.opacity > OPACITY_MAX) {
          p.opacity = OPACITY_MAX;
          p.opacityDir = -1;
        }
        if (p.opacity < OPACITY_MIN) {
          p.opacity = OPACITY_MIN;
          p.opacityDir = 1;
        }

        /** MODE: FREE — nhẹ nhàng bay lung tung */
        if (mode.current === "free") {
          p.vx += (Math.random() - 0.5) * 0.02;
          p.vy += (Math.random() - 0.5) * 0.02;
        }

        /** MODE: CLUSTER — hút vào trung tâm */
        if (mode.current === "cluster") {
          const dx = clusterTarget.current.x - p.x;
          const dy = clusterTarget.current.y - p.y;

          p.vx += dx * 0.0004;
          p.vy += dy * 0.0004;
        }

        /** MODE: EXPLODE — bung toàn màn hình */
        if (mode.current === "explode") {
          // giảm lực từ từ để tạo cảm giác tản đẹp
          p.vx *= 0.99;
          p.vy *= 0.99;
        }

        /** Repulsion — tránh chồng lên nhau */
        for (let j = 0; j < particles.current.length; j++) {
          if (index === j) continue;
          const q = particles.current[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = (p.size + q.size) * 1.4;

          if (dist < minDist) {
            const push = (minDist - dist) * 0.003;
            p.vx += (dx / dist) * push;
            p.vy += (dy / dist) * push;
          }
        }

        // update position
        p.x += p.vx;
        p.y += p.vy;

        // wrap screen
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // draw
        ctx.beginPath();
        ctx.fillStyle = `${p.color}${Math.floor(p.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      anim = requestAnimationFrame(loop);
    };

    anim = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(anim);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
