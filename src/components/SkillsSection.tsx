import { motion } from "framer-motion";
import { useSkillsByCategory } from "@/hooks/useSkills";
import { 
  Code2, 
  Server, 
  Cloud, 
  Wrench,
  Loader2
} from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Code2 className="w-5 h-5" />,
  Backend: <Server className="w-5 h-5" />,
  Cloud: <Cloud className="w-5 h-5" />,
  Tools: <Wrench className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  Frontend: "from-blue-500 to-cyan-500",
  Backend: "from-green-500 to-emerald-500",
  Cloud: "from-purple-500 to-pink-500",
  Tools: "from-orange-500 to-amber-500",
};

const SkillsSection = () => {
  const { data: groupedSkills, isLoading } = useSkillsByCategory();

  if (isLoading) {
    return (
      <div className="section-container flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!groupedSkills) return null;

  const categories = Object.keys(groupedSkills);

  return (
    <div className="section-container" id="skills">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="row-title text-2xl md:text-3xl mb-8"
      >
        Skills & Technologies
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="bg-card rounded-xl overflow-hidden border border-border"
          >
            {/* Category Header */}
            <div
              className={`p-4 bg-gradient-to-r ${categoryColors[category] || "from-primary to-accent"}`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  {categoryIcons[category] || <Code2 className="w-5 h-5" />}
                </div>
                <h3 className="text-lg font-semibold text-white">{category}</h3>
              </div>
            </div>

            {/* Skills List */}
            <div className="p-4 space-y-3">
              {groupedSkills[category].map((skill, skillIndex) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">
                      {skill.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {skill.proficiency}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                      className={`h-full rounded-full bg-gradient-to-r ${categoryColors[category] || "from-primary to-accent"}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
