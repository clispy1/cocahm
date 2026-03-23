"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from './data';
import { client } from '@/sanity/lib/client';
import { allPostsQuery } from '@/sanity/lib/queries';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await client.fetch(allPostsQuery);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const displayPosts = posts.length > 0 ? posts.map(post => ({
    slug: post.slug?.current || post._id,
    title: post.title,
    excerpt: post.excerpt || post.body?.[0]?.children?.[0]?.text?.substring(0, 150) + '...' || '',
    image: post.imageUrl || 'https://picsum.photos/seed/blog/800/600',
    category: post.categories?.[0]?.title || 'General',
    date: new Date(post.publishedAt).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    author: post.author?.name || 'CoCAHM Team'
  })) : BLOG_POSTS;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Culinary Insights & Stories
          </h1>
          <p className="text-lg text-gray-600">
            Discover recipes, techniques, and stories from our expert chefs and culinary students.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post) => (
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
      </div>
    </main>
  );
}
