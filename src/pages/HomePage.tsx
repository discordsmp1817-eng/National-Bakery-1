import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Award,
  Cake,
  Coffee,
  ExternalLink,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Sparkles,
  Star,
} from 'lucide-react';
import {
  BAKERY_PRODUCTS,
  BUSINESS_INFO,
  CATEGORY_SHOWCASE,
  GALLERY_ITEMS,
  HERO_IMAGE,
  SAVOURIES_PORTRAIT_IMAGE,
  WHY_CHOOSE_US,
  buildWhatsAppUrl,
} from '../data/bakeryData';
import { BakeryProduct } from '../types/bakery';
import { usePageSeo } from '../hooks/usePageSeo';
import { ResilientImage } from '../components/ResilientImage';
import { ProductModal } from '../components/ProductModal';
import { LocationSection } from '../components/LocationSection';

gsap.registerPlugin(ScrollTrigger);

const WHY_ICONS = [Cake, Sparkles, Coffee, HeartHandshake, MapPin];

export function HomePage() {
  usePageSeo({
    title: 'National Bakery | Cakes, Pastries & Fresh Bread in Vadodara',
    description:
      'Visit National Bakery on Baranpura Main Road, Vadodara for freshly baked cakes, pastries, breads, cookies, savouries, and desserts. Rated 4.2/5 across 110 reviews.',
  });

  const [selectedProduct, setSelectedProduct] = useState<BakeryProduct | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

  const featuredProducts = BAKERY_PRODUCTS.filter((p) => p.featured);
  const previewGallery = GALLERY_ITEMS.slice(0, 5);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero Entrance Animation
      gsap.from('.hero-animate', {
        y: 22,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      // 2. Subtle Parallax on Hero Image
      if (heroBgRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 14,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 3. Staggered Category Cards Reveal
      gsap.from('.category-card', {
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power2.out',
        immediateRender: false,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.categories-grid',
          start: 'top 86%',
          once: true,
        },
      });

      // 4. Featured Products Reveal
      gsap.from('.featured-product-card', {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: 'power2.out',
        immediateRender: false,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.featured-grid',
          start: 'top 86%',
          once: true,
        },
      });

      // 5. About Split Reveal
      gsap.from('.about-reveal', {
        x: -20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        immediateRender: false,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.about-split',
          start: 'top 85%',
          once: true,
        },
      });

      // 6. Why Choose Us Pillars
      gsap.from('.why-pillar', {
        y: 22,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power2.out',
        immediateRender: false,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.why-grid',
          start: 'top 86%',
          once: true,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="overflow-x-clip">
      {/* 1. IMMERSIVE HERO SECTION */}
      <section className="hero-section relative min-h-[88vh] lg:min-h-[92vh] flex items-end pb-14 sm:pb-20 pt-28 overflow-hidden bg-[#101D2B]">
        <div
          ref={heroBgRef}
          className="absolute inset-0 -top-10 -bottom-10 will-change-transform"
          aria-hidden="true"
        >
          <ResilientImage
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full"
          />
        </div>

        {/* Measured multi-stop scrim for crisp WCAG AA contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#101D2B]/95 via-[#17283B]/72 to-[#101D2B]/45"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
          <div className="max-w-3xl space-y-6">
            <div className="hero-animate flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-medium text-[#D6B17A] tracking-wide">
              <span>Baranpura Main Road, Vadodara</span>
              <span aria-hidden="true" className="text-[#FFF7EB]/40">
                ·
              </span>
              <span className="inline-flex items-center gap-1.5 tabular-nums text-[#FFF7EB]/90">
                <Star
                  className="w-3.5 h-3.5 fill-[#D6B17A] text-[#D6B17A]"
                  aria-hidden="true"
                />
                {BUSINESS_INFO.googleRating}/5 Customer Rating ({BUSINESS_INFO.totalReviews}{' '}
                Reviews)
              </span>
            </div>

            <h1 className="hero-animate font-serif text-4xl sm:text-5xl lg:text-[3.85rem] font-semibold text-[#FFF7EB] leading-[1.08] tracking-tight">
              Freshly Baked Happiness, Every Single Day.
            </h1>

            <p className="hero-animate text-base sm:text-lg text-[#FFF7EB]/85 max-w-xl leading-relaxed">
              From delightful cakes to freshly baked treats, discover the taste of
              happiness at National Bakery in the heart of Vadodara.
            </p>

            <div className="hero-animate pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#C96A35] hover:bg-[#B05726] active:scale-[0.98] text-[#FFF7EB] text-sm sm:text-base font-semibold whitespace-nowrap transition-all duration-200 shadow-lg"
              >
                <span>Explore Our Products</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-[#FFF7EB]/35 bg-[#17283B]/45 hover:bg-[#FFF7EB]/15 backdrop-blur-sm text-[#FFF7EB] text-sm sm:text-base font-semibold whitespace-nowrap transition-all duration-200"
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORIES — ASYMMETRIC EDITORIAL LAYOUT */}
      <section className="py-20 sm:py-24 bg-[#FFF7EB] bg-bakery-grain">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-semibold tracking-wider text-[#C96A35]">
                Bakery Craft &amp; Variety
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold text-[#17283B] leading-tight">
                Baked Varieties for Every Table
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#796E64] max-w-md leading-relaxed">
              Explore our signature bakery categories crafted for family celebrations,
              evening tea, and daily breakfasts.
            </p>
          </div>

          <div className="categories-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {/* Row 1: Wide Cakes + Tall Savouries */}
            <Link
              to={`/products?category=${encodeURIComponent(CATEGORY_SHOWCASE[0].filterCategory)}`}
              className="category-card group lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[16/10] bg-[#17283B] shadow-sm"
            >
              <ResilientImage
                src={CATEGORY_SHOWCASE[0].image}
                alt={CATEGORY_SHOWCASE[0].alt}
                className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101D2B]/90 via-[#101D2B]/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#FFF7EB]">
                    {CATEGORY_SHOWCASE[0].title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#FFF7EB]/85 max-w-md">
                    {CATEGORY_SHOWCASE[0].description}
                  </p>
                </div>
                <span className="w-10 h-10 rounded-full bg-[#C96A35] text-[#FFF7EB] inline-flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </Link>

            <Link
              to={`/products?category=${encodeURIComponent(CATEGORY_SHOWCASE[4].filterCategory)}`}
              className="category-card group lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full bg-[#17283B] shadow-sm"
            >
              <ResilientImage
                src={CATEGORY_SHOWCASE[4].image}
                alt={CATEGORY_SHOWCASE[4].alt}
                className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101D2B]/90 via-[#101D2B]/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#FFF7EB]">
                    {CATEGORY_SHOWCASE[4].title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#FFF7EB]/85 max-w-sm">
                    {CATEGORY_SHOWCASE[4].description}
                  </p>
                </div>
                <span className="w-10 h-10 rounded-full bg-[#FFF7EB]/15 border border-[#FFF7EB]/30 text-[#FFF7EB] inline-flex items-center justify-center shrink-0 transition-colors duration-200 group-hover:bg-[#C96A35] group-hover:border-[#C96A35]">
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </Link>

            {/* Row 2: 4 Complementary Editorial Cards */}
            {[
              CATEGORY_SHOWCASE[1],
              CATEGORY_SHOWCASE[2],
              CATEGORY_SHOWCASE[3],
              CATEGORY_SHOWCASE[5],
            ].map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${encodeURIComponent(cat.filterCategory)}`}
                className="category-card group lg:col-span-3 relative rounded-2xl overflow-hidden bg-[#FFFCF7] border border-[#17283B]/10 shadow-sm flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <ResilientImage
                    src={cat.image}
                    alt={cat.alt}
                    className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#17283B] group-hover:text-[#C96A35] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-[#796E64] leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C96A35]">
                    <span>Browse Category</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SHOWCASE */}
      <section className="py-20 sm:py-24 bg-[#FFFCF7] border-y border-[#17283B]/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-semibold tracking-wider text-[#C96A35]">
                Illustrative Counter Highlights
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#17283B]">
                Popular Bakery Favourites
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <p className="text-xs text-[#796E64] max-w-sm leading-relaxed">
                Examples shown represent classic bakery favourites. Please enquire via
                WhatsApp or phone for today’s counter availability, flavours, and custom
                options.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#17283B]/20 hover:bg-[#17283B] hover:text-[#FFF7EB] text-[#17283B] text-sm font-semibold whitespace-nowrap shrink-0 transition-colors"
              >
                <span>View All Products</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="featured-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <article
                key={product.id}
                className="featured-product-card group bg-[#FFF7EB]/60 rounded-2xl overflow-hidden border border-[#17283B]/10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                    className="block w-full aspect-[4/3] overflow-hidden text-left cursor-pointer"
                    aria-label={`View details for ${product.name}`}
                  >
                    <ResilientImage
                      src={product.image}
                      alt={product.alt}
                      className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </button>

                  <div className="p-5 pb-3">
                    <div className="text-xs font-medium text-[#796E64]">
                      <span>{product.category}</span>
                      <span aria-hidden="true" className="mx-1.5">
                        ·
                      </span>
                      <span>Enquire for Stock</span>
                    </div>
                    <h3 className="mt-1.5 font-serif text-xl font-semibold text-[#17283B]">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        className="text-left hover:text-[#C96A35] transition-colors"
                      >
                        {product.name}
                      </button>
                    </h3>
                    <p className="mt-2 text-sm text-[#796E64] leading-relaxed line-clamp-2">
                      {product.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center gap-2.5">
                  <a
                    href={buildWhatsAppUrl(
                      `Hello National Bakery! I would like to enquire about ${product.name}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#C96A35] hover:bg-[#B05726] text-[#FFF7EB] text-xs font-semibold whitespace-nowrap transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>Enquire Now</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                    className="px-3.5 py-2.5 rounded-lg border border-[#17283B]/15 hover:bg-[#17283B]/5 text-[#17283B] text-xs font-semibold whitespace-nowrap transition-colors"
                  >
                    Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ABOUT NATIONAL BAKERY — SPLIT EDITORIAL */}
      <section className="about-split py-20 sm:py-24 bg-[#FFF7EB]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:min-h-[520px] shadow-md">
              <ResilientImage
                src={SAVOURIES_PORTRAIT_IMAGE.src}
                alt={SAVOURIES_PORTRAIT_IMAGE.alt}
                className="w-full h-full"
              />
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center space-y-6 py-2">
              <p className="about-reveal text-xs font-semibold tracking-wider text-[#C96A35]">
                About National Bakery
              </p>
              <h2 className="about-reveal font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#17283B] leading-tight">
                Bringing Sweet Moments to Life.
              </h2>
              <p className="about-reveal text-base text-[#272421]/85 leading-relaxed">
                At National Bakery in Baranpura, Vadodara, every bake is part of a
                shared moment—whether it is a birthday table surrounded by family, an
                anniversary cake chosen with care, or warm bread and biscuits picked up on
                the way home.
              </p>
              <p className="about-reveal text-base text-[#796E64] leading-relaxed">
                We welcome local families and neighbourhood regulars with an inviting
                counter of cakes, fresh cream pastries, daily loaves, crisp cookies, and
                flaky savouries, backed by friendly, attentive service.
              </p>

              <div className="about-reveal pt-4 grid grid-cols-2 gap-6 border-t border-[#17283B]/12">
                <div>
                  <p className="font-serif text-3xl font-semibold text-[#17283B] tabular-nums">
                    {BUSINESS_INFO.googleRating}/5
                  </p>
                  <p className="mt-1 text-xs text-[#796E64]">
                    Customer Rating on Google
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-semibold text-[#17283B] tabular-nums">
                    {BUSINESS_INFO.totalReviews}
                  </p>
                  <p className="mt-1 text-xs text-[#796E64]">
                    Verified Local Reviews
                  </p>
                </div>
              </div>

              <div className="about-reveal pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#17283B] hover:bg-[#101D2B] text-[#FFF7EB] text-sm font-semibold whitespace-nowrap transition-colors"
                >
                  <span>Read Our Story</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US — MIDNIGHT NAVY BAND */}
      <section className="py-20 sm:py-24 bg-[#17283B] text-[#FFF7EB] bg-navy-arch-grid">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl space-y-3 mb-12">
            <p className="text-xs font-semibold tracking-wider text-[#D6B17A]">
              Why Vadodara Chooses Us
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#FFF7EB]">
              Thoughtful Variety &amp; Local Trust
            </h2>
          </div>

          <div className="why-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => {
              const Icon = WHY_ICONS[idx % WHY_ICONS.length];
              return (
                <div
                  key={item.number}
                  className="why-pillar rounded-2xl bg-[#FFF7EB]/[0.04] border border-[#D6B17A]/20 p-6 flex flex-col justify-between gap-6 transition-colors hover:bg-[#FFF7EB]/[0.07]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-lg font-medium text-[#D6B17A] tabular-nums">
                      {item.number}.
                    </span>
                    <Icon
                      className="w-5 h-5 text-[#D6B17A]"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#FFF7EB] leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-[#FFF7EB]/75 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS + GALLERY PREVIEW */}
      <section className="py-20 sm:py-24 bg-[#FFFCF7] border-b border-[#17283B]/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-16">
          {/* Verified Google Rating Highlight (Zero fabricated testimonials) */}
          <div className="rounded-2xl bg-[#FFF7EB] border border-[#D6B17A]/35 p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-[#C96A35] text-xs font-semibold tracking-wider">
                <Award className="w-4 h-4" aria-hidden="true" />
                <span>Customer Satisfaction in Vadodara</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#17283B]">
                Trusted by Neighbourhood Families
              </h2>
              <p className="text-sm sm:text-base text-[#796E64] leading-relaxed">
                With a {BUSINESS_INFO.googleRating}/5 rating across{' '}
                {BUSINESS_INFO.totalReviews} customer reviews on Google, customers visit
                National Bakery for celebrations, fresh counter treats, and dependable
                service.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 shrink-0">
              <div className="px-6 py-4 rounded-xl bg-[#FFFCF7] border border-[#17283B]/10">
                <div className="flex items-center gap-1.5 text-[#C96A35]">
                  {[0, 1, 2, 3].map((i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#C96A35] text-[#C96A35]"
                      aria-hidden="true"
                    />
                  ))}
                  <Star className="w-4 h-4 fill-[#C96A35]/40 text-[#C96A35]" aria-hidden="true" />
                </div>
                <p className="mt-2 font-serif text-3xl font-semibold text-[#17283B] tabular-nums">
                  {BUSINESS_INFO.googleRating}
                  <span className="text-lg text-[#796E64]">/5</span>
                </p>
                <p className="text-xs text-[#796E64] tabular-nums">
                  Based on {BUSINESS_INFO.totalReviews} Google Reviews
                </p>
              </div>

              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#17283B] hover:bg-[#101D2B] text-[#FFF7EB] text-sm font-semibold whitespace-nowrap transition-colors"
              >
                <span>View Google Reviews</span>
                <ExternalLink className="w-4 h-4 text-[#D6B17A]" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Gallery Preview Strip */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-semibold tracking-wider text-[#C96A35]">
                  Visual Gallery
                </p>
                <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold text-[#17283B]">
                  From Our Display Counter
                </h2>
              </div>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#C96A35] hover:text-[#B05726] whitespace-nowrap transition-colors"
              >
                <span>View Full Gallery</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
              {previewGallery.map((item, index) => (
                <Link
                  key={item.id}
                  to="/gallery"
                  className={`group relative rounded-2xl overflow-hidden bg-[#17283B] ${
                    index === 0 ? 'col-span-2 lg:col-span-1 aspect-[16/10] lg:aspect-[3/4]' : 'aspect-[4/5]'
                  }`}
                >
                  <ResilientImage
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101D2B]/80 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-[11px] font-medium text-[#D6B17A]">
                      {item.category}
                    </p>
                    <p className="font-serif text-base font-medium text-[#FFF7EB] leading-snug">
                      {item.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. LOCATION SECTION */}
      <LocationSection />

      {/* 8. FINAL CALL TO ACTION */}
      <section className="py-20 sm:py-24 bg-[#17283B] text-[#FFF7EB] relative overflow-hidden">
        <div
          className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#C96A35]/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-[#D6B17A]/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-6">
          <p className="text-xs font-semibold tracking-wider text-[#D6B17A]">
            Baranpura, Vadodara
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#FFF7EB] leading-tight">
            Something Delicious Is Waiting for You.
          </h2>
          <p className="text-base sm:text-lg text-[#FFF7EB]/80 max-w-xl mx-auto leading-relaxed">
            Explore our bakery favourites and make every moment a little sweeter.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#C96A35] hover:bg-[#B05726] text-[#FFF7EB] text-sm sm:text-base font-semibold whitespace-nowrap transition-colors shadow-lg"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border border-[#D6B17A]/40 hover:bg-[#FFF7EB]/10 text-[#FFF7EB] text-sm sm:text-base font-semibold whitespace-nowrap transition-colors"
            >
              <span>Contact National Bakery</span>
            </Link>
          </div>
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
