"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import imageUrlBuilder from '@sanity/image-url';
import Image from 'next/image';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  if (typeof source === 'string') {
    return { url: () => source };
  }
  return builder.image(source);
}

export default function EventDetails() {
  const params = useParams();
  const slug = params.slug;
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const query = `*[_type == "event" && slug.current == $slug][0]`;
        const data = await client.fetch(query, { slug });
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!event) return <div className="min-h-screen flex items-center justify-center">Event not found</div>;

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-brand-bg">
      <div className="max-w-4xl mx-auto">
        <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 shadow-xl">
          <Image 
            src={event.image ? urlFor(event.image).url() : 'https://picsum.photos/seed/event/1200/600'} 
            alt={event.title} 
            fill 
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif mb-6">{event.title}</h1>
        <div className="flex flex-wrap gap-6 text-gray-600 mb-8">
          <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-brand-primary" /> {new Date(event.date).toLocaleDateString()}</div>
          <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-brand-primary" /> {event.time}</div>
          <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-brand-primary" /> {event.location}</div>
        </div>
        <div className="prose prose-lg max-w-none text-gray-600 mb-12">
          {event.description}
        </div>
        
        {/* Registration Form Placeholder */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-2xl font-serif font-bold mb-6">Register for this Event</h3>
          <form className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full border border-gray-200 rounded-xl px-4 py-3" required />
            <input type="email" placeholder="Email Address" className="w-full border border-gray-200 rounded-xl px-4 py-3" required />
            <button type="submit" className="bg-brand-primary text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90">Register Now</button>
          </form>
        </div>
      </div>
    </div>
  );
}
