import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

const TextReveal = ({ children, className = "", delay = 0, staggerDelay = 0.03 }: TextRevealProps) => {
  const prefersReducedMotion = useReducedMotion();
  
  const words = children.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay, 
        delayChildren: prefersReducedMotion ? 0 : delay 
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default TextReveal;
