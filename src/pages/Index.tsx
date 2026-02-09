import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjects, Project } from "@/hooks/useProjects";
import { useFirstVisit } from "@/hooks/useReducedMotion";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import ProjectCarousel from "@/components/ProjectCarousel";
import ProjectModal from "@/components/ProjectModal";
import AboutExpertise from "@/components/AboutExpertise";
import ExperienceSection from "@/components/ExperienceSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import { FloatingOrbs } from "@/components/animations";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { data: projects, isLoading } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const isFirstVisit = useFirstVisit();

  // Group projects by category
  const featuredProjects = projects?.filter((p) => p.is_featured) || [];
  const cloudProjects =
    projects?.filter((p) => p.category === "Cloud & Backend") || [];
  const aiProjects =
    projects?.filter((p) => p.category === "AI & Computer Vision") || [];
  const algoProjects =
    projects?.filter((p) => p.category === "Algorithms & Visualizers") || [];

  // Content reveal animation variants
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <>
      {/* Splash Screen - only on first visit */}
      <AnimatePresence>
        {showSplash && isFirstVisit && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      <motion.div
        className="min-h-screen bg-background relative"
        initial={isFirstVisit ? "hidden" : "visible"}
        animate={!showSplash || !isFirstVisit ? "visible" : "hidden"}
        variants={contentVariants}
      >
        {/* Floating Background Orbs */}
        <FloatingOrbs />

        <motion.div variants={sectionVariants}>
          <Navbar />
        </motion.div>

        {/* Hero Section */}
        <motion.div variants={sectionVariants}>
          <HeroBanner />
        </motion.div>

        {/* Projects Section */}
        <motion.section id="projects" className="py-8" variants={sectionVariants}>
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-2">
              {/* Featured Projects Row */}
              {featuredProjects.length > 0 && (
                <ProjectCarousel
                  title="🔥 Featured Projects"
                  projects={featuredProjects}
                  onSelectProject={setSelectedProject}
                />
              )}

              {/* Cloud & Backend Row */}
              {cloudProjects.length > 0 && (
                <ProjectCarousel
                  title="☁️ Cloud & Backend"
                  projects={cloudProjects}
                  onSelectProject={setSelectedProject}
                />
              )}

              {/* AI & Computer Vision Row */}
              {aiProjects.length > 0 && (
                <ProjectCarousel
                  title="🤖 AI & Computer Vision"
                  projects={aiProjects}
                  onSelectProject={setSelectedProject}
                />
              )}

              {/* Algorithms & Visualizers Row */}
              {algoProjects.length > 0 && (
                <ProjectCarousel
                  title="📊 Algorithms & Visualizers"
                  projects={algoProjects}
                  onSelectProject={setSelectedProject}
                />
              )}
            </div>
          )}
        </motion.section>

        {/* About & Expertise Section */}
        <motion.div variants={sectionVariants}>
          <AboutExpertise />
        </motion.div>

        {/* Experience Section */}
        <motion.div variants={sectionVariants}>
          <ExperienceSection />
        </motion.div>

        {/* Certifications Section */}
        <motion.div variants={sectionVariants}>
          <CertificationsSection />
        </motion.div>

        {/* Contact Form Section */}
        <motion.div variants={sectionVariants}>
          <ContactForm />
        </motion.div>

        {/* Footer */}
        <motion.div variants={sectionVariants}>
          <Footer />
        </motion.div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </motion.div>
    </>
  );
};

export default Index;
