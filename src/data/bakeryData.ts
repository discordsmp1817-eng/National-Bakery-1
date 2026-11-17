import { BakeryProduct, CategoryShowcaseItem, GalleryItem } from '../types/bakery';

import heroBakerySpreadImg from '../assets/images/hero_bakery_spread_1794856967406.jpg';
import chocolateTruffleImg from '../assets/images/product_chocolate_truffle_1794856966527.jpg';
import blackForestImg from '../assets/images/product_black_forest_1794856967173.jpg';
import pineappleCakeImg from '../assets/images/product_pineapple_cake_1794856968900.jpg';
import redVelvetImg from '../assets/images/product_red_velvet_1794856968189.jpg';
import creamPastriesImg from '../assets/images/product_cream_pastries_1794856968911.jpg';
import browniesDessertsImg from '../assets/images/product_brownies_desserts_1794856968890.jpg';
import butterCookiesImg from '../assets/images/product_butter_cookies_1794856968426.jpg';
import freshBreadImg from '../assets/images/product_fresh_bread_1794856970114.jpg';
import savouriesShowcaseImg from '../assets/images/bakery_savouries_showcase_1794856970246.jpg';

export const BUSINESS_INFO = {
  name: 'National Bakery',
  phoneDisplay: '9898589930',
  phoneTel: '+919898589930',
  whatsappNumber: '919898589930',
  addressLine1: 'Baranpura Main Road, Chokhandi Road',
  addressLine2: 'Chokshi Bazar, Baranpura',
  cityStatePin: 'Vadodara, Gujarat 390001, India',
  fullAddress:
    'Baranpura Main Road, Chokhandi Road, Chokshi Bazar, Baranpura, Vadodara, Gujarat 390001, India',
  googleRating: '4.2',
  totalReviews: '110',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=National+Bakery+Baranpura+Main+Road+Chokhandi+Road+Chokshi+Bazar+Baranpura+Vadodara+Gujarat+390001',
  googleDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Baranpura+Main+Road,+Chokhandi+Road,+Chokshi+Bazar,+Baranpura,+Vadodara,+Gujarat+390001',
} as const;

export const HERO_IMAGE = {
  src: heroBakerySpreadImg,
  alt: 'Freshly baked celebration cake, croissants, crusty breads, and butter cookies on a warm bakery display table at National Bakery Vadodara',
};

export const SAVOURIES_PORTRAIT_IMAGE = {
  src: savouriesShowcaseImg,
  alt: 'Flaky golden savouries, croissants, and baked puffs arranged in brass-trimmed bakery glass trays',
};

export const ABOUT_DETAIL_IMAGES = {
  redVelvet: redVelvetImg,
  butterCookies: butterCookiesImg,
};

