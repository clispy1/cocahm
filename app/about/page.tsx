"use client";

import React from 'react';
import { Award, BookOpen, Globe, Users, CheckCircle2, ChefHat, Utensils, Coffee } from 'lucide-react';
import { motion } from 'motion/react';

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

  const timeline = [
    { year: "1971", title: "The Beginning", desc: "Founded as DOMESCO by Mrs. Evelyn Addo-Boye with just 11 ambitious students." },
    { year: "1985", title: "City & Guilds Accreditation", desc: "Became the first private vocational institution in Ghana to receive international accreditation." },
    { year: "2000", title: "Campus Expansion", desc: "Moved to our current state-of-the-art facility, introducing modern hot kitchens and pastry labs." },
    { year: "2015", title: "Rebranding to CoCAHM", desc: "Evolved into the College of Culinary Arts and Hospitality Management to reflect our broader curriculum." },
    { year: "Today", title: "A Culinary Hub", desc: "Training hundreds of students annually and setting the standard for hospitality in West Africa." }
  ];

  const facilities = [
    { title: "The Hot Kitchen", desc: "Equipped with industrial stoves, combi ovens, and professional-grade stations for high-volume cooking.", icon: <Utensils className="w-6 h-6" />, img: "https://picsum.photos/seed/hotkitchen/600/400" },
    { title: "Pastry & Baking Lab", desc: "Climate-controlled environment with marble countertops, perfect for delicate sugarcraft and chocolate work.", icon: <Coffee className="w-6 h-6" />, img: "https://picsum.photos/seed/pastrylab/600/400" },
    { title: "Demo Theater", desc: "A tiered seating auditorium with overhead cameras where master chefs demonstrate complex techniques.", icon: <ChefHat className="w-6 h-6" />, img: "https://picsum.photos/seed/demo/600/400" }
  ];

  return (
    <div className="pt-24 pb-16 bg-brand-bg min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/3_233174e60172ae64f15528d5df5907228b366a39-6426x4284.jpg" 
            alt="Chefs cooking in a professional kitchen" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/80 to-brand-bg"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h1
            className="text-4xl md:text-6xl font-serif font-bold text-gray-950 mb-6"
          >
            Crafting Culinary Excellence Since 1971
          </h1>
          <p
            className="text-lg md:text-xl text-gray-800 leading-relaxed max-w-3xl mx-auto"
          >
            At the College of Culinary Arts and Hospitality Management (CoCAHM), we turn culinary passion into professional excellence. With over 50 years of culinary heritage, we are Ghana's premier institution for culinary education.
          </p>
        </div>
      </section>

      {/* Interactive Timeline Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-16">
          <span className="text-brand-primary font-medium tracking-widest text-xs uppercase mb-4 block">Our Heritage</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-950">The CoCAHM Journey</h2>
        </div>
        
        <div className="relative border-l-2 border-brand-primary/20 ml-4 md:ml-1/2 md:left-1/2 md:-translate-x-1/2 space-y-12">
          {timeline.map((item, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index} 
              className={`relative flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-8`}
            >
              <div className="absolute -left-[9px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-brand-primary ring-4 ring-white" />
              <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                <span className="text-brand-primary font-bold text-xl mb-2 block">{item.year}</span>
                <h3 className="text-2xl font-serif font-bold text-gray-950 mb-3">{item.title}</h3>
                <p className="text-gray-800 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-950 mb-6">Why Choose CoCAHM</h2>
            <p className="text-lg text-gray-800">
              Our many qualities make us unique in the culinary world. Discover what sets our education apart.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-brand-bg p-8 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-950 mb-3">{feature.title}</h3>
                <p className="text-gray-800 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Kitchen Tour */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-primary font-medium tracking-widest text-xs uppercase mb-4 block">Facilities</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-950 mb-6">The Kitchen Tour</h2>
            <p className="text-lg text-gray-800">
              Train in environments that mirror the world's finest restaurants and hotels.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {facilities.map((fac, index) => (
              <motion.div 
                whileHover={{ y: -10 }}
                key={index} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={fac.img} alt={fac.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="p-8">
                  <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center mb-6">
                    {fac.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-950 mb-3">{fac.title}</h3>
                  <p className="text-gray-800 leading-relaxed">{fac.desc}</p>
                </div>
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
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-950 mb-6">Meet Our Master Chefs</h2>
            <p className="text-lg text-gray-800">
              Learn from the best. Our faculty comprises seasoned industry professionals, award-winning chefs, and hospitality experts dedicated to your success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Chef Kwame", role: "Head of Culinary Arts", exp: "15 Years Exp. • Ex-Hilton", img: "https://picsum.photos/seed/chef1/400/500" },
              { name: "Chef Elena", role: "Master Pastry Chef", exp: "12 Years Exp. • Le Cordon Bleu Alum", img: "https://picsum.photos/seed/chef2/400/500" },
              { name: "Mr. Osei", role: "Hospitality Director", exp: "20 Years Exp. • Global Hotelier", img: "https://picsum.photos/seed/chef3/400/500" }
            ].map((faculty, index) => (
              <div 
                key={index}
                className="group bg-gray-50 rounded-2xl p-4 hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/5] rounded-xl overflow-hidden mb-6 relative">
                  <img 
                    src={faculty.img} 
                    alt={faculty.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white text-sm font-medium">{faculty.exp}</p>
                  </div>
                </div>
                <div className="px-2 pb-2">
                  <h3 className="text-2xl font-serif font-bold text-gray-950 mb-1">{faculty.name}</h3>
                  <p className="text-brand-primary font-medium">{faculty.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-gray-950 text-white py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div>
            <div 
              className="h-16 w-64 bg-brand-primary mx-auto mb-8 opacity-50" 
            />
            <blockquote className="text-2xl md:text-4xl font-serif italic leading-relaxed mb-8">
              "We are not just churning out cooks, we are churning out individuals with transferable skills"
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
}
