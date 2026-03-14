import React from 'react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-(--color-primary) text-(--color-text-light) mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">About NaijaProvisions</h3>
            <p className="text-(--color-accent-light) leading-relaxed">
              Your trusted source for quality rice, beans, yams, and groceries. 
              We bring fresh provisions straight from local farmers to your doorstep.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <p className="text-(--color-accent-light)">
                  123 Market Street, Ikeja, Lagos, Nigeria
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="flex-shrink-0" />
                <p className="text-(--color-accent-light)">+234 801 234 5678</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="flex-shrink-0" />
                <p className="text-(--color-accent-light)">info@naijaprovisions.com</p>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4">Business Hours</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <Clock size={20} className="mt-1 flex-shrink-0" />
                <div className="text-(--color-accent-light)">
                  <p className="font-semibold">Monday - Saturday</p>
                  <p>8:00 AM - 8:00 PM</p>
                  <p className="font-semibold mt-2">Sunday</p>
                  <p>10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-(--color-primary-light) mt-8 pt-6 text-center">
          <p className="text-(--color-accent-light)">
            © {new Date().getFullYear()} NaijaProvisions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;