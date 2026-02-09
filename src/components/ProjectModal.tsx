import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Check } from "lucide-react";
import { Project } from "@/hooks/useProjects";
import { Button } from "@/components/ui/button";

// Import project images
import rideBookingImg from "@/assets/project-ridebooking.jpg";
import emotionImg from "@/assets/project-emotion.jpg";
import pathfindingImg from "@/assets/project-pathfinding.jpg";
import gmailImg from "@/assets/project-gmail.jpg";
import gestureImg from "@/assets/project-gesture.jpg";
import matrimonyImg from "@/assets/project-matrimony.jpg";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

// Map project titles to imported images
const projectImages: Record<string, string> = {
  "AWS-Based Ride Booking Web Application": rideBookingImg,
  "Real-Time Face Detection and Emotion Analysis System": emotionImg,
  "A* Pathfinding Algorithm Visualizer": pathfindingImg,
  "Smart Gmail Tracker": gmailImg,
  "Hand Gesture Recognition System": gestureImg,
  "Matrimony Web Platform": matrimonyImg,
};

const getCategoryGradient = (category: string) => {
  const gradients: Record<string, string> = {
    "Cloud & Backend": "from-blue-600/80 via-cyan-600/60 to-blue-800/80",
    "AI & Computer Vision": "from-purple-600/80 via-pink-500/60 to-purple-800/80",
    "Algorithms & Visualizers": "from-emerald-600/80 via-teal-500/60 to-emerald-800/80",
    "Featured Projects": "from-amber-500/80 via-orange-500/60 to-red-600/80",
  };
  return gradients[category] || "from-primary/80 via-accent/60 to-secondary/80";
};

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/90 backdrop-blur-sm p-4 md:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-4xl bg-card rounded-xl overflow-hidden shadow-2xl my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-background/50 hover:bg-background/80 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative aspect-video">
            {projectImages[project.title] ? (
              <img
                src={projectImages[project.title]}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className={`w-full h-full bg-gradient-to-br ${getCategoryGradient(project.category)}`}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="category-badge">{project.category}</span>
                {project.is_featured && (
                  <span className="bg-prime-gold/90 text-black text-xs font-bold px-2 py-1 rounded">
                    FEATURED
                  </span>
                )}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium text-foreground"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              {project.github_url && (
                <Button asChild size="lg" variant="outline" className="flex-1 sm:flex-none">
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    View Source
                  </a>
                </Button>
              )}
              {project.live_demo_url && (
                <Button asChild size="lg" className="flex-1 sm:flex-none">
                  <a
                    href={project.live_demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
