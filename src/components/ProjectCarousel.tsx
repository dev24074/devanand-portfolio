import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Project } from "@/hooks/useProjects";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProjectCarouselProps {
  title: string;
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const ProjectCarousel = ({
  title,
  projects,
  onSelectProject,
}: ProjectCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener("scroll", checkScrollButtons);
      return () => scrollEl.removeEventListener("scroll", checkScrollButtons);
    }
  }, [projects]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && canScrollLeft) {
        scroll("left");
      } else if (e.key === "ArrowRight" && canScrollRight) {
        scroll("right");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canScrollLeft, canScrollRight]);

  if (!projects.length) return null;

  const isFeatured = title.includes("Featured");

  return (
    <motion.div 
      className="section-container group/carousel relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Title Row with Navigation */}
      <div className="flex items-center justify-between mb-6">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {isFeatured && (
            <motion.div
              animate={prefersReducedMotion ? {} : { 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>
          )}
          <h2 className="row-title text-2xl md:text-3xl font-bold">
            {title}
          </h2>
          
          {/* Animated underline */}
          <motion.div
            className="hidden md:block h-0.5 bg-gradient-to-r from-primary to-transparent"
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
        </motion.div>

        {/* Navigation Arrows */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className="flex gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => scroll("left")}
                  disabled={!canScrollLeft}
                  className="bg-secondary/80 hover:bg-primary/20 hover:text-primary disabled:opacity-30 backdrop-blur-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => scroll("right")}
                  disabled={!canScrollRight}
                  className="bg-secondary/80 hover:bg-primary/20 hover:text-primary disabled:opacity-30 backdrop-blur-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Fade */}
        <AnimatePresence>
          {canScrollLeft && (
            <motion.div 
              className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>

        {/* Scrollable Row */}
        <div ref={scrollRef} className="carousel-scroll">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: prefersReducedMotion ? 0 : index * 0.08,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
            >
              <ProjectCard
                project={project}
                index={index}
                onSelect={onSelectProject}
              />
            </motion.div>
          ))}
        </div>

        {/* Right Fade */}
        <AnimatePresence>
          {canScrollRight && (
            <motion.div 
              className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Progress Indicator */}
      <motion.div 
        className="flex justify-center gap-1 mt-6 opacity-0 group-hover/carousel:opacity-100 transition-opacity"
        initial={{ y: 10 }}
        animate={{ y: 0 }}
      >
        {projects.length > 3 && (
          <div className="flex gap-1">
            {[...Array(Math.min(5, Math.ceil(projects.length / 2)))].map((_, i) => (
              <motion.div
                key={i}
                className="h-1 rounded-full bg-border"
                initial={{ width: 8 }}
                whileHover={{ width: 24, backgroundColor: "hsl(var(--primary))" }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProjectCarousel;
