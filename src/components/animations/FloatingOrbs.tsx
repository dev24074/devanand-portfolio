import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface OrbConfig {
  size: number;
  x: string;
  y: string;
  delay: number;
  duration: number;
  color: string;
}

const FloatingOrbs = () => {
  const prefersReducedMotion = useReducedMotion();

  const orbs: OrbConfig[] = [
    { size: 400, x: "10%", y: "20%", delay: 0, duration: 20, color: "hsl(var(--prime-teal) / 0.15)" },
    { size: 300, x: "70%", y: "60%", delay: 2, duration: 25, color: "hsl(200 100% 50% / 0.1)" },
    { size: 250, x: "80%", y: "10%", delay: 4, duration: 18, color: "hsl(var(--prime-teal) / 0.08)" },
    { size: 350, x: "20%", y: "70%", delay: 1, duration: 22, color: "hsl(180 80% 45% / 0.1)" },
  ];

  if (prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingOrbs;
