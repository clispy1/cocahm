"use client";

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { 
  Utensils, Flower2, Award, Users, ArrowRight, CheckCircle2
} from 'lucide-react';
import { 
  SCHOOL_NAME, FULL_NAME, TAGLINE, SUB_TAGLINE, COURSE_CATEGORIES, FEATURES, TESTIMONIALS, GALLERY_IMAGES 
} from '@/constants';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/culinary-hero/1920/1080" 
          alt="Culinary Excellence" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-white/80 uppercase tracking-widest text-xs font-semibold mb-4 border-b border-white/30 pb-1">
            Est. 1971
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-serif mb-6 leading-tight">
            {TAGLINE}
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            {SUB_TAGLINE} Join {SCHOOL_NAME}, the premier {FULL_NAME}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#courses" className="bg-white text-gray-900 px-10 py-4 rounded-full font-medium hover:bg-brand-bg transition-all flex items-center justify-center gap-2 group">
              Explore Courses
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link href="/about" className="border border-white/50 text-white px-10 py-4 rounded-full font-medium hover:bg-white/10 transition-all backdrop-blur-sm">
              Our Legacy
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://picsum.photos/seed/chef-about/800/1000" 
              alt="Our Kitchen" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl hidden lg:block max-w-xs">
            <p className="text-brand-primary font-serif italic text-xl mb-2">"We are not just churning out cooks, we are churning out individuals with transferable skills"</p>
            <p className="text-gray-500 text-sm">— CoCAHM</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-brand-primary font-medium tracking-widest text-xs uppercase mb-4 block">Our Story</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Crafting the Future of Hospitality</h2>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              Founded in 1971 by the visionary Mrs. Evelyn Addo-Boye, {SCHOOL_NAME} began its journey as DOMESCO. Today, we stand proud as Ghana's first and premier private vocational institution dedicated to culinary arts and hospitality.
            </p>
            <p>
              With over five decades of excellence, we have transformed countless passionate individuals into industry-leading professionals. Our internationally recognized programs blend rigorous practical training with deep theoretical knowledge, setting the gold standard for hospitality education in West Africa.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="bg-brand-primary/10 p-2 rounded-lg">
                <Award className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg">Certified</h4>
                <p className="text-xs text-gray-500">Industry-standard certifications</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-brand-primary/10 p-2 rounded-lg">
                <Users className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg">Mentorship</h4>
                <p className="text-xs text-gray-500">One-on-one guidance from pros</p>
              </div>
            </div>
          </div>
          <Link href="/about" className="inline-flex items-center gap-2 text-brand-primary font-semibold group/btn">
            Learn More About Us
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

interface CourseCategoryProps {
  category: {
    id: string;
    title: string;
    description: string;
    image: string;
    courses: { id: string; name: string; duration: string }[];
  };
  index: number;
}

const CourseCategoryCard: React.FC<CourseCategoryProps> = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
    >
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={category.image} 
          alt={category.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-8 flex-grow flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-2xl font-serif font-bold">{category.title}</h3>
        </div>
        <p className="text-gray-600 mb-6 line-clamp-2">
          {category.description}
        </p>
        <div className="space-y-3 mb-8 flex-grow">
          {category.courses.map(course => (
            <div key={course.id} className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
              <span className="font-medium text-gray-800">{course.name}</span>
              <span className="text-brand-primary bg-brand-primary/10 px-2 py-1 rounded-md text-xs whitespace-nowrap">{course.duration}</span>
            </div>
          ))}
        </div>
        <Link href={`/enroll?category=${category.id}`} className="flex items-center gap-2 text-brand-primary font-semibold group/btn mt-auto">
          Enroll in {category.title}
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

const Courses = () => {
  return (
    <section id="courses" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-primary font-medium tracking-widest text-xs uppercase mb-4 block">Professional Training</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Our Specialized Programs</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Choose from our range of industry-focused courses designed to equip you with the skills needed for a successful global career.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSE_CATEGORIES.map((category, index) => (
            <CourseCategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 bg-brand-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-white/60 font-medium tracking-widest text-xs uppercase mb-4 block">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-12 leading-tight">A Legacy of Culinary Excellence</h2>
            <div className="space-y-8">
              {FEATURES.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="shrink-0 w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif font-bold mb-2">{feature.title}</h4>
                    <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-full border-2 border-dashed border-white/20 p-8">
              <div className="w-full h-full rounded-full overflow-hidden shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/culinary-feature/1000/1000" 
                  alt="Culinary Training" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="absolute top-1/4 -left-8 bg-white text-gray-900 p-6 rounded-2xl shadow-2xl">
              <p className="text-3xl font-serif font-bold text-brand-primary">50+</p>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Years of Excellence</p>
            </div>
            <div className="absolute bottom-1/4 -right-8 bg-white text-gray-900 p-6 rounded-2xl shadow-2xl">
              <p className="text-3xl font-serif font-bold text-brand-primary">1000+</p>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Successful Alumni</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-brand-primary font-medium tracking-widest text-xs uppercase mb-4 block">Visual Journey</span>
            <h2 className="text-4xl md:text-5xl font-serif">Life at CoCAHM</h2>
          </div>
          <button className="text-brand-primary font-semibold border-b-2 border-brand-primary pb-1 hover:opacity-80 transition-opacity">
            View All Photos
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {GALLERY_IMAGES.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`relative overflow-hidden rounded-2xl group ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <img 
                src={img} 
                alt={`Gallery ${index}`} 
                className="w-full h-full object-cover aspect-square group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-4">What Our Students Say</h2>
          <div className="w-24 h-1 bg-brand-primary/20 mx-auto rounded-full" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-10 rounded-3xl bg-brand-bg relative group hover:bg-brand-primary hover:text-white transition-colors duration-500"
            >
              <div className="mb-6 text-brand-primary group-hover:text-white/50 transition-colors">
                <Utensils className="w-8 h-8" />
              </div>
              <p className="text-lg font-serif italic mb-8 leading-relaxed">
                "{t.content}"
              </p>
              <div>
                <h4 className="font-bold text-lg">{t.name}</h4>
                <p className="text-sm opacity-60">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  useEffect(() => {
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Courses />
      <Features />
      <Gallery />
      <Testimonials />
    </>
  );
}
