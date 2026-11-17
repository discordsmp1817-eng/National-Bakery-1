/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ErrorInfo, ReactNode, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

gsap.registerPlugin(ScrollTrigger);

interface ErrorBoundaryState {
  hasError: boolean;
}

class AppErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Application render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF7EB] text-[#17283B] p-6 text-center">
          <h1 className="font-serif text-3xl font-semibold">National Bakery</h1>
          <p className="mt-3 text-sm text-[#796E64] max-w-md">
            Something went wrong while loading this page. Please refresh to try again or
            contact us on 9898589930.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 px-5 py-2.5 rounded-lg bg-[#C96A35] text-[#FFF7EB] text-sm font-semibold"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}

function AppShell() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    try {
      lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on('scroll', ScrollTrigger.update);

      tick = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    } catch (err) {
      console.warn('Smooth scroll initialization skipped:', err);
    }

    return () => {
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF7EB] text-[#272421]">
      <ScrollManager />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

export default function App() {
  return (
    <AppErrorBoundary>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AppErrorBoundary>
  );
}
