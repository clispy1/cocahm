"use client";

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { GALLERY_IMAGES } from '@/constants';

export default function StudentLife() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-brand-primary font-medium tracking-widest text-xs uppercase mb-4 block">Campus Experience</span>
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Student Life at CoCAHM</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Life at CoCAHM is vibrant, challenging, and deeply rewarding. Beyond the kitchens and classrooms, our students build lifelong friendships, network with industry leaders, and immerse themselves in the rich culinary culture of Ghana.
          </p>
        </div>

        {/* Highlight Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-serif font-bold">A Community of Creators</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              When you join CoCAHM, you join a family of passionate food enthusiasts. Our campus is a melting pot of ideas where traditional Ghanaian recipes meet modern international techniques.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              From intense practical sessions in our state-of-the-art kitchens to collaborative event planning projects, every day is an opportunity to learn, create, and grow alongside your peers.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <img src="https://picsum.photos/seed/student1/400/500" alt="Students cooking" className="rounded-2xl w-full h-full object-cover" referrerPolicy="no-referrer" />
            <img src="https://picsum.photos/seed/student2/400/500" alt="Students plating" className="rounded-2xl w-full h-full object-cover mt-8" referrerPolicy="no-referrer" />
          </motion.div>
        </div>

        {/* Gallery Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Campus Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`relative overflow-hidden rounded-2xl group ${index === 0 || index === 3 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <img 
                  src={img} 
                  alt={`Student Life ${index}`} 
                  className="w-full h-full object-cover aspect-square group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
