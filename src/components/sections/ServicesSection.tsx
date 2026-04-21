import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Search, MousePointerClick, Share2, Mail, FileText, BarChart3 } from 'lucide-react';

type CardVariant = 'dark' | 'green' | 'gray';

interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  variant: CardVariant;
}

const SERVICES: Service[] = [
  {
    icon: Search,
    title: 'Search engine optimization',
    description: 'Boost your rankings and drive organic traffic with data-driven SEO audits, keyword strategy, and on-page optimization.',
    variant: 'dark',
  },
  {
    icon: MousePointerClick,
    title: 'Pay-per-click advertising',
    description: 'Maximize ROI with precisely targeted Google and Meta ad campaigns that convert clicks into customers.',
    variant: 'green',
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    description: 'Grow your audience and build brand loyalty through engaging content and community management across all platforms.',
    variant: 'gray',
  },
  {
    icon: Mail,
    title: 'Email Marketing',
    description: 'Nurture leads and retain customers with personalized email sequences that deliver measurable results.',
    variant: 'green',
  },
  {
    icon: FileText,
    title: 'Content Creation',
    description: 'From blog posts to video scripts, we craft compelling content that positions you as an industry authority.',
    variant: 'dark',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Tracking',
    description: 'Turn raw data into strategic insights with custom dashboards and reporting that inform every decision.',
    variant: 'gray',
  },
];

const cardStyles: Record<CardVariant, { bg: string; text: string; subtext: string; border: string; iconBg: string; iconColor: string; arrowBg: string; arrowText: string }> = {
  dark: {
    bg: 'bg-card',
    text: 'text-gray-400',
    subtext: 'text-muted-foreground',
    border: 'border border-border',
    iconBg: 'bg-secondary',
    iconColor: 'text-primary',
    arrowBg: 'bg-primary',
    arrowText: 'text-primary-foreground',
  },
  green: {
    bg: 'bg-primary',
    text: 'text-primary-foreground',
    subtext: 'text-primary-foreground/80',
    border: '',
    iconBg: 'bg-primary-foreground',
    iconColor: 'text-primary',
    arrowBg: 'bg-primary-foreground',
    arrowText: 'text-primary',
  },
  gray: {
    bg: 'bg-secondary',
    text: 'text-foreground',
    subtext: 'text-muted-foreground',
    border: 'border border-border',
    iconBg: 'bg-card',
    iconColor: 'text-primary',
    arrowBg: 'bg-primary',
    arrowText: 'text-primary-foreground',
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function ServicesSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="section-wrapper" id="services">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-12">
          <span className="section-tag shrink-0">Services</span>
          <p className="section-subheading">
            At our digital marketing agency, we offer a range of services to help businesses
            grow and succeed online.
          </p>
        </div>

        {/* Services grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          variants={shouldReduce ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {SERVICES.map((service) => {
            const styles = cardStyles[service.variant];
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                variants={shouldReduce ? {} : cardVariants}
                whileHover={shouldReduce ? {} : { y: -4 }}
                className={`relative ${styles.bg} ${styles.border} rounded-2xl p-8 flex flex-col gap-6 group overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-black/30`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 ${styles.iconBg} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon className={`w-6 h-6 ${styles.iconColor}`} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className={`text-xl font-bold ${styles.text} mb-3 leading-tight`}>
                    {service.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${styles.subtext}`}>
                    {service.description}
                  </p>
                </div>

                {/* Arrow CTA */}
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${styles.subtext}`}>Learn more</span>
                  <div className={`w-10 h-10 ${styles.arrowBg} ${styles.arrowText} rounded-full flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-45 duration-300`}>
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Decorative background shape */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-10 bg-current pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
