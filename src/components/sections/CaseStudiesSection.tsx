import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface CaseStudy {
  title: string;
  industry: string;
  description: string;
  result: string;
  resultLabel: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    title: 'Restaurant PPC Success',
    industry: 'Food & Beverage',
    description:
      'For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic and a 25% increase in sales.',
    result: '+50%',
    resultLabel: 'Website traffic',
  },
  {
    title: 'B2B SEO Domination',
    industry: 'SaaS / Software',
    description:
      'For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for key keywords and a 200% increase in organic traffic.',
    result: '+200%',
    resultLabel: 'Organic traffic',
  },
  {
    title: 'Retail Social Campaign',
    industry: 'Retail & E-Commerce',
    description:
      'For a national retail chain, we created a social media marketing campaign that increased followers by 25% and generated a 20% increase in online sales.',
    result: '+20%',
    resultLabel: 'Online sales',
  },
  {
    title: 'Brand Awareness Blitz',
    industry: 'Tech / Startup',
    description:
      'Executed a brand-awareness campaign across LinkedIn and Google Display, growing their user base by 85% in just 90 days.',
    result: '+85%',
    resultLabel: 'User base growth',
  },
];

export default function CaseStudiesSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="section-wrapper" id="case-studies">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-10">
          <span className="section-tag shrink-0">Case Studies</span>
          <p className="section-subheading">
            Explore Real-Life Examples of Our Proven Digital Marketing Success through Our Case Studies
          </p>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CASE_STUDIES.map((study, i) => (
            <motion.div
              key={study.title}
              initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const }}
              viewport={{ once: true }}
              whileHover={shouldReduce ? {} : { y: -4 }}
              className="bg-positivus-dark-card border border-border rounded-2xl p-6 flex flex-col gap-5 group hover:border-primary/40 transition-colors duration-300"
            >
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                {study.industry}
              </span>
              <h3 className="text-lg font-bold text-foreground leading-snug">
                {study.title}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed flex-1">
                {study.description}
              </p>
              <div className="border-t border-border pt-4 flex items-end justify-between">
                <div>
                  <p className="text-2xl font-black text-primary">{study.result}</p>
                  <p className="text-xs text-muted-foreground">{study.resultLabel}</p>
                </div>
                <button className="flex items-center gap-1.5 text-sm text-primary font-medium group-hover:gap-2.5 transition-all duration-200">
                  Learn more
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {CASE_STUDIES.map((study) => (
                <CarouselItem key={study.title}>
                  <div className="bg-positivus-dark-card border border-border rounded-2xl p-6 flex flex-col gap-5">
                    <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                      {study.industry}
                    </span>
                    <h3 className="text-lg font-bold text-foreground leading-snug">
                      {study.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {study.description}
                    </p>
                    <div className="border-t border-border pt-4 flex items-end justify-between">
                      <div>
                        <p className="text-2xl font-black text-primary">{study.result}</p>
                        <p className="text-xs text-muted-foreground">{study.resultLabel}</p>
                      </div>
                      <button className="flex items-center gap-1.5 text-sm text-primary font-medium">
                        Learn more <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-3 mt-4">
              <CarouselPrevious className="static translate-y-0 border-border text-foreground hover:bg-secondary" />
              <CarouselNext className="static translate-y-0 border-border text-foreground hover:bg-secondary" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
