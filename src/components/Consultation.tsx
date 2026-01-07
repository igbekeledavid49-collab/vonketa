export default function Consultation() {
  return (
    <section className="section-spacing bg-gradient-to-r from-gold/10 to-gold/5">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left Side - Image */}
              <div className="relative h-64 md:h-auto">
                <img
                  src="https://images.pexels.com/photos/8068654/pexels-photo-8068654.jpeg"
                  alt="Business consulting meeting with professionals discussing financial documents - RDNE Stock project on Pexels"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    Let's Discuss Your Business
                  </h3>
                  <p className="text-gray-200">
                    Get expert advice tailored to your needs
                  </p>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <div className="inline-block px-4 py-2 bg-gold/10 rounded-full mb-4">
                    <span className="text-gold font-semibold text-sm">Free Consultation</span>
                  </div>
                  <h2 className="text-3xl font-bold text-navy mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    Book Your Free 30-Minute Consultation
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Schedule a complimentary consultation with our accounting experts. We'll discuss your business challenges and explore how our services can help you achieve your financial goals.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-gold font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">No obligation or commitment required</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-gold font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">Expert guidance from certified professionals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-gold font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">Personalized recommendations for your business</span>
                  </div>
                </div>

                <a href="#contact" className="btn-primary text-center">
                  Schedule Your Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}