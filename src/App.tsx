import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  Share2,
  Download,
  Check,
  Printer,
  FileText,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Search,
  ShoppingBag,
  Star,
  Info,
  ChevronRight,
  ChevronLeft,
  X,
  Maximize2,
  CheckCircle,
  ShieldCheck,
  Lock,
  ArrowLeft,
  Paintbrush
} from 'lucide-react';

// ----------------------------------------------------------------------
// CONFIGURATION & STATIC ASSETS
// ----------------------------------------------------------------------
const CHECKOUT_URL = "/checkout";

const GALLERY_IMAGES = [
  { id: 1, title: "110+ Halloween Coloring Pages Cover", subtitle: "Main Collection Cover", src: "https://i.imgur.com/GXbdrFi.jpeg", type: "image" },
  { id: 2, title: "Witch & Cheerful Pumpkins Preview", subtitle: "Adorable kids designs", src: "https://i.imgur.com/IrO9yCi.jpeg", type: "image" },
  { id: 3, title: "Cute Smiling Trick-or-Treaters", subtitle: "Friendly character illustrations", src: "https://i.imgur.com/x5ot4y7.jpeg", type: "image" },
  { id: 4, title: "Spooky Cats & Cozy Castles", subtitle: "Fun kid activity pages", src: "https://i.imgur.com/UzOABrX.jpeg", type: "image" },
  { id: 5, title: "Mini Folding Greeting Cards", subtitle: "Bonus printable activities", src: "https://i.imgur.com/EFsjsqU.jpeg", type: "image" },
  { id: 6, title: "US Letter & A4 High Resolution", subtitle: "Lossless vector lines", src: "https://i.imgur.com/Jn2TOVE.jpeg", type: "image" },
  { id: 7, title: "Cozy Family Screen-Free Afternoon", subtitle: "Instant printable download", src: "https://i.imgur.com/uhB2Ayp.jpeg", type: "image" }
];

