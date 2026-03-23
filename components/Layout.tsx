"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, X, MapPin, Phone, Mail, Instagram, Facebook, Twitter, ChevronDown
} from 'lucide-react';
import { SCHOOL_NAME } from '@/constants';
import { client } from '@/sanity/lib/client';
import { siteSettingsQuery } from '@/sanity/lib/queries';

export const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(!isHome);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    client.fetch(siteSettingsQuery).then((data) => {
      setSettings(data);
    }).catch(console.error);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
      return;
    }
    
    // Check initial scroll position when entering home page
    setIsScrolled(window.scrollY > 20);
    
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  if (pathname?.startsWith('/studio')) return null;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Courses', href: '/courses' },
    { 
      name: 'Discover', 
      dropdown: true,
      items: [
        { name: 'Student Life', href: '/student-life' },
        { name: 'Faculty', href: '/faculty' },
        { name: 'Alumni', href: '/alumni' },
        { name: 'Blog', href: '/blog' },
        { name: 'Events', href: '/events' },
      ]
    },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <img 
            src="/logo-w.svg" 
            alt={settings?.title || SCHOOL_NAME} 
            className={`h-10 w-auto ${isScrolled ? 'brightness-0' : 'brightness-100'}`}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.dropdown ? (
              <div key={link.name} className="relative group">
                <button className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-brand-primary ${isScrolled ? 'text-gray-600' : 'text-white/90'}`}>
                  {link.name} <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                  {link.items?.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link 
                key={link.name} 
                href={link.href!} 
                className={`text-sm font-medium transition-colors hover:text-brand-primary ${isScrolled ? 'text-gray-600' : 'text-white/90'}`}
              >
                {link.name}
              </Link>
            )
          ))}
          <Link href="/enroll" className="bg-brand-primary text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all">
            Enroll Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`md:hidden ${isScrolled ? 'text-gray-900' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className={isScrolled ? 'text-gray-900' : 'text-white'} /> : <Menu className={isScrolled ? 'text-gray-900' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              link.dropdown ? (
                <div key={link.name} className="flex flex-col gap-2">
                  <div className="text-gray-900 font-bold">{link.name}</div>
                  <div className="flex flex-col gap-2 pl-4 border-l-2 border-gray-100">
                    {link.items?.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-gray-600 font-medium hover:text-brand-primary"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link 
                  key={link.name} 
                  href={link.href!} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-600 font-medium hover:text-brand-primary"
                >
                  {link.name}
                </Link>
              )
            ))}
            <Link href="/enroll" onClick={() => setIsMobileMenuOpen(false)} className="bg-brand-primary text-white px-6 py-3 rounded-full font-medium w-full text-center mt-2">
              Enroll Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer = () => {
  const pathname = usePathname();
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    client.fetch(siteSettingsQuery).then((data) => {
      setSettings(data);
    }).catch(console.error);
  }, []);

  if (pathname?.startsWith('/studio')) return null;

  return (
    <footer className="bg-gray-950 text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <img 
                src="/logo-w.svg" 
                alt={settings?.title || SCHOOL_NAME} 
                className="h-12 w-auto brightness-100"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              {settings?.description || "Empowering the next generation of culinary leaders through professional training, industry expertise, and a passion for excellence."}
            </p>
            <div className="flex gap-4">
              {settings?.socials?.map((social: any, i: number) => (
                <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-primary transition-colors">
                  {social.platform.toLowerCase() === 'instagram' && <Instagram className="w-5 h-5" />}
                  {social.platform.toLowerCase() === 'facebook' && <Facebook className="w-5 h-5" />}
                  {social.platform.toLowerCase() === 'twitter' && <Twitter className="w-5 h-5" />}
                  {!['instagram', 'facebook', 'twitter'].includes(social.platform.toLowerCase()) && <span className="text-xs">{social.platform.substring(0,2)}</span>}
                </a>
              ))}
              {(!settings?.socials || settings.socials.length === 0) && (
                <>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-primary transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-primary transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-primary transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-xl mb-8">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About CoCAHM</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">Our Courses</Link></li>
              <li><Link href="/faculty" className="hover:text-white transition-colors">Our Faculty</Link></li>
              <li><Link href="/alumni" className="hover:text-white transition-colors">Alumni Success</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
              <li><Link href="/student-life" className="hover:text-white transition-colors">Student Life</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/enroll" className="hover:text-white transition-colors">Admissions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-xl mb-8">Contact Us</h4>
            <ul className="space-y-6 text-gray-400 text-sm">
              <li className="flex gap-4">
                <MapPin className="w-5 h-5 text-brand-primary shrink-0" />
                <span>{settings?.address || "Abavana Junction, Towards Maamobi Hospital"}</span>
              </li>
              <li className="flex gap-4">
                <Phone className="w-5 h-5 text-brand-primary shrink-0" />
                <span className="whitespace-pre-line">{settings?.phone || "+233 (0)24 286 9439\n024 370 8575\n050 230 0165"}</span>
              </li>
              <li className="flex gap-4">
                <Mail className="w-5 h-5 text-brand-primary shrink-0" />
                <span>{settings?.email || "info@cocahm.com"}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-xl mb-8">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-6">Subscribe to get the latest culinary tips and school updates.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-brand-primary transition-colors"
              />
              <button type="button" className="bg-brand-primary px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500 uppercase tracking-widest">
          <p>© 2026 {settings?.title || SCHOOL_NAME}. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
