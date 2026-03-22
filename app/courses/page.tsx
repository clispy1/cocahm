"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Award, CheckCircle2, ChevronDown, Download, Briefcase, BookOpen } from 'lucide-react';
import { COURSE_CATEGORIES } from '@/constants';
import { motion, AnimatePresence } from 'motion/react';

export default function Courses() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filters = [
    { id: 'all', label: 'All Programs' },
    ...COURSE_CATEGORIES.map(c => ({ id: c.id, label: c.title.split(' (')[0] }))
  ];

  const filteredCategories = activeFilter === 'all' 
    ? COURSE_CATEGORIES 
    : COURSE_CATEGORIES.filter(c => c.id === activeFilter);

  const toggleAccordion = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-brand-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-brand-primary font-medium tracking-widest text-xs uppercase mb-4 block">Academic Excellence</span>
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Our Programs & Courses</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            From comprehensive diplomas to intensive crash courses, our curriculum is designed to equip you with the practical skills and theoretical knowledge needed to thrive in the global hospitality industry.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.id 
                  ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="space-y-24">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category, index) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                key={category.id}
                className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-start`}
              >
                <div className="w-full lg:w-1/2 sticky top-32">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                    <img 
                      src={category.image} 
                      alt={category.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  
                  {/* Lead Magnet */}
                  <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">Want the full details?</h4>
                      <p className="text-sm text-gray-500">Get the complete syllabus and fee structure.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                      <Download className="w-4 h-4" />
                      Syllabus
                    </button>
                  </div>
                </div>
                
                <div className="w-full lg:w-1/2 space-y-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{category.title}</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">{category.description}</p>
                  </div>

                  {/* Expandable Curriculum & Outcomes */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <button 
                      onClick={() => toggleAccordion(category.id)}
                      className="w-full px-8 py-6 flex items-center justify-between bg-gray-50/50 hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                        <BookOpen className="w-5 h-5 text-brand-primary" />
                        Curriculum & Career Outcomes
                      </h3>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${expandedCategory === category.id ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {expandedCategory === category.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-8 border-t border-gray-100 grid sm:grid-cols-2 gap-8">
                            <div>
                              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                                What You'll Learn
                              </h4>
                              <ul className="space-y-3">
                                {category.curriculum?.map((item, i) => (
                                  <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/50 mt-1.5 shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-brand-primary" />
                                Career Paths
                              </h4>
                              <ul className="space-y-3">
                                {category.careerOutcomes?.map((item, i) => (
                                  <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/50 mt-1.5 shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
                    href={`/courses/${category.id}`} 
                    className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-opacity-90 transition-all shadow-lg shadow-brand-primary/30 group w-full sm:w-auto"
                  >
                    View Program Details
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
