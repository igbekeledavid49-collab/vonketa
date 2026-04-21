import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STATS = [
  { value: '200+', label: 'Clients worldwide', icon: Users },
  { value: '93%', label: 'Client satisfaction', icon: Award },
  { value: '8+ yrs', label: 'Industry experience', icon: TrendingUp },
];

const PARTNER_LOGOS = ['Amazon', 'Dribbble', 'HubSpot', 'Notion', 'Netflix', 'Zoom'];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function HeroSection() {
  const shouldReduce = useReducedMotion();
  const contactRef = useRef<HTMLElement | null>(null);

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    const el = document.querySelector('#services');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section-wrapper relative overflow-hidden" id="hero" ref={contactRef as React.RefObject<HTMLElement>}>
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-80px)] py-12 md:py-0">
          {/* Left — text */}
          <motion.div
            variants={shouldReduce ? {} : containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-7"
          >

            <motion.h1
              variants={shouldReduce ? {} : itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight"
            >
              Navigating the{' '}
              <span className="relative inline-block">
                digital landscape
                <span
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                  style={{ background: 'var(--positivus-green)' }}
                />
              </span>{' '}
              for success
            </motion.h1>

            <motion.p
              variants={shouldReduce ? {} : itemVariants}
              className="text-lg text-muted-foreground leading-relaxed max-w-lg"
            >
              Our digital marketing agency helps businesses grow and succeed online through
              a range of services including SEO, PPC, social media marketing, and more.
            </motion.p>

            <motion.div
              variants={shouldReduce ? {} : itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-800 rounded-full px-8 text-base font-semibold gap-2 group border border-gray-300 shadow-sm"
                onClick={scrollToContact}
              >
                Book a consultation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary rounded-full px-8 text-base"
                onClick={scrollToServices}
              >
                Learn more
              </Button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={shouldReduce ? {} : itemVariants}
              className="grid grid-cols-3 gap-4 pt-4 border-t border-border"
            >
              {STATS.map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-xl md:text-2xl font-bold text-foreground">{value}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — illustration */}
          <motion.div
            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg mx-auto aspect-square">
              {/* Background glow */}
              <div className="absolute inset-0 rounded-full bg-primary/5 blur-3xl" />

              {/* Main illustration card */}
              <div className="absolute inset-8 bg-card border border-border rounded-3xl flex items-center justify-center overflow-hidden shadow-[15_60px_80px_-55px_rgba(0,0,0,6)]]">
                {/* Grid pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                  }}
                />
                {/* Center icon */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center animate-float">
                    <TrendingUp className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <p className="text-lg font-bold text-gray-400">+127% Growth</p>
                  <p className="text-sm text-muted-foreground">Average client result</p>
                </div>
              </div>

              {/* Floating badge — top right */}
              <motion.div
                className="absolute top-4 right-0 bg-primary text-primary-foreground px-4 py-2 rounded-2xl text-sm font-semibold shadow-lg"
                animate={shouldReduce ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                ↑ SEO Traffic
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                className="absolute bottom-4 left-0 bg-card border border-border px-4 py-3 rounded-2xl shadow-lg"
                animate={shouldReduce ? {} : { y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <p className="text-xs text-muted-foreground">Conversion Rate</p>
                <p className="text-lg font-bold text-primary">+43.7%</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Partner logos */}
        <motion.div
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t border-border pt-10 mt-4"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground text-center mb-6 font-medium">
            Trusted by forward-thinking companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {PARTNER_LOGOS.map((logo) => (
              <span
                key={logo}
                className="text-lg font-bold text-border hover:text-muted-foreground transition-colors duration-200 cursor-default select-none"
              >
                {logo}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
