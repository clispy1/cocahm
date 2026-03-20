"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Award, BookOpen, Globe, Users, CheckCircle2 } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: <Users className="w-6 h-6 text-brand-primary" />,
      title: "Passionate Faculty",
      description: "Our dedicated chefs and industry experts are eager to share their knowledge and mentor you."
    },
    {
      icon: <Award className="w-6 h-6 text-brand-primary" />,
      title: "A Legacy of Excellence",
      description: "We've been at the forefront of culinary education in West Africa for 50+ years."
    },
    {
      icon: <Globe className="w-6 h-6 text-brand-primary" />,
      title: "Global Flavors, Local Heart",
      description: "Discover the world's cuisines while celebrating Ghana's culinary heritage."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-brand-primary" />,
      title: "Cutting-Edge Facilities",
      description: "Our kitchens are your playground, equipped with top-notch culinary tools."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-brand-primary" />,
      title: "Industry-Recognized Success",
      description: "Your CoCAHM certification opens doors to thrilling career prospects."
    }
  ];

  return (
    <div className="pt-24 pb-16 bg-brand-bg min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=2000&auto=format&fit=crop" 
            alt="Chefs cooking in a professional kitchen" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/80 to-brand-bg"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6"
          >
            Crafting Culinary Excellence Since 1971
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            At the College of Culinary Arts and Hospitality Management (CoCAHM), we turn culinary passion into professional excellence. With over 50 years of culinary heritage, we are Ghana's premier institution for culinary education.
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Our institution, formerly known as the School of Domestic Science and Catering (DOMESCO), was founded by Mrs. Evelyn Addo-Boye in 1971. 
              </p>
              <p>
                From our humble beginnings with just eleven students, we've grown to become a leading culinary and hospitality education hub in Ghana and beyond. Today, we are proud to be the first private vocational institution in Ghana, consistently setting the bar for vocational and technical training in West Africa.
              </p>
              <p>
                Our commitment to vocational training and culinary innovation has earned us accolades and accreditation from esteemed institutions, including City and Guilds, London, and NVTI.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=1000&auto=format&fit=crop" 
                alt="Culinary students learning" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl max-w-xs hidden md:block">
              <p className="font-serif font-bold text-2xl text-brand-primary mb-2">50+ Years</p>
              <p className="text-gray-600 text-sm font-medium uppercase tracking-wider">Of Culinary Heritage</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">Why Choose CoCAHM</h2>
            <p className="text-lg text-gray-600">
              Our many qualities make us unique in the culinary world. Discover what sets our education apart.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-brand-bg p-8 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="bg-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-primary font-medium tracking-widest text-xs uppercase mb-4 block">Our Experts</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">Meet Our Master Chefs</h2>
            <p className="text-lg text-gray-600">
              Learn from the best. Our faculty comprises seasoned industry professionals, award-winning chefs, and hospitality experts dedicated to your success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Chef Kwame", role: "Head of Culinary Arts", img: "https://picsum.photos/seed/chef1/400/500" },
              { name: "Chef Elena", role: "Master Pastry Chef", img: "https://picsum.photos/seed/chef2/400/500" },
              { name: "Mr. Osei", role: "Hospitality Director", img: "https://picsum.photos/seed/chef3/400/500" }
            ].map((faculty, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-6 relative">
                  <img 
                    src={faculty.img} 
                    alt={faculty.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-1">{faculty.name}</h3>
                <p className="text-brand-primary font-medium">{faculty.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-gray-950 text-white py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div 
              className="h-16 w-64 bg-brand-primary mx-auto mb-8 opacity-50"
              style={{ 
                WebkitMaskImage: `url('/logo-w.svg')`, 
                WebkitMaskRepeat: 'no-repeat', 
                WebkitMaskSize: 'contain',
                WebkitMaskPosition: 'center',
                maskImage: `url('/logo-w.svg')`,
                maskRepeat: 'no-repeat',
                maskSize: 'contain',
                maskPosition: 'center'
              }} 
            />
            <blockquote className="text-2xl md:text-4xl font-serif italic leading-relaxed mb-8">
              "We are not just churning out cooks, we are churning out individuals with transferable skills"
            </blockquote>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
