import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface Step {
  number: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Consultation',
    description:
      'During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.',
  },
  {
    number: '02',
    title: 'Research and Strategy Development',
    description:
      'We conduct thorough market research and competitor analysis to identify opportunities. Our team then crafts a data-driven strategy aligned with your KPIs and business goals.',
  },
  {
    number: '03',
    title: 'Implementation',
    description:
      'Our specialists execute the strategy with precision — from launching campaigns and publishing content to setting up tracking and automation — all while maintaining quality at every step.',
  },
  {
    number: '04',
    title: 'Monitoring and Optimization',
    description:
      'We continuously monitor campaign performance using real-time analytics, A/B test creative assets, and iterate on strategy to maximize your ROI and ensure sustainable growth.',
  },
  {
    number: '05',
    title: 'Reporting and Communication',
    description:
      'We provide transparent, regular reports with clear metrics and insights. Monthly strategy calls keep you informed and in control of your marketing investment.',
  },
];

export default function ProcessSection() {
  const [openStep, setOpenStep] = useState<string | null>('01');
  const shouldReduce = useReducedMotion();

  return (
    <section className="section-wrapper" id="process">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-12">
          <span className="section-tag shrink-0">Our Working Process</span>
          <p className="section-subheading">
            Step-by-Step Guide to Achieving <br /> Your Business Goals
          </p>
        </div>

        {/* Steps accordion */}
        <div className="flex flex-col gap-4">
          {STEPS.map((step, index) => {
            const isOpen = openStep === step.number;

            return (
              <motion.div
                key={step.number}
                initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-primary border-primary'
                    : 'bg-card border-border hover:border-primary/30'
                }`}
              >
                <button
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                  onClick={() => setOpenStep(isOpen ? null : step.number)}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-5">
                    <span
                      className={`text-4xl md:text-5xl font-black leading-none ${
                        isOpen ? 'text-primary-foreground' : 'text-border'
                      }`}
                    >
                      {step.number}
                    </span>
                    <span
                      className={`text-lg md:text-xl font-bold ${
                        isOpen ? 'text-dark' : 'text-gray-400'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${
                      isOpen
                        ? 'border-primary-foreground text-primary-foreground'
                        : 'border-border text-muted-foreground'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={shouldReduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={shouldReduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 md:px-8 pb-8">
                        <div className="border-t border-primary-foreground/30 pt-5">
                          <p className="text-primary-foreground/90 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
