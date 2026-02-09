import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Experience {
  id: string;
  title: string;
  organization: string;
  duration: string;
  description: string | null;
  type: string;
  display_order: number | null;
  created_at: string;
}

export const useExperience = () => {
  return useQuery({
    queryKey: ["experience"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experience")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Experience[];
    },
  });
};
