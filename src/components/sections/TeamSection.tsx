import { motion, useReducedMotion } from 'framer-motion';
import { Twitter, Linkedin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  twitter?: string;
  linkedin?: string;
}

const TEAM: TeamMember[] = [
  {
    name: 'John Smith',
    role: 'CEO & Co-Founder',
    bio: '10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy',
    avatar: 'https://i.pravatar.cc/200?u=john-smith-positivus',
    twitter: '#',
    linkedin: '#',
  },
  {
    name: 'Jane Doe',
    role: 'Head of SEO',
    bio: '7+ years of experience in project management and team leadership. Strong organizational and communication skills',
    avatar: 'https://i.pravatar.cc/200?u=jane-doe-positivus',
    twitter: '#',
    linkedin: '#',
  },
  {
    name: 'Michael Lee',
    role: 'Lead Content Strategist',
    bio: '5+ years of experience in SEO and content creation. Proficient in keyword research and on-page optimization',
    avatar: 'https://i.pravatar.cc/200?u=michael-lee-positivus',
    twitter: '#',
    linkedin: '#',
  },
  {
    name: 'Emily Chen',
    role: 'PPC Manager',
    bio: '3+ years of experience in paid search advertising. Skilled in campaign management and performance analysis',
    avatar: 'https://i.pravatar.cc/200?u=emily-chen-positivus',
    twitter: '#',
    linkedin: '#',
  },
];

export default function TeamSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="section-wrapper" id="team">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-12">
          <span className="section-tag shrink-0">Our Team</span>
          <p className="section-subheading">
           Meet the skilled and experienced team behind our <br/> successful digital marketing strategies
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              whileHover={shouldReduce ? {} : { y: -4 }}
              className="bg-background border border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-2xl p-6 flex flex-col gap-4 group hover:border-black hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 [border-top-width:1px][border-left-width:1px][border-bottom-width:4px][border-right-width:4px]"
            >
              <Avatar className="w-16 h-16 rounded-xl border-2 border-border group-hover:border-primary/50 transition-colors">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="bg-secondary text-foreground font-bold rounded-xl text-lg">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-bold text-foreground text-base">{member.name}</h3>
                <p className="text-lg text-primary font-medium mt-0.5">{member.role}</p>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{member.bio}</p>

              {/* Social links */}
              <div className="flex gap-2 pt-1">
                {member.twitter && (
                  <a
                    href={member.twitter}
                    aria-label={`${member.name} on Twitter`}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-200"
                  >
                    <Twitter className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    aria-label={`${member.name} on LinkedIn`}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-200"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
