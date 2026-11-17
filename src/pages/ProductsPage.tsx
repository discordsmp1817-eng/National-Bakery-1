import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MessageCircle, Search, SlidersHorizontal } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BAKERY_PRODUCTS, buildWhatsAppUrl } from '../data/bakeryData';
import { BakeryProduct, ProductCategory } from '../types/bakery';
import { usePageSeo } from '../hooks/usePageSeo';
import { ResilientImage } from '../components/ResilientImage';
import { ProductModal } from '../components/ProductModal';

const PRODUCT_CATEGORIES: ProductCategory[] = [
  'All Products',
  'Cakes',
  'Pastries',
  'Breads',
  'Cookies',
  'Biscuits',
  'Savouries',
  'Desserts',
];

export function ProductsPage() {
  usePageSeo({
    title: 'Our Products | Cakes, Pastries & Breads — National Bakery Vadodara',
    description:
      'Browse cakes, fresh cream pastries, breads, cookies, biscuits, savouries, and desserts at National Bakery in Baranpura, Vadodara. Enquire on WhatsApp.',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const initialParam = searchParams.get('category') as ProductCategory | null;
  const validInitial =
    initialParam && PRODUCT_CATEGORIES.includes(initialParam)
      ? initialParam
      : 'All Products';

  const [activeCategory, setActiveCategory] = useState<ProductCategory>(validInitial);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<BakeryProduct | null>(null);

  const handleCategoryChange = (category: ProductCategory) => {
    setActiveCategory(category);
    if (category === 'All Products') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const filteredProducts = useMemo(() => {
    return BAKERY_PRODUCTS.filter((item) => {
      const matchesCat =
        activeCategory === 'All Products' || item.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FFF7EB]">
      {/* Page Hero */}
      <section className="bg-[#17283B] text-[#FFF7EB] pt-32 pb-16 sm:pb-20 bg-navy-arch-grid border-b border-[#D6B17A]/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold tracking-wider text-[#D6B17A]">
              National Bakery · Vadodara
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#FFF7EB] leading-tight">
              Explore Our Bakery Selection
            </h1>
            <p className="text-base sm:text-lg text-[#FFF7EB]/80 leading-relaxed">
              Browse celebration cakes, cream pastries, fresh breads, cookies, biscuits,
              savouries, and desserts. Items below represent illustrative bakery favourites;
              enquire directly for current counter availability and custom requests.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search Toolbar */}
      <section className="py-8 bg-[#FFFCF7] border-b border-[#17283B]/10 sticky top-[62px] z-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Category Filter Tabs */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 no-scrollbar"
            role="tablist"
            aria-label="Product categories"
          >
            {PRODUCT_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-all duration-200 ${
                    isActive
                      ? 'bg-[#17283B] text-[#FFF7EB] shadow-sm'
                      : 'bg-[#FFF7EB] text-[#272421] hover:bg-[#17283B]/8 border border-[#17283B]/10'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search
              className="w-4 h-4 text-[#796E64] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cakes, bread, cookies..."
              aria-label="Search bakery products"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#FFF7EB] border border-[#17283B]/15 text-sm text-[#272421] placeholder:text-[#796E64] focus:border-[#C96A35] focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs sm:text-sm text-[#796E64]">
            <p className="inline-flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#C96A35]" aria-hidden="true" />
              <span className="tabular-nums">
                Showing {filteredProducts.length}{' '}
                {filteredProducts.length === 1 ? 'item' : 'items'} in {activeCategory}
              </span>
            </p>
            <p>Click any item to view details or enquire directly on WhatsApp.</p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl bg-[#FFFCF7] border border-[#17283B]/10 p-12 text-center space-y-4">
              <p className="font-serif text-2xl font-semibold text-[#17283B]">
                No matching bakery items found
              </p>
              <p className="text-sm text-[#796E64] max-w-md mx-auto">
                Try clearing your search or switching to All Products, or message us on
                WhatsApp to ask about specific cakes or treats.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    handleCategoryChange('All Products');
                  }}
                  className="px-5 py-2.5 rounded-lg bg-[#17283B] text-[#FFF7EB] text-sm font-semibold"
                >
                  Reset Filters
                </button>
                <a
                  href={buildWhatsAppUrl(
                    'Hello National Bakery! I am looking for a specific bakery product.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C96A35] text-[#FFF7EB] text-sm font-semibold"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.article
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="group bg-[#FFFCF7] rounded-2xl overflow-hidden border border-[#17283B]/10 shadow-sm flex flex-col justify-between transition-shadow duration-300 hover:shadow-md"
                  >
                    <div>
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        className="block w-full aspect-[4/3] overflow-hidden cursor-pointer"
                        aria-label={`Open details for ${product.name}`}
                      >
                        <ResilientImage
                          src={product.image}
                          alt={product.alt}
                          className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </button>

                      <div className="p-6 pb-4">
                        <div className="text-xs font-medium text-[#796E64]">
                          <span>{product.category}</span>
                          <span aria-hidden="true" className="mx-1.5">
                            ·
                          </span>
                          <span>Illustrative Bakery Item</span>
                        </div>
                        <h2 className="mt-2 font-serif text-2xl font-semibold text-[#17283B]">
                          <button
                            type="button"
                            onClick={() => setSelectedProduct(product)}
                            className="text-left hover:text-[#C96A35] transition-colors"
                          >
                            {product.name}
                          </button>
                        </h2>
                        <p className="mt-2.5 text-sm text-[#796E64] leading-relaxed">
                          {product.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 flex items-center gap-3">
                      <a
                        href={buildWhatsAppUrl(
                          `Hello National Bakery! I would like to enquire about ${product.name} (${product.category}).`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#C96A35] hover:bg-[#B05726] text-[#FFF7EB] text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Enquire Now</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        className="px-4 py-2.5 rounded-lg border border-[#17283B]/15 hover:bg-[#17283B]/5 text-[#17283B] text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
