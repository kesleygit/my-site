import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

export function InteractiveButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
}: InteractiveButtonProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const [isPressed, setIsPressed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const particleIdRef = useRef(0);
  const rippleIdRef = useRef(0);

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-primary to-secondary text-background hover:shadow-lg",
    secondary:
      "bg-gradient-to-r from-secondary to-accent text-background hover:shadow-lg",
    accent:
      "bg-gradient-to-r from-accent to-primary text-background hover:shadow-lg",
    outline:
      "border-2 border-primary/50 text-primary hover:border-primary hover:bg-primary/10",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create ripple
    const rippleId = rippleIdRef.current++;
    setRipples((prev) => [...prev, { id: rippleId, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== rippleId));
    }, 600);

    // Create particles
    const colors = ["#9d4edd", "#00d9ff", "#ff006e"];
    const newParticles: Particle[] = [];

    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const velocity = 3 + Math.random() * 3;
      const particleId = particleIdRef.current++;

      newParticles.push({
        id: particleId,
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);

    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
  };

  // Animate particles
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.1, // gravity
            life: p.life - 0.05,
          }))
          .filter((p) => p.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [particles.length]);

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        disabled={disabled}
        className={cn(
          "relative overflow-hidden rounded-lg font-semibold transition-all duration-150",
          "transform active:scale-95",
          variantClasses[variant],
          sizeClasses[size],
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300",
          "hover:before:opacity-20 hover:before:bg-white",
          isPressed && "scale-95",
          className
        )}
      >
        {/* Glow effect background */}
        <div
          className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              variant === "primary"
                ? "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(157, 78, 221, 0.3), transparent)"
                : variant === "secondary"
                  ? "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 217, 255, 0.3), transparent)"
                  : "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 0, 110, 0.3), transparent)",
            "--mouse-x": `${mousePos.x}px`,
            "--mouse-y": `${mousePos.y}px`,
          } as React.CSSProperties}
        />

        {/* Ripple effect */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute rounded-full pointer-events-none animate-ping"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: "10px",
              height: "10px",
              transform: "translate(-50%, -50%)",
              background:
                variant === "primary"
                  ? "#9d4edd"
                  : variant === "secondary"
                    ? "#00d9ff"
                    : "#ff006e",
              opacity: 0.6,
              animation: "ripple 0.6s ease-out",
            }}
          />
        ))}

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </button>

      {/* Particle effects */}
      <svg
        className="absolute inset-0 pointer-events-none overflow-visible"
        width={buttonRef.current?.offsetWidth || 0}
        height={buttonRef.current?.offsetHeight || 0}
        style={{
          left: 0,
          top: 0,
        }}
      >
        {particles.map((particle) => (
          <circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r={2}
            fill={particle.color}
            opacity={particle.life}
            style={{
              filter: `drop-shadow(0 0 ${particle.life * 6}px ${particle.color})`,
            }}
          />
        ))}
      </svg>

      <style>{`
        @keyframes ripple {
          0% {
            width: 10px;
            height: 10px;
            opacity: 0.6;
          }
          100% {
            width: 100px;
            height: 100px;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
