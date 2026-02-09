import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { z } from "zod";
// Import EmailJS instead of Supabase
import emailjs from "@emailjs/browser";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null); // Added ref for EmailJS
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const prefersReducedMotion = useReducedMotion();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<ContactFormData> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as keyof ContactFormData] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // EmailJS Integration
      await emailjs.send(
        'service_rashe08',   // Replace with your Service ID
        'template_bjmfw7k',  // Replace with your Template ID
        {
          from_name: result.data.name,
          reply_to: result.data.email,
          message: result.data.message,
        },
        'oCBXZ60jzT-nG5gUJ'    // Replace with your Public Key
      );

      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });

      setTimeout(() => {
        setIsSuccess(false);
        setIsOpen(false);
      }, 2000);
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setErrors({});
  };

  return (
    <section id="contact" className="py-16">
      <div className="section-container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-card border border-border rounded-2xl overflow-hidden"
        >
          {/* Grid Pattern Background */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
                                  linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="cta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative flex items-center justify-between px-8 py-6 md:px-12 md:py-8"
              >
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-display text-foreground tracking-wide">
                  GOT A PROJECT IN MIND?
                </h2>
                <Button
                  onClick={() => setIsOpen(true)}
                  variant="outline"
                  className="border-foreground/30 text-foreground hover:bg-foreground/10 px-6 py-2 font-semibold tracking-wider"
                >
                  CONTACT ME
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.1 : 0.4 }}
                className="relative"
              >
                <div className="px-8 py-8 md:px-12 md:py-10">
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close contact form"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className={`bg-transparent border-foreground/30 focus:border-primary ${
                          errors.name ? "border-destructive" : ""
                        }`}
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`bg-transparent border-foreground/30 focus:border-primary ${
                          errors.email ? "border-destructive" : ""
                        }`}
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className={`bg-transparent border-foreground/30 focus:border-primary resize-y ${
                          errors.message ? "border-destructive" : ""
                        }`}
                        disabled={isSubmitting}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive">{errors.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-foreground/10 text-foreground hover:bg-foreground/20 border border-foreground/30 font-semibold tracking-wider"
                      disabled={isSubmitting || isSuccess}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          SENDING...
                        </>
                      ) : isSuccess ? (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          SENT!
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          SEND
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;