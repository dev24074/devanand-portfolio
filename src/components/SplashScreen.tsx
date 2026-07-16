import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
  minDisplayTime?: number;
}

const SplashScreen = ({ onComplete, minDisplayTime = 2000 }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 600); // Wait for exit animation
    }, minDisplayTime);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete, minDisplayTime]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(circle at 50% 50%, hsl(var(--prime-teal) / 0.3) 0%, transparent 50%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Floating orbs in background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full blur-2xl"
                style={{
                  width: 100 + i * 50,
                  height: 100 + i * 50,
                  background: `radial-gradient(circle, hsl(var(--prime-teal) / ${0.1 + i * 0.05}) 0%, transparent 70%)`,
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  x: [0, 30, -20, 0],
                  y: [0, -20, 30, 0],
                  scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                  duration: 4 + i,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Main logo/brand container */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Animated logo ring */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 20,
                delay: 0.3 
              }}
            >
              {/* Outer rotating ring */}
              <motion.div
                className="absolute -inset-4 rounded-full border-2 border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner rotating ring (opposite direction) */}
              <motion.div
                className="absolute -inset-2 rounded-full border border-primary/50"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />

              {/* Logo circle with glow */}
              <motion.div
                className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
                animate={{
                  boxShadow: [
                    "0 0 20px hsl(var(--prime-teal) / 0.4)",
                    "0 0 40px hsl(var(--prime-teal) / 0.6)",
                    "0 0 20px hsl(var(--prime-teal) / 0.4)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Initials or logo */}
                <motion.span
                  className="text-3xl font-bold text-primary-foreground font-display"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  DB
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Name reveal animation */}
            <motion.div className="overflow-hidden mb-4">
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-gradient font-display"
                initial={{ y: 60 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                Dev Anand
              </motion.h1>
            </motion.div>

            {/* Subtitle with typewriter effect */}
            <motion.div className="overflow-hidden mb-8">
              <motion.p
                className="text-muted-foreground text-lg"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Data Engineer
              </motion.p>
            </motion.div>

            {/* Loading progress bar */}
            <motion.div
              className="w-48 h-1 bg-secondary rounded-full overflow-hidden"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            {/* Loading text */}
            <motion.p
              className="mt-4 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
            >
              Loading experience...
            </motion.p>
          </motion.div>

          {/* Bottom decorative line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
