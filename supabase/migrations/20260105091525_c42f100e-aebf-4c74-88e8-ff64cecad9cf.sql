-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  banner_image TEXT,
  github_url TEXT,
  live_demo_url TEXT,
  features TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create skills table
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  icon TEXT,
  proficiency INTEGER DEFAULT 80,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create experience table
CREATE TABLE public.experience (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  duration TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'work',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Projects are publicly viewable" 
ON public.projects FOR SELECT USING (true);

CREATE POLICY "Skills are publicly viewable" 
ON public.skills FOR SELECT USING (true);

CREATE POLICY "Experience is publicly viewable" 
ON public.experience FOR SELECT USING (true);

-- Create update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for projects
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample projects
INSERT INTO public.projects (title, description, category, tech_stack, features, is_featured, display_order, github_url, live_demo_url) VALUES
('CloudSync Pro', 'Enterprise-grade cloud synchronization platform with real-time collaboration features and multi-tenant architecture', 'Cloud & Backend', ARRAY['Node.js', 'AWS', 'PostgreSQL', 'Redis', 'Docker'], ARRAY['Real-time sync', 'Multi-tenant', 'Auto-scaling', 'End-to-end encryption'], true, 1, 'https://github.com/devanand', 'https://cloudsync.demo'),
('AI Vision Analytics', 'Computer vision platform for real-time object detection and analytics using deep learning models', 'AI & Computer Vision', ARRAY['Python', 'TensorFlow', 'OpenCV', 'FastAPI', 'React'], ARRAY['Real-time detection', 'Custom model training', 'Analytics dashboard', 'REST API'], true, 2, 'https://github.com/devanand', 'https://aivision.demo'),
('Algorithm Visualizer', 'Interactive visualization tool for data structures and algorithms with step-by-step execution', 'Algorithms & Visualizers', ARRAY['React', 'TypeScript', 'D3.js', 'Tailwind'], ARRAY['50+ algorithms', 'Step-by-step mode', 'Custom input', 'Performance metrics'], true, 3, 'https://github.com/devanand', 'https://algovis.demo'),
('Microservices Hub', 'Scalable microservices architecture with service mesh and distributed tracing', 'Cloud & Backend', ARRAY['Go', 'Kubernetes', 'gRPC', 'Prometheus', 'Jaeger'], ARRAY['Service mesh', 'Auto-discovery', 'Load balancing', 'Observability'], false, 4, 'https://github.com/devanand', NULL),
('Neural Style Transfer', 'Deep learning application for artistic style transfer on images using CNNs', 'AI & Computer Vision', ARRAY['Python', 'PyTorch', 'Flask', 'React'], ARRAY['Multiple styles', 'Batch processing', 'High resolution', 'API access'], false, 5, 'https://github.com/devanand', NULL),
('DevOps Pipeline', 'Complete CI/CD pipeline solution with automated testing and deployment', 'Cloud & Backend', ARRAY['Jenkins', 'Terraform', 'AWS', 'Docker', 'Ansible'], ARRAY['Multi-stage builds', 'Auto rollback', 'Slack integration', 'Metrics'], false, 6, 'https://github.com/devanand', NULL),
('Sorting Showdown', 'Comparative visualization of sorting algorithms with performance benchmarking', 'Algorithms & Visualizers', ARRAY['JavaScript', 'Canvas API', 'Web Workers'], ARRAY['10 algorithms', 'Race mode', 'Benchmarking', 'Code view'], false, 7, 'https://github.com/devanand', NULL),
('Face Recognition API', 'Facial recognition service with emotion detection and liveness verification', 'AI & Computer Vision', ARRAY['Python', 'dlib', 'FastAPI', 'PostgreSQL', 'Redis'], ARRAY['Real-time detection', 'Emotion analysis', 'Anti-spoofing', 'Batch API'], false, 8, 'https://github.com/devanand', NULL);

-- Insert sample skills
INSERT INTO public.skills (name, category, icon, proficiency, display_order) VALUES
('React', 'Frontend', 'react', 95, 1),
('TypeScript', 'Frontend', 'typescript', 90, 2),
('Next.js', 'Frontend', 'nextjs', 88, 3),
('Tailwind CSS', 'Frontend', 'tailwind', 92, 4),
('Node.js', 'Backend', 'nodejs', 90, 5),
('Python', 'Backend', 'python', 88, 6),
('PostgreSQL', 'Backend', 'postgresql', 85, 7),
('GraphQL', 'Backend', 'graphql', 82, 8),
('AWS', 'Cloud', 'aws', 87, 9),
('Docker', 'Cloud', 'docker', 90, 10),
('Kubernetes', 'Cloud', 'kubernetes', 80, 11),
('Terraform', 'Cloud', 'terraform', 78, 12),
('Git', 'Tools', 'git', 95, 13),
('Linux', 'Tools', 'linux', 88, 14),
('VS Code', 'Tools', 'vscode', 95, 15),
('Figma', 'Tools', 'figma', 75, 16);

-- Insert sample experience
INSERT INTO public.experience (title, organization, duration, description, type, display_order) VALUES
('Full Stack Developer', 'Tech Solutions Inc.', 'Jan 2024 - Present', 'Building scalable web applications using React, Node.js, and cloud technologies. Leading development of microservices architecture.', 'work', 1),
('Software Engineering Intern', 'Cloud Dynamics', 'Jun 2023 - Dec 2023', 'Developed CI/CD pipelines and contributed to backend services using Python and AWS. Improved deployment efficiency by 40%.', 'work', 2),
('B.Tech Computer Science', 'National Institute of Technology', '2021 - 2025', 'Specializing in Cloud Computing and Machine Learning. CGPA: 8.5/10. Active member of coding club.', 'education', 3),
('Open Source Contributor', 'Various Projects', '2022 - Present', 'Contributing to popular open-source projects including React ecosystem libraries and DevOps tools.', 'work', 4);