import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function About() {

  const values = [
    {
      title: 'Integrity',
      description: 'We uphold the highest ethical standards in all our professional relationships.',
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in every service we provide to our clients.',
    },
    {
      title: 'Client-Focused',
      description: 'Your success is our priority. We tailor our services to meet your unique needs.',
    },
    {
      title: 'Innovation',
      description: 'We leverage the latest technology and best practices to deliver optimal results.',
    },
  ];

  const { ref: sectionRef, className: sectionClass } = useScrollAnimation({
    animationType: 'fade-in',
    threshold: 0.1,
  });

  return (
    <section id="about" className={`section-spacing bg-white ${sectionClass}`} ref={sectionRef}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-navy/5 rounded-full">
              <span className="text-navy font-semibold text-sm">About Vonketa</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>
              Building Trust Through Excellence
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Founded on the principles of integrity and client-focused service, Vonketa has grown to become a trusted partner for businesses seeking comprehensive accounting and financial advisory solutions.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our team of certified professionals brings decades of combined experience across various industries. We understand that every business is unique, which is why we take a personalized approach to each client relationship, ensuring that our services align perfectly with your specific needs and goals.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              {values.map((value, index) => {
                const { ref: valueRef, className: valueClass } = useScrollAnimation({
                  animationType: 'slide-in-up',
                  threshold: 0.1,
                  delay: index * 150,
                });

                return (
                  <div
                    key={index}
                    ref={valueRef}
                    className={`space-y-2 ${valueClass}`}
                  >
                  <h3 className="text-xl font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {value.description}
                  </p>
                </div>
                );
              })}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/8297447/pexels-photo-8297447.jpeg"
                alt="Two colleagues discussing work in a bright, modern office environment - Mikhail Nilov on Pexels"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold/20 rounded-2xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-navy/10 rounded-2xl -z-10"></div>

            {/* Stats overlay */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>50+</div>
                  <div className="text-xs text-gray-600">Team Members</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>15+</div>
                  <div className="text-xs text-gray-600">Years of Service</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>100%</div>
                  <div className="text-xs text-gray-600">Certified CPAs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}