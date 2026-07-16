import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Github, ExternalLink, Info, Sparkles } from "lucide-react";
import { Project } from "@/hooks/useProjects";
import { useReducedMotion, useIsMobile } from "@/hooks/useReducedMotion";

// Import project images
import cervicalCancerImg from "@/assets/project-cervical-cancer.jpg";
import esportsImg from "@/assets/project-esports.jpg";
import gymImg from "@/assets/project-gym.jpg";

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

// Map project titles to imported images
const projectImages: Record<string, string> = {
  "ML-Assisted Cervical Cancer Prediction Using PSO": cervicalCancerImg,
  "Esports Tournament & Player Analytics System": esportsImg,
  "Full-Stack Gym Management Web Application": gymImg,
};

// Impact lines for each project
const projectImpact: Record<string, string> = {
  "ML-Assisted Cervical Cancer Prediction Using PSO": "98.6% accuracy and 100% precision using PSO + Random Forest",
  "Esports Tournament & Player Analytics System": "13-table MySQL database with advanced analytics",
  "Full-Stack Gym Management Web Application": "Full-stack platform with JWT auth and real-time analytics",
};

// Category-based glow colors
const getCategoryGlow = (category: string) => {
  const glows: Record<string, { shadow: string; gradient: string }> = {
    "AI & Computer Vision": {
      shadow: "group-hover:shadow-[0_0_40px_-10px_hsl(280_100%_60%/0.5)]",
      gradient: "from-purple-500/20 via-pink-500/10 to-purple-600/20",
    },
    "Cloud & Backend": {
      shadow: "group-hover:shadow-[0_0_40px_-10px_hsl(200_100%_50%/0.5)]",
      gradient: "from-blue-500/20 via-cyan-500/10 to-blue-600/20",
    },
    "Algorithms & Visualizers": {
      shadow: "group-hover:shadow-[0_0_40px_-10px_hsl(160_100%_40%/0.5)]",
      gradient: "from-emerald-500/20 via-teal-500/10 to-emerald-600/20",
    },
  };
  return glows[category] || {
    shadow: "group-hover:shadow-[0_0_40px_-10px_hsl(var(--prime-teal)/0.5)]",
    gradient: "from-primary/20 via-accent/10 to-primary/20",
  };
};

const getCategoryGradient = (category: string) => {
  const gradients: Record<string, string> = {
    "AI & Computer Vision": "from-purple-600/80 via-pink-500/60 to-purple-800/80",
    "Cloud & Backend": "from-blue-600/80 via-cyan-600/60 to-blue-800/80",
    "Algorithms & Visualizers": "from-emerald-600/80 via-teal-500/60 to-emerald-800/80",
  };
  return gradients[category] || "from-primary/80 via-accent/60 to-secondary/80";
};

const ProjectCard = ({ project, index, onSelect }: ProjectCardProps) => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Enhanced spring config for smoother, bouncier animations
  const springConfig = { stiffness: 300, damping: 25, mass: 0.8 };
  const rotateX = useSpring(useTransform(y, [-150, 150], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-150, 150], [-12, 12]), springConfig);
  
  // Dynamic glow intensity based on mouse position
  const glowOpacity = useSpring(useTransform(
    [x, y],
    ([latestX, latestY]: number[]) => {
      const distance = Math.sqrt(latestX * latestX + latestY * latestY);
      return Math.min(distance / 100, 1);
    }
  ), { stiffness: 200, damping: 30 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || isMobile) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const categoryStyle = getCategoryGlow(project.category);
  const impactLine = projectImpact[project.title];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1, 
        ease: [0.22, 1, 0.36, 1],
        scale: { type: "spring", stiffness: 200, damping: 20 }
      }}
      whileHover={prefersReducedMotion ? {} : { 
        scale: 1.06, 
        y: -10,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      style={prefersReducedMotion || isMobile ? {} : { 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d",
        transformPerspective: 1000
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`project-card group flex-shrink-0 w-64 md:w-72 lg:w-80 cursor-pointer transition-all duration-300 ${categoryStyle.shadow}`}
      onClick={() => onSelect(project)}
    >
      {/* Card Image / Gradient Background */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
        {/* Category Glow Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${categoryStyle.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {projectImages[project.title] ? (
          <motion.img
            src={projectImages[project.title]}
            alt={project.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.08 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${getCategoryGradient(project.category)}`} />
        )}

        {/* Shimmer Effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Category Glow Border */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${categoryStyle.gradient} blur-sm`} />
          <div className="absolute inset-[2px] rounded-lg bg-background/80" />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-70 group-hover:opacity-85 transition-all duration-500" />

        {/* Featured Badge */}
        {project.is_featured && (
          <motion.div 
            className="absolute top-3 left-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15 + index * 0.08, type: "spring", stiffness: 200 }}
          >
            <span className="inline-flex items-center gap-1 bg-prime-gold/90 text-black text-xs font-bold px-2 py-1 rounded shadow-lg">
              <Sparkles className="w-3 h-3" />
              FEATURED
            </span>
          </motion.div>
        )}

        {/* Hover Actions */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center gap-3"
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.15, boxShadow: "0 0 25px hsl(var(--primary) / 0.5)" }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="bg-primary text-primary-foreground rounded-full p-3 shadow-lg shadow-primary/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
            aria-label="View details"
          >
            <Info className="w-5 h-5" />
          </motion.button>
          {project.github_url && (
            <motion.a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.15, boxShadow: "0 0 20px hsl(var(--foreground) / 0.3)" }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.05 }}
              className="bg-secondary/90 text-foreground rounded-full p-3 shadow-lg border border-border/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={(e) => e.stopPropagation()}
              aria-label="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </motion.a>
          )}
          {project.live_demo_url && (
            <motion.a
              href={project.live_demo_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.15, boxShadow: "0 0 20px hsl(var(--foreground) / 0.3)" }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
              className="bg-secondary/90 text-foreground rounded-full p-3 shadow-lg border border-border/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={(e) => e.stopPropagation()}
              aria-label="View live demo"
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          )}
        </motion.div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-semibold text-foreground mb-0.5 line-clamp-1">
            {project.title}
          </h3>
          
          {/* Impact Line */}
          {impactLine && (
            <p className="text-xs text-primary/90 font-medium mb-1.5 line-clamp-1">
              {impactLine}
            </p>
          )}
          
          <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
            {project.description}
          </p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech_stack.slice(0, 3).map((tech, i) => (
              <span key={i} className="tech-badge">
                {tech}
              </span>
            ))}
            {project.tech_stack.length > 3 && (
              <span className="tech-badge opacity-70">+{project.tech_stack.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
