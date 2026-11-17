import { useState } from 'react';
import { Check, Copy, ExternalLink, MapPin, Navigation, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/bakeryData';

interface LocationSectionProps {
  compact?: boolean;
}

export function LocationSection({ compact = false }: LocationSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(BUSINESS_INFO.fullAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      className={`${compact ? 'py-12' : 'py-20 sm:py-24'} bg-[#FFF7EB]`}
      aria-labelledby="location-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Info Card */}
          <div className="lg:col-span-5 bg-[#FFFCF7] rounded-2xl p-7 sm:p-10 border border-[#17283B]/10 shadow-sm flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <p className="text-xs font-semibold tracking-wider text-[#C96A35]">
                Baranpura · Chokhandi Road · Vadodara
              </p>
              <h2
                id="location-heading"
                className="font-serif text-3xl sm:text-4xl font-semibold text-[#17283B] leading-tight"
              >
                Visit National Bakery in Vadodara
              </h2>
              <p className="text-sm sm:text-base text-[#796E64] leading-relaxed">
                Conveniently situated along Baranpura Main Road near Chokhandi Road and
                Chokshi Bazar, making it effortless to pick up fresh breads, pastries, and
                celebration cakes.
              </p>

              <div className="pt-4 border-t border-[#17283B]/10 space-y-4">
                <div className="flex items-start gap-3.5">
                  <MapPin
                    className="w-5 h-5 text-[#C96A35] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#796E64]">Bakery Address</p>
                    <address className="not-italic mt-1 text-sm sm:text-base font-medium text-[#272421] leading-relaxed">
                      {BUSINESS_INFO.name}
                      <br />
                      {BUSINESS_INFO.addressLine1}, {BUSINESS_INFO.addressLine2},
                      <br />
                      {BUSINESS_INFO.cityStatePin}
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone
                    className="w-5 h-5 text-[#C96A35] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#796E64]">Phone Number</p>
                    <a
                      href={`tel:${BUSINESS_INFO.phoneTel}`}
                      className="mt-0.5 inline-block text-base sm:text-lg font-semibold text-[#17283B] hover:text-[#C96A35] tabular-nums transition-colors"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={BUSINESS_INFO.googleDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#C96A35] hover:bg-[#B05726] text-[#FFF7EB] text-sm font-semibold whitespace-nowrap transition-colors"
              >
                <Navigation className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Get Directions</span>
              </a>
              <a
                href={`tel:${BUSINESS_INFO.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#17283B] hover:bg-[#101D2B] text-[#FFF7EB] text-sm font-semibold whitespace-nowrap tabular-nums transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0 text-[#D6B17A]" aria-hidden="true" />
                <span>Call Now</span>
              </a>
              <button
                type="button"
                onClick={handleCopyAddress}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[#17283B]/15 hover:bg-[#17283B]/5 text-[#17283B] text-sm font-semibold whitespace-nowrap transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#C96A35]" aria-hidden="true" />
                    <span>Address Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#796E64]" aria-hidden="true" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Architectural Neighborhood Map Card */}
          <div className="lg:col-span-7 bg-[#17283B] rounded-2xl overflow-hidden border border-[#D6B17A]/25 shadow-sm relative min-h-[360px] flex flex-col justify-between p-7 sm:p-10 bg-navy-arch-grid">
            {/* Subtle architectural map schematic */}
            <svg
              className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
              viewBox="0 0 800 500"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M-40 180 C 160 190, 340 220, 840 160"
                stroke="#D6B17A"
                strokeWidth="3"
              />
              <path
                d="M-40 330 C 200 300, 480 340, 840 310"
                stroke="#FFF7EB"
                strokeWidth="1.5"
                strokeDasharray="6 8"
              />
              <path
                d="M270 -30 L 310 530"
                stroke="#D6B17A"
                strokeWidth="2.5"
              />
              <path
                d="M520 -30 L 490 530"
                stroke="#FFF7EB"
                strokeWidth="1.5"
                strokeDasharray="5 7"
              />
              <circle cx="300" cy="202" r="72" stroke="#D6B17A" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="300" cy="202" r="130" stroke="#D6B17A" strokeWidth="1" opacity="0.5" />
            </svg>

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-medium text-[#D6B17A] tracking-wide">
                <span>Chokshi Bazar</span>
                <span aria-hidden="true" className="mx-2 text-[#FFF7EB]/40">
                  ·
                </span>
                <span>Baranpura, Vadodara 390001</span>
              </div>
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFF7EB] hover:text-[#D6B17A] transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            {/* Central Pin Anchor */}
            <div className="relative z-10 my-auto py-8 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#C96A35] text-[#FFF7EB] shadow-[0_12px_32px_rgba(201,106,53,0.45)] flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7" aria-hidden="true" />
              </div>
              <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#FFF7EB]">
                National Bakery
              </p>
              <p className="mt-2 text-sm text-[#FFF7EB]/80 max-w-md">
                Baranpura Main Road, Chokhandi Road, Chokshi Bazar, Baranpura, Vadodara
              </p>
            </div>

            <div className="relative z-10 pt-5 border-t border-[#FFF7EB]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#FFF7EB]/75">
              <span>Google Rating: {BUSINESS_INFO.googleRating}/5 ({BUSINESS_INFO.totalReviews} Reviews)</span>
              <a
                href={BUSINESS_INFO.googleDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-[#D6B17A] hover:underline"
              >
                <span>Launch Turn-by-Turn Directions</span>
                <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
