import { FormEvent, useState } from 'react';
import {
  AlertCircle,
  Check,
  Copy,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
} from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/bakeryData';
import { usePageSeo } from '../hooks/usePageSeo';
import { LocationSection } from '../components/LocationSection';

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactPage() {
  usePageSeo({
    title: 'Contact Us | National Bakery Baranpura, Vadodara — 9898589930',
    description:
      'Contact National Bakery on Baranpura Main Road, Chokhandi Road, Chokshi Bazar, Vadodara. Call 9898589930, get directions, or send a WhatsApp enquiry.',
  });

  const [form, setForm] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [validatedPayload, setValidatedPayload] = useState<FormState | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (form.fullName.trim().length < 2) {
      next.fullName = 'Please enter your full name.';
    }
    const digitsOnly = form.phone.replace(/\D/g, '');
    if (digitsOnly.length < 10 || digitsOnly.length > 13) {
      next.phone = 'Please enter a valid 10-digit phone number.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (form.subject.trim().length < 3) {
      next.subject = 'Please add a short subject for your enquiry.';
    }
    if (form.message.trim().length < 10) {
      next.message = 'Please enter at least 10 characters in your message.';
    }
    return next;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setValidatedPayload({ ...form });
    }
  };

  const buildPrefilledEnquiryText = (data: FormState) =>
    `Hello National Bakery!\n\nName: ${data.fullName.trim()}\nPhone: ${data.phone.trim()}\nEmail: ${data.email.trim()}\nSubject: ${data.subject.trim()}\n\nMessage:\n${data.message.trim()}`;

  const handleCopySummary = async () => {
    if (!validatedPayload) return;
    try {
      await navigator.clipboard.writeText(buildPrefilledEnquiryText(validatedPayload));
      setCopiedSummary(true);
      window.setTimeout(() => setCopiedSummary(false), 2400);
    } catch {
      setCopiedSummary(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF7EB]">
      {/* Page Hero */}
      <section className="bg-[#17283B] text-[#FFF7EB] pt-32 pb-16 sm:pb-20 bg-navy-arch-grid border-b border-[#D6B17A]/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold tracking-wider text-[#D6B17A]">
              Get In Touch · Vadodara
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#FFF7EB] leading-tight">
              Contact National Bakery
            </h1>
            <p className="text-base sm:text-lg text-[#FFF7EB]/80 leading-relaxed">
              Reach out by phone, message us directly on WhatsApp, or visit our counter on
              Baranpura Main Road, Vadodara.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Cards + Form */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFFCF7] rounded-2xl p-7 sm:p-8 border border-[#17283B]/10 shadow-sm space-y-6">
              <div>
                <p className="text-xs font-semibold tracking-wider text-[#C96A35]">
                  Direct Channels
                </p>
                <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#17283B]">
                  Speak With Our Counter
                </h2>
              </div>

              <div className="space-y-5 pt-2 border-t border-[#17283B]/10">
                <div className="flex items-start gap-3.5">
                  <Phone
                    className="w-5 h-5 text-[#C96A35] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#796E64]">Phone Number</p>
                    <a
                      href={`tel:${BUSINESS_INFO.phoneTel}`}
                      className="mt-0.5 inline-block text-lg font-semibold text-[#17283B] hover:text-[#C96A35] tabular-nums transition-colors"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <MapPin
                    className="w-5 h-5 text-[#C96A35] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#796E64]">Address</p>
                    <address className="not-italic mt-1 text-sm text-[#272421] leading-relaxed">
                      {BUSINESS_INFO.name}
                      <br />
                      {BUSINESS_INFO.fullAddress}
                    </address>
                  </div>
                </div>
              </div>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                <a
                  href={`tel:${BUSINESS_INFO.phoneTel}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#17283B] hover:bg-[#101D2B] text-[#FFF7EB] text-sm font-semibold tabular-nums transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D6B17A]" aria-hidden="true" />
                  <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                </a>
                <a
                  href={buildWhatsAppUrl(
                    'Hello National Bakery! I would like to know more about your bakery products.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#C96A35] hover:bg-[#B05726] text-[#FFF7EB] text-sm font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href={BUSINESS_INFO.googleDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-[#17283B]/15 hover:bg-[#17283B]/5 text-[#17283B] text-sm font-semibold transition-colors"
                >
                  <Navigation className="w-4 h-4 text-[#C96A35]" aria-hidden="true" />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Contact Enquiry Form */}
          <div className="lg:col-span-7 bg-[#FFFCF7] rounded-2xl p-7 sm:p-10 border border-[#17283B]/10 shadow-sm">
            <div className="mb-7">
              <p className="text-xs font-semibold tracking-wider text-[#C96A35]">
                Enquiry Builder
              </p>
              <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#17283B]">
                Send an Enquiry
              </h2>
              <p className="mt-2 text-sm text-[#796E64] leading-relaxed">
                Fill in your details below to validate and prepare your message, then
                send it directly to National Bakery via WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-semibold text-[#17283B] mb-1.5"
                  >
                    Full Name <span className="text-[#C96A35]">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => {
                      setForm({ ...form, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                    }}
                    placeholder="Your full name"
                    className={`w-full px-4 py-3 rounded-lg bg-[#FFF7EB]/70 border text-sm text-[#272421] placeholder:text-[#796E64]/70 focus:outline-none ${
                      errors.fullName
                        ? 'border-red-600 focus:border-red-600'
                        : 'border-[#17283B]/15 focus:border-[#C96A35]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-red-700">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-semibold text-[#17283B] mb-1.5"
                  >
                    Phone Number <span className="text-[#C96A35]">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => {
                      setForm({ ...form, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    placeholder="10-digit mobile number"
                    className={`w-full px-4 py-3 rounded-lg bg-[#FFF7EB]/70 border text-sm text-[#272421] placeholder:text-[#796E64]/70 tabular-nums focus:outline-none ${
                      errors.phone
                        ? 'border-red-600 focus:border-red-600'
                        : 'border-[#17283B]/15 focus:border-[#C96A35]'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-red-700">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-[#17283B] mb-1.5"
                  >
                    Email Address <span className="text-[#C96A35]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 rounded-lg bg-[#FFF7EB]/70 border text-sm text-[#272421] placeholder:text-[#796E64]/70 focus:outline-none ${
                      errors.email
                        ? 'border-red-600 focus:border-red-600'
                        : 'border-[#17283B]/15 focus:border-[#C96A35]'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-red-700">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-semibold text-[#17283B] mb-1.5"
                  >
                    Subject <span className="text-[#C96A35]">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => {
                      setForm({ ...form, subject: e.target.value });
                      if (errors.subject) setErrors({ ...errors, subject: undefined });
                    }}
                    placeholder="Cake enquiry, bulk order, feedback..."
                    className={`w-full px-4 py-3 rounded-lg bg-[#FFF7EB]/70 border text-sm text-[#272421] placeholder:text-[#796E64]/70 focus:outline-none ${
                      errors.subject
                        ? 'border-red-600 focus:border-red-600'
                        : 'border-[#17283B]/15 focus:border-[#C96A35]'
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-red-700">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold text-[#17283B] mb-1.5"
                >
                  Message <span className="text-[#C96A35]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  placeholder="Share what bakery products or occasion you are enquiring about..."
                  className={`w-full px-4 py-3 rounded-lg bg-[#FFF7EB]/70 border text-sm text-[#272421] placeholder:text-[#796E64]/70 focus:outline-none resize-y ${
                    errors.message
                      ? 'border-red-600 focus:border-red-600'
                      : 'border-[#17283B]/15 focus:border-[#C96A35]'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-red-700">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#C96A35] hover:bg-[#B05726] text-[#FFF7EB] text-sm font-semibold whitespace-nowrap transition-colors"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Send Message</span>
                </button>
                <span className="text-xs text-[#796E64]">
                  Online email delivery is not configured here—validating prepares your
                  message for direct WhatsApp dispatch.
                </span>
              </div>
            </form>

            {/* Transparent WhatsApp Dispatch Panel after Validated Submit */}
            {validatedPayload && (
              <div className="mt-7 p-6 rounded-xl bg-[#FFF7EB] border border-[#C96A35]/35 space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-[#C96A35]">
                    Message Validated &amp; Ready to Send
                  </p>
                  <h3 className="font-serif text-xl font-semibold text-[#17283B]">
                    Complete Your Enquiry via WhatsApp or Phone
                  </h3>
                  <p className="text-xs text-[#796E64] leading-relaxed">
                    Because this website does not transmit server-side emails, please click
                    below to open WhatsApp with your message pre-filled for National
                    Bakery ({BUSINESS_INFO.phoneDisplay}).
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={buildWhatsAppUrl(buildPrefilledEnquiryText(validatedPayload))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#C96A35] hover:bg-[#B05726] text-[#FFF7EB] text-sm font-semibold whitespace-nowrap transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Send via WhatsApp Now</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-[#17283B]/20 hover:bg-[#17283B]/5 text-[#17283B] text-sm font-semibold whitespace-nowrap transition-colors"
                  >
                    {copiedSummary ? (
                      <>
                        <Check className="w-4 h-4 text-[#C96A35]" aria-hidden="true" />
                        <span>Copied Message</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#796E64]" aria-hidden="true" />
                        <span>Copy Message</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <LocationSection compact />
    </div>
  );
}
