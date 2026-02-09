import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useExperience } from "@/hooks/useExperience";
import { Briefcase, GraduationCap, Loader2 } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TimelineNodeProps {
  color: "primary" | "gold";
  index: number;
}

const TimelineNode = ({ color, index }: TimelineNodeProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      ref={ref}
      className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full ${
        color === "primary" ? "bg-primary" : "bg-prime-gold"
      }`}
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ 
        duration: prefersReducedMotion ? 0.1 : 0.4, 
        delay: prefersReducedMotion ? 0 : index * 0.1,
        type: "spring",
        stiffness: 200
      }}
      style={{
        boxShadow: isInView 
          ? `0 0 20px ${color === "primary" ? "hsl(var(--prime-teal) / 0.6)" : "hsl(45 100% 51% / 0.5)"}` 
          : "none",
      }}
    />
  );
};

const ExperienceSection = () => {
  const { data: experiences, isLoading } = useExperience();
  const prefersReducedMotion = useReducedMotion();

  if (isLoading) {
    return (
      <div className="section-container flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!experiences?.length) return null;

  const workExperiences = experiences.filter((exp) => exp.type === "work");
  const education = experiences.filter((exp) => exp.type === "education");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.4, ease: "easeOut" as const },
    },
  };

  return (
    <div className="section-container" id="experience">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="row-title text-2xl md:text-3xl mb-8"
      >
        Experience & Education
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Work Experience */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <motion.div 
              className="p-2 bg-primary/20 rounded-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Briefcase className="w-5 h-5 text-primary" />
            </motion.div>
            <h3 className="text-xl font-semibold text-foreground">
              Work Experience
            </h3>
          </div>

          <motion.div 
            className="space-y-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {workExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="relative pl-8 pb-8 border-l-2 border-primary/30 last:pb-0"
              >
                <TimelineNode color="primary" index={index} />
                <motion.div 
                  className="bg-card rounded-lg p-5 border border-border hover:border-primary/40 transition-all duration-300"
                  whileHover={prefersReducedMotion ? {} : { x: 4 }}
                >
                  <h4 className="text-lg font-semibold text-foreground mb-1">
                    {exp.title}
                  </h4>
                  <p className="text-primary font-medium text-sm mb-1">
                    {exp.organization}
                  </p>
                  <p className="text-xs text-muted-foreground mb-3 font-mono">
                    {exp.duration}
                  </p>
                  {exp.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Education */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <motion.div 
              className="p-2 bg-prime-gold/20 rounded-lg"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <GraduationCap className="w-5 h-5 text-prime-gold" />
            </motion.div>
            <h3 className="text-xl font-semibold text-foreground">Education</h3>
          </div>

          <motion.div 
            className="space-y-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                variants={itemVariants}
                className="relative pl-8 pb-8 border-l-2 border-prime-gold/30 last:pb-0"
              >
                <TimelineNode color="gold" index={index} />
                <motion.div 
                  className="bg-card rounded-lg p-5 border border-border hover:border-prime-gold/40 transition-all duration-300"
                  whileHover={prefersReducedMotion ? {} : { x: 4 }}
                >
                  <h4 className="text-lg font-semibold text-foreground mb-1">
                    {edu.title}
                  </h4>
                  <p className="text-prime-gold font-medium text-sm mb-1">
                    {edu.organization}
                  </p>
                  <p className="text-xs text-muted-foreground mb-3 font-mono">
                    {edu.duration}
                  </p>
                  {edu.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
