import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon: string | null;
  proficiency: number | null;
  display_order: number | null;
  created_at: string;
}

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Skill[];
    },
  });
};

export const useSkillsByCategory = () => {
  const { data: skills, ...rest } = useSkills();

  const groupedSkills = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return { data: groupedSkills, ...rest };
};
