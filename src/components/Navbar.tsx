import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, MessageCircle, Phone, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/bakeryData';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Our Products' },
  { to: '/about', label: 'About Us' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact Us' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const useDarkSurface = !isHome || scrolled;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          useDarkSurface
            ? 'bg-[#17283B]/95 backdrop-blur-md border-b border-[#D6B17A]/20 shadow-[0_8px_30px_rgba(16,29,43,0.14)] py-3.5'
            : 'bg-gradient-to-b from-[#101D2B]/80 via-[#101D2B]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line typographic brand wordmark */}
          <Link
            to="/"
            className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#FFF7EB] whitespace-nowrap shrink-0 transition-opacity hover:opacity-90"
            aria-label="National Bakery Home"
          >
            National Bakery
          </Link>

          {/* Zone 2: 5 clean single-line text navigation links */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative text-sm font-medium tracking-wide whitespace-nowrap shrink-0 py-1 transition-colors duration-200 ${
                    isActive
                      ? 'text-[#D6B17A]'
                      : 'text-[#FFF7EB]/90 hover:text-[#FFF7EB]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#D6B17A] transition-transform duration-200 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: 1 primary action + mobile menu toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={buildWhatsAppUrl(
                'Hello National Bakery! I would like to place an enquiry or order.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C96A35] hover:bg-[#B05726] active:scale-[0.98] text-[#FFF7EB] text-sm font-semibold whitespace-nowrap shrink-0 transition-all duration-200 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Order Now</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#FFF7EB]/25 text-[#FFF7EB] hover:bg-[#FFF7EB]/10 transition-colors"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 lg:hidden bg-[#101D2B]/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className="ml-auto w-full max-w-sm h-full bg-[#17283B] text-[#FFF7EB] flex flex-col justify-between p-6 shadow-2xl border-l border-[#D6B17A]/20"
              aria-label="Mobile navigation drawer"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#FFF7EB]/12">
                  <span className="font-serif text-2xl font-semibold text-[#FFF7EB]">
                    National Bakery
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="w-11 h-11 inline-flex items-center justify-center rounded-lg border border-[#FFF7EB]/20 text-[#FFF7EB] hover:bg-[#FFF7EB]/10 transition-colors"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="mt-8 flex flex-col gap-2" aria-label="Mobile links">
                  {NAV_LINKS.map((item, idx) => (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * idx + 0.06 }}
                    >
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        className={({ isActive }) =>
                          `flex items-center justify-between min-h-[48px] px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                            isActive
                              ? 'bg-[#FFF7EB]/10 text-[#D6B17A]'
                              : 'text-[#FFF7EB]/90 hover:bg-[#FFF7EB]/5 hover:text-[#FFF7EB]'
                          }`
                        }
                      >
                        <span>{item.label}</span>
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-[#FFF7EB]/12 space-y-3">
                <p className="text-xs text-[#D6B17A]">
                  {BUSINESS_INFO.addressLine1}, {BUSINESS_INFO.addressLine2}, Vadodara
                </p>
                <div className="grid grid-cols-1 gap-3">
                  <a
                    href={buildWhatsAppUrl(
                      'Hello National Bakery! I would like to place an order or ask about your cakes and bakery items.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-3 rounded-lg bg-[#C96A35] hover:bg-[#B05726] text-[#FFF7EB] text-sm font-semibold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order on WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneTel}`}
                    className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-3 rounded-lg border border-[#D6B17A]/40 text-[#FFF7EB] hover:bg-[#FFF7EB]/10 text-sm font-semibold tabular-nums transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#D6B17A]" />
                    <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
