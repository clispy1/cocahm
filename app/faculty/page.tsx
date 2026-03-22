"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import { ChefHat, Award, Instagram, Twitter } from 'lucide-react';

const FACULTY = [
  {
    id: 'chef-kwame',
    name: 'Chef Kwame Osei',
    role: 'Executive Culinary Director',
    specialty: 'Contemporary African Cuisine',
    bio: 'With over 20 years of experience in Michelin-starred restaurants across Europe and Africa, Chef Kwame brings a wealth of global knowledge to CoCAHM. He is passionate about elevating local ingredients using classic French techniques.',
    image: 'https://picsum.photos/seed/chef1/600/800',
    awards: ['Best Chef West Africa 2024', 'City & Guilds Master Craftsman']
  },
  {
    id: 'chef-sarah',
    name: 'Chef Sarah Mensah',
    role: 'Head Pastry Chef',
    specialty: 'Advanced Sugarcraft & Patisserie',
    bio: 'Chef Sarah trained in Paris and has worked as the executive pastry chef for top luxury hotels in Accra. Her intricate sugar flowers and wedding cake designs have been featured in numerous international magazines.',
    image: 'https://picsum.photos/seed/chef2/600/800',
    awards: ['Gold Medalist - African Pastry Cup']
  },
  {
    id: 'chef-david',
    name: 'Chef David Appiah',
    role: 'Lead Instructor - Professional Cookery',
    specialty: 'International Cuisine & Kitchen Management',
    bio: 'A former executive chef for a major international cruise line, Chef David excels in high-volume, high-quality food production. He focuses on teaching students the rigorous discipline and management skills required in commercial kitchens.',
    image: 'https://picsum.photos/seed/chef3/600/800',
    awards: ['Hospitality Excellence Award 2023']
  },
  {
    id: 'mrs-abena',
    name: 'Mrs. Abena Yeboah',
    role: 'Director of Event Management',
    specialty: 'Event Logistics & Floral Design',
    bio: 'Mrs. Yeboah has orchestrated some of the most high-profile corporate events and luxury weddings in Ghana. She brings her extensive network and practical business acumen to the Décor & Event Management program.',
    image: 'https://picsum.photos/seed/chef4/600/800',
    awards: ['Event Planner of the Year 2025']
  }
];

export default function Faculty() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-brand-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-brand-primary font-medium tracking-widest text-xs uppercase mb-4 block">Our Experts</span>
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Meet the Faculty</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Learn from industry veterans. Our instructors are award-winning chefs, master bakers, and hospitality leaders dedicated to your success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {FACULTY.map((member) => (
            <div key={member.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col sm:flex-row group">
              <div className="sm:w-2/5 relative h-80 sm:h-auto overflow-hidden">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="sm:w-3/5 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-brand-primary mb-2">
                  <ChefHat className="w-5 h-5" />
                  <span className="font-medium text-sm uppercase tracking-wider">{member.specialty}</span>
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-1">{member.name}</h2>
                <p className="text-gray-500 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>
                
                <div className="space-y-2 mb-6">
                  {member.awards.map((award, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <Award className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{award}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto">
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-brand-primary hover:text-white transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-brand-primary hover:text-white transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
