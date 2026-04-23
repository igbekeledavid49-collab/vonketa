import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { ContactFormData } from '@/types';

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'info@positivus.com' },
  { icon: Phone, label: 'Phone', value: '+123 12-3456-7890' },
  { icon: MapPin, label: 'address', value: ' 1234 Main StMoonstone City, Stardust State 12345' },
];

const SUBJECTS: Array<{ value: ContactFormData['subject']; label: string }> = [
  { value: 'general', label: 'General enquiry' },
  { value: 'services', label: 'Our services' },
  { value: 'pricing', label: 'Pricing' },
  { value: 'other', label: 'Other' },
];

export default function ContactSection() {
  const shouldReduce = useReducedMotion();
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    subject: 'general',
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email required';
    if (form.message.trim().length < 20) newErrors.message = 'Message must be at least 15 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success('Message sent!', {
      description: 'We\'ll get back to you within 24 hours.',
    });
  };

  return (
    <section className="section-wrapper" id="contact">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-12">
          <span className="section-tag shrink-0">Contact Us</span>
          <p className="section-subheading">
           Connect with Us: Let's Discuss Your <br /> Digital Marketing Needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left — info */}
          <motion.div
            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="bg-card border border-border rounded-2xl p-7">
              <h3 className="text-xl font-bold text-white mb-6">Contact information</h3>
              <div className="flex flex-col gap-5">
                {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">
                        {label}
                      </p>
                      <p className="text-sm text-gray-300 font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-card border border-border rounded-2xl p-7 md:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Message sent!</h3>
                  <p className="text-muted-foreground text-sm max-w-sm">
                    Thank you for reaching out. Our team will respond within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    className="border-border mt-2"
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '', subject: 'general' }); }}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                  {/* Subject radio group */}
                  <div>
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-3 block font-semibold">
                      I&apos;m interested in...
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {SUBJECTS.map((s) => (
                        <label
                          key={s.value}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer text-sm font-medium transition-colors ${
                            form.subject === s.value
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                          }`}
                        >
                          <input
                            type="radio"
                            name="subject"
                            value={s.value}
                            checked={form.subject === s.value}
                            onChange={() => setForm({ ...form, subject: s.value })}
                            className="sr-only"
                          />
                          {s.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Name & email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="name" className="text-sm text-muted-foreground">
                        Full name <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Smith"
                        className={`bg-secondary border-border focus:border-primary ${errors.name ? 'border-destructive' : ''}`}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-xs text-destructive">{errors.name}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="email" className="text-sm text-muted-foreground">
                        Email address <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@company.com"
                        className={`bg-secondary border-border focus:border-primary ${errors.email ? 'border-destructive' : ''}`}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-xs text-destructive">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="message" className="text-sm text-muted-foreground">
                      Message <span className="text-primary">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your project, goals, and timeline..."
                      rows={5}
                      className={`bg-secondary border-border focus:border-primary resize-none ${errors.message ? 'border-destructive' : ''}`}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-xs text-destructive">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 text-base font-semibold gap-2 group disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
