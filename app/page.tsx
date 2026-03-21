"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { 
  Utensils, Flower2, Award, Users, ArrowRight, CheckCircle2,
  ChefHat, Briefcase, GraduationCap, Building, Calendar, User, Quote
} from 'lucide-react';
import { 
  SCHOOL_NAME, FULL_NAME, TAGLINE, SUB_TAGLINE, COURSE_CATEGORIES, FEATURES, TESTIMONIALS, GALLERY_IMAGES 
} from '@/constants';
import { BLOG_POSTS } from '@/app/blog/data';

const Hero = () => {
    
    
  return (
    <section className="relative h-screen h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden bg-gray-950">
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
          poster="https://picsum.photos/seed/culinary-hero/1920/1080"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-in-a-commercial-kitchen-43486-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div className="animate-fade-in-up">
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
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-medium">Scroll to explore</span>
        <div
          className="w-5 h-8 border border-white/20 rounded-full flex justify-center p-1"
        >
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </div>
      </div>
    </section>
  );
};

const FastFacts = () => {
  const facts = [
    { icon: <ChefHat className="w-8 h-8" />, number: "15+", label: "Expert Instructors" },
    { icon: <Briefcase className="w-8 h-8" />, number: "95%", label: "Employment Rate" },
    { icon: <Building className="w-8 h-8" />, number: "5", label: "Pro Kitchens" },
    { icon: <GraduationCap className="w-8 h-8" />, number: "1000+", label: "Graduates" },
  ];

  return (
    <section className="py-16 bg-gray-950 text-white relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/kitchen-bg/1920/1080')] opacity-5 bg-cover bg-center mix-blend-overlay" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
          {facts.map((fact, index) => (
            <div key={index} className="flex flex-col items-center text-center px-4">
              <div className="text-brand-primary mb-4 bg-white/5 p-4 rounded-full">
                {fact.icon}
              </div>
              <div className="text-4xl md:text-5xl font-serif font-bold mb-2">{fact.number}</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">{fact.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
    
  
  return (
    <section id="about" className="py-24 px-6 bg-brand-bg">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div 
          
          
          
          
          className="relative"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative bg-gray-200">
            <img
              src="https://picsum.photos/seed/chef-about/800/1000" 
              alt="Our Kitchen" 
              className="w-full h-full object-cover absolute inset-0"
              referrerPolicy="no-referrer"
            />
          </div>
          <div
            className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl hidden lg:block max-w-xs z-10"
          >
            <p className="text-brand-primary font-serif italic text-xl mb-2">"We are not just churning out cooks, we are churning out individuals with transferable skills"</p>
            <p className="text-gray-500 text-sm">— CoCAHM</p>
          </div>
        </div>

        <div
          
          
          
          
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
            <div
              className="flex items-start gap-3"
            >
              <div className="bg-brand-primary/10 p-2 rounded-lg">
                <Award className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg">Certified</h4>
                <p className="text-xs text-gray-500">Industry-standard certifications</p>
              </div>
            </div>
            <div
              className="flex items-start gap-3"
            >
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
        </div>
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
    <div
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
    </div>
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
          <div
          >
            <span className="text-white/60 font-medium tracking-widest text-xs uppercase mb-4 block">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-12 leading-tight">A Legacy of Culinary Excellence</h2>
            <div className="space-y-8">
              {FEATURES.map((feature, index) => (
                <div 
                  key={index}
                  className="flex gap-6"
                >
                  <div className="shrink-0 w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif font-bold mb-2">{feature.title}</h4>
                    <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
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
            <div
              className="absolute top-1/4 -left-8 bg-white text-gray-900 p-6 rounded-2xl shadow-2xl"
            >
              <p className="text-3xl font-serif font-bold text-brand-primary">50+</p>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Years of Excellence</p>
            </div>
            <div
              className="absolute bottom-1/4 -right-8 bg-white text-gray-900 p-6 rounded-2xl shadow-2xl"
            >
              <p className="text-3xl font-serif font-bold text-brand-primary">1000+</p>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Successful Alumni</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-brand-primary font-medium tracking-widest text-xs uppercase mb-4 block">Visual Journey</span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900">A Day in the Life</h2>
            <p className="text-gray-500 max-w-2xl mt-4">
              Step inside our kitchens and see the passion, precision, and creativity that define the CoCAHM experience.
            </p>
          </div>
          <Link href="/student-life" className="text-brand-primary font-semibold border-b-2 border-brand-primary pb-1 hover:opacity-80 transition-opacity">
            Explore Student Life
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((img, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl group bg-gray-100 ${
                index === 0 ? 'md:col-span-2 md:row-span-2 aspect-square' : 
                index === 3 ? 'md:col-span-2 aspect-[2/1]' : 'aspect-square'
              }`}
            >
              <Image 
                src={img} 
                alt={`Gallery ${index}`} 
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {index % 2 === 0 ? 'Culinary Arts' : 'Pastry & Baking'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 px-6 bg-brand-bg overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-primary font-medium tracking-widest text-xs uppercase mb-4 block">Alumni Success</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Where Are They Now?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Our graduates go on to lead kitchens, start successful businesses, and shape the future of hospitality globally.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-white shadow-sm border border-gray-100 relative group hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <div className="absolute top-8 right-8 text-brand-primary/10 group-hover:text-brand-primary/20 transition-colors">
                <Quote className="w-16 h-16" />
              </div>
              <p className="text-gray-700 italic mb-8 relative z-10 flex-grow">
                "{t.content}"
              </p>
              <div className="flex items-center gap-4 relative z-10 border-t border-gray-100 pt-6">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 shrink-0 relative">
                  <Image src={t.image!} alt={t.name} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <p className="text-sm text-brand-primary font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LatestBlog = () => {
  const latestPosts = BLOG_POSTS.slice(0, 3);
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-primary font-medium tracking-widest text-xs uppercase mb-4 block">Our Kitchen</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Latest from the Blog</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Discover recipes, techniques, and stories from our expert chefs and culinary students.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <article key={post.slug} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-primary uppercase tracking-wider">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                </div>
                
                <h2 className="font-serif text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-brand-primary transition-colors">
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-brand-primary font-medium hover:gap-3 transition-all mt-auto"
                >
                  Read Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/blog" className="inline-flex items-center gap-2 bg-brand-primary text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all">
            View All Posts <ArrowRight className="w-4 h-4" />
          </Link>
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
      <FastFacts />
      <About />
      <Courses />
      <Features />
      <Gallery />
      <Testimonials />
      <LatestBlog />
    </>
  );
}
