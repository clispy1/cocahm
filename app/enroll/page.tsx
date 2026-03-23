"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ChevronRight, ChevronLeft, ChevronDown, CheckCircle2 } from 'lucide-react';

const PaystackButton = dynamic(() => import('@/components/PaystackButton'), { ssr: false });
import { motion, AnimatePresence } from 'motion/react';
import { client } from '@/sanity/lib/client';
import { allCategoriesQuery, allFaqsQuery } from '@/sanity/lib/queries';

function EnrollmentForm() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [paymentReference, setPaymentReference] = useState('');

  // Form data state
  const [formData, setFormData] = useState({
    surname: '',
    firstName: '',
    otherNames: '',
    dob: '',
    pob: '',
    gender: '',
    nationality: '',
    phone: '',
    email: '',
    address: '',
    emergencyContact: '',
    passportPicture: null as string | null,
    guardianName: '',
    guardianPhone: '',
    guardianResidence: '',
    lastSchool: '',
    educationLevel: '',
    programCategory: '',
    program: '',
    session: '',
    accommodation: '',
    referral: '',
    experience: '',
    experienceDetails: '',
    disability: '',
    disabilityDetails: '',
    allergies: '',
    allergyDetails: '',
  });

  // FAQ State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const onSuccess = (reference: any) => {
    setPaymentReference(reference.reference);
    submitEnrollment();
  };

  const onClose = () => {
    setIsSubmitting(false);
  };
  const [categories, setCategories] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedCategories, fetchedFaqs] = await Promise.all([
          client.fetch(allCategoriesQuery),
          client.fetch(allFaqsQuery)
        ]);
        setCategories(fetchedCategories || []);
        setFaqs(fetchedFaqs || []);
      } catch (error) {
        console.error("Error fetching Sanity data:", error);
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setFormData(prev => ({ ...prev, programCategory: categoryParam }));
      setCurrentStep(2); // Jump to course selection if category is pre-filled
    }
  }, [searchParams]);

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({ ...prev, passportPicture: reader.result as string }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const submitEnrollment = async () => {
    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, paymentReference }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full z-0"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-primary rounded-full z-0 transition-all duration-500"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            ></div>
            
            {[1, 2, 3].map(step => (
              <div key={step} className={`relative z-10 flex flex-col items-center justify-center w-10 h-10 rounded-full font-bold transition-colors duration-300 ${currentStep >= step ? 'bg-brand-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                {currentStep > step ? <CheckCircle2 className="w-5 h-5" /> : step}
                <span className={`absolute -bottom-8 text-xs font-medium whitespace-nowrap ${currentStep >= step ? 'text-brand-primary' : 'text-gray-500'}`}>
                  {step === 1 ? 'Personal' : step === 2 ? 'Program' : 'Background'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-24">
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Application Received!</h2>
              <p className="text-gray-600 max-w-md mx-auto mb-10 text-lg">
                Thank you for applying to CoCAHM, {formData.firstName}. Your application reference is <span className="font-mono font-bold text-brand-primary">#ADM-2026-{Math.floor(1000 + Math.random() * 9000)}</span>.
              </p>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 mb-10 text-left max-w-lg mx-auto">
                <h4 className="font-bold text-gray-900 mb-4">Next Steps:</h4>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                    <span>Our admissions team will review your details within 48 hours.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                    <span>You will receive an email with instructions for the entrance interview.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                    <span>Prepare your academic transcripts and identification documents.</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.location.href = '/'}
                  className="px-8 py-4 bg-brand-primary text-white rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-brand-primary/30"
                >
                  Return to Home
                </button>
                <button 
                  onClick={() => window.print()}
                  className="px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  Print Application
                </button>
              </div>
            </motion.div>
          ) : (
            <form className="space-y-8">
              
              {/* Step 1: Personal Details */}
              {currentStep === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-2xl font-serif font-bold mb-8 border-b border-gray-100 pb-4 text-gray-950">Personal Details</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">Surname</label>
                      <input required name="surname" value={formData.surname} onChange={handleInputChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-gray-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">First Name</label>
                      <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-gray-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">Other Names</label>
                      <input name="otherNames" value={formData.otherNames} onChange={handleInputChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-gray-900" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">Date of Birth</label>
                      <input required name="dob" value={formData.dob} onChange={handleInputChange} type="date" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-gray-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">Place of Birth</label>
                      <input required name="pob" value={formData.pob} onChange={handleInputChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-gray-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">Gender</label>
                      <select required name="gender" value={formData.gender} onChange={handleInputChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all bg-white text-gray-900">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">Nationality</label>
                      <input required name="nationality" value={formData.nationality} onChange={handleInputChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-gray-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">Phone Number</label>
                      <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-gray-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">Email</label>
                      <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-gray-900" />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-800 mb-2">Residential Address</label>
                      <input required name="address" value={formData.address} onChange={handleInputChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-gray-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">Emergency Contact</label>
                      <input required name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} type="text" placeholder="Name & Number" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-gray-900" />
                    </div>
                  </div>

                  <h4 className="font-medium text-gray-950 mt-8 mb-4">Guardian Information</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">Guardian's Name</label>
                      <input required name="guardianName" value={formData.guardianName} onChange={handleInputChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-gray-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">Guardian's Number</label>
                      <input required name="guardianPhone" value={formData.guardianPhone} onChange={handleInputChange} type="tel" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-gray-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">Guardian's Residence</label>
                      <input required name="guardianResidence" value={formData.guardianResidence} onChange={handleInputChange} type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-gray-900" />
                    </div>
                  </div>
                </motion.div>
              )}

            {/* Step 2: Course Selection & Accommodation */}
            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="text-2xl font-serif font-bold mb-8 border-b border-gray-100 pb-4">Program & Accommodation</h3>
                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Select a Program Category</label>
                    {isLoadingData ? (
                      <div className="animate-pulse flex space-x-4">
                        <div className="h-12 bg-gray-200 rounded-xl w-full"></div>
                        <div className="h-12 bg-gray-200 rounded-xl w-full"></div>
                      </div>
                    ) : (
                    <div className="grid md:grid-cols-2 gap-3">
                      {categories.map(category => (
                        <label 
                          key={category._id || category.id} 
                          className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.programCategory === (category._id || category.id) ? 'border-brand-primary bg-brand-primary/5' : 'border-gray-200 hover:border-brand-primary/50'}`}
                        >
                          <input 
                            type="radio" 
                            name="programCategory" 
                            value={category._id || category.id}
                            checked={formData.programCategory === (category._id || category.id)}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300"
                          />
                          <span className="ml-3 font-medium text-gray-900">{category.title}</span>
                        </label>
                      ))}
                    </div>
                    )}
                  </div>

                  {formData.programCategory && (
                    <div className="pt-4 border-t border-gray-100">
                      <label className="block text-sm font-medium text-gray-700 mb-4">Select Specific Course & Duration</label>
                      <div className="space-y-3">
                        {categories.find(c => (c._id || c.id) === formData.programCategory)?.courses?.map((course: any) => (
                          <label 
                            key={course._id || course.id} 
                            className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${formData.program === (course._id || course.id) ? 'border-brand-primary bg-brand-primary/5' : 'border-gray-200 hover:border-brand-primary/50'}`}
                          >
                            <div className="flex items-center">
                              <input 
                                type="radio" 
                                name="program" 
                                value={course._id || course.id}
                                checked={formData.program === (course._id || course.id)}
                                onChange={handleInputChange}
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
                    </div>
                  )}

                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-8">
                    <label className="block text-sm font-medium text-gray-900 mb-3">Do you require hostel accommodation?</label>
                    <p className="text-sm text-gray-500 mb-4">Hostel facilities are available for students who wish to stay on campus (billed per 3 months).</p>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <label className="flex items-center cursor-pointer">
                        <input type="radio" name="accommodation" value="yes" checked={formData.accommodation === 'yes'} onChange={handleInputChange} className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300" />
                        <span className="ml-2 text-gray-700">Yes, I need a hostel</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input type="radio" name="accommodation" value="no" checked={formData.accommodation === 'no'} onChange={handleInputChange} className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300" />
                        <span className="ml-2 text-gray-700">No, I will commute from home</span>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Background & Medical */}
            {currentStep === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="text-2xl font-serif font-bold mb-8 border-b border-gray-100 pb-4">Background & Medical</h3>
                
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last School Attended</label>
                      <input required name="lastSchool" value={formData.lastSchool} onChange={handleInputChange} type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-gray-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Level of Education</label>
                      <input required name="educationLevel" value={formData.educationLevel} onChange={handleInputChange} type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-gray-900" />
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <label className="block text-sm font-medium text-gray-900 mb-3">Do you have prior experience / education related to culinary arts?</label>
                    <div className="flex gap-6 mb-4">
                      <label className="flex items-center cursor-pointer">
                        <input type="radio" name="experience" value="yes" checked={formData.experience === 'yes'} onChange={handleInputChange} className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300" />
                        <span className="ml-2 text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input type="radio" name="experience" value="no" checked={formData.experience === 'no'} onChange={handleInputChange} className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300" />
                        <span className="ml-2 text-gray-700">No</span>
                      </label>
                    </div>
                    {formData.experience === 'yes' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">If Yes, state details:</label>
                        <textarea name="experienceDetails" value={formData.experienceDetails} onChange={handleInputChange} rows={2} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-gray-900"></textarea>
                      </motion.div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                      <label className="block text-sm font-medium text-gray-900 mb-3">Do you have any disabilities?</label>
                      <div className="flex gap-6 mb-4">
                        <label className="flex items-center cursor-pointer">
                          <input type="radio" name="disability" value="yes" checked={formData.disability === 'yes'} onChange={handleInputChange} className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300" />
                          <span className="ml-2 text-gray-700">Yes</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input type="radio" name="disability" value="no" checked={formData.disability === 'no'} onChange={handleInputChange} className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300" />
                          <span className="ml-2 text-gray-700">No</span>
                        </label>
                      </div>
                      {formData.disability === 'yes' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                          <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">If Yes, state:</label>
                          <input name="disabilityDetails" value={formData.disabilityDetails} onChange={handleInputChange} type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-gray-900" />
                        </motion.div>
                      )}
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                      <label className="block text-sm font-medium text-gray-900 mb-3">Do you have any allergies?</label>
                      <div className="flex gap-6 mb-4">
                        <label className="flex items-center cursor-pointer">
                          <input type="radio" name="allergies" value="yes" checked={formData.allergies === 'yes'} onChange={handleInputChange} className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300" />
                          <span className="ml-2 text-gray-700">Yes</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input type="radio" name="allergies" value="no" checked={formData.allergies === 'no'} onChange={handleInputChange} className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300" />
                          <span className="ml-2 text-gray-700">No</span>
                        </label>
                      </div>
                      {formData.allergies === 'yes' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                          <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">If Yes, state:</label>
                          <input name="allergyDetails" value={formData.allergyDetails} onChange={handleInputChange} type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-gray-900" />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div className="bg-brand-primary/5 p-6 rounded-xl border border-brand-primary/20 mt-8">
                    <label className="flex items-start gap-4 cursor-pointer">
                      <input type="checkbox" className="mt-1 w-5 h-5 text-brand-primary focus:ring-brand-primary border-gray-300 rounded" required />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        I certify that all the information I have provided on this application form is complete and accurate. I further understand that any misrepresentation or material omission on this form may make me ineligible for admission or dismissal at College of Culinary Arts and Hospitality Management. Furthermore, I will abide by all the policies and regulations of the institution.
                      </span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-100 mt-8">
              {currentStep > 1 ? (
                <button 
                  type="button" 
                  onClick={prevStep}
                  className="px-6 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>
              ) : <div></div>}

              {currentStep < 3 ? (
                <button 
                  type="button" 
                  onClick={nextStep}
                  className="bg-brand-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-brand-primary/30"
                >
                  Next Step
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <PaystackButton 
                  formData={formData} 
                  onSuccess={onSuccess} 
                  onClose={onClose}
                  className="bg-green-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-700 transition-all flex items-center gap-2 shadow-lg shadow-green-600/30 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Pay & Submit
                      <CheckCircle2 className="w-5 h-5" />
                    </>
                  )}
                </PaystackButton>
              )}
            </div>
          </form>
          )}
        </div>

        {/* Admissions FAQ */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Admissions FAQ</h2>
          </div>
          <div className="space-y-4">
            {faqs.length > 0 ? faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button 
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-900 pr-4">{faq.question || faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-300 ${expandedFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-2 text-gray-600 leading-relaxed border-t border-gray-50">
                        {faq.answer || faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )) : (
              <div className="text-center text-gray-500 py-8">No FAQs available at the moment.</div>
            )}
          </div>
        </div>

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
