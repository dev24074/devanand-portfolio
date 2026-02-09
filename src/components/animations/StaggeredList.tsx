import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface StaggeredListProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
  direction?: "up" | "left" | "right";
}

const StaggeredList = ({ 
  children, 
  className = "", 
  staggerDelay = 0.08,
  direction = "up" 
}: StaggeredListProps) => {
  const prefersReducedMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (prefersReducedMotion) return { opacity: 0 };
    
    switch (direction) {
      case "left": return { opacity: 0, x: 40 };
      case "right": return { opacity: 0, x: -40 };
      default: return { opacity: 0, y: 30 };
    }
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: getInitialPosition(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggeredList;
