"use client";

import React, { useEffect, useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { EVENTS } from '@/constants';
import { client } from '@/sanity/lib/client';
import { allEventsQuery } from '@/sanity/lib/queries';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  if (typeof source === 'string') {
    return { url: () => source };
  }
  return builder.image(source);
}

export default function Events() {
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Current month
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchEvents() {
      try {
        const data = await client.fetch(allEventsQuery);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const displayEvents = events.length > 0 ? events.map(event => {
    const eventDate = new Date(event.date);
    return {
      id: event._id,
      title: event.title,
      slug: event.slug?.current,
      date: eventDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      time: event.time,
      location: event.location,
      description: event.description,
      image: event.image ? urlFor(event.image).url() : 'https://picsum.photos/seed/event/800/600',
      rawDate: eventDate
    };
  }) : EVENTS.map(e => ({ ...e, rawDate: new Date(e.date) }));

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  // Parse event dates to match calendar
  const getEventsForDate = (day: number) => {
    return displayEvents.filter(event => {
      const eventDate = event.rawDate;
      return eventDate.getMonth() === currentMonth.getMonth() && 
             eventDate.getDate() === day && 
             eventDate.getFullYear() === currentMonth.getFullYear();
    });
  };

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
          <span className="text-brand-primary font-medium tracking-widest text-xs uppercase mb-4 block">What's Happening</span>
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Upcoming Events</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay connected with the CoCAHM community. Join us for masterclasses, exhibitions, open houses, and special culinary events.
          </p>
        </div>

        {/* Interactive Calendar Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 mb-16">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Calendar View */}
            <div className="md:w-1/2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-gray-900">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h2>
                <div className="flex gap-2">
                  <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-2 mb-2 text-center">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="text-xs font-bold text-gray-400 uppercase tracking-wider py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square rounded-xl"></div>
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayEvents = getEventsForDate(day);
                  const hasEvents = dayEvents.length > 0;
                  const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === currentMonth.getMonth();
                  
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
                      className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all ${
                        isSelected ? 'bg-brand-primary text-white shadow-md' : 
                        hasEvents ? 'bg-brand-primary/10 text-brand-primary font-bold hover:bg-brand-primary/20' : 
                        'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span>{day}</span>
                      {hasEvents && (
                        <div className={`w-1.5 h-1.5 rounded-full absolute bottom-2 ${isSelected ? 'bg-white' : 'bg-brand-primary'}`}></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Selected Date Details */}
            <div className="md:w-1/2 bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
              {selectedDate ? (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">
                    Events for {monthNames[selectedDate.getMonth()]} {selectedDate.getDate()}, {selectedDate.getFullYear()}
                  </h3>
                  
                  {getEventsForDate(selectedDate.getDate()).length > 0 ? (
                    <div className="space-y-6">
                      {getEventsForDate(selectedDate.getDate()).map(event => (
                        <div key={event.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                          <h4 className="font-serif font-bold text-lg mb-2 text-brand-primary">{event.title}</h4>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-4 h-4" /> {event.time}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" /> {event.location}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">{event.description}</p>
                          <button className="text-sm font-bold text-brand-primary hover:underline">
                            <Link href={`/events/${event.slug}`}>Register Now &rarr;</Link>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p>No events scheduled for this date.</p>
                      <p className="text-sm mt-2">Select a highlighted date to view events.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 text-gray-500">
                  <CalendarIcon className="w-16 h-16 mb-4 opacity-20 text-brand-primary" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Date</h3>
                  <p className="text-sm max-w-xs">Click on any date in the calendar to view scheduled events, masterclasses, and open houses.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">All Upcoming Events</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {displayEvents.map((event, index) => (
            <div
              key={event.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-200/50 group flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm">
                  <div className="text-brand-primary font-bold text-lg leading-none">
                    {event.date.includes(',') ? event.date.split(' ')[1].replace(',', '') : event.date.split(' ')[0]}
                  </div>
                  <div className="text-gray-600 text-xs font-medium uppercase tracking-wider">
                    {event.date.includes(',') ? event.date.split(' ')[0].substring(0, 3) : event.date.split(' ')[1].substring(0, 3)}
                  </div>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-serif font-bold mb-4 group-hover:text-brand-primary transition-colors">
                  {event.title}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CalendarIcon className="w-4 h-4 text-brand-primary shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-brand-primary shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
                  {event.description}
                </p>
                
                <Link href={`/events/${event.slug}`} className="flex items-center gap-2 text-brand-primary font-medium group/btn mt-auto">
                  Register Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
