"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { COURSE_CATEGORIES } from '@/constants';
import { Clock, BookOpen, Briefcase, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  if (typeof source === 'string') {
    return { url: () => source };
  }
  return builder.image(source);
}

const categoryQuery = groq`*[_type == "category" && (slug.current == $id || _id == $id)][0] {
  ...,
  "courses": *[_type == "course" && references(^._id)]
}`;

export default function CourseDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    async function fetchCategory() {
      try {
        const data = await client.fetch(categoryQuery, { id });
        
        if (data) {
          setCategory({
            id: data.slug?.current || data._id,
            title: data.title,
            description: data.description,
            image: data.image ? urlFor(data.image).url() : 'https://picsum.photos/seed/course/800/600',
            curriculum: data.curriculum || [],
            careerOutcomes: data.careerOutcomes || [],
            courses: data.courses?.map((course: any) => ({
              id: course._id,
              name: course.name,
              duration: course.duration
            })) || []
          });
        } else {
          // Fallback to constants
          const fallbackCategory = COURSE_CATEGORIES.find(c => c.id === id);
          if (fallbackCategory) {
             setCategory(fallbackCategory);
          } else {
             router.push('/courses');
          }
        }
      } catch (error) {
        console.error("Error fetching category:", error);
        const fallbackCategory = COURSE_CATEGORIES.find(c => c.id === id);
        if (fallbackCategory) {
           setCategory(fallbackCategory);
        } else {
           router.push('/courses');
        }
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchCategory();
    }
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (!category) return null;

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-brand-bg">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-brand-primary transition-colors mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Courses
        </button>

        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <div className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src={category.image} 
              alt={category.title} 
              fill
              referrerPolicy="no-referrer"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="bg-brand-primary text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-4 inline-block">
                Program Category
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
                {category.title}
              </h1>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Program Overview</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              {category.description}
            </p>

            <div className="space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Core Curriculum</h3>
                </div>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {category.curriculum?.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Career Outcomes</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.careerOutcomes?.map((outcome: string, idx: number) => (
                    <span key={idx} className="bg-gray-50 text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-gray-200">
                      {outcome}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">Available Courses in this Program</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.courses?.map((course: any) => (
              <div key={course.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{course.name}</h3>
                <div className="flex items-center gap-2 text-gray-500 mb-8 font-medium">
                  <Clock className="w-5 h-5 text-brand-primary" />
                  <span>Duration: {course.duration}</span>
                </div>
                
                <Link 
                  href={`/enroll?category=${category.id}&course=${course.id}`}
                  className="mt-auto w-full bg-brand-primary/10 text-brand-primary py-3 rounded-xl font-bold text-center hover:bg-brand-primary hover:text-white transition-colors"
                >
                  Enroll in this Course
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-950 text-white rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/kitchen-bg/1920/1080')] opacity-10 bg-cover bg-center mix-blend-overlay" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to Start Your Culinary Journey?</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg">
              Join CoCAHM and turn your passion into a profession. Our admissions team is ready to help you take the next step.
            </p>
            <Link 
              href={`/enroll?category=${category.id}`}
              className="inline-flex items-center gap-2 bg-brand-primary text-white px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg group"
            >
              Apply for {category.title}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
