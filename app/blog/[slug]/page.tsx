import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { BLOG_POSTS } from '../data';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <article className="max-w-4xl mx-auto px-6">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-brand-primary font-medium hover:gap-3 transition-all mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="w-full h-[400px] md:h-[500px] relative">
            <Image 
              src={post.image} 
              alt={post.title} 
              fill
              referrerPolicy="no-referrer"
              className="object-cover"
            />
          </div>
          
          <div className="p-8 md:p-12 lg:p-16">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-8">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                <Tag className="w-4 h-4 text-brand-primary" />
                <span className="font-medium uppercase tracking-wider text-xs text-gray-700">{post.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </div>
            </div>
            
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              {post.title}
            </h1>
            
            <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-brand-primary hover:prose-a:text-brand-primary/80 prose-img:rounded-xl">
              {/* Simple markdown rendering for the mock content */}
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('# ')) {
                  return <h1 key={index} className="text-3xl font-bold mt-12 mb-6">{paragraph.replace('# ', '')}</h1>;
                }
                if (paragraph.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-bold mt-10 mb-4">{paragraph.replace('## ', '')}</h2>;
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={index} className="text-xl font-bold mt-8 mb-4">{paragraph.replace('### ', '')}</h3>;
                }
                if (paragraph.startsWith('* ')) {
                  return <li key={index} className="ml-6 list-disc mb-2">{paragraph.replace('* ', '')}</li>;
                }
                if (paragraph.match(/^[0-9]+\.\s/)) {
                  return <li key={index} className="ml-6 list-decimal mb-2">{paragraph.replace(/^[0-9]+\.\s/, '')}</li>;
                }
                if (paragraph.trim() === '') {
                  return <br key={index} />;
                }
                return <p key={index} className="mb-6 leading-relaxed">{paragraph}</p>;
              })}
            </div>
          </div>
        </div>

        {/* Related Posts Section (Placeholder for when Sanity is connected) */}
        <div className="mt-24 border-t border-gray-200 pt-16">
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-10 text-center">More from the Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 2).map((relatedPost) => (
              <Link href={`/blog/${relatedPost.slug}`} key={relatedPost.slug} className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                <div className="w-full h-48 relative overflow-hidden">
                  <Image 
                    src={relatedPost.image} 
                    alt={relatedPost.title} 
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-primary mb-3">
                    {relatedPost.category}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-primary transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
