import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface TypewriterTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
}

const TypewriterText = ({
  texts,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className = "",
  cursorClassName = "",
}: TypewriterTextProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting) {
      if (displayedText.length === 0) {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        return;
      }

      const deleteTimer = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
      return () => clearTimeout(deleteTimer);
    }

    if (displayedText.length === currentFullText.length) {
      setIsPaused(true);
      return;
    }

    const typeTimer = setTimeout(() => {
      setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
    }, typingSpeed);

    return () => clearTimeout(typeTimer);
  }, [
    displayedText,
    isDeleting,
    isPaused,
    currentTextIndex,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={displayedText}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          className="inline-block"
        >
          {displayedText.split("").map((char, index) => (
            <motion.span
              key={`${currentTextIndex}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.1,
                delay: index * 0.02,
              }}
              className="inline-block"
              style={{ 
                whiteSpace: char === " " ? "pre" : "normal",
                display: "inline-block",
                minWidth: char === " " ? "0.25em" : "auto"
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
      
      {/* Animated cursor */}
      <motion.span
        className={`inline-block ml-0.5 w-[3px] h-[1.1em] bg-primary ${cursorClassName}`}
        animate={{ opacity: [1, 0, 1] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </span>
  );
};

export default TypewriterText;
