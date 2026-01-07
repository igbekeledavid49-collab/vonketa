import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 3000);
    }
  };

  return (
    <section className="section-spacing bg-gradient-to-r from-navy to-blue-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-2xl mb-6">
            <Mail style={{ width: '32px', height: '32px' }} className="text-gold" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Stay Informed with Financial Insights
          </h2>
          
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for expert tips, industry updates, and exclusive resources to help you make smarter financial decisions.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:border-gold focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gold text-navy font-semibold rounded-xl hover:bg-gold/90 transition-all duration-300 hover:scale-105"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-white/70 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          ) : (
            <div className="max-w-md mx-auto bg-green-500/20 backdrop-blur-sm border-2 border-green-500/50 rounded-xl p-6 flex items-center justify-center gap-3">
              <CheckCircle style={{ width: '24px', height: '24px' }} className="text-green-400" />
              <span className="text-lg font-semibold">Thank you for subscribing!</span>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-gold mb-1">Weekly</div>
              <div className="text-sm text-white/80">Newsletter</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold mb-1">10,000+</div>
              <div className="text-sm text-white/80">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold mb-1">100%</div>
              <div className="text-sm text-white/80">Free</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}