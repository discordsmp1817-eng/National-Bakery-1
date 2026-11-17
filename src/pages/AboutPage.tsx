import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink, MessageCircle, Phone, Star } from 'lucide-react';
import {
  ABOUT_DETAIL_IMAGES,
  BUSINESS_INFO,
  HERO_IMAGE,
  SAVOURIES_PORTRAIT_IMAGE,
  buildWhatsAppUrl,
} from '../data/bakeryData';
import { usePageSeo } from '../hooks/usePageSeo';
import { ResilientImage } from '../components/ResilientImage';
import { LocationSection } from '../components/LocationSection';

gsap.registerPlugin(ScrollTrigger);

export function AboutPage() {
  usePageSeo({
    title: 'About Us | National Bakery in Baranpura, Vadodara',
    description:
      'Learn about National Bakery on Baranpura Main Road, Vadodara — bringing freshly baked cakes, pastries, breads, and everyday treats to local families.',
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-block', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        immediateRender: false,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.about-story-grid',
          start: 'top 85%',
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FFF7EB]">
      {/* Page Hero */}
      <section className="bg-[#17283B] text-[#FFF7EB] pt-32 pb-16 sm:pb-20 bg-navy-arch-grid border-b border-[#D6B17A]/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold tracking-wider text-[#D6B17A]">
              Our Bakery Identity
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#FFF7EB] leading-tight">
              Warmth, Quality &amp; Everyday Celebrations in Vadodara
            </h1>
            <p className="text-base sm:text-lg text-[#FFF7EB]/80 leading-relaxed">
              Located on Baranpura Main Road near Chokhandi Road and Chokshi Bazar,
              National Bakery is a welcoming destination for families, celebrations, and
              fresh bakery staples.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Brand Intro */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="about-story-grid grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="about-block lg:col-span-7 rounded-2xl overflow-hidden aspect-[16/10] shadow-sm">
              <ResilientImage
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                loading="eager"
                className="w-full h-full"
              />
            </div>

            <div className="about-block lg:col-span-5 flex flex-col justify-center space-y-5">
              <p className="text-xs font-semibold tracking-wider text-[#C96A35]">
                Local Bakery Showcase
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#17283B] leading-tight">
                A Counter Built Around Community Moments
              </h2>
              <p className="text-base text-[#272421]/85 leading-relaxed">
                From milestone birthdays and family anniversaries to evening snacks and
                morning toast, bakery goods bring people together around the table.
              </p>
              <p className="text-base text-[#796E64] leading-relaxed">
                National Bakery offers a thoughtful assortment across cakes, fresh cream
                pastries, daily breads, cookies, biscuits, puffs, and desserts so every
                visitor finds something fresh and inviting.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#C96A35] hover:bg-[#B05726] text-[#FFF7EB] text-sm font-semibold whitespace-nowrap transition-colors"
                >
                  <span>Explore Our Products</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#17283B]/20 hover:bg-[#17283B]/5 text-[#17283B] text-sm font-semibold whitespace-nowrap transition-colors"
                >
                  <span>View Gallery</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Joy of Sharing Section */}
      <section className="py-16 sm:py-24 bg-[#FFFCF7] border-y border-[#17283B]/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs font-semibold tracking-wider text-[#C96A35]">
              The Joy of Sharing
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#17283B] leading-tight">
              From Everyday Tea-Time to Milestone Birthdays
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#796E64] leading-relaxed">
              <p>
                A good bakery serves two distinct rhythms of daily life: the spontaneous
                comfort of crisp butter cookies, warm puffs, and fresh bread on an ordinary
                weekday, and the joyful anticipation of picking up a cake for someone you
                celebrate.
              </p>
              <p>
                Our goal is straightforward—make it pleasant and convenient for customers
                across Baranpura, Chokshi Bazar, and Vadodara to discover treats they
                love and connect with us easily in person, by phone, or on WhatsApp.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {[
                {
                  title: 'Celebration Cakes',
                  detail: 'Classic chocolate, fruit, and cream cake styles for special days.',
                },
                {
                  title: 'Daily Staples',
                  detail: 'Loaves, biscuits, and cookies suited for family kitchens.',
                },
                {
                  title: 'Evening Bites',
                  detail: 'Fresh cream pastries, brownies, and flaky savoury puffs.',
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="p-4 rounded-xl bg-[#FFF7EB] border border-[#17283B]/10"
                >
                  <h3 className="font-serif text-lg font-semibold text-[#17283B]">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#796E64] leading-relaxed">
                    {card.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-5">
            <div className="rounded-2xl overflow-hidden aspect-[3/4]">
              <ResilientImage
                src={SAVOURIES_PORTRAIT_IMAGE.src}
                alt={SAVOURIES_PORTRAIT_IMAGE.alt}
                className="w-full h-full"
              />
            </div>
            <div className="space-y-4 sm:space-y-5 pt-6">
              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                <ResilientImage
                  src={ABOUT_DETAIL_IMAGES.redVelvet}
                  alt="Red Velvet celebration cake at National Bakery"
                  className="w-full h-full"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                <ResilientImage
                  src={ABOUT_DETAIL_IMAGES.butterCookies}
                  alt="Crisp golden butter cookies and biscuits"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Satisfaction Highlight */}
      <section className="py-16 sm:py-20 bg-[#17283B] text-[#FFF7EB]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-[#D6B17A]">
              Customer Satisfaction
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#FFF7EB]">
              Rated {BUSINESS_INFO.googleRating}/5 Across {BUSINESS_INFO.totalReviews}{' '}
              Reviews
            </h2>
            <p className="text-sm sm:text-base text-[#FFF7EB]/80 leading-relaxed">
              We are grateful to the customers in Vadodara who have shared their
              feedback on Google and made National Bakery part of their routines and
              celebrations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FFF7EB]/10 border border-[#D6B17A]/30">
              <Star className="w-5 h-5 fill-[#D6B17A] text-[#D6B17A]" aria-hidden="true" />
              <span className="font-serif text-xl font-semibold tabular-nums">
                {BUSINESS_INFO.googleRating}/5
              </span>
              <span className="text-xs text-[#FFF7EB]/75 tabular-nums">
                ({BUSINESS_INFO.totalReviews} Reviews)
              </span>
            </div>
            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#C96A35] hover:bg-[#B05726] text-[#FFF7EB] text-sm font-semibold whitespace-nowrap transition-colors"
            >
              <span>Read Google Reviews</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <LocationSection />

      {/* Direct Contact Strip */}
      <section className="pb-20 bg-[#FFF7EB]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="rounded-2xl bg-[#FFFCF7] border border-[#17283B]/10 p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#17283B]">
                Planning a Celebration or Stopping By?
              </h2>
              <p className="mt-1.5 text-sm sm:text-base text-[#796E64]">
                Call us on {BUSINESS_INFO.phoneDisplay} or message us on WhatsApp to ask
                about cakes and daily bakery items.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={buildWhatsAppUrl(
                  'Hello National Bakery! I would like to ask about your bakery products.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#C96A35] hover:bg-[#B05726] text-[#FFF7EB] text-sm font-semibold whitespace-nowrap transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>WhatsApp Us</span>
              </a>
              <a
                href={`tel:${BUSINESS_INFO.phoneTel}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#17283B]/20 hover:bg-[#17283B]/5 text-[#17283B] text-sm font-semibold whitespace-nowrap tabular-nums transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C96A35]" aria-hidden="true" />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
