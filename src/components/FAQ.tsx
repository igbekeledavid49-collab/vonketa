import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What services does Vonketa provide?',
      answer: 'We offer comprehensive accounting services including tax preparation, financial auditing, business advisory, payroll management, and bookkeeping. Our certified professionals work with businesses of all sizes to provide tailored financial solutions.',
    },
    {
      question: 'How much does a consultation cost?',
      answer: 'Your first 30-minute consultation is completely free! This gives us an opportunity to understand your needs and explain how our services can benefit your business. After that, we offer flexible pricing packages based on your specific requirements.',
    },
    {
      question: 'What are the requirements for the internship program?',
      answer: 'We accept students and recent graduates aged 18-25 who are pursuing or have completed a degree in Accounting or Finance. You should have strong analytical skills, proficiency in Excel, and a commitment to our 3-6 month program duration.',
    },
    {
      question: 'Do you work with small businesses?',
      answer: 'Absolutely! We work with businesses of all sizes, from startups and small businesses to large corporations. Our services are scalable and customized to meet the unique needs of each client, regardless of size.',
    },
    {
      question: 'How quickly can I get started?',
      answer: 'You can book a consultation immediately through our contact form. After our initial meeting, most clients are fully onboarded within 1-2 weeks, depending on the complexity of their accounting needs.',
    },
    {
      question: 'Are your accountants certified?',
      answer: 'Yes, all our accountants are certified professionals with credentials including CPA (Certified Public Accountant), CFA (Chartered Financial Analyst), and CA (Chartered Accountant). We maintain the highest professional standards.',
    },
  ];

  return (
    <section className="section-spacing bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find answers to common questions about our services and processes
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden transition-all duration-300 hover:border-gold/50"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-navy pr-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  {faq.question}
                </span>
                <ChevronDown
                  style={{ width: '20px', height: '20px' }}
                  className={`text-gold flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}