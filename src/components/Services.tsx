import React, { useState } from 'react';
import { Receipt, FileSearch, BarChart3, Wallet, Calculator, X } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Services() {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const { ref: sectionRef, className: sectionClass } = useScrollAnimation({
    animationType: 'fade-in',
    threshold: 0.1,
  });

  const services = [
    {
      icon: Receipt,
      title: 'Tax Preparation',
      description: 'Comprehensive tax planning and preparation services to maximize your deductions and ensure compliance with all regulations.',
      detailedDescription: 'Our tax preparation services include individual and business tax returns, tax planning strategies, and year-round advisory to minimize your tax liability. We stay updated with the latest tax laws and regulations to ensure your compliance and maximize your savings.',
      features: ['Individual & Business Tax Returns', 'Tax Planning & Strategy', 'Year-round Tax Advisory', 'IRS Audit Support'],
    },
    {
      icon: FileSearch,
      title: 'Financial Auditing',
      description: 'Thorough financial audits conducted by certified professionals to ensure accuracy and regulatory compliance.',
      detailedDescription: 'Our financial auditing services provide independent verification of your financial statements, ensuring accuracy and compliance with accounting standards. We help identify potential issues and provide recommendations for improvement.',
      features: ['Financial Statement Audits', 'Compliance Reviews', 'Internal Control Assessment', 'Risk Management'],
    },
    {
      icon: BarChart3,
      title: 'Business Advisory',
      description: 'Strategic business consulting to help you make informed decisions and achieve sustainable growth.',
      detailedDescription: 'Our business advisory services cover strategic planning, financial modeling, and operational improvements. We work closely with you to develop growth strategies and optimize your business operations for long-term success.',
      features: ['Strategic Planning', 'Financial Modeling', 'Operational Optimization', 'Growth Strategy Development'],
    },
    {
      icon: Wallet,
      title: 'Payroll Management',
      description: 'Efficient payroll processing services that ensure timely and accurate compensation for your employees.',
      detailedDescription: 'We handle all aspects of payroll processing, including wage calculations, tax withholdings, and compliance reporting. Our automated systems ensure accuracy and timeliness while you focus on growing your business.',
      features: ['Automated Payroll Processing', 'Tax Compliance', 'Employee Benefits Administration', 'Payroll Reporting'],
    },
    {
      icon: Calculator,
      title: 'Bookkeeping',
      description: 'Detailed bookkeeping services to maintain accurate financial records and insights for your business.',
      detailedDescription: 'Our bookkeeping services ensure your financial records are accurate and up-to-date. We provide detailed financial reports and insights to help you make informed business decisions and maintain compliance.',
      features: ['Transaction Recording', 'Financial Reporting', 'Account Reconciliation', 'Monthly Financial Statements'],
    },
  ];

  const openModal = (index: number) => {
    setSelectedService(index);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <section id="services" className={`section-spacing bg-white ${sectionClass}`} ref={sectionRef}>
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive accounting and financial solutions designed to meet your unique business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const { ref: cardRef, className: cardClass } = useScrollAnimation({
              animationType: index % 2 === 0 ? 'slide-in-left' : 'slide-in-right',
              threshold: 0.1,
              delay: index * 100,
            });

            return (
              <div
                key={index}
                ref={cardRef}
                className={`card-hover bg-white border-2 border-gray-200 rounded-2xl p-8 group cursor-pointer ${cardClass}`}
                onClick={() => openModal(index)}
              >
                <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-300">
                  <Icon style={{ width: '32px', height: '32px' }} className="text-navy group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="text-xl font-bold text-navy mb-4 heading-accent" style={{ fontFamily: 'var(--font-heading)' }}>
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                <div className="inline-flex items-center mt-6 text-gold font-semibold group-hover:text-navy transition-colors duration-300">
                  Learn More
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal */}
        {selectedService !== null && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center">
                      {React.createElement(services[selectedService].icon, { width: '32px', height: '32px', className: 'text-navy' })}
                    </div>
                    <h3 className="text-2xl font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>
                      {services[selectedService].title}
                    </h3>
                  </div>
                  <button
                    onClick={closeModal}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X style={{ width: '20px', height: '20px' }} className="text-gray-600" />
                  </button>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {services[selectedService].detailedDescription}
                </p>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-navy mb-4">Key Features:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {services[selectedService].features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gold rounded-full flex-shrink-0"></div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#contact" className="btn-primary text-center" onClick={closeModal}>
                    Get Started
                  </a>
                  <button
                    onClick={closeModal}
                    className="btn-secondary text-center"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
