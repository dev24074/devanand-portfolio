import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tech_stack: string[];
  banner_image: string | null;
  github_url: string | null;
  live_demo_url: string | null;
  features: string[] | null;
  is_featured: boolean | null;
  display_order: number | null;
  created_at: string;
  updated_at: string;
}

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Project[];
    },
  });
};

export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: ["projects", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_featured", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Project[];
    },
  });
};

export const useProjectsByCategory = (category: string) => {
  return useQuery({
    queryKey: ["projects", "category", category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("category", category)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Project[];
    },
  });
};
