import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      'Positivus transformed our online presence completely. Within 90 days of their SEO campaign, our organic traffic tripled and conversions went through the roof. They don\'t just deliver reports — they deliver results.',
    name: 'Sarah Williams',
    title: 'CMO',
    company: 'TechNova Inc.',
    avatar: 'https://i.pravatar.cc/200?u=sarah-testimonial',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'The team at Positivus is incredibly data-driven and creative at the same time. Our PPC campaigns now generate 3× the leads at half the cost. Working with them is like having an entire marketing department in-house.',
    name: 'David Park',
    title: 'Founder',
    company: 'GrowthBox',
    avatar: 'https://i.pravatar.cc/200?u=david-testimonial',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'We\'ve worked with several agencies before, but Positivus stands apart. Their communication is transparent, their strategy is sharp, and the results speak for themselves. Highly recommend for any serious business.',
    name: 'Maria Gonzalez',
    title: 'Director of Marketing',
    company: 'Elevation Brands',
    avatar: 'https://i.pravatar.cc/200?u=maria-testimonial',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const shouldReduce = useReducedMotion();

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Auto-rotate every 5s
  useEffect(() => {
    if (shouldReduce) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, shouldReduce]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  const testimonial = TESTIMONIALS[current];

  return (
    <section className="section-wrapper" id="testimonials">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-12">
          <span className="section-tag shrink-0">Testimonials</span>
          <p className="section-subheading">
            Hear from Our Satisfied Clients: Read Our Testimonials <br /> to Learn More about Our Digital Marketing Services
          </p>
        </div>

        {/* Testimonial display */}
        <div className="relative bg-positivus-dark-card border border-border rounded-3xl p-8 md:p-12 overflow-hidden">
          {/* Decorative quote */}
          <div className="absolute top-6 right-6 md:top-10 md:right-10 opacity-10">
            <Quote className="w-20 h-20 md:w-28 md:h-28 text-gray-400" />
          </div>

          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={testimonial.id}
              custom={direction}
              variants={shouldReduce ? {} : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-gray-300 leading-relaxed font-medium mb-8 max-w-3xl">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14 border-2 border-primary/30">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback className="bg-secondary text-foreground font-bold">
                    {testimonial.name.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.title} · {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 bg-primary' : 'w-2 bg-border hover:bg-muted-foreground'
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="w-9 h-9 border-border text-foreground hover:bg-secondary rounded-full"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="w-9 h-9 border-border text-foreground hover:bg-secondary rounded-full"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
