"use client";

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-brand-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-brand-primary font-medium tracking-widest text-xs uppercase mb-4 block">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Have questions about our programs, admissions, or campus? We're here to help. Reach out to us using the details below or send us a message directly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex gap-6 items-start">
              <div className="bg-brand-primary/10 p-4 rounded-2xl shrink-0">
                <MapPin className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold mb-2">Visit Our Campus</h3>
                <p className="text-gray-600 leading-relaxed">
                  Abavana Junction,<br />
                  Towards Maamobi Hospital,<br />
                  Accra, Ghana
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex gap-6 items-start">
              <div className="bg-brand-primary/10 p-4 rounded-2xl shrink-0">
                <Phone className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold mb-2">Call Us</h3>
                <div className="space-y-2 text-gray-600">
                  <p>+233 (0)24 286 9439</p>
                  <p>+233 (0)24 370 8575</p>
                  <p>+233 (0)50 230 0165</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex gap-6 items-start">
              <div className="bg-brand-primary/10 p-4 rounded-2xl shrink-0">
                <Mail className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold mb-2">Email Us</h3>
                <p className="text-gray-600">info@cocahm.com</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex gap-6 items-start">
              <div className="bg-brand-primary/10 p-4 rounded-2xl shrink-0">
                <Clock className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold mb-2">Office Hours</h3>
                <p className="text-gray-600">Monday - Friday: 8:00 AM - 5:00 PM</p>
                <p className="text-gray-600">Saturday: 9:00 AM - 2:00 PM</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-serif font-bold mb-8">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" placeholder="john@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" placeholder="How can we help?" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea rows={5} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all resize-none" placeholder="Your message here..."></textarea>
              </div>

              <button type="button" className="w-full bg-brand-primary text-white py-4 rounded-xl font-medium text-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/30">
                Send Message
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Map Placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl overflow-hidden shadow-lg h-96 bg-gray-200 relative"
        >
          <img 
            src="https://picsum.photos/seed/map/1200/600" 
            alt="Map location" 
            className="w-full h-full object-cover opacity-50 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white px-8 py-4 rounded-full shadow-xl flex items-center gap-3 font-medium text-gray-900">
              <MapPin className="text-brand-primary" />
              CoCAHM Campus, Accra
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
