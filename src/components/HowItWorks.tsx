import React from 'react';
import { Search, MessageCircle, Package } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Search,
      title: 'Browse Products',
      description: 'Explore our fresh selection of rice, beans, yams, and groceries',
    },
    {
      icon: MessageCircle,
      title: 'Order on WhatsApp',
      description: 'Click "Order via WhatsApp" and send us your order details',
    },
    {
      icon: Package,
      title: 'Receive Delivery',
      description: 'Get your fresh provisions delivered to your doorstep',
    },
  ];

  return (
    <section className="bg-(--color-bg-secondary) py-12 px-4 rounded-(--radius-lg) shadow-md mb-12">
      <h2 className="text-3xl font-bold text-center text-(--color-primary) mb-8">
        How It Works
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-(--color-accent-light) mb-4">
              <step.icon size={32} color="var(--color-primary)" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-(--color-text) mb-2">
              {step.title}
            </h3>
            <p className="text-(--color-text-secondary)">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;