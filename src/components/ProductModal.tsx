import { useEffect } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BakeryProduct } from '../types/bakery';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/bakeryData';
import { ResilientImage } from './ResilientImage';

interface ProductModalProps {
  product: BakeryProduct | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-[#101D2B]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl bg-[#FFFCF7] rounded-2xl overflow-hidden shadow-2xl border border-[#D6B17A]/30 grid grid-cols-1 md:grid-cols-12"
          >
            <div className="md:col-span-6 aspect-[4/3] md:aspect-auto md:h-full">
              <ResilientImage
                src={product.image}
                alt={product.alt}
                loading="eager"
                className="w-full h-full"
              />
            </div>

            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="text-xs font-medium tracking-wide text-[#796E64]">
                    <span>{product.category}</span>
                    <span aria-hidden="true" className="mx-2">
                      ·
                    </span>
                    <span>Illustrative Selection</span>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-10 h-10 -mt-2 -mr-2 rounded-lg text-[#272421] hover:bg-[#17283B]/5 inline-flex items-center justify-center transition-colors shrink-0"
                    aria-label="Close product details"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h3
                  id="product-modal-title"
                  className="mt-3 font-serif text-2xl sm:text-3xl font-semibold text-[#17283B]"
                >
                  {product.name}
                </h3>

                <p className="mt-3 text-sm sm:text-base text-[#272421]/85 leading-relaxed">
                  {product.fullDescription}
                </p>

                <div className="mt-5 pt-4 border-t border-[#17283B]/10">
                  <p className="text-xs font-semibold text-[#796E64]">Ideal For</p>
                  <p className="mt-1 text-sm text-[#17283B] font-medium">
                    {product.occasions}
                  </p>
                </div>

                <p className="mt-4 text-xs text-[#796E64] leading-relaxed">
                  Availability, flavours, and custom sizes vary daily. Contact National
                  Bakery directly to confirm current stock or discuss your celebration
                  request.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={buildWhatsAppUrl(
                    `Hello National Bakery! I would like to enquire about ${product.name} (${product.category}). Please share availability and options.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#C96A35] hover:bg-[#B05726] text-[#FFF7EB] text-sm font-semibold whitespace-nowrap transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Enquire on WhatsApp</span>
                </a>
                <a
                  href={`tel:${BUSINESS_INFO.phoneTel}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-[#17283B]/20 hover:bg-[#17283B]/5 text-[#17283B] text-sm font-semibold whitespace-nowrap tabular-nums transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0 text-[#C96A35]" aria-hidden="true" />
                  <span>{BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