// ----------------------------------------------------------------------
// SUB-COMPONENT: WHOP EMBEDDED CHECKOUT
// ----------------------------------------------------------------------
function WhopCheckout({ onBack }: { onBack: () => void }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Inject the Whop elements script
    const existingScript = document.querySelector('script[src="https://cdn.whop.com/elements/amber/elements.js"]') as HTMLScriptElement | null;
    const script = existingScript || (document.createElement('script') as HTMLScriptElement);
    
    if (!existingScript) {
      script.src = "https://cdn.whop.com/elements/amber/elements.js";
      script.setAttribute('data-whop-elements', 'true');
      script.async = true;
      document.body.appendChild(script);
    }

    const initWhop = () => {
      setLoading(false);
      if ((window as any).WhopElements) {
        try {
          const checkout = (window as any).WhopElements().checkout.create({
            plan: "plan_XtFCFsN1ZvDLV",
          });
          checkout.create("checkout").mount("#whop-checkout");
        } catch (err) {
          console.error("Error mounting Whop elements:", err);
        }
      }
    };

    if ((window as any).WhopElements) {
      initWhop();
    } else {
      script.addEventListener('load', initWhop);
    }

    return () => {
      script.removeEventListener('load', initWhop);
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark p-4 sm:p-8 md:p-12 font-sans selection:bg-brand-orange selection:text-white">
      <div className="max-w-xl mx-auto">
        
        {/* Back Link */}
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-dark/70 hover:text-brand-orange transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Product Details</span>
        </button>

        {/* Streamlined Summary (No background cards, clean text, icon-sized image) */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4 items-center">
            {/* Image styled like a small, premium icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-brand-dark/10 shadow-xs shrink-0 bg-white">
              <img 
                src="https://i.imgur.com/GXbdrFi.jpeg" 
                alt="Thumbnail" 
                className="w-full h-full object-cover animate-none" 
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] sm:text-xs font-bold text-brand-orange tracking-widest uppercase block">Digital Printable Bundle</span>
              <h2 className="text-base sm:text-lg font-extrabold text-brand-dark leading-tight">
                110+ Adorable Halloween Coloring Pages for Kids!
              </h2>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-dark/60 font-medium">
                <span>Coloring PDF Bundle x1</span>
                <span>·</span>
                <span className="font-bold text-brand-dark">$9.99</span>
              </div>
            </div>
          </div>

          {/* Pricing Row details */}
          <div className="pt-3 border-t border-brand-dark/5 flex flex-wrap justify-between items-center gap-2 text-xs sm:text-sm text-brand-dark/70">
            <div>
              <span>Sales Tax: </span>
              <span className="font-medium text-brand-dark/50">Calculated at checkout</span>
            </div>
            <div className="text-sm sm:text-base font-extrabold text-brand-dark">
              <span>Total Amount: </span>
              <span className="text-brand-orange text-base sm:text-lg font-black">$9.99</span>
            </div>
          </div>

          {/* Core summary bullet items */}
          <div className="space-y-1.5 pt-2 border-t border-brand-dark/5 text-[11px] sm:text-xs text-brand-dark/75">
            <div className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
              <span>Instant digital access to PDF files directly upon checkout</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
              <span>US Letter & A4 paper printing configurations included</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
              <span>Unconditional home or school printing permissions</span>
            </div>
            <div className="flex items-start gap-2">
              <Lock className="w-3.5 h-3.5 text-brand-sage shrink-0 mt-0.5" />
              <span>Secure checkout encrypted and processed by Whop Commerce.</span>
            </div>
          </div>
        </div>

        {/* PRIMARY HERO CARD: The Whop Checkout Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-dark/10 shadow-xl min-h-[450px] relative">
          {loading && (
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-white rounded-3xl z-10">
              <div className="w-8 h-8 rounded-full border-2 border-brand-orange border-t-transparent animate-spin mb-3"></div>
              <span className="text-xs font-semibold text-brand-dark/60 font-sans">Securing your connection...</span>
            </div>
          )}
          
          {/* The Whop Element anchor container */}
          <div id="whop-checkout" className="w-full"></div>
        </div>

      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// MAIN APP COMPONENT
// ----------------------------------------------------------------------
export default function App() {
  // Simple Path/Hash Routing Setup
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.hash || window.location.pathname;
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.hash || window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Gallery Navigation State
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState(false);

  // Accordion Panel States (Right purchase column)
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({
    'details': true,
    'delivery': false,
    'printing': false,
    'usage': false
  });

  // Mobile Sticky Navigation Hook
  const [showStickyBar, setShowStickyBar] = useState(false);
  const mainBuyButtonRef = useRef<HTMLButtonElement>(null);

  // Monitor scroll position to toggle the mobile sticky bar
  useEffect(() => {
    const handleScroll = () => {
      if (!mainBuyButtonRef.current) return;
      const rect = mainBuyButtonRef.current.getBoundingClientRect();
      // Show sticky bar once the main purchase button leaves the screen top
      setShowStickyBar(rect.bottom < 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAccordion = (key: string) => {
    setExpandedDetails(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Switch renderer dynamically based on path slug
  if (currentPath === '/checkout' || currentPath === '#checkout') {
    return <WhopCheckout onBack={() => navigateTo('/')} />;
  }

  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark font-sans selection:bg-brand-orange selection:text-white antialiased">
      
      {/* ----------------------------------------------------------------------
          MAIN PRODUCT DETAIL SECTION (TWO COLUMNS - ETSY PROPORTIONS)
          ---------------------------------------------------------------------- */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-14">
        
        {/* Core two-column split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          
          {/* LEFT COLUMN: Gallery Viewport (Occupies ~58%) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Gallery Thumbnail Strip (Left vertical stack on Desktop, horizontal on mobile) */}
            <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-x-visible md:overflow-y-auto shrink-0 py-1 md:py-0 scrollbar-none md:max-h-[640px] max-w-full">
              {GALLERY_IMAGES.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg border-2 overflow-hidden transition-all duration-200 bg-brand-sec flex flex-col justify-center items-center relative ${
                    activeImageIdx === idx 
                      ? 'border-brand-orange shadow-md ring-2 ring-brand-orange/10 scale-102' 
                      : 'border-brand-dark/10 hover:border-brand-dark/30 hover:scale-102'
                  }`}
                  aria-label={`View gallery item ${idx + 1}`}
                >
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    className="w-full h-full object-cover animate-none" 
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            {/* Main Primary Interactive Image Frame */}
            <div className="flex-1 relative aspect-[4/3] rounded-2xl overflow-hidden border border-brand-dark/5 bg-brand-sec shadow-sm group">
              
              <div className="w-full h-full relative cursor-zoom-in" onClick={() => setLightboxOpen(true)}>
                <img 
                  src={GALLERY_IMAGES[activeImageIdx].src} 
                  alt={GALLERY_IMAGES[activeImageIdx].title} 
                  className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 text-brand-dark text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to Zoom</span>
                  </div>
                </div>
              </div>

              {/* Slider overlay text label */}
              <div className="absolute bottom-3.5 left-3.5 bg-brand-dark/80 backdrop-blur-md text-white/95 text-xs px-3 py-1.5 rounded-lg">
                {GALLERY_IMAGES[activeImageIdx].title} · {activeImageIdx + 1}/{GALLERY_IMAGES.length}
              </div>

              {/* Slider Left/Right Quick Controls */}
              <button 
                onClick={() => setActiveImageIdx(prev => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1))}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-brand-dark w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setActiveImageIdx(prev => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1))}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-brand-dark w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: Product details & purchase module (Occupies ~42%) */}
          <div className="lg:col-span-5 flex flex-col">
            
            {/* Optimized Headline & Supporting Subheader */}
            <h1 className="font-sans text-3xl sm:text-4xl text-brand-dark font-black leading-tight tracking-tight text-wrap-balance">
              110+ Adorable Halloween Coloring Pages for Kids!
            </h1>
            <p className="text-sm font-semibold text-brand-orange mt-2">
              Keep Little Hands Busy with Hours of Halloween Coloring Fun!
            </p>

            {/* Seller/Brand Line & Share */}
            <div className="flex items-center justify-between mt-4 pb-4 border-b border-brand-dark/5">
              <div className="flex items-center gap-2">
                <span className="text-xs text-brand-dark/60 font-medium">Bestseller in Printables</span>
                <span aria-hidden="true" className="text-brand-dark/30">·</span>
                <div className="flex items-center gap-0.5 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-xs font-bold text-brand-dark">5.0</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-brand-sec rounded-full transition text-brand-dark/70 hover:text-brand-orange" title="Share listing">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-brand-sec rounded-full transition text-brand-dark/70 hover:text-red-500" title="Favorite listing">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Price & Format */}
            <div className="py-5 flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-brand-dark tracking-tight">$9.99</span>
                <span className="text-xs text-brand-dark/50 font-medium uppercase tracking-widest">USD</span>
              </div>
              <div className="flex items-center gap-1.5 bg-brand-sage/10 text-brand-sage px-3 py-1 rounded-lg text-xs font-semibold">
                <Download className="w-3.5 h-3.5" />
                <span>DIGITAL DOWNLOAD</span>
              </div>
            </div>

            {/* Short pitch description */}
            <p className="text-sm text-brand-dark/80 leading-relaxed">
              Celebrate the spooky season with a delightful collection of child-friendly, printable coloring sheets. Designed for little artists to practice motor coordination and enjoy screen-free family time, this premium bundle is instantly ready to print at home!
            </p>

            {/* Primary Buy Action Module */}
            <div className="mt-6 space-y-3">
              <button
                ref={mainBuyButtonRef}
                onClick={() => navigateTo('/checkout')}
                className="w-full bg-brand-orange hover:bg-brand-orange/95 text-white font-semibold text-sm tracking-wide uppercase py-4 rounded-xl transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <span>GET 110+ HALLOWEEN COLORING PAGES</span>
              </button>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 text-xs text-brand-dark/60 text-center">
                <span className="flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5" />
                  <span>Instant PDF Delivery</span>
                </span>
                <span className="hidden sm:inline text-brand-dark/30">•</span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Secure Marketplace Checkout</span>
                </span>
                <span className="hidden sm:inline text-brand-dark/30">•</span>
                <span>Print Unlimited Copies</span>
              </div>
              <p className="text-[11px] text-brand-dark/50 text-center italic mt-1">
                Digital product. No physical item will be shipped.
              </p>
            </div>

            {/* Included highlights Checklist (Clean inline presentation, no pills, immediately visible above fold) */}
            <div className="mt-5 p-4 bg-brand-sec rounded-xl border border-brand-dark/5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-dark/70 mb-3">Instant Product Features:</h4>
              <ul className="space-y-2 text-sm text-brand-dark/80">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <span><strong>110+ Printable Coloring Pages</strong> (featuring friendly pumpkins, ghosts, and witches)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <span><strong>US Letter & A4 formats</strong> (both printable files included in your download)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <span><strong>Bonus Halloween greeting cards</strong> (folding designs for kids to gift)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <span><strong>Instant digital PDF download</strong> (available on screen and via email)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <span><strong>One-time payment of $9.99</strong> (no recurring fees, print as many as you need)</span>
                </li>
              </ul>
            </div>

            {/* Expansion Information Accordion Rows */}
            <div className="mt-8 border-t border-brand-dark/10 divide-y divide-brand-dark/10">
              
              {/* Row 1: Product Details */}
              <div className="py-3.5">
                <button 
                  onClick={() => toggleAccordion('details')}
                  className="w-full flex justify-between items-center text-left font-sans text-sm font-bold text-brand-dark hover:text-brand-orange transition"
                >
                  <span>Product Details</span>
                  {expandedDetails.details ? <ChevronUp className="w-4 h-4 text-brand-dark/50" /> : <ChevronDown className="w-4 h-4 text-brand-dark/50" />}
                </button>
                {expandedDetails.details && (
                  <div className="mt-2.5 text-xs text-brand-dark/75 leading-relaxed space-y-2">
                    <p>Designed with love by digital artists, this premium Halloween printable set is a kid-favorite bundle compiled to trigger imaginative play and screen-free excitement.</p>
                    <p><strong>Themes covered:</strong> Smiling Jack-o'-Lanterns, happy bubbling cauldrons, tiny costumed kittens, friendly waving ghosts, friendly bats, baby spiders, and cute candy baskets.</p>
                    <p><strong>Perfect for:</strong> Preschool/kindergarten class, Halloween party favors, rainy day activity books, family coloring contests, and cozy bedtime drawing sessions.</p>
                  </div>
                )}
              </div>

              {/* Row 2: Digital Delivery */}
              <div className="py-3.5">
                <button 
                  onClick={() => toggleAccordion('delivery')}
                  className="w-full flex justify-between items-center text-left font-sans text-sm font-bold text-brand-dark hover:text-brand-orange transition"
                >
                  <span>Digital Delivery & Return Policy</span>
                  {expandedDetails.delivery ? <ChevronUp className="w-4 h-4 text-brand-dark/50" /> : <ChevronDown className="w-4 h-4 text-brand-dark/50" />}
                </button>
                {expandedDetails.delivery && (
                  <div className="mt-2.5 text-xs text-brand-dark/75 leading-relaxed space-y-2">
                    <p>Your download links are sent automatically immediately after purchase. No physical copy is shipped, avoiding shipping costs and packaging waste.</p>
                    <p>Because digital products are delivered instantly and permanently, we do not accept traditional returns or exchanges. However, if you experience any difficulty opening or printing the files, reach out and we will help you instantly!</p>
                  </div>
                )}
              </div>

              {/* Row 3: Printing Information */}
              <div className="py-3.5">
                <button 
                  onClick={() => toggleAccordion('printing')}
                  className="w-full flex justify-between items-center text-left font-sans text-sm font-bold text-brand-dark hover:text-brand-orange transition"
                >
                  <span>How to Print & Paper Advice</span>
                  {expandedDetails.printing ? <ChevronUp className="w-4 h-4 text-brand-dark/50" /> : <ChevronDown className="w-4 h-4 text-brand-dark/50" />}
                </button>
                {expandedDetails.printing && (
                  <div className="mt-2.5 text-xs text-brand-dark/75 leading-relaxed space-y-2">
                    <p><strong>Step 1:</strong> Save the PDFs to your computer or mobile device.</p>
                    <p><strong>Step 2:</strong> Choose either the "US Letter" format or "A4" format depending on your printer and paper size.</p>
                    <p><strong>Step 3:</strong> Select "Fit to Page" (or "100% Scale") in your printer dialog for perfect margins.</p>
                    <p><strong>Paper Advice:</strong> Standard copy paper is excellent for crayons and colored pencils. For markers, watercolors, or acrylic paints, we highly recommend printing on heavier stock paper (60lb - 110lb cardstock).</p>
                  </div>
                )}
              </div>

              {/* Row 4: Usage Terms */}
              <div className="py-3.5">
                <button 
                  onClick={() => toggleAccordion('usage')}
                  className="w-full flex justify-between items-center text-left font-sans text-sm font-bold text-brand-dark hover:text-brand-orange transition"
                >
                  <span>Usage & License Agreement</span>
                  {expandedDetails.usage ? <ChevronUp className="w-4 h-4 text-brand-dark/50" /> : <ChevronDown className="w-4 h-4 text-brand-dark/50" />}
                </button>
                {expandedDetails.usage && (
                  <div className="mt-2.5 text-xs text-brand-dark/75 leading-relaxed space-y-2">
                    <p>These files are licensed strictly for **Personal & Classroom Use** only.</p>
                    <p>✓ Print as many copies as you need for your children, grandchildren, or students.</p>
                    <p>✗ Commercial redistribution, resale, or sublicensing of the PDF or individual digital drawings is strictly prohibited.</p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </main>

      {/* ----------------------------------------------------------------------
          OPTIMIZED SECTION 2: TAKE A PEEK INSIDE GALLERY (REAL COMPONENT)
          ---------------------------------------------------------------------- */}
      <section className="bg-brand-sec py-16 border-t border-b border-brand-dark/5">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold text-brand-orange tracking-widest uppercase mb-1.5 block">Inside the bundle</span>
            <h2 className="font-sans text-2xl sm:text-3xl text-brand-dark font-extrabold tracking-tight">
              Take a Peek Inside Your Halloween Collection
            </h2>
            <p className="text-xs sm:text-sm text-brand-dark/70 mt-2">
              Every single coloring page is formatted with clean, crisp vector outlines designed specifically to look flawless on standard home printers.
            </p>
          </div>

          {/* Premium Responsive Grid of 6 Real Preview Pages */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {GALLERY_IMAGES.slice(0, 6).map((img, idx) => (
              <div 
                key={img.id}
                onClick={() => {
                  setActiveImageIdx(idx);
                  setLightboxOpen(true);
                }}
                className="bg-white p-3 rounded-2xl border border-brand-dark/5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-zoom-in group"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-brand-sec relative">
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-brand-dark/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/95 text-brand-dark text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1">
                      <Maximize2 className="w-3 h-3 text-brand-orange" />
                      <span>Preview Page</span>
                    </span>
                  </div>
                </div>
                <div className="mt-2.5 px-1">
                  <h4 className="text-xs font-bold text-brand-dark">{img.title}</h4>
                  <p className="text-[10px] text-brand-dark/50 mt-0.5">{img.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------------------------
          OPTIMIZED SECTION 3: IMPROVED BENEFITS SECTION (6 SPECIFIC CARDS)
          ---------------------------------------------------------------------- */}
      <section className="py-16 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold text-brand-sage tracking-widest uppercase mb-1.5 block">Exceptional value</span>
            <h2 className="font-sans text-2xl sm:text-3xl text-brand-dark font-extrabold tracking-tight">
              What Makes This Collection Special
            </h2>
            <p className="text-xs sm:text-sm text-brand-dark/70 mt-2">
              Every detail has been crafted with care to offer a high-quality, delightful coloring experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-brand-sec border border-brand-dark/5 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-4">
                <Paintbrush className="w-5 h-5" />
              </div>
              <h3 className="font-sans text-base font-bold text-brand-dark">110+ Cute Drawings</h3>
              <p className="text-xs text-brand-dark/70 mt-2 leading-relaxed">
                Featuring friendly ghosts, cheerful jack-o'-lanterns, and tiny witches with no scary elements. Thick, bold borders are perfect for toddlers, while interesting details keep older children fully engaged.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-brand-sec border border-brand-dark/5 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-brand-sage/10 text-brand-sage flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-sans text-base font-bold text-brand-dark">US Letter & A4 Sizes</h3>
              <p className="text-xs text-brand-dark/70 mt-2 leading-relaxed">
                Both standard dimensions are included with custom-designed printable margins, avoiding cropped edges, stretching, or layout hassle—simply select your preferred size and print.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-brand-sec border border-brand-dark/5 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-brand-lavender/25 text-brand-lavender flex items-center justify-center mb-4 animate-none">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-sans text-base font-bold text-brand-dark">Bonus Greeting Cards</h3>
              <p className="text-xs text-brand-dark/70 mt-2 leading-relaxed">
                Includes printable folding mini greeting cards that children can color and personalize to gift to classmates, teachers, grandparents, and neighbors for a unique holiday touch.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-brand-sec border border-brand-dark/5 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-brand-dark/5 text-brand-dark flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-sans text-base font-bold text-brand-dark">Instant Digital Access</h3>
              <p className="text-xs text-brand-dark/70 mt-2 leading-relaxed">
                No shipping delay or package wait. Complete payment and immediately receive high-resolution, print-ready PDF files directly on your screen and in your secure email inbox.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-brand-sec border border-brand-dark/5 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4">
                <Printer className="w-5 h-5" />
              </div>
              <h3 className="font-sans text-base font-bold text-brand-dark">Printable at Home</h3>
              <p className="text-xs text-brand-dark/70 mt-2 leading-relaxed">
                Print on standard copy paper or thick cardstock using any home printer. If kids color outside the lines or make mistakes, simply reprint a fresh page as many times as you like.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-brand-sec border border-brand-dark/5 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-sans text-base font-bold text-brand-dark">Personal Use License</h3>
              <p className="text-xs text-brand-dark/70 mt-2 leading-relaxed">
                Licensed for unlimited printing within your own household, playgroups, family events, or private school classrooms. Share creative holiday fun while keeping distribution personal.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ----------------------------------------------------------------------
          OPTIMIZED SECTION 4: PRODUCT CONTENT CATEGORIES (ACCURATE GRID)
          ---------------------------------------------------------------------- */}
      <section className="py-16 bg-[#FAF7F0] border-t border-b border-brand-dark/5">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold text-brand-orange tracking-widest uppercase mb-1.5 block">Organized collection</span>
            <h2 className="font-sans text-2xl sm:text-3xl text-brand-dark font-extrabold tracking-tight">
              Explore Our Halloween Categories
            </h2>
            <p className="text-xs sm:text-sm text-brand-dark/70 mt-2">
              Every category corresponds to the actual digital product files, structured to guide your children's drawing interests.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {[
              { name: "Cheerful Pumpkins", count: "25 Pages", icon: "🎃", style: "Cute faces, wizard hats, piles of pumpkins" },
              { name: "Friendly Waving Ghosts", count: "20 Pages", icon: "👻", style: "Trick-or-treat bags, bedsheet friends" },
              { name: "Playful Witches & Cats", count: "18 Pages", icon: "🐈‍⬛", style: "Cute spellbooks, pointy hats, friendly brooms" },
              { name: "Baby Monsters & Mummies", count: "15 Pages", icon: "🧟", style: "Googly-eyed vampires, cute wrapped mummy boys" },
              { name: "Sweet Halloween Candy", count: "12 Pages", icon: "🍬", style: "Candy apples, chocolates, spooky candy buckets" },
              { name: "Halloween Folding Cards", count: "8 Folding Cards", icon: "✉️", style: "Coloring card gifts with cute message templates" },
              { name: "Spooky Haunted Castles", count: "10 Pages", icon: "🏰", style: "Cute towers, friendly spiderwebs, smiling bats" },
              { name: "Crescent Moons & Bats", count: "10 Pages", icon: "🦇", style: "Night skies, shooting stars, baby flying bats" }
            ].map((category, idx) => (
              <div 
                key={idx}
                className="bg-white border border-brand-dark/5 p-5 rounded-2xl flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-3xl select-none group-hover:scale-110 transition-transform" role="img" aria-label={category.name}>
                    {category.icon}
                  </span>
                  <span className="text-[10px] text-brand-orange uppercase font-bold tracking-wider">
                    {category.count}
                  </span>
                </div>
                <div className="mt-5">
                  <h4 className="text-xs sm:text-sm font-extrabold text-brand-dark">
                    {category.name}
                  </h4>
                  <p className="text-[11px] text-brand-dark/60 mt-1 leading-relaxed">
                    {category.style}
                  </p>
                </div>
              </div>
            ))}

          </div>

          <div className="text-center mt-10">
            <button 
              onClick={() => navigateTo('/checkout')}
              className="inline-flex items-center gap-2 bg-brand-dark text-white hover:bg-brand-dark/95 text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-sm hover:shadow transition cursor-pointer"
            >
              <span>GET ALL 110+ PAGES NOW</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------------------------
          OPTIMIZED SECTION 5: IMPROVED PURCHASE PROCESS (VISUAL TIMELINE)
          ---------------------------------------------------------------------- */}
      <section id="how-it-works" className="py-20 bg-brand-cream">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold text-brand-orange tracking-widest uppercase mb-1.5 block">Frictionless access</span>
            <h2 className="font-sans text-2xl sm:text-3xl text-brand-dark font-extrabold tracking-tight">
              Get Your Coloring Pages in 3 Simple Steps
            </h2>
            <p className="text-xs sm:text-sm text-brand-dark/70 mt-2">
              Our secure purchase workflow ensures you can start printing in under 2 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center px-4 relative">
              <div className="w-14 h-14 rounded-full bg-brand-sec border border-brand-dark/10 flex items-center justify-center font-sans text-lg font-bold text-brand-orange shadow-xs mb-4 relative z-10">
                01
              </div>
              <h3 className="font-sans text-base font-bold text-brand-dark mb-2">01 — Secure Purchase</h3>
              <p className="text-xs text-brand-dark/70 leading-relaxed">
                Click our purchase buttons to checkout securely via Whop Elements. Complete payment using credit card, Apple Pay, or Google Pay.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center px-4 relative">
              <div className="w-14 h-14 rounded-full bg-brand-sec border border-brand-dark/10 flex items-center justify-center font-sans text-lg font-bold text-brand-orange shadow-xs mb-4 relative z-10">
                02
              </div>
              <h3 className="font-sans text-base font-bold text-brand-dark mb-2">02 — Instant PDF Download</h3>
              <p className="text-xs text-brand-dark/70 leading-relaxed">
                Access your print-ready PDF files instantly on your screen. You will also receive an automated email containing lifetime download links.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center px-4 relative">
              <div className="w-14 h-14 rounded-full bg-brand-sec border border-brand-dark/10 flex items-center justify-center font-sans text-lg font-bold text-brand-orange shadow-xs mb-4 relative z-10">
                03
              </div>
              <h3 className="font-sans text-base font-bold text-brand-dark mb-2">03 — Print & Enjoy</h3>
              <p className="text-xs text-brand-dark/70 leading-relaxed">
                Print your favorite categories right at home or take them to any local printing shop. Start coloring with standard paper or heavy cardstock.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ----------------------------------------------------------------------
          OPTIMIZED SECTION 7: DETAILE ACCORDION FAQ (9 SPECIFIC QUESTIONS)
          ---------------------------------------------------------------------- */}
      <section id="faqs" className="py-20 bg-brand-sec border-t border-b border-brand-dark/5">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 md:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-extrabold text-brand-sage tracking-widest uppercase mb-1.5 block">Frequently Asked Questions</span>
            <h2 className="font-sans text-2xl sm:text-3xl text-brand-dark font-extrabold tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What exactly will I receive?",
                a: "You'll receive a high-resolution, print-ready digital collection in PDF format containing over 110 cute Halloween coloring pages and bonus folding mini coloring greeting cards."
              },
              {
                q: "How many coloring pages are included?",
                a: "There are exactly 110+ individual children's coloring pages included in the collection, beautifully categorized, plus the bonus greeting cards."
              },
              {
                q: "Is this a physical book?",
                a: "No. This is a 100% digital product. No physical book will be shipped to your house. This avoids international shipping fees and delivery delays!"
              },
              {
                q: "How do I download my files?",
                a: "Immediately upon completing checkout, you will receive a confirmation screen with instant download access. Additionally, a direct download link is emailed instantly to your email inbox so you can keep and reprint them forever."
              },
              {
                q: "Can I print the pages at home?",
                a: "Absolutely! You can print the pages using a standard home printer, office printer, or save them on a USB stick to print at local print centers."
              },
              {
                q: "Are both A4 and US Letter formats included?",
                a: "Yes. Both printable size formats are included with purchase so you can select the layout that best aligns with your local paper sizes."
              },
              {
                q: "Can I print the pages more than once?",
                a: "Yes, you can print them as many times as you like for your family's personal use or your classroom students. Perfect for siblings, playdates, and second coloring attempts!"
              },
              {
                q: "What age group is this collection designed for?",
                a: "The collection covers a variety of simple and medium drawings. Younger toddlers can easily color the large cute pumpkins and ghosts, while older children will enjoy detailed witch kittens and haunted castles."
              },
              {
                q: "What is your refund policy?",
                a: "Due to the instant delivery nature of digital files, all sales are final. However, if you have any issues opening or printing the files, simply reach out to us and we will assist you immediately."
              }
            ].map((faq, idx) => {
              const faqId = `faq-opt-${idx}`;
              const isOpen = expandedDetails[faqId] || false;
              return (
                <div key={idx} className="bg-brand-cream rounded-xl border border-brand-dark/5 overflow-hidden transition-all duration-200">
                  <button
                    onClick={() => {
                      setExpandedDetails(prev => ({
                        ...prev,
                        [faqId]: !prev[faqId]
                      }));
                    }}
                    className="w-full px-5 py-4 flex justify-between items-center text-left font-sans text-xs sm:text-sm font-bold text-brand-dark hover:text-brand-orange transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-brand-dark/40" /> : <ChevronDown className="w-4 h-4 text-brand-dark/40" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 border-t border-brand-dark/5 text-[11px] sm:text-xs text-brand-dark/75 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------------------------
          OPTIMIZED SECTION 9: IMPROVED FINAL PURCHASE SECTION
          ---------------------------------------------------------------------- */}
      <section className="py-20 bg-brand-cream relative overflow-hidden">
        
        {/* Halloween leaf-shadow overlays */}
        <div className="absolute top-0 left-0 w-32 h-32 text-brand-orange/5 pointer-events-none select-none">
          <svg className="w-full h-full fill-current" viewBox="0 0 100 100">
            <path d="M10,40 Q30,10 50,40 T90,40" />
          </svg>
        </div>

        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          
          <div className="bg-brand-sec rounded-3xl border border-brand-dark/10 p-6 sm:p-10 md:p-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* CTA Copy */}
            <div className="md:col-span-7 text-center md:text-left space-y-4">
              <span className="text-xs font-semibold text-brand-orange tracking-widest uppercase block">Immediate digital access</span>
              <h2 className="font-sans text-3xl sm:text-4xl text-brand-dark font-extrabold leading-tight">
                Ready for a Little Halloween Magic?
              </h2>
              <p className="text-xs sm:text-sm text-brand-dark/70 leading-relaxed">
                Bring home over 110+ adorable Halloween coloring pages and folding greeting cards. Get unlimited personal print rights for a one-time secure payment of $9.99!
              </p>

              <div className="pt-3 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <button 
                  onClick={() => navigateTo('/checkout')}
                  className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/95 text-white font-semibold text-xs sm:text-sm tracking-wide uppercase px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  GET 110+ HALLOWEEN COLORING PAGES
                </button>
              </div>

              <div className="text-[11px] sm:text-xs text-brand-dark/50 italic flex items-center justify-center md:justify-start gap-1">
                <Info className="w-3.5 h-3.5" />
                <span>Instant PDF Download · Print unlimited copies anytime</span>
              </div>
            </div>

            {/* CTA Mini Visual Mockup Grid */}
            <div className="md:col-span-5 bg-white/50 border border-brand-dark/10 rounded-2xl p-4 shadow-sm relative aspect-square max-w-sm mx-auto flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Secondary Page Fan Effect */}
                <div className="absolute top-2 left-6 w-5/6 h-5/6 bg-white/80 border border-brand-dark/10 rounded-lg transform rotate-6 shadow-sm"></div>
                <div className="absolute top-1 left-3 w-5/6 h-5/6 bg-white/90 border border-brand-dark/10 rounded-lg transform -rotate-3 shadow-sm"></div>
                
                {/* Main page stack mockup cover */}
                <div className="absolute inset-0 bg-white border border-brand-dark/15 rounded-xl shadow-md p-4 flex flex-col justify-between items-center text-center">
                  <div className="pt-2">
                    <p className="text-[10px] text-brand-dark/50 mt-1">Ready-To-Print Digital PDF Set</p>
                  </div>
                  
                  {/* Miniature outline character preview */}
                  <div className="w-24 h-24 border border-dashed border-brand-dark/20 rounded-lg flex items-center justify-center bg-brand-cream/20">
                    <svg className="w-16 h-16 text-brand-dark/40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 100 100">
                      <path d="M 50 20 C 35 20 30 35 30 55 C 30 70 35 75 50 75 C 65 75 70 70 70 55 C 70 35 65 20 50 20 Z" />
                      <circle cx="43" cy="45" r="3" fill="currentColor" />
                      <circle cx="57" cy="45" r="3" fill="currentColor" />
                      <path d="M 46 54 Q 50 58 54 54" />
                    </svg>
                  </div>

                  <div className="w-full border-t border-brand-dark/5 pt-2 flex justify-between items-center text-[10px] text-brand-dark/60">
                    <span>Includes US Letter + A4</span>
                    <span className="font-bold text-brand-orange">$9.99 Only</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ----------------------------------------------------------------------
          FOOTER (MINIMAL DISCLAIMER ONLY)
          ---------------------------------------------------------------------- */}
      <footer className="bg-brand-dark text-white/50 py-8 border-t border-white/5 font-sans">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 text-center text-[10px] leading-relaxed">
          Digital Product Disclaimer: Upon completing payment, download is supplied immediately. High resolution vector line-art quality. Licensed exclusively for personal or classroom environment replication.
        </div>
      </footer>

      {/* ----------------------------------------------------------------------
          MOBILE STICKY BUY BAR (ADHERING TO THE 15% aggregate viewport height constraint)
          ---------------------------------------------------------------------- */}
      {showStickyBar && (
        <div className="fixed bottom-0 inset-x-0 bg-brand-dark/95 backdrop-blur-md text-white border-t border-white/10 px-4 py-3 z-40 flex items-center justify-between sm:hidden transition-all duration-300">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-wider text-brand-orange">Halloween Collection</span>
            <span className="text-xs font-bold whitespace-nowrap text-white">Coloring Pages · $9.99</span>
          </div>
          <button 
            onClick={() => navigateTo('/checkout')}
            className="bg-brand-orange text-white font-semibold text-xs uppercase px-4 py-2.5 rounded-lg transition active:scale-95 whitespace-nowrap cursor-pointer"
          >
            GET IT NOW
          </button>
        </div>
      )}

      {/* ----------------------------------------------------------------------
          INTERACTIVE GALLERY LIGHTBOX / DIALOG
          ---------------------------------------------------------------------- */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col justify-between p-4 sm:p-6 select-none animate-fade-in">
          
          {/* Lightbox Header */}
          <div className="flex justify-between items-center text-white font-sans">
            <div>
              <h4 className="text-sm font-bold">{GALLERY_IMAGES[activeImageIdx].title}</h4>
              <p className="text-xs text-white/65">{GALLERY_IMAGES[activeImageIdx].subtitle}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setLightboxZoom(!lightboxZoom)} 
                className="p-2 text-white/85 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer"
                title="Toggle Zoom"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setLightboxOpen(false)} 
                className="p-2 text-white/85 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer"
                title="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Body (Central viewport zoom toggled) */}
          <div className="flex-1 flex items-center justify-center overflow-hidden p-2 sm:p-6">
            <img 
              src={GALLERY_IMAGES[activeImageIdx].src} 
              alt={GALLERY_IMAGES[activeImageIdx].title} 
              className={`transition-all duration-300 max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg ${
                lightboxZoom ? 'scale-130 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
              }`}
              onClick={() => setLightboxZoom(!lightboxZoom)}
            />
          </div>

          {/* Lightbox Footer controls */}
          <div className="flex flex-col items-center gap-4 text-white font-sans">
            <span className="text-xs font-semibold">
              Slide {activeImageIdx + 1} of {GALLERY_IMAGES.length}
            </span>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveImageIdx(prev => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1))}
                className="bg-white/10 hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              {/* Thumbnail Strip inside lightbox */}
              <div className="hidden sm:flex items-center gap-2 max-w-md overflow-x-auto p-1.5 bg-white/5 rounded-xl border border-white/10">
                {GALLERY_IMAGES.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-10 h-10 rounded-md overflow-hidden border transition ${
                      activeImageIdx === idx ? 'border-brand-orange scale-105' : 'border-transparent hover:border-white/50'
                    }`}
                  >
                    <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setActiveImageIdx(prev => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1))}
                className="bg-white/10 hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
