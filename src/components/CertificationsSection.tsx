import { motion } from "framer-motion";
import { ExternalLink, Award, BadgeCheck, Sparkles } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { GlowingCard } from "@/components/animations";

import certCloudAi from "@/assets/cert-cloud-ai.jpg";
import certWebDev from "@/assets/cert-web-dev.jpg";
import certSoftwareEng from "@/assets/cert-software-eng.jpg";
import certAgile from "@/assets/cert-agile.jpg";

interface Certification {
  title: string;
  issuer: string;
  url: string;
  type: "badge" | "certificate";
  image: string;
}

const certifications: Certification[] = [
  {
    title: "Microsoft Certified: Azure AI Fundamentals (AI-900)",
    issuer: "Microsoft",
    url: "https://www.credly.com/badges/73a9666b-892c-4f7a-90a6-042735735d93/linked_in_profile",
    type: "badge",
    image: certCloudAi,
  },
  {
    title: "IBM Web Development Fundamentals",
    issuer: "IBM",
    url: "https://www.credly.com/badges/51b967a2-7fde-4e13-add3-761be93867da/linked_in_profile",
    type: "badge",
    image: certWebDev,
  },
  {
    title: "Advanced Software Engineering Virtual Experience",
    issuer: "Walmart USA",
    url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/prBZoAihniNijyD6d/oX6f9BbCL9kJDJzfg_prBZoAihniNijyD6d_PbMkYELEKLFou7WtN_1749963967245_completion_certificate.pdf",
    type: "certificate",
    image: certSoftwareEng,
  },
  {
    title: "Software Engineering Job Simulation",
    issuer: "Commonwealth Bank",
    url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/2sNmYuurxgpFYawco/xv8eSGu7nksKNiCQj_2sNmYuurxgpFYawco_PbMkYELEKLFou7WtN_1751266782958_completion_certificate.pdf",
    type: "certificate",
    image: certSoftwareEng,
  },
  {
    title: "Agile Project Management",
    issuer: "Professional Certificate",
    url: "https://drive.google.com/file/d/16ZcNILTML0s0rTmX6DQR1mM-ogHMMbYL/view",
    type: "certificate",
    image: certAgile,
  },
  {
    title: "Artificial Intelligence",
    issuer: "Professional Certificate",
    url: "https://drive.google.com/file/d/1bImwySEdn73BfnQN2mJZAgDOWofTGyA7/view",
    type: "certificate",
    image: certCloudAi,
  },
];

const CertificationsSection = () => {
  const prefersReducedMotion = useReducedMotion();

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
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section id="certifications" className="py-20 bg-card/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
          animate={prefersReducedMotion ? {} : {
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="section-container max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={prefersReducedMotion ? {} : { 
                rotate: [0, 360],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold font-display">
              <span className="text-gradient">Certifications</span> & Credentials
            </h2>
          </div>
          <motion.p 
            className="text-muted-foreground max-w-2xl text-lg"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Industry-recognized certifications and professional credentials
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certifications.map((cert, index) => (
            <motion.div key={index} variants={itemVariants}>
              <GlowingCard className="h-full">
                <motion.a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 block h-full"
                  whileHover={prefersReducedMotion ? {} : { 
                    y: -8,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Image */}
                  <div className="relative h-36 overflow-hidden">
                    <motion.img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                    
                    {/* Shimmer effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <motion.div 
                        className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors shrink-0"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        {cert.type === "badge" ? (
                          <BadgeCheck className="w-5 h-5 text-primary" />
                        ) : (
                          <Award className="w-5 h-5 text-primary" />
                        )}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="ml-auto"
                      >
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </motion.div>
                    </div>

                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                      {cert.issuer}
                    </p>
                  </div>

                  {/* Hover Border Glow */}
                  <motion.div 
                    className="absolute inset-0 rounded-xl border-2 border-primary/0 group-hover:border-primary/30 transition-colors pointer-events-none"
                  />
                </motion.a>
              </GlowingCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
