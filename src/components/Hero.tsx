import AnimatedCounter from './AnimatedCounter';

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-gold/10 rounded-full">
              <span className="text-gold font-semibold text-sm">Trusted by over 200+ Businesses</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Expert Accounting Solutions for Your Success
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Professional accounting, financial advisory, and business consulting services tailored to help your business thrive in today's competitive landscape.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn-primary text-center">
                Book a Consultation
              </a>
              <a href="#internship" className="btn-secondary text-center">
                Apply for Internship
              </a>
            </div>

            {/* Stats with animated counters */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div>
                <AnimatedCounter end={15} suffix="+" />
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div>
                <AnimatedCounter end={500} suffix="+" />
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div>
                <AnimatedCounter end={98} suffix="%" />
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/6779571/pexels-photo-6779571.jpeg"
                alt="Professional accounting team working in modern office - Artem Podrez on Pexels"
                className="w-full h-auto object-cover"
              />
              
              {/* Floating card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
                    <span className="text-navy text-2xl font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-navy">Certified Professionals</div>
                    <div className="text-sm text-gray-600">CPA, CFA, and CA Experts</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}