export function buildWhatsAppUrl(customMessage?: string): string {
  const defaultMessage =
    'Hello National Bakery! I would like to know more about your bakery products.';
  const text = encodeURIComponent(customMessage || defaultMessage);
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`;
}

export const CATEGORY_SHOWCASE: CategoryShowcaseItem[] = [
  {
    id: 'cat-cakes',
    title: 'Cakes',
    filterCategory: 'Cakes',
    description:
      'Celebration cakes suited for birthdays, anniversaries, and family gatherings across Vadodara.',
    image: chocolateTruffleImg,
    alt: 'Rich dark chocolate truffle celebration cake in Baranpura Vadodara',
  },
  {
    id: 'cat-pastries',
    title: 'Pastries',
    filterCategory: 'Pastries',
    description:
      'Layered fresh cream slices and rich pastry favourites prepared for everyday indulgence.',
    image: creamPastriesImg,
    alt: 'Fresh cream chocolate, berry, and butterscotch pastries at National Bakery',
  },
  {
    id: 'cat-bread',
    title: 'Fresh Bread',
    filterCategory: 'Breads',
    description:
      'Soft daily loaves, sandwich breads, and warm baked rolls for family tables.',
    image: freshBreadImg,
    alt: 'Freshly baked loaves of bread and soft buns cooling on a baker rack',
  },
  {
    id: 'cat-cookies',
    title: 'Cookies & Biscuits',
    filterCategory: 'Cookies',
    description:
      'Crisp golden butter cookies and tea-time biscuits baked for sharing with chai or coffee.',
    image: butterCookiesImg,
    alt: 'Golden butter cookies, piped rosettes, and almond biscuits on parchment',
  },
  {
    id: 'cat-savouries',
    title: 'Puffs & Savouries',
    filterCategory: 'Savouries',
    description:
      'Flaky golden puffs and warm savoury bakes crafted for evening snacks and quick bites.',
    image: savouriesShowcaseImg,
    alt: 'Flaky golden puffs and croissants displayed in brass bakery showcase',
  },
  {
    id: 'cat-desserts',
    title: 'Desserts',
    filterCategory: 'Desserts',
    description:
      'Fudgy chocolate brownies, delicate tarts, and sweet treats for dessert lovers.',
    image: browniesDessertsImg,
    alt: 'Fudgy chocolate brownies and caramel dessert tart on dark slate',
  },
];

export const BAKERY_PRODUCTS: BakeryProduct[] = [
  {
    id: 'chocolate-truffle-cake',
    name: 'Chocolate Truffle Cake',
    category: 'Cakes',
    shortDescription:
      'Rich cocoa sponge layered with smooth chocolate ganache for classic celebrations.',
    fullDescription:
      'A classic chocolate lover’s favourite featuring moist chocolate sponge and glossy chocolate ganache finish. Enquire directly with National Bakery to check today’s counter availability, custom sizes, and celebration options.',
    image: chocolateTruffleImg,
    alt: 'Chocolate Truffle Cake example at National Bakery Vadodara',
    featured: true,
    occasions: 'Birthdays · Anniversaries · Family Celebrations',
  },
  {
    id: 'black-forest-cake',
    name: 'Black Forest Cake',
    category: 'Cakes',
    shortDescription:
      'Chocolate sponge, whipped fresh cream, dark chocolate curls, and cherry accents.',
    fullDescription:
      'An enduring family favourite combining chocolate layers, light whipped cream, chocolate shavings, and cherries. Contact us on WhatsApp or visit our Baranpura counter to confirm availability and weight options.',
    image: blackForestImg,
    alt: 'Black Forest Cake example with cherries and chocolate shavings',
    featured: true,
    occasions: 'Birthdays · Everyday Gatherings',
  },
  {
    id: 'pineapple-cake',
    name: 'Pineapple Cake',
    category: 'Cakes',
    shortDescription:
      'Light vanilla sponge finished with fresh cream swirls and bright pineapple notes.',
    fullDescription:
      'Bright, light, and refreshing—an iconic celebration cake loved across generations. Reach out to National Bakery in Baranpura for current availability and custom message requests.',
    image: pineappleCakeImg,
    alt: 'Pineapple Fresh Cream Cake example at National Bakery',
    featured: true,
    occasions: 'Family Dinners · Birthdays · Festive Moments',
  },
  {
    id: 'red-velvet-cake',
    name: 'Red Velvet Cake',
    category: 'Cakes',
    shortDescription:
      'Velvety crimson sponge paired with smooth ivory frosting for special milestones.',
    fullDescription:
      'Striking in presentation and delicate in crumb, suited for anniversaries, engagements, and memorable evenings. Contact our team to enquire about available styles and advance requests.',
    image: redVelvetImg,
    alt: 'Red Velvet Celebration Cake example with ivory frosting',
    featured: true,
    occasions: 'Anniversaries · Milestone Celebrations',
  },
  {
    id: 'fresh-cream-pastries',
    name: 'Fresh Cream Pastries',
    category: 'Pastries',
    shortDescription:
      'Individual pastry slices in chocolate, fruit, and caramel-inspired varieties.',
    fullDescription:
      'Single-serve fresh cream pastries ideal for afternoon cravings, dessert platters, or a quick sweet stop in Chokshi Bazar. Ask our team which flavours are currently on display.',
    image: creamPastriesImg,
    alt: 'Assorted Fresh Cream Pastries at National Bakery Vadodara',
    featured: true,
    occasions: 'Evening Treats · Tea-Time Desserts',
  },
  {
    id: 'chocolate-brownies',
    name: 'Chocolate Brownies',
    category: 'Desserts',
    shortDescription:
      'Dense, chocolate-rich brownies with crisp tops and soft centres.',
    fullDescription:
      'Rich chocolate squares crafted for brownie enthusiasts and sweet gift boxes. Message us on WhatsApp to check today’s batch availability.',
    image: browniesDessertsImg,
    alt: 'Rich Chocolate Brownies at National Bakery',
    featured: true,
    occasions: 'Dessert Cravings · Small Gifts',
  },
  {
    id: 'butter-cookies',
    name: 'Butter Cookies',
    category: 'Cookies',
    shortDescription:
      'Golden, crisp butter cookies and delicate piped tea-time favourites.',
    fullDescription:
      'Melt-in-the-mouth golden butter cookies suited for morning tea, festive gifting, and family snack jars. Call or message us to ask about current cookie selections.',
    image: butterCookiesImg,
    alt: 'Crisp golden Butter Cookies and piped biscuits',
    featured: true,
    occasions: 'Daily Chai · Festive Hosting',
  },
  {
    id: 'freshly-baked-bread',
    name: 'Freshly Baked Bread',
    category: 'Breads',
    shortDescription:
      'Soft daily bread loaves and golden rolls suited for everyday breakfasts.',
    fullDescription:
      'Warm, dependable loaves and soft dinner rolls for toast, sandwiches, and family meals in Vadodara. Visit our Baranpura Road shop or call 9898589930 to check fresh stock.',
    image: freshBreadImg,
    alt: 'Freshly Baked Bread loaves and soft rolls in Vadodara',
    featured: true,
    occasions: 'Daily Breakfast · Sandwiches · Family Meals',
  },
  {
    id: 'almond-tea-biscuits',
    name: 'Crisp Tea Biscuits',
    category: 'Biscuits',
    shortDescription:
      'Lightly baked crunchy biscuits with subtle nutty and aromatic notes.',
    fullDescription:
      'Traditional crisp bakery biscuits made to pair effortlessly with evening masala chai or morning coffee. Enquire at our counter for today’s biscuit varieties.',
    image: butterCookiesImg,
    alt: 'Crisp bakery tea biscuits and almond cookies',
    featured: false,
    occasions: 'Tea Time · Everyday Snacking',
  },
  {
    id: 'flaky-bakery-puffs',
    name: 'Flaky Bakery Puffs',
    category: 'Savouries',
    shortDescription:
      'Crisp, multi-layered golden puff pastries baked for warm savoury snacking.',
    fullDescription:
      'Light, flaky savoury puff pastries and golden baked bites ideal for afternoon hunger or small get-togethers. Check availability at our Chokhandi Road counter.',
    image: savouriesShowcaseImg,
    alt: 'Flaky golden savoury puffs in glass bakery case',
    featured: false,
    occasions: 'Afternoon Snacks · Quick Bites',
  },
  {
    id: 'caramel-dessert-tarts',
    name: 'Caramel & Cocoa Desserts',
    category: 'Desserts',
    shortDescription:
      'Indulgent baked tarts and plated sweet specials for dessert tables.',
    fullDescription:
      'Curated small-format desserts for family dinners and sweet cravings. Connect with us on WhatsApp to ask about current dessert offerings.',
    image: browniesDessertsImg,
    alt: 'Caramel tartlet and chocolate dessert showcase',
    featured: false,
    occasions: 'Dinner Hosting · Weekend Treats',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Signature Bakery Spread',
    category: 'Cakes',
    caption: 'Morning display featuring celebration cakes, pastries, and fresh loaves.',
    image: heroBakerySpreadImg,
    alt: 'Full bakery table spread with cake, croissants, and breads',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'gal-2',
    title: 'Flaky Savoury Counter',
    category: 'Savouries',
    caption: 'Golden puffs and croissants displayed in our brass-trimmed showcase.',
    image: savouriesShowcaseImg,
    alt: 'Golden savoury puffs and croissants inside bakery display',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'gal-3',
    title: 'Dark Chocolate Truffle',
    category: 'Cakes',
    caption: 'Glossy ganache and sculpted dark chocolate curls for celebrations.',
    image: chocolateTruffleImg,
    alt: 'Chocolate truffle celebration cake on ivory stand',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-4',
    title: 'Fresh Cream Pastry Platter',
    category: 'Pastries',
    caption: 'Butterscotch, truffle, and berry cream slices ready for sharing.',
    image: creamPastriesImg,
    alt: 'Fresh cream pastry slices plated on stoneware',
    aspectClass: 'aspect-square',
  },
  {
    id: 'gal-5',
    title: 'Golden Butter Cookies & Biscuits',
    category: 'Cookies & Biscuits',
    caption: 'Crisp piped rosettes and roasted almond tea-time biscuits.',
    image: butterCookiesImg,
    alt: 'Butter cookies and almond biscuits on parchment',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-6',
    title: 'Classic Black Forest Layers',
    category: 'Cakes',
    caption: 'Fresh whipped cream, dark chocolate sponge, and bright cherries.',
    image: blackForestImg,
    alt: 'Black Forest layer cake with fresh cherries',
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-7',
    title: 'Daily Baked Loaves',
    category: 'Breads',
    caption: 'Warm golden loaves and soft rolls cooling on the baker’s rack.',
    image: freshBreadImg,
    alt: 'Freshly baked bread loaves cooling on wire rack',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-8',
    title: 'Red Velvet Celebration',
    category: 'Cakes',
    caption: 'Velvety crimson sponge finished with smooth ivory frosting.',
    image: redVelvetImg,
    alt: 'Red velvet cake with cream frosting on marble stand',
    aspectClass: 'aspect-square',
  },
  {
    id: 'gal-9',
    title: 'Fudgy Brownies & Tartlets',
    category: 'Desserts',
    caption: 'Rich cocoa brownies drizzled with ganache alongside caramel tarts.',
    image: browniesDessertsImg,
    alt: 'Stacked chocolate brownies and caramel dessert tart',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-10',
    title: 'Fresh Cream Pineapple',
    category: 'Cakes',
    caption: 'Classic whipped cream swirls with bright golden pineapple slices.',
    image: pineappleCakeImg,
    alt: 'Fresh cream pineapple cake with cherry garnish',
    aspectClass: 'aspect-[4/3]',
  },
];

export const WHY_CHOOSE_US = [
  {
    number: '01',
    title: 'A Variety of Bakery Treats',
    description:
      'From celebration cakes and cream pastries to breads, cookies, biscuits, and flaky puffs under one roof.',
  },
  {
    number: '02',
    title: 'Products for Every Celebration',
    description:
      'Thoughtful cake styles and sweet assortments suited for birthdays, anniversaries, and family milestones.',
  },
  {
    number: '03',
    title: 'Delicious Everyday Favourites',
    description:
      'Dependable daily bread, tea-time biscuits, and warm savoury snacks crafted for regular household visits.',
  },
  {
    number: '04',
    title: 'Customer-Focused Service',
    description:
      'Warm, approachable assistance at the counter and over phone or WhatsApp to help you choose with ease.',
  },
  {
    number: '05',
    title: 'A Convenient Local Location',
    description:
      'Easy to reach on Baranpura Main Road near Chokhandi Road and Chokshi Bazar in central Vadodara.',
  },
] as const;
