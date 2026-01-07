import { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Internship() {
  const [expandedRequirements, setExpandedRequirements] = useState(false);

  const benefits = [
    'Hands-on experience with real client projects',
    'Mentorship from certified accounting professionals',
    'Exposure to industry-standard software and tools',
    'Professional development workshops and training',
    'Networking opportunities with industry leaders',
    'Potential for full-time employment upon completion',
  ];

  const requirements = [
    'Currently pursuing or recently completed degree in Accounting/Finance',
    'Age between 18-25 years',
    'Analytical and problem-solving skills',
    'Proficiency in Microsoft Excel and accounting software',
    'Excellent communication and teamwork abilities',
    'Commitment to 3-6 month program duration',
  ];

  const visibleRequirements = expandedRequirements ? requirements : requirements.slice(0, 3);

  const { ref: sectionRef, className: sectionClass } = useScrollAnimation({
    animationType: 'fade-in',
    threshold: 0.1,
  });

  return (
    <section id="internship" className={`section-spacing bg-gradient-to-br from-blue-900 to-blue-950 text-white relative overflow-hidden ${sectionClass}`} ref={sectionRef}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-gold/20 rounded-full">
              <span className="text-gold font-semibold text-sm">Career Development</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
              Launch Your Accounting Career
            </h2>
            
            <p className="text-lg text-white/95 leading-relaxed">
              Join our mentorship-driven internship program designed for aspiring accounting professionals. Gain practical experience, learn from industry experts, and build a strong foundation for your career.
            </p>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-gold" style={{ fontFamily: 'var(--font-heading)' }}>
                Program Benefits
              </h3>
              <div className="grid gap-3">
                {benefits.map((benefit, index) => {
                  const { ref: benefitRef, className: benefitClass } = useScrollAnimation({
                    animationType: 'slide-in-left',
                    threshold: 0.1,
                    delay: index * 100,
                  });

                  return (
                    <div key={index} ref={benefitRef} className={`flex items-start gap-3 ${benefitClass}`}>
                      <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check style={{ width: '16px', height: '16px' }} className="text-gold" />
                      </div>
                      <span className="text-white/90">{benefit}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <a href="#contact" className="btn-primary inline-block mt-8">
              Apply Now
            </a>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
              <h3 className="text-2xl font-bold mb-6 text-gold" style={{ fontFamily: 'var(--font-heading)' }}>
                Eligibility Requirements
              </h3>
              
              <div className="space-y-4">
                {visibleRequirements.map((requirement, index) => {
                  const { ref: reqRef, className: reqClass } = useScrollAnimation({
                    animationType: 'slide-in-right',
                    threshold: 0.1,
                    delay: index * 100,
                  });

                  return (
                    <div key={index} ref={reqRef} className={`flex items-start gap-3 ${reqClass}`}>
                      <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check style={{ width: '16px', height: '16px' }} className="text-gold" />
                      </div>
                      <span className="text-white/90">{requirement}</span>
                    </div>
                  );
                })}
                {requirements.length > 3 && (
                  <button
                    onClick={() => setExpandedRequirements(!expandedRequirements)}
                    className="flex items-center gap-2 text-gold hover:text-white transition-colors duration-300 mt-4"
                  >
                    <span className="text-sm font-medium">
                      {expandedRequirements ? 'Show Less' : `Show ${requirements.length - 3} More`}
                    </span>
                    {expandedRequirements ? (
                      <ChevronUp style={{ width: '16px', height: '16px' }} />
                    ) : (
                      <ChevronDown style={{ width: '16px', height: '16px' }} />
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="bg-gold/20 backdrop-blur-sm rounded-2xl p-8 border border-gold/40">
              <div className="text-center">
                <div className="text-5xl font-bold text-gold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  3-6
                </div>
                <div className="text-lg text-white/95">Month Program Duration</div>
                <div className="text-sm text-white/80 mt-2">
                  Applications accepted year-round
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}