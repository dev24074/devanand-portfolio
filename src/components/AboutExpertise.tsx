import { motion } from "framer-motion";
import { 
  Code2, 
  Cloud, 
  Cpu, 
  Palette, 
} from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const AboutExpertise = () => {
  const prefersReducedMotion = useReducedMotion();

  const expertiseAreas = [
    {
      icon: Code2,
      title: "Languages & Frameworks",
      skills: ["Python", "SQL", "JavaScript", "React", "Node.js", "REST APIs"],
    },
    {
      icon: Cloud,
      title: "Data Engineering & Big Data",
      skills: ["Hadoop", "HDFS", "MapReduce", "YARN", "Apache Hive", "Apache Spark", "ETL Pipelines"],
    },
    {
      icon: Palette,
      title: "Databases & Analytics",
      skills: ["MySQL", "MongoDB", "Pandas", "NumPy", "Data Visualization", "Statistical Analysis"],
    },
    {
      icon: Cpu,
      title: "AI & Machine Learning",
      skills: ["Scikit-learn", "Feature Selection", "SHAP", "SMOTE", "Neural Networks", "Computer Vision"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="section-container py-16" id="about">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold font-display mb-10"
      >
        About & Expertise
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-12 items-stretch">
        {/* Left Column - About Me Paragraphs with 3D Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ perspective: "1000px" }}
        >
          <motion.div
            variants={itemVariants}
            whileHover={prefersReducedMotion ? {} : { rotateY: 3, rotateX: -2, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="h-full bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-xl"
            style={{ 
              transformStyle: "preserve-3d",
              boxShadow: "0 20px 40px -15px hsl(var(--prime-teal) / 0.2)",
            }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-5">About Me</h3>
            
            <motion.p 
              variants={itemVariants}
              className="text-base text-foreground leading-relaxed mb-4"
            >
              I'm a <span className="text-primary font-semibold">Computer Science undergraduate</span> at VIT Chennai 
              specializing in data engineering, big data analytics, and machine learning. I am passionate about transforming raw data into 
              actionable insights that drive real-world decisions.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="text-muted-foreground leading-relaxed mb-4"
            >
              My journey in tech started with a curiosity for how complex systems work under the hood. Today, I build 
              <span className="text-primary/80"> scalable data pipelines using Python and SQL</span>, work across the 
              <span className="text-primary/80"> Hadoop and Spark ecosystem</span>, and apply machine learning techniques 
              to solve problems in healthcare, esports, and enterprise domains.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="text-muted-foreground leading-relaxed mb-4"
            >
              I believe in writing clean, efficient, and maintainable code. Whether it's architecting a normalized MySQL database, 
              optimizing ETL workflows, or deploying ML models with explainable AI, I approach every project with the goal of creating 
              <span className="text-primary/80">data-driven, production-ready solutions</span>.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="pt-5 border-t border-border/50 mt-auto"
            >
              <p className="text-sm text-muted-foreground italic">
                "I bridge the gap between software engineering and data science—turning complex datasets into 
                intelligent, impactful solutions."
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Column - Tech Stack with 3D Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
          style={{ perspective: "1000px" }}
        >
          {expertiseAreas.map((area, areaIndex) => (
            <motion.div
              key={area.title}
              variants={itemVariants}
              whileHover={prefersReducedMotion ? {} : { 
                rotateY: 5, 
                rotateX: -3, 
                scale: 1.02,
                z: 30,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="group bg-card/50 rounded-xl p-5 border border-border hover:border-primary/40 transition-all duration-300"
              style={{ 
                transformStyle: "preserve-3d",
                boxShadow: "0 10px 30px -10px hsl(var(--prime-teal) / 0.15)",
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4" style={{ transform: "translateZ(20px)" }}>
                <motion.div 
                  className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <area.icon className="w-5 h-5" />
                </motion.div>
                <h3 className="text-sm font-semibold text-foreground">
                  {area.title}
                </h3>
              </div>
              
              {/* Skill Pills */}
              <div className="flex flex-wrap gap-2" style={{ transform: "translateZ(10px)" }}>
                {area.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: areaIndex * 0.05 + i * 0.03 }}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.08, y: -2 }}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-secondary/80 text-foreground border border-border hover:border-primary/40 hover:bg-primary/10 transition-all duration-200 cursor-default shadow-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutExpertise;