import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, Heart, Phone, MapPin, ArrowUp } from "lucide-react";
import { useRef } from "react";
import { MagneticButton, GlowingCard } from "@/components/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], prefersReducedMotion ? [0, 0] : [50, 0]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/dev24074", label: "GitHub", rotate: 5 },
    { icon: Linkedin, href: "https://www.linkedin.com/in/devanand-boopalan-125312324/", label: "LinkedIn", rotate: -5 },
    { icon: Mail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=dev24074@gmail.com", label: "Email", rotate: 5 },
  ];

  const quickLinks = ["Projects", "About", "Experience"];

  return (
    <motion.footer 
      ref={ref}
      className="relative bg-card border-t border-border overflow-hidden" 
      id="footer"
      style={{ opacity, y }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -left-1/4 w-1/2 h-full bg-primary/5 rounded-full blur-3xl"
          animate={prefersReducedMotion ? {} : {
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/4 w-1/2 h-full bg-accent/5 rounded-full blur-3xl"
          animate={prefersReducedMotion ? {} : {
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto section-container py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.h3 
              className="text-3xl font-bold font-display mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-gradient">DEVANAND B</span>
            </motion.h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Full Stack Developer passionate about building scalable,
              cloud-native applications with modern technologies.
            </p>
            <motion.div 
              className="flex items-center gap-2 text-sm text-muted-foreground"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={prefersReducedMotion ? {} : { y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MapPin className="w-4 h-4 text-primary" />
              </motion.div>
              Chennai, Tamil Nadu, India
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
          >
            <h4 className="font-semibold mb-6 text-foreground text-lg">Quick Links</h4>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ x: 8 }}
                >
                  <span className="inline-flex items-center gap-2">
                    <motion.span
                      className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300"
                    />
                    {link}
                  </span>
                </motion.a>
              ))}
              <motion.a
                href="https://drive.google.com/file/d/17xUc8sVbXPXMqRoeNbKpT34ojQzgS7Bp/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm group"
                whileHover={{ x: 8 }}
              >
                <span className="inline-flex items-center gap-2">
                  <motion.span
                    className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300"
                  />
                  Download Resume
                </span>
              </motion.a>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <h4 className="font-semibold mb-6 text-foreground text-lg">Get In Touch</h4>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social, index) => (
                <MagneticButton key={social.label} strength={0.3}>
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-secondary rounded-xl hover:bg-primary/20 hover:text-primary transition-all duration-300 block"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.15, rotate: social.rotate }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                </MagneticButton>
              ))}
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <motion.div 
                className="flex items-center gap-3 group"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-foreground transition-colors">dev24074@gmail.com</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 group"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-foreground transition-colors">+91-9514691790</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.p 
            className="text-sm text-muted-foreground flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <motion.span 
              animate={prefersReducedMotion ? {} : { 
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0],
              }} 
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-destructive fill-destructive" />
            </motion.span> 
            by Devanand B
          </motion.p>
          
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} All rights reserved.
            </p>
            
            {/* Scroll to Top Button */}
            <MagneticButton strength={0.4}>
              <motion.button
                onClick={scrollToTop}
                className="p-2 bg-secondary hover:bg-primary/20 rounded-lg transition-colors group"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowUp className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.button>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
