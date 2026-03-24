"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Quote, Briefcase, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { allAlumniQuery, siteSettingsQuery } from '@/sanity/lib/queries';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  if (typeof source === 'string') {
    return { url: () => source };
  }
  return builder.image(source);
}

const ALUMNI_STORIES = [
  {
    id: 'kwame',
    name: 'Kwame Mensah',
    role: 'Executive Chef at The Royal Hotel',
    graduationYear: '2015',
    program: 'Diploma in Culinary Arts',
    story: 'CoCAHM transformed my passion into a career. The hands-on training and City & Guilds certification opened doors for me globally. I now lead a team of 40 chefs at one of Accra\'s most prestigious hotels. The rigorous discipline taught by Chef David was instrumental in my success.',
    image: 'https://picsum.photos/seed/kwame/800/800',
    achievements: ['Executive Chef at 30', 'Featured in African Culinary Magazine']
  },
  {
    id: 'ama',
    name: 'Ama Osei',
    role: 'Founder, Sweet Delights Bakery',
    graduationYear: '2018',
    program: 'Advanced Cake & Sugarcraft',
    story: 'The Cake & Sugarcraft program gave me the confidence and skills to start my own successful business in Accra. The mentorship was invaluable. Today, Sweet Delights employs 15 people and we cater to high-end weddings across the country.',
    image: 'https://picsum.photos/seed/ama/800/800',
    achievements: ['Best Wedding Cake Designer 2024', 'Opened 3rd Bakery Branch']
  },
  {
    id: 'grace',
    name: 'Grace Appiah',
    role: 'Lead Event Manager, Elite Events',
    graduationYear: '2020',
    program: 'Décor & Event Management',
    story: 'Creative, challenging, and rewarding. The Décor and Event Management course was a game-changer for my career. I now coordinate events for top corporate clients and international NGOs visiting Ghana.',
    image: 'https://picsum.photos/seed/grace/800/800',
    achievements: ['Managed 500+ Guest Corporate Gala', 'Certified Event Professional']
  },
  {
    id: 'kofi',
    name: 'Kofi Asare',
    role: 'Sous Chef, Le Petit Paris (London)',
    graduationYear: '2019',
    program: 'Professional Cookery',
    story: 'The foundation I received at CoCAHM allowed me to seamlessly transition into a fast-paced European kitchen. The City & Guilds certification was instantly recognized when I applied for my current role in London.',
    image: 'https://picsum.photos/seed/kofi/800/800',
    achievements: ['Promoted to Sous Chef in 2 years', 'Winner of London Rising Star Chef']
  }
];

export default function Alumni() {
  const [alumniData, setAlumniData] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    async function fetchData() {
      try {
        const [alumni, siteSettings] = await Promise.all([
          client.fetch(allAlumniQuery),
          client.fetch(siteSettingsQuery)
        ]);
        setAlumniData(alumni);
        setSettings(siteSettings);
      } catch (error) {
        console.error("Error fetching alumni data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  const displayAlumni = alumniData.length > 0 ? alumniData : ALUMNI_STORIES;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-brand-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-brand-primary font-medium tracking-widest text-xs uppercase mb-4 block">Our Legacy</span>
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Alumni Success Stories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover how CoCAHM graduates are shaping the culinary and hospitality landscape in Ghana and across the globe.
          </p>
        </div>

        <div className="space-y-24">
          {displayAlumni.map((alumnus, index) => (
            <div key={alumnus._id || alumnus.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="lg:w-1/2 relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10">
                  <Image 
                    src={alumnus.image?.asset ? urlFor(alumnus.image).url() : (alumnus.image || `https://picsum.photos/seed/${alumnus.name}/800/800`)} 
                    alt={alumnus.name} 
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                </div>
                {/* Decorative background element */}
                <div className={`absolute -inset-4 rounded-3xl bg-brand-primary/10 -z-10 ${index % 2 === 0 ? 'translate-x-4 translate-y-4' : '-translate-x-4 translate-y-4'}`} />
              </div>

              <div className="lg:w-1/2">
                <div className="flex items-center gap-2 text-brand-primary mb-4">
                  <Award className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-wider text-sm">Class of {alumnus.graduationYear}</span>
                </div>
                
                <h2 className="text-4xl font-serif font-bold text-gray-900 mb-2">{alumnus.name}</h2>
                <div className="flex items-center gap-2 text-gray-500 font-medium mb-6">
                  <Briefcase className="w-4 h-4" />
                  <span>{alumnus.role}</span>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 relative">
                  <Quote className="w-10 h-10 text-brand-primary/20 absolute top-6 left-6" />
                  <p className="text-gray-700 text-lg leading-relaxed relative z-10 italic pl-8">
                    "{alumnus.story}"
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-gray-900 uppercase tracking-wider text-sm mb-4">Key Achievements</h4>
                  {alumnus.achievements?.map((achievement: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center bg-brand-primary text-white rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url(${settings?.ctaBackgroundImage ? urlFor(settings.ctaBackgroundImage).url() : 'https://picsum.photos/seed/kitchen-bg/1920/1080'})` }} />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to Write Your Own Success Story?</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg">
              Join the ranks of our distinguished alumni. Start your journey with CoCAHM today and turn your culinary passion into a thriving career.
            </p>
            <Link 
              href="/enroll"
              className="inline-flex items-center gap-2 bg-white text-brand-primary px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all shadow-lg group"
            >
              Apply Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
