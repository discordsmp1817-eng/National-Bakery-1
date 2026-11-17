import { useEffect, useState } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { buildWhatsAppUrl } from '../data/bakeryData';

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 420);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-[#17283B] text-[#FFF7EB] border border-[#D6B17A]/35 shadow-lg hover:bg-[#101D2B] flex items-center justify-center transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={buildWhatsAppUrl(
          'Hello National Bakery! I would like to know more about your bakery products.'
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 h-12 px-4 sm:px-5 rounded-full bg-[#C96A35] hover:bg-[#B05726] text-[#FFF7EB] shadow-[0_10px_28px_rgba(201,106,53,0.35)] text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
        aria-label="Chat with National Bakery on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline whitespace-nowrap">WhatsApp Enquiry</span>
      </a>
    </div>
  );
}
