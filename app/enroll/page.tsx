"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { COURSE_CATEGORIES } from '@/constants';

function EnrollmentForm() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  // Conditional field states
  const [requiresHostel, setRequiresHostel] = useState<boolean | null>(null);
  const [hasExperience, setHasExperience] = useState<boolean | null>(null);
  const [hasDisability, setHasDisability] = useState<boolean | null>(null);
  const [hasAllergy, setHasAllergy] = useState<boolean | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const activeCategory = COURSE_CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-brand-bg">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-brand-primary font-medium tracking-widest text-xs uppercase mb-4 block">Admissions</span>
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Enrollment Application</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take the first step towards your culinary career. Please fill out the form below, and our admissions team will contact you shortly.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
        >
          <form className="space-y-12">
            {/* 1. Personal Details */}
            <section>
              <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <span className="bg-brand-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                Personal Details
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Surname</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Other Names</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input type="date" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Place of Birth</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all bg-white">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Residential Address</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Name</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact (Name & Number)</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" />
                </div>
              </div>

              <h4 className="font-medium text-gray-900 mt-8 mb-4">Guardian Information</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guardian's Name</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guardian's Number</label>
                  <input type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guardian's Residence</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" />
                </div>
              </div>
            </section>

            {/* 2. Course Selection (Option A: Kept from previous structure) */}
            <section>
              <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <span className="bg-brand-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                Program Selection
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Select a Program Category</label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {COURSE_CATEGORIES.map(category => (
                      <label 
                        key={category.id} 
                        className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${selectedCategory === category.id ? 'border-brand-primary bg-brand-primary/5' : 'border-gray-200 hover:border-brand-primary/50'}`}
                      >
                        <input 
                          type="radio" 
                          name="category" 
                          value={category.id}
                          checked={selectedCategory === category.id}
                          onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setSelectedCourse('');
                          }}
                          className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300"
                        />
                        <span className="ml-3 font-medium text-gray-900">{category.title}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {activeCategory && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-4 border-t border-gray-100"
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-4">Select Specific Course & Duration</label>
                    <div className="space-y-3">
                      {activeCategory.courses.map(course => (
                        <label 
                          key={course.id} 
                          className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${selectedCourse === course.id ? 'border-brand-primary bg-brand-primary/5' : 'border-gray-200 hover:border-brand-primary/50'}`}
                        >
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              name="course" 
                              value={course.id}
                              checked={selectedCourse === course.id}
                              onChange={(e) => setSelectedCourse(e.target.value)}
                              className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300"
                            />
                            <span className="ml-3 font-medium text-gray-900">{course.name}</span>
                          </div>
                          <span className="text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                            {course.duration}
                          </span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </section>

            {/* 3. Accommodation */}
            <section>
              <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <span className="bg-brand-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                Accommodation
              </h3>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <label className="block text-sm font-medium text-gray-900 mb-3">Do you require hostel accommodation?</label>
                <p className="text-sm text-gray-500 mb-4">Hostel facilities are available for students who wish to stay on campus (billed per 3 months).</p>
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="requiresHostel" checked={requiresHostel === true} onChange={() => setRequiresHostel(true)} className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300" />
                    <span className="ml-2 text-gray-700">Yes, I need a hostel</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="requiresHostel" checked={requiresHostel === false} onChange={() => setRequiresHostel(false)} className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300" />
                    <span className="ml-2 text-gray-700">No, I will commute from home</span>
                  </label>
                </div>
              </div>
            </section>

            {/* 4. Educational Background */}
            <section>
              <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <span className="bg-brand-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">4</span>
                Educational Background
              </h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last School Attended</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" />
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <label className="block text-sm font-medium text-gray-900 mb-3">Do you have prior experience / education related to culinary arts?</label>
                <div className="flex gap-6 mb-4">
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="hasExperience" checked={hasExperience === true} onChange={() => setHasExperience(true)} className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300" />
                    <span className="ml-2 text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="hasExperience" checked={hasExperience === false} onChange={() => setHasExperience(false)} className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300" />
                    <span className="ml-2 text-gray-700">No</span>
                  </label>
                </div>
                {hasExperience && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">If Yes, state:</label>
                    <textarea rows={2} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"></textarea>
                  </motion.div>
                )}
              </div>
            </section>

            {/* 5. Medical History */}
            <section>
              <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <span className="bg-brand-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">5</span>
                Medical History
              </h3>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <label className="block text-sm font-medium text-gray-900 mb-3">Do you have any disabilities?</label>
                  <div className="flex gap-6 mb-4">
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" name="hasDisability" checked={hasDisability === true} onChange={() => setHasDisability(true)} className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300" />
                      <span className="ml-2 text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" name="hasDisability" checked={hasDisability === false} onChange={() => setHasDisability(false)} className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300" />
                      <span className="ml-2 text-gray-700">No</span>
                    </label>
                  </div>
                  {hasDisability && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">If Yes, state:</label>
                      <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" />
                    </motion.div>
                  )}
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <label className="block text-sm font-medium text-gray-900 mb-3">Do you have any allergies?</label>
                  <div className="flex gap-6 mb-4">
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" name="hasAllergy" checked={hasAllergy === true} onChange={() => setHasAllergy(true)} className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300" />
                      <span className="ml-2 text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" name="hasAllergy" checked={hasAllergy === false} onChange={() => setHasAllergy(false)} className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300" />
                      <span className="ml-2 text-gray-700">No</span>
                    </label>
                  </div>
                  {hasAllergy && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">If Yes, state:</label>
                      <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" />
                    </motion.div>
                  )}
                </div>
              </div>
            </section>

            {/* 6. Declaration */}
            <section className="pt-6 border-t border-gray-200">
              <h3 className="text-xl font-serif font-bold mb-6 text-center">Declaration</h3>
              <div className="bg-brand-primary/5 p-6 rounded-xl border border-brand-primary/20">
                <label className="flex items-start gap-4 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-5 h-5 text-brand-primary focus:ring-brand-primary border-gray-300 rounded" required />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    I certify that all the information I have provided on this application form is complete and accurate. I further understand that any misrepresentation or material omission on this form may make me ineligible for admission or dismissal at College of Culinary Arts and Hospitality Management. Furthermore, I will abide by all the policies and regulations of the institution.
                  </span>
                </label>
              </div>
            </section>

            <div className="pt-6">
              <button type="button" className="w-full bg-brand-primary text-white py-4 rounded-xl font-medium text-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/30">
                Submit Application
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default function Enrollment() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <EnrollmentForm />
    </Suspense>
  );
}
