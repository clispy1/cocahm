"use client";

import React, { useEffect } from 'react';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { EVENTS } from '@/constants';

export default function Events() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-brand-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-brand-primary font-medium tracking-widest text-xs uppercase mb-4 block">What's Happening</span>
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Upcoming Events</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay connected with the CoCAHM community. Join us for masterclasses, exhibitions, open houses, and special culinary events.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {EVENTS.map((event, index) => (
            <div
              key={event.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-200/50 group flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm">
                  <div className="text-brand-primary font-bold text-lg leading-none">
                    {event.date.includes(',') ? event.date.split(' ')[1].replace(',', '') : event.date.split(' ')[0]}
                  </div>
                  <div className="text-gray-600 text-xs font-medium uppercase tracking-wider">
                    {event.date.includes(',') ? event.date.split(' ')[0].substring(0, 3) : event.date.split(' ')[1].substring(0, 3)}
                  </div>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-serif font-bold mb-4 group-hover:text-brand-primary transition-colors">
                  {event.title}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-brand-primary shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-brand-primary shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
                  {event.description}
                </p>
                
                <button className="flex items-center gap-2 text-brand-primary font-medium group/btn mt-auto">
                  Register Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
