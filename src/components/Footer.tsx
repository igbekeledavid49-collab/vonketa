export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Tax Preparation', href: '#services' },
      { name: 'Financial Auditing', href: '#services' },
      { name: 'Business Advisory', href: '#services' },
      { name: 'Payroll Management', href: '#services' },
      { name: 'Bookkeeping', href: '#services' },
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Internship Program', href: '#internship' },
      { name: 'Testimonials', href: '#testimonials' },
      { name: 'Contact', href: '#contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ],
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: 'linkedin', href: '#' },
    { name: 'Twitter', icon: 'twitter', href: '#' },
    { name: 'Facebook', icon: 'facebook', href: '#' },
  ];

  return (
    <footer className="bg-navy text-white">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
                <span className="text-navy text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>V</span>
              </div>
              <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Vonketa</span>
            </div>
            <p className="text-gray-300 mb-6">
              Your trusted partner for comprehensive accounting and financial advisory services.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold hover:text-navy transition-colors duration-300"
                  aria-label={social.name}
                >
                  <span className="text-lg font-bold">{social.icon[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold" style={{ fontFamily: 'var(--font-heading)' }}>
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold" style={{ fontFamily: 'var(--font-heading)' }}>
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold" style={{ fontFamily: 'var(--font-heading)' }}>
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              © {currentYear} Vonketa Financial Services. All rights reserved.
            </p>
            <p>
              Designed with <span className="text-gold">♥</span> for financial excellence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}