import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { Download, ArrowRight, Play, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReducedMotion, useIsMobile } from "@/hooks/useReducedMotion";
import { TypewriterText } from "@/components/animations";
import profileImage from "@/assets/profile-devanand.png";

const HeroBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  
  // Mouse position for ambient background
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const springConfig = { stiffness: 50, damping: 30 };
  const mouseX = useSpring(0.5, springConfig);
  const mouseY = useSpring(0.5, springConfig);

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion, isMobile, mouseX, mouseY]);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
        delayChildren: prefersReducedMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div ref={containerRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Ambient Gradient Background - Mouse Reactive */}
      <motion.div className="absolute inset-0 hero-gradient" style={{ y: prefersReducedMotion ? 0 : y }} />
      
      {/* Dynamic Gradient Orbs - React to mouse */}
      {!prefersReducedMotion && !isMobile && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(var(--prime-teal) / 0.15) 0%, transparent 70%)",
              left: `${mousePosition.x * 60 + 10}%`,
              top: `${mousePosition.y * 60 + 10}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(200 100% 50% / 0.1) 0%, transparent 70%)",
              right: `${(1 - mousePosition.x) * 40 + 5}%`,
              bottom: `${(1 - mousePosition.y) * 40 + 5}%`,
              transform: "translate(50%, 50%)",
            }}
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>
      )}
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--prime-teal)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--prime-teal)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating Particles - Optimized */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(isMobile ? 3 : 5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 150 + i * 30,
                height: 150 + i * 30,
                left: `${15 + i * 18}%`,
                top: `${20 + i * 12}%`,
                background: `radial-gradient(circle, hsl(var(--prime-teal) / ${0.03 + i * 0.015}) 0%, transparent 70%)`,
              }}
              animate={{
                x: [0, 30 - i * 5, 0],
                y: [0, 20 - i * 3, 0],
              }}
              transition={{
                duration: 12 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <motion.div 
        className="relative z-10 section-container max-w-7xl mx-auto"
        style={{ opacity: prefersReducedMotion ? 1 : opacity }}
      >
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <div>
            {/* Location Badge */}
            <motion.div variants={itemVariants} className="mb-3">
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                Chennai, Tamil Nadu, India
              </span>
            </motion.div>

            {/* Category Badge */}
            <motion.div variants={itemVariants} className="mb-5">
              <span className="category-badge">
                <Play className="w-3 h-3 mr-1.5" />
                VIT Chennai • B.Tech CSE
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-display mb-3 tracking-tight"
            >
              <span className="text-foreground">DEV</span>{" "}
              <span className="text-gradient">ANAND</span>
            </motion.h1>

            {/* Outcome-Focused Role with Typewriter Effect */}
            <motion.div
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground font-medium mb-3 h-8 md:h-9"
            >
              <TypewriterText
                texts={[
                  "Data Engineering & Analytics",
                  "Building ML Pipelines",
                  "Architecting Scalable Databases",
                  "Cloud-Native Development",
                ]}
                typingSpeed={70}
                deletingSpeed={40}
                pauseDuration={2500}
              />
            </motion.div>

            {/* Summary - Concise */}
            <motion.p
              variants={itemVariants}
              className="text-base text-muted-foreground/80 mb-5 max-w-lg leading-relaxed"
            >
              Computer Science undergraduate at VIT Chennai specializing in data engineering, 
              big data analytics, and machine learning. Experienced building Python/SQL data pipelines, 
              working across the Hadoop/Spark ecosystem, and applying ML to real-world problems.
            </motion.p>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-3 mb-5">
              {[
                { href: "https://github.com/dev24074", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/devanand-boopalan-125312324/", icon: Linkedin, label: "LinkedIn" },
                { href: "https://mail.google.com/mail/?view=cm&fs=1&to=dev24074@gmail.com", icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  className="p-2.5 rounded-full bg-secondary/80 hover:bg-primary/20 border border-border hover:border-primary/40 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5 text-foreground" />
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Buttons with Enhanced Micro-interactions */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.div 
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.97 }}
                className="group"
              >
                <Button
                  size="lg"
                  className="relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 shadow-lg shadow-primary/25"
                  onClick={scrollToProjects}
                >
                  <span className="relative z-10 flex items-center">
                    View Projects
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </span>
                  {/* Ripple effect on hover */}
                  <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-lg" />
                </Button>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.97 }}
                className="group"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="relative overflow-hidden border-primary/50 text-primary hover:bg-primary/10 font-semibold px-8"
                  asChild
                >
                  <a 
                    href="https://drive.google.com/file/d/1VLs3iG9Hhly7uVzEUUs3wRtlWaX_B34g/view?usp=sharing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 w-5 h-5 group-hover:animate-bounce" />
                    Resume
                  </a>
                </Button>
              </motion.div>
            </motion.div>

          </div>

          {/* Visual Element - Profile Image Only */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col items-center justify-center"
            style={{ perspective: "1000px" }}
          >
            {/* Profile Image with 3D Effect - Larger */}
            <motion.div
              className="relative"
              whileHover={prefersReducedMotion ? {} : { rotateY: 8, rotateX: -5, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative">
                <motion.img
                  src={profileImage}
                  alt="Devanand B"
                  className="w-72 h-72 md:w-80 md:h-80 rounded-full object-cover border-4 border-primary/30 shadow-2xl"
                  style={{
                    boxShadow: "0 0 80px -10px hsl(var(--prime-teal) / 0.5)",
                  }}
                />
                {/* Outer glow ring */}
                <div className="absolute -inset-3 rounded-full border-2 border-primary/20 animate-pulse" />
                {/* Inner accent ring */}
                <div className="absolute -inset-1 rounded-full border border-primary/10" />
              </div>

            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Scroll Indicator */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HeroBanner;
