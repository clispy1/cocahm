"use client";

import React, { useEffect } from 'react';
import { GALLERY_IMAGES } from '@/constants';
import { motion } from 'motion/react';
import { Trophy, Clock, Coffee, BookOpen, ChefHat, Utensils } from 'lucide-react';

export default function StudentLife() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dailySchedule = [
    { time: "08:00 AM", title: "Morning Prep", desc: "Arrive at the kitchen, don uniforms, and prep stations for the day's practicals.", icon: <Coffee className="w-6 h-6 text-orange-500" /> },
    { time: "09:00 AM", title: "Theory & Demo", desc: "Instructors demonstrate techniques and discuss the science behind the recipes.", icon: <BookOpen className="w-6 h-6 text-blue-500" /> },
    { time: "11:00 AM", title: "Practical Session", desc: "Hands-on cooking in the Hot Kitchen or Pastry Lab under expert supervision.", icon: <ChefHat className="w-6 h-6 text-brand-primary" /> },
    { time: "02:00 PM", title: "Tasting & Critique", desc: "Plating the final dishes followed by constructive feedback from chefs.", icon: <Utensils className="w-6 h-6 text-green-500" /> },
  ];

  const awards = [
    { year: "2023", title: "National Culinary Challenge", award: "Gold Medalist", desc: "Our student team won first place for their innovative fusion of traditional Ghanaian ingredients with French techniques." },
    { year: "2022", title: "West African Pastry Cup", award: "Best Sugar Showpiece", desc: "Awarded for exceptional skill and creativity in sugar crafting and chocolate work." },
    { year: "2021", title: "Young Chef Olympiad", award: "Top 10 Finalist", desc: "Represented Ghana on the global stage, competing against culinary students from over 50 countries." }
  ];

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-white text-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-brand-primary font-medium tracking-widest text-xs uppercase mb-4 block">Campus Experience</span>
          <h1 className="text-4xl md:text-5xl font-serif mb-6 text-gray-950">Student Life at CoCAHM</h1>
          <p className="text-gray-800 max-w-2xl mx-auto text-lg leading-relaxed">
            Life at CoCAHM is vibrant, challenging, and deeply rewarding. Beyond the kitchens and classrooms, our students build lifelong friendships, network with industry leaders, and immerse themselves in the rich culinary culture of Ghana.
          </p>
        </div>

        {/* Highlight Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-serif font-bold text-gray-950">A Community of Creators</h2>
            <p className="text-gray-800 leading-relaxed text-lg">
              When you join CoCAHM, you join a family of passionate food enthusiasts. Our campus is a melting pot of ideas where traditional Ghanaian recipes meet modern international techniques.
            </p>
            <p className="text-gray-800 leading-relaxed text-lg">
              From intense practical sessions in our state-of-the-art kitchens to collaborative event planning projects, every day is an opportunity to learn, create, and grow alongside your peers.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <img src="https://picsum.photos/seed/student1/400/500" alt="Students cooking" className="rounded-2xl w-full h-full object-cover" referrerPolicy="no-referrer" />
            <img src="https://picsum.photos/seed/student2/400/500" alt="Students plating" className="rounded-2xl w-full h-full object-cover mt-8" referrerPolicy="no-referrer" />
          </motion.div>
        </div>

        {/* A Typical Day */}
        <div className="mb-24 bg-brand-bg rounded-3xl p-8 md:p-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4 text-gray-950">A Day in the Life</h2>
            <p className="text-gray-800 max-w-2xl mx-auto">Experience the rhythm of a culinary student. Every day brings new challenges, flavors, and opportunities to perfect your craft.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
            {dailySchedule.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 shadow-inner">
                  {item.icon}
                </div>
                <span className="text-brand-primary font-bold text-sm mb-2">{item.time}</span>
                <h3 className="font-serif font-bold text-lg mb-2 text-gray-950">{item.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Competitions & Awards */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:w-1/3"
            >
              <div className="bg-brand-primary text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute -right-10 -top-10 opacity-10">
                  <Trophy className="w-64 h-64" />
                </div>
                <Trophy className="w-12 h-12 mb-6 text-orange-300" />
                <h2 className="text-3xl font-serif font-bold mb-4 text-white">Excellence Recognized</h2>
                <p className="text-white/90 leading-relaxed">
                  Our students consistently demonstrate their mastery at national and international culinary competitions, bringing home accolades that speak to the quality of our training.
                </p>
              </div>
            </motion.div>
            
            <div className="md:w-2/3 space-y-6">
              {awards.map((award, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6 items-start"
                >
                  <div className="bg-orange-50 text-orange-600 font-bold px-4 py-2 rounded-lg shrink-0">
                    {award.year}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl mb-1 text-gray-950">{award.title}</h3>
                    <span className="inline-block text-brand-primary font-medium text-sm mb-3">{award.award}</span>
                    <p className="text-gray-800 leading-relaxed">{award.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-center mb-12 text-gray-950">Campus Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-2xl group bg-gray-100"
            >
              <img 
                src="/6_556a25cfb5d4c1a0c5fa5912deb0c5f70f622d3b-3975x5963.jpg" 
                alt="Student Life Featured" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
            {GALLERY_IMAGES.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`relative overflow-hidden rounded-2xl group bg-gray-100 ${index === 0 || index === 3 ? 'md:col-span-2 md:row-span-2' : ''}`}
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
