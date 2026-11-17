import { Link } from 'react-router-dom';
import { MapPin, MessageCircle, Navigation, Phone, Star } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/bakeryData';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#17283B] text-[#FFF7EB] border-t border-[#D6B17A]/20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#FFF7EB]/12">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <Link
              to="/"
              className="inline-block font-serif text-3xl font-semibold tracking-tight text-[#FFF7EB]"
            >
              National Bakery
            </Link>
            <p className="text-sm sm:text-base text-[#FFF7EB]/75 max-w-md leading-relaxed">
              Serving freshly baked cakes, pastries, daily breads, cookies, biscuits, and
              warm savouries in Baranpura, Vadodara.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-sm text-[#D6B17A]">
              <span className="inline-flex items-center gap-1.5 font-medium tabular-nums">
                <Star className="w-4 h-4 fill-[#D6B17A] text-[#D6B17A]" aria-hidden="true" />
                {BUSINESS_INFO.googleRating}/5 Rating
              </span>
              <span aria-hidden="true" className="text-[#FFF7EB]/35">
                ·
              </span>
              <span className="tabular-nums text-[#FFF7EB]/80">
                {BUSINESS_INFO.totalReviews} Google Reviews
              </span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif text-lg font-medium text-[#D6B17A]">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Home', to: '/' },
                { label: 'Our Products', to: '/products' },
                { label: 'About Us', to: '/about' },
                { label: 'Gallery', to: '/gallery' },
                { label: 'Contact Us', to: '/contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[#FFF7EB]/80 hover:text-[#D6B17A] transition-colors inline-block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit & Contact Column */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-serif text-lg font-medium text-[#D6B17A]">
              Visit &amp; Contact
            </h3>
            <div className="space-y-3 text-sm text-[#FFF7EB]/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D6B17A] shrink-0 mt-1" aria-hidden="true" />
                <address className="not-italic leading-relaxed">
                  {BUSINESS_INFO.addressLine1}, {BUSINESS_INFO.addressLine2},{' '}
                  {BUSINESS_INFO.cityStatePin}
                </address>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D6B17A] shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${BUSINESS_INFO.phoneTel}`}
                  className="hover:text-[#D6B17A] transition-colors font-medium tabular-nums"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={buildWhatsAppUrl(
                  'Hello National Bakery! I would like to know more about your bakery products.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C96A35] hover:bg-[#B05726] text-[#FFF7EB] text-xs font-semibold whitespace-nowrap transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
              <a
                href={BUSINESS_INFO.googleDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#D6B17A]/35 hover:bg-[#FFF7EB]/10 text-[#FFF7EB] text-xs font-semibold whitespace-nowrap transition-colors"
              >
                <Navigation className="w-4 h-4 text-[#D6B17A]" aria-hidden="true" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#FFF7EB]/60">
          <p>
            © {year} {BUSINESS_INFO.name}. Baranpura Main Road, Vadodara, Gujarat 390001.
          </p>
          <p>Product images illustrate bakery categories. Contact us for daily counter availability.</p>
        </div>
      </div>
    </footer>
  );
}
