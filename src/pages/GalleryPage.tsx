import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { GALLERY_ITEMS } from '../data/bakeryData';
import { GalleryCategory } from '../types/bakery';
import { usePageSeo } from '../hooks/usePageSeo';
import { ResilientImage } from '../components/ResilientImage';

const GALLERY_CATEGORIES: GalleryCategory[] = [
  'All',
  'Cakes',
  'Pastries',
  'Breads',
  'Cookies & Biscuits',
  'Savouries',
  'Desserts',
];

export function GalleryPage() {
  usePageSeo({
    title: 'Gallery | Cakes, Pastries & Bakery Highlights — National Bakery',
    description:
      'Explore visual highlights of cakes, pastries, fresh breads, cookies, biscuits, savouries, and desserts from National Bakery in Baranpura, Vadodara.',
  });

  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const activeItem =
    lightboxIndex !== null && filteredItems[lightboxIndex]
      ? filteredItems[lightboxIndex]
      : null;

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
    );
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length
        );
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredItems.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <div className="min-h-screen bg-[#FFF7EB]">
      {/* Page Hero */}
      <section className="bg-[#17283B] text-[#FFF7EB] pt-32 pb-16 sm:pb-20 bg-navy-arch-grid border-b border-[#D6B17A]/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold tracking-wider text-[#D6B17A]">
              Bakery Visual Showcase
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#FFF7EB] leading-tight">
              The National Bakery Gallery
            </h1>
            <p className="text-base sm:text-lg text-[#FFF7EB]/80 leading-relaxed">
              A closer look at celebration cakes, layered cream pastries, warm loaves,
              golden cookies, flaky savouries, and desserts.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-6 bg-[#FFFCF7] border-b border-[#17283B]/10 sticky top-[62px] z-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
          <div
            className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0"
            role="tablist"
            aria-label="Gallery category filters"
          >
            {GALLERY_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveCategory(category);
                    setLightboxIndex(null);
                  }}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-all duration-200 ${
                    isActive
                      ? 'bg-[#C96A35] text-[#FFF7EB] shadow-sm'
                      : 'bg-[#FFF7EB] text-[#272421] hover:bg-[#17283B]/8 border border-[#17283B]/10'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
          <span className="hidden md:inline text-xs text-[#796E64] tabular-nums shrink-0">
            {filteredItems.length} Photographs
          </span>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item, idx) => (
              <motion.button
                key={item.id}
                type="button"
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                onClick={() => setLightboxIndex(idx)}
                className="group relative block w-full break-inside-avoid rounded-2xl overflow-hidden bg-[#17283B] shadow-sm text-left cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C96A35]"
                aria-label={`Open ${item.title} in lightbox`}
              >
                <div className={`${item.aspectClass} w-full overflow-hidden`}>
                  <ResilientImage
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#101D2B]/90 via-[#101D2B]/20 to-transparent opacity-75 group-hover:opacity-95 transition-opacity duration-300" />

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#101D2B]/60 backdrop-blur-sm border border-[#FFF7EB]/25 text-[#FFF7EB] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Expand className="w-4 h-4" aria-hidden="true" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs font-medium text-[#D6B17A]">
                    {item.category}
                  </p>
                  <h2 className="mt-0.5 font-serif text-xl font-semibold text-[#FFF7EB]">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-xs text-[#FFF7EB]/80 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Lightbox */}
      <AnimatePresence>
        {activeItem && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#101D2B]/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="fixed top-5 right-5 z-20 w-11 h-11 rounded-full bg-[#FFF7EB]/10 hover:bg-[#FFF7EB]/20 border border-[#FFF7EB]/25 text-[#FFF7EB] flex items-center justify-center transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#FFF7EB]/10 hover:bg-[#C96A35] border border-[#FFF7EB]/25 text-[#FFF7EB] flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#FFF7EB]/10 hover:bg-[#C96A35] border border-[#FFF7EB]/25 text-[#FFF7EB] flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full flex flex-col items-center gap-4"
            >
              <div className="w-full max-h-[75vh] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-[#D6B17A]/25">
                <ResilientImage
                  src={activeItem.image}
                  alt={activeItem.alt}
                  loading="eager"
                  className="w-full h-full"
                />
              </div>

              <div className="text-center max-w-xl px-4">
                <p className="text-xs font-medium text-[#D6B17A] tabular-nums">
                  {activeItem.category} · {lightboxIndex + 1} / {filteredItems.length}
                </p>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-[#FFF7EB]">
                  {activeItem.title}
                </h3>
                <p className="mt-1 text-sm text-[#FFF7EB]/80">{activeItem.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
