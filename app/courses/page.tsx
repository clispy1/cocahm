"use client";

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Clock, Award, CheckCircle2 } from 'lucide-react';
import { COURSE_CATEGORIES } from '@/constants';

export default function Courses() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-brand-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-brand-primary font-medium tracking-widest text-xs uppercase mb-4 block">Academic Excellence</span>
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Our Programs & Courses</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            From comprehensive diplomas to intensive crash courses, our curriculum is designed to equip you with the practical skills and theoretical knowledge needed to thrive in the global hospitality industry.
          </p>
        </div>

        <div className="space-y-24">
          {COURSE_CATEGORIES.map((category, index) => (
            <motion.div 
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{category.title}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">{category.description}</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Award className="w-5 h-5 text-brand-primary" />
                    Available Courses
                  </h3>
                  <div className="space-y-4">
                    {category.courses.map(course => (
                      <div key={course.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-brand-primary/5 transition-colors">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" />
                          <span className="font-medium text-gray-900">{course.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-3 py-1 rounded-lg border border-gray-200">
                          <Clock className="w-3 h-3" />
                          {course.duration}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Link 
                  href={`/enroll?category=${category.id}`} 
                  className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-opacity-90 transition-all shadow-lg shadow-brand-primary/30 group"
                >
                  Apply for this Program
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
