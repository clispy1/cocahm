"use client";

import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { siteSettingsQuery } from '@/sanity/lib/queries';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    async function fetchSettings() {
      try {
        const data = await client.fetch(siteSettingsQuery);
        setSettings(data);
      } catch (error) {
        console.error("Error fetching site settings:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || 'Failed to send message');
      }

      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err: any) {
      setError(`An error occurred: ${err.message || 'Please try again later.'}`);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  const address = settings?.address || "Abavana Junction,\nTowards Maamobi Hospital,\nAccra, Ghana";
  const email = settings?.email || "info@cocahm.com";
  const phone = settings?.phone || "+233 (0)24 286 9439";
  const phoneNumbers = settings?.phoneNumbers || ["+233 (0)24 370 8575", "+233 (0)50 230 0165"];
  const officeHours = settings?.officeHours || "Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 9:00 AM - 2:00 PM";

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
          <div
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex gap-6 items-start">
              <div className="bg-brand-primary/10 p-4 rounded-2xl shrink-0">
                <MapPin className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold mb-2">Visit Our Campus</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {address}
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
                  <p>{phone}</p>
                  {phoneNumbers.map((num: string, idx: number) => (
                    <p key={idx}>{num}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex gap-6 items-start">
              <div className="bg-brand-primary/10 p-4 rounded-2xl shrink-0">
                <Mail className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold mb-2">Email Us</h3>
                <p className="text-gray-600">{email}</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex gap-6 items-start">
              <div className="bg-brand-primary/10 p-4 rounded-2xl shrink-0">
                <Clock className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold mb-2">Office Hours</h3>
                <p className="text-gray-600 whitespace-pre-line">{officeHours}</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-serif font-bold mb-8">Send us a Message</h3>
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-fade-in-up">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h4>
                <p className="text-gray-600">Thank you for reaching out. Our team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input name="firstName" value={formData.firstName} onChange={handleChange} required type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input name="lastName" value={formData.lastName} onChange={handleChange} required type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" placeholder="Doe" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input name="email" value={formData.email} onChange={handleChange} required type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" placeholder="john@example.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input name="subject" value={formData.subject} onChange={handleChange} required type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" placeholder="How can we help?" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all resize-none" placeholder="Your message here..."></textarea>
                </div>

                <button disabled={isSubmitting} type="submit" className="w-full bg-brand-primary text-white py-4 rounded-xl font-medium text-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/30 disabled:opacity-70">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <Send className="w-5 h-5" />}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map Placeholder */}
        <div 
          className="mt-16 rounded-3xl overflow-hidden shadow-lg h-96 bg-gray-200 relative"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.8169446097536!2d-0.2009281!3d5.5940468999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9b1940e096fb%3A0x7180eb2d8facf2ea!2sCollege%20of%20Culinary%20Arts%20and%20Hospitality%20Management%20(CoCAHM)!5e0!3m2!1sen!2sgh!4v1774218433524!5m2!1sen!2sgh" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
