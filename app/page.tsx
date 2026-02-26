"use client";
import Image from 'next/image';
import { useState, useRef, MouseEvent, TouchEvent, useEffect } from 'react';

export default function Home() {
  
  // --- BEFORE/AFTER SLIDER LOGIC ---
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  // --- SWIPEABLE & AUTO-SCROLLING MARQUEE LOGIC ---
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    
    let animationId: number;
    let isHovered = false;

    const scroll = () => {
      if (!isHovered) {
        marquee.scrollLeft += 1; // Adjust speed here
        // Seamless loop reset trick
        if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
          marquee.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    
    animationId = requestAnimationFrame(scroll);

    const pause = () => isHovered = true;
    const play = () => isHovered = false;

    marquee.addEventListener('mouseenter', pause);
    marquee.addEventListener('mouseleave', play);
    marquee.addEventListener('touchstart', pause, { passive: true });
    marquee.addEventListener('touchend', play);

    return () => {
      cancelAnimationFrame(animationId);
      marquee.removeEventListener('mouseenter', pause);
      marquee.removeEventListener('mouseleave', play);
      marquee.removeEventListener('touchstart', pause);
      marquee.removeEventListener('touchend', play);
    };
  }, []);

  // --- AI CHATBOT & VIDEO MODAL LOGIC ---
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatStep, setChatStep] = useState(1);
  const [isVideoOpen, setIsVideoOpen] = useState(false); 
  
  const handleChatNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatStep === 1) setChatStep(2);
    if (chatStep === 2) {
      setChatStep(3);
      setTimeout(() => setChatStep(4), 3000);
    }
  };

  return (
    <div className="bg-[#FCFBF8] text-[#1A1A1A] font-sans antialiased selection:bg-[#D4AF37] selection:text-white overflow-x-hidden">
      
      {/* 1. ULTRA-LUX NAVIGATION BAR (LIQUID GLASS) */}
      <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-2xl border-b border-[#D4AF37]/20 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-20 md:h-24 flex items-center justify-between">
          
          {/* MOBILE NAV */}
          <div className="flex lg:hidden w-full items-center justify-between relative">
            <button className="text-[#1A1A1A] hover:text-[#D4AF37] transition-colors focus:outline-none">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <div className="absolute left-1/2 transform -translate-x-1/2 font-serif text-xl tracking-[0.2em] font-black uppercase text-[#1A1A1A]">
              POLARIS
            </div>
            <a href="https://glossgenius.com" target="_blank" rel="noreferrer" className="text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </a>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex flex-shrink-0 relative z-50">
            <div className="font-serif text-2xl tracking-[0.25em] font-black uppercase text-[#1A1A1A] flex flex-col">
              POLARIS <span className="text-[9px] tracking-[0.4em] text-[#D4AF37] font-sans -mt-1">Microblading</span>
            </div>
          </div>
          
          <div className="hidden lg:flex space-x-10 text-[#1A1A1A] text-[11px] font-bold uppercase tracking-[0.15em] relative">
            
            {/* LIQUID GLASS APPLE-STYLE DROPDOWN */}
            <div className="relative group py-8">
              <a href="#services" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 cursor-pointer">
                Treatments <span className="text-[8px] group-hover:rotate-180 transition-transform duration-300">▼</span>
              </a>
              
              <div className="absolute top-[80px] left-1/2 transform -translate-x-1/2 pt-4 opacity-0 translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-500 ease-out w-[800px] z-50">
                <div className="bg-white/60 backdrop-blur-3xl border border-white/80 shadow-[0_30px_60px_rgba(0,0,0,0.12)] rounded-3xl p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none"></div>
                  
                  <div className="grid grid-cols-3 gap-8 relative z-10">
                    <div>
                      <h4 className="text-[#D4AF37] font-black text-[9px] uppercase tracking-widest mb-4 border-b border-[#D4AF37]/20 pb-2">Facial Aesthetics</h4>
                      <ul className="space-y-3 font-medium text-gray-600">
                        <li><a href="#services" className="hover:text-[#1A1A1A] transition-colors flex justify-between">Eyebrow Services <span>→</span></a></li>
                        <li><a href="#services" className="hover:text-[#1A1A1A] transition-colors flex justify-between">Lip Services <span>→</span></a></li>
                        <li><a href="#services" className="hover:text-[#1A1A1A] transition-colors flex justify-between">Eyeliner <span>→</span></a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[#D4AF37] font-black text-[9px] uppercase tracking-widest mb-4 border-b border-[#D4AF37]/20 pb-2">Specialty Focus</h4>
                      <ul className="space-y-3 font-medium text-gray-600">
                        <li><a href="#services" className="hover:text-[#1A1A1A] transition-colors flex justify-between">Mens Services <span>→</span></a></li>
                        <li><a href="#services" className="hover:text-[#1A1A1A] transition-colors flex justify-between">Scalp Services <span>→</span></a></li>
                        <li><a href="#services" className="hover:text-[#1A1A1A] transition-colors flex justify-between">Scar Camouflage <span>→</span></a></li>
                      </ul>
                    </div>
                    <div className="bg-[#FAF6F0]/50 rounded-xl p-5 border border-[#D4AF37]/10">
                      <h4 className="text-[#1A1A1A] font-black text-[9px] uppercase tracking-widest mb-2">Master Training</h4>
                      <p className="text-[10px] text-gray-500 leading-relaxed mb-4">Elevate your craft. Get certified by a PhiBrows Master Artist.</p>
                      <a href="#services" className="text-[#D4AF37] text-[9px] font-black uppercase tracking-widest hover:text-[#1A1A1A] transition-colors">View Courses ▶</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <a href="#" className="hover:text-[#D4AF37] transition-colors flex items-center py-8">Portfolio</a>
            <a href="#meet-janna" className="hover:text-[#D4AF37] transition-colors flex items-center py-8">Meet Janna</a>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <a href="https://glossgenius.com" target="_blank" rel="noreferrer" className="bg-[#1A1A1A] hover:bg-[#D4AF37] text-white px-8 py-3.5 rounded-sm text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all duration-500 transform hover:-translate-y-1">
              Book Now
            </a>
          </div>
        </div>
      </nav>

      {/* 2. THE MILLION-DOLLAR HERO SECTION (LOCAL IMAGE) */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-[#FCFBF8] clip-chevron-bottom z-20">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#E6C5C0]/20 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-8 items-center pb-10">
          
          <div className="order-1 max-w-2xl relative z-20 text-center lg:text-left pt-10">
            <h4 className="text-[#D4AF37] text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-6 flex items-center justify-center lg:justify-start gap-4">
              <span className="w-12 h-px bg-[#D4AF37]"></span>
              Columbus's Premier PMU Clinic
            </h4>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#1A1A1A] leading-[1.1] mb-8 tracking-tight">
              The Art of <br className="hidden lg:block"/><span className="italic text-[#D4AF37] font-light">Undetectable</span> <br/>Enhancement.
            </h1>
            <p className="text-sm md:text-base text-gray-500 mb-10 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0 tracking-wide">
              Where world-class PhiBrows precision meets bespoke facial mapping. Wake up flawlessly confident every single day with master artist Janna Sulemann.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="https://glossgenius.com" target="_blank" rel="noreferrer" className="bg-[#D4AF37] hover:bg-[#1A1A1A] text-white px-10 py-4.5 rounded-sm text-xs font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(212,175,55,0.3)] transition-all duration-500 transform hover:-translate-y-1 text-center">
                Reserve Your Appt
              </a>
              <button onClick={() => setIsVideoOpen(true)} className="bg-transparent border border-[#1A1A1A]/20 hover:border-[#D4AF37] hover:bg-white text-[#1A1A1A] px-10 py-4.5 rounded-sm text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-3 group">
                <span className="w-6 h-6 rounded-full border border-[#1A1A1A] group-hover:border-[#D4AF37] flex items-center justify-center pl-0.5 text-[8px]">▶</span> 
                Play Film
              </button>
            </div>
          </div>

          <div className="order-2 relative w-full aspect-[4/5] sm:aspect-square max-w-[450px] lg:max-w-[600px] mx-auto lg:ml-auto group mt-8 lg:mt-0">
            <div className="absolute -inset-4 md:-inset-6 bg-white/40 backdrop-blur-2xl rounded-t-[10rem] rounded-b-lg border border-white/60 shadow-[0_30px_60px_rgba(0,0,0,0.05)] z-0 transform transition-transform duration-1000 group-hover:scale-105"></div>
            
            <div className="absolute inset-0 rounded-t-[9rem] rounded-b-sm overflow-hidden shadow-2xl z-10 bg-[#FAF6F0]">
              {/* LOCAL HERO IMAGE */}
              <img src="/hero.jpg" className="w-full h-full object-cover opacity-95 transition-transform duration-1000 group-hover:scale-110" alt="Flawless Microblading" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/40 to-transparent"></div>
            </div>
            
            <div className="hidden lg:flex absolute -left-12 top-32 z-30 bg-white/90 backdrop-blur-xl border border-white p-5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] items-center gap-4 transform hover:-translate-y-2 transition-transform duration-500">
                <div className="w-12 h-12 rounded-full bg-[#FCFBF8] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.4-6.3-4.8-6.3 4.8 2.3-7.4-6-4.6h7.6z"/></svg>
                </div>
                <div>
                  <div className="text-[#1A1A1A] text-lg font-black tracking-tight leading-none mb-1">89+ Reviews</div>
                  <div className="text-gray-500 text-[9px] uppercase tracking-[0.2em] font-bold">5-Star Google Rating</div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CREDENTIALS STRIP */}
      <section className="bg-white py-14 relative z-10 border-b border-[#D4AF37]/10 -mt-[4vw]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex flex-col xl:flex-row justify-center items-center gap-10 xl:gap-20 pt-8">
            <span className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] whitespace-nowrap text-center">Certified Excellence</span>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                <div className="flex flex-col items-center"><span className="text-[#1A1A1A] font-serif text-3xl italic tracking-widest leading-none">PhiBrows</span><span className="text-[#D4AF37] text-[7px] uppercase tracking-[0.2em] text-center mt-2 font-black">Academy Accredited</span></div>
                <div className="flex flex-col items-center"><span className="text-[#1A1A1A] font-serif text-3xl tracking-widest leading-none">30+</span><span className="text-gray-500 text-[7px] uppercase tracking-[0.2em] text-center mt-2 font-black">Global Certifications</span></div>
                <div className="flex flex-col items-center"><span className="text-[#1A1A1A] font-serif text-3xl tracking-widest leading-none">FCHD</span><span className="text-gray-500 text-[7px] uppercase tracking-[0.2em] text-center mt-2 font-black">Licensed & Inspected</span></div>
            </div>
        </div>
      </section>

      {/* 4. COMPOSITE OVERLAP STATS */}
      <section className="relative z-20 bg-[#FCFBF8] -mt-[1px]">
          <div className="bg-[#FAF6F0] pt-24 lg:pt-32 pb-48 lg:pb-56 relative overflow-hidden">
              <div className="max-w-[1000px] mx-auto px-4 text-center relative z-10">
                  <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-6 tracking-tight leading-tight">
                      Experience Makes <br/><span className="italic text-[#D4AF37]">The Difference.</span>
                  </h2>
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                      At Polaris Microblading, we combine 8 years of dedicated PMU expertise with continuous, world-class education. Ensure your face is in the hands of a true, certified master artist.
                  </p>
              </div>
              <svg className="absolute bottom-[-1px] left-0 w-full h-[8vw] min-h-[50px] text-white z-0 drop-shadow-sm" viewBox="0 0 1440 100" preserveAspectRatio="none">
                  <path fill="currentColor" d="M0,60 Q720,130 1440,30 L1440,105 L0,105 Z" />
              </svg>
          </div>

          <div className="max-w-[1100px] mx-auto px-4 lg:px-6 relative z-30 -mt-36 lg:-mt-44 pb-20">
              <div className="relative drop-shadow-[0_40px_60px_rgba(0,0,0,0.06)]">
                  <div className="absolute -top-3 left-8 right-8 h-6 bg-gradient-to-r from-[#D4AF37] to-[#AA8529] rounded-t-2xl z-0"></div>
                  
                  <div className="bg-white border border-[#D4AF37]/20 rounded-t-[1.5rem] relative z-10 flex flex-col md:flex-row flex-wrap justify-between divide-y md:divide-y-0 md:divide-x divide-gray-100 pt-10 pb-16 px-4">
                      <div className="flex-1 min-w-[140px] px-2 py-6 flex flex-col items-center text-center group">
                          <h4 className="text-[#1A1A1A] font-serif text-4xl mb-3 group-hover:scale-110 group-hover:text-[#D4AF37] transition-all duration-300">8+</h4>
                          <p className="text-gray-400 text-[9px] uppercase tracking-[0.2em] font-black">Years Expertise</p>
                      </div>
                      <div className="flex-1 min-w-[140px] px-2 py-6 flex flex-col items-center text-center group">
                          <h4 className="text-[#1A1A1A] font-serif text-4xl mb-3 group-hover:scale-110 group-hover:text-[#D4AF37] transition-all duration-300">30+</h4>
                          <p className="text-gray-400 text-[9px] uppercase tracking-[0.2em] font-black">Master Certifications</p>
                      </div>
                      <div className="flex-1 min-w-[140px] px-2 py-6 flex flex-col items-center text-center group">
                          <h4 className="text-[#1A1A1A] font-serif text-4xl mb-3 group-hover:scale-110 group-hover:text-[#D4AF37] transition-all duration-300">89+</h4>
                          <p className="text-gray-400 text-[9px] uppercase tracking-[0.2em] font-black">5-Star Reviews</p>
                      </div>
                      <div className="flex-1 min-w-[140px] px-2 py-6 flex flex-col items-center text-center group">
                          <h4 className="text-[#1A1A1A] font-serif text-4xl mb-3 group-hover:scale-110 group-hover:text-[#D4AF37] transition-all duration-300">100%</h4>
                          <p className="text-gray-400 text-[9px] uppercase tracking-[0.2em] font-black">Custom Artistry</p>
                      </div>
                  </div>

                  <svg className="absolute top-[100%] left-0 w-full h-[60px] text-white filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.04)] z-10" viewBox="0 0 1000 60" preserveAspectRatio="none">
                      <polygon fill="currentColor" points="0,0 1000,0 500,60" />
                  </svg>
              </div>
          </div>
      </section>

      {/* 5. MIND-BLOWING BENTO GRID MENU */}
      <section id="services" className="py-24 lg:py-36 bg-white relative z-20 overflow-hidden">
        {/* Deep Luxury Ambient Background Orbs */}
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-bl from-[#D4AF37]/10 via-[#FAF6F0] to-transparent rounded-full blur-[100px] animate-spin-slow pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-[#E6C5C0]/20 to-transparent rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-[#D4AF37]/20 pb-8">
             <div>
                <h4 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                   <span className="w-6 h-px bg-[#D4AF37]"></span> Curated Artistry
                </h4>
                <h2 className="text-4xl md:text-6xl font-serif text-[#1A1A1A] tracking-tight">Signature <span className="italic">Treatments.</span></h2>
             </div>
             <a href="https://glossgenius.com" target="_blank" rel="noreferrer" className="hidden md:inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-black text-[#1A1A1A] hover:text-[#D4AF37] transition-colors group">
               View Full Booking Menu <span className="group-hover:translate-x-1 transition-transform">→</span>
             </a>
          </div>

          {/* Asymmetric Luxury Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* LARGE FEATURED CARD: Eyebrows (Takes 2 columns on desktop) */}
            <div className="lg:col-span-2 bg-[#FCFBF8] border border-gray-100 rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:shadow-[0_40px_80px_rgba(212,175,55,0.08)] hover:-translate-y-1 transition-all duration-500">
               {/* Animated Gradient Glow on Hover */}
               <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-[#FAF6F0] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
               
               <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="mb-10">
                     <span className="text-[#D4AF37] text-[10px] font-black tracking-widest mb-4 block">[ 01 ]</span>
                     <h3 className="font-serif text-4xl text-[#1A1A1A] mb-4">The Eyebrow <span className="italic">Suite</span></h3>
                     <p className="text-sm text-gray-500 leading-relaxed max-w-md">Flawless, undetectable microblading mimicking real hair. Master-level custom shading included to perfect the blend.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8 border-t border-[#D4AF37]/10 pt-8">
                     <div>
                       <div className="flex justify-between items-end mb-2">
                         <h4 className="text-base font-bold text-[#1A1A1A]">Microblading</h4>
                         <span className="text-[#D4AF37] font-black text-xs">$575</span>
                       </div>
                       <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">120 Min</p>
                       <a href="https://glossgenius.com" target="_blank" rel="noreferrer" className="text-[10px] uppercase tracking-widest font-black text-[#1A1A1A] hover:text-[#D4AF37] transition-colors border-b border-black hover:border-[#D4AF37] pb-1">Select Treatment</a>
                     </div>
                     <div>
                       <div className="flex justify-between items-end mb-2">
                         <h4 className="text-base font-bold text-[#1A1A1A]">6-12+ Month Refresh</h4>
                         <span className="text-[#D4AF37] font-black text-xs">$175+</span>
                       </div>
                       <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">90 Min</p>
                       <a href="https://glossgenius.com" target="_blank" rel="noreferrer" className="text-[10px] uppercase tracking-widest font-black text-[#1A1A1A] hover:text-[#D4AF37] transition-colors border-b border-black hover:border-[#D4AF37] pb-1">Select Treatment</a>
                     </div>
                  </div>
               </div>
            </div>

            {/* CARD: Lips & Eyeliner */}
            <div className="bg-[#1A1A1A] text-white rounded-3xl p-8 md:p-10 relative overflow-hidden group hover:shadow-[0_40px_80px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-500">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-[#1A1A1A] to-[#1A1A1A] pointer-events-none"></div>
               <div className="relative z-10">
                  <span className="text-[#D4AF37] text-[10px] font-black tracking-widest mb-4 block">[ 02 ]</span>
                  <h3 className="font-serif text-3xl mb-4">Lip Blushing <br/><span className="italic text-gray-400">& Eyeliner</span></h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-10">Restore youthful volume, neutralize tones, and perfectly define borders.</p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                         <h4 className="font-bold text-sm">Lip Tint</h4>
                         <p className="text-[9px] uppercase tracking-widest text-gray-500 mt-1">120 Min</p>
                      </div>
                      <div className="text-right">
                         <span className="block text-[#D4AF37] font-black text-xs mb-1">$425</span>
                         <a href="https://glossgenius.com" target="_blank" rel="noreferrer" className="text-[9px] uppercase tracking-widest font-black text-white hover:text-[#D4AF37] transition-colors">Book →</a>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                         <h4 className="font-bold text-sm">Lash Enhancement</h4>
                         <p className="text-[9px] uppercase tracking-widest text-gray-500 mt-1">90 Min</p>
                      </div>
                      <div className="text-right">
                         <span className="block text-[#D4AF37] font-black text-xs mb-1">$375+</span>
                         <a href="https://glossgenius.com" target="_blank" rel="noreferrer" className="text-[9px] uppercase tracking-widest font-black text-white hover:text-[#D4AF37] transition-colors">Book →</a>
                      </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* CARD: Mens Services */}
            <div className="bg-[#FCFBF8] border border-gray-100 rounded-3xl p-8 relative overflow-hidden group hover:shadow-[0_40px_80px_rgba(212,175,55,0.08)] hover:-translate-y-1 transition-all duration-500">
               <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-[#FAF6F0] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
               <div className="relative z-10 flex flex-col h-full">
                  <span className="text-[#D4AF37] text-[10px] font-black tracking-widest mb-4 block">[ 03 ]</span>
                  <h3 className="font-serif text-2xl text-[#1A1A1A] mb-8">Masculine <br/><span className="italic">Microblading</span></h3>
                  
                  <div className="space-y-6 mt-auto border-t border-[#D4AF37]/10 pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                         <h4 className="font-bold text-sm text-[#1A1A1A]">Brows</h4>
                         <p className="text-[9px] uppercase tracking-widest text-gray-400 mt-1">120 Min</p>
                      </div>
                      <div className="text-right">
                         <span className="block text-[#D4AF37] font-black text-xs mb-1">$575</span>
                         <a href="https://glossgenius.com" target="_blank" rel="noreferrer" className="text-[9px] uppercase tracking-widest font-black text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">Book →</a>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                         <h4 className="font-bold text-sm text-[#1A1A1A]">Beardblade</h4>
                         <p className="text-[9px] uppercase tracking-widest text-gray-400 mt-1">180 Min</p>
                      </div>
                      <div className="text-right">
                         <span className="block text-[#D4AF37] font-black text-xs mb-1">$575+</span>
                         <a href="https://glossgenius.com" target="_blank" rel="noreferrer" className="text-[9px] uppercase tracking-widest font-black text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">Book →</a>
                      </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* CARD: Scalp & Camo */}
            <div className="bg-[#FCFBF8] border border-gray-100 rounded-3xl p-8 relative overflow-hidden group hover:shadow-[0_40px_80px_rgba(212,175,55,0.08)] hover:-translate-y-1 transition-all duration-500">
               <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-[#FAF6F0] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
               <div className="relative z-10 flex flex-col h-full">
                  <span className="text-[#D4AF37] text-[10px] font-black tracking-widest mb-4 block">[ 04 ]</span>
                  <h3 className="font-serif text-2xl text-[#1A1A1A] mb-8">Scalp & <br/><span className="italic">Camouflage</span></h3>
                  
                  <div className="space-y-6 mt-auto border-t border-[#D4AF37]/10 pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                         <h4 className="font-bold text-sm text-[#1A1A1A]">Hairline Microblade</h4>
                         <p className="text-[9px] uppercase tracking-widest text-gray-400 mt-1">195 Min</p>
                      </div>
                      <div className="text-right">
                         <span className="block text-[#D4AF37] font-black text-xs mb-1">$625+</span>
                         <a href="https://glossgenius.com" target="_blank" rel="noreferrer" className="text-[9px] uppercase tracking-widest font-black text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">Book →</a>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                         <h4 className="font-bold text-sm text-[#1A1A1A]">Scar / Vitiligo</h4>
                         <p className="text-[9px] uppercase tracking-widest text-gray-400 mt-1">Consultation</p>
                      </div>
                      <div className="text-right">
                         <span className="block text-[#D4AF37] font-black text-xs mb-1">$0</span>
                         <a href="https://glossgenius.com" target="_blank" rel="noreferrer" className="text-[9px] uppercase tracking-widest font-black text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">Book →</a>
                      </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* CARD: Master Training */}
            <div className="bg-[#FAF6F0] border border-[#D4AF37]/30 rounded-3xl p-8 relative overflow-hidden group hover:shadow-[0_40px_80px_rgba(212,175,55,0.15)] hover:-translate-y-1 transition-all duration-500">
               <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-50 pointer-events-none"></div>
               <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[#D4AF37] text-[10px] font-black tracking-widest block">[ 05 ]</span>
                    <span className="bg-[#1A1A1A] text-white text-[8px] uppercase tracking-widest font-black px-3 py-1 rounded-sm">Academy</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#1A1A1A] mb-8">Master <br/><span className="italic">Training</span></h3>
                  
                  <div className="space-y-6 mt-auto border-t border-[#D4AF37]/20 pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                         <h4 className="font-bold text-sm text-[#1A1A1A]">Basic Course</h4>
                         <p className="text-[9px] uppercase tracking-widest text-gray-500 mt-1">2-Week Intensive</p>
                      </div>
                      <div className="text-right">
                         <span className="block text-[#D4AF37] font-black text-xs mb-1">$850+</span>
                         <a href="https://glossgenius.com" target="_blank" rel="noreferrer" className="text-[9px] uppercase tracking-widest font-black text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">Book →</a>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                         <h4 className="font-bold text-sm text-[#1A1A1A]">Comprehensive</h4>
                         <p className="text-[9px] uppercase tracking-widest text-gray-500 mt-1">Full Certification</p>
                      </div>
                      <div className="text-right">
                         <span className="block text-[#D4AF37] font-black text-xs mb-1">$1,500</span>
                         <a href="https://glossgenius.com" target="_blank" rel="noreferrer" className="text-[9px] uppercase tracking-widest font-black text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">Book →</a>
                      </div>
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. ABOUT JANNA: LOCAL IMAGES & BLUSH BACKGROUND */}
      <section id="meet-janna" className="py-24 lg:py-32 bg-[#FCFBF8] relative z-10 border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center">
            
            <div className="md:w-1/2 relative w-full flex justify-center">
                <div className="absolute top-[10%] left-[-5%] w-[80%] h-[90%] bg-[#FAF6F0] rounded-t-[15rem] rounded-b-xl -z-10 border border-[#D4AF37]/20"></div>
                <div className="w-[85%] aspect-[2/3] rounded-t-[15rem] rounded-b-sm overflow-hidden shadow-2xl relative z-10 border-[6px] border-white bg-gray-100">
                    {/* LOCAL JANNA IMAGE */}
                    <img src="/janna.jpg" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Janna Sulemann" />
                </div>
                <div className="absolute bottom-10 -right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-[#D4AF37]/10 z-20">
                    {/* LOCAL SIGNATURE IMAGE */}
                    <img src="/janna-sign.jpg" className="h-10 opacity-80 mix-blend-multiply" alt="Janna Signature" />
                    <p className="text-[7px] uppercase tracking-[0.3em] font-black text-center mt-2 text-[#D4AF37]">Master Artist</p>
                </div>
            </div>

            <div className="md:w-1/2">
                <h4 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                  <span className="w-8 h-px bg-[#D4AF37]"></span>
                  Meet The Visionary
                </h4>
                <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] tracking-tight leading-tight mb-8">
                  Janna Sulemann.<br/> <span className="text-gray-400 italic font-light">Defining Symmetry.</span>
                </h2>
                <div className="space-y-6 text-gray-500 text-sm leading-relaxed font-medium">
                  <p>
                    With nearly a decade of dedicated focus on facial symmetry and semi-permanent makeup, Janna blends technical precision with a true artist's eye. Her philosophy is simple: enhancement should be entirely undetectable.
                  </p>
                  <p>
                    Her commitment to ongoing global education ensures that every client receives the safest, most advanced techniques available today. <strong className="text-[#1A1A1A] font-bold">Experience alone doesn't make a great artist; continuous evolution does.</strong>
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-10 pt-8 border-t border-gray-200">
                      <div>
                          <div className="text-[#D4AF37] text-2xl mb-2">✦</div>
                          <h4 className="text-[#1A1A1A] font-black uppercase tracking-widest text-[10px] mb-1">PhiBrows Certified</h4>
                          <p className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold">World-Class Standard</p>
                      </div>
                      <div>
                          <div className="text-[#D4AF37] text-2xl mb-2">✦</div>
                          <h4 className="text-[#1A1A1A] font-black uppercase tracking-widest text-[10px] mb-1">Health Inspected</h4>
                          <p className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold">Sterile Clinic Grade</p>
                      </div>
                  </div>
                </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. SWIPEABLE + AUTO-SCROLLING MARQUEE REVIEWS */}
      <section className="py-20 bg-white clip-diagonal-bottom relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
         <div className="text-center mb-12">
             <h3 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] mb-2">Client Experiences</h3>
             <h2 className="text-[#1A1A1A] text-3xl font-serif">A Reputation Built on <span className="italic text-gray-400">Trust</span></h2>
         </div>
         
         {/* JS-Powered Scrollable Marquee Container */}
         <div 
           ref={marqueeRef}
           className="flex overflow-x-auto no-scrollbar gap-6 px-4 snap-x cursor-grab active:cursor-grabbing pb-10"
           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
         >
            {/* Duplicated 4 times for a seamless infinite loop feel */}
            {[...Array(4)].map((_, arrayIndex) => (
              <div key={arrayIndex} className="flex gap-6 flex-none">
                
                {/* Review 1 */}
                <a href="https://maps.app.goo.gl/SYMzModDM8EXBM6F7" target="_blank" rel="noreferrer" className="inline-block w-[320px] sm:w-[400px] bg-[#FCFBF8] p-8 rounded-sm border border-[#D4AF37]/20 hover:border-[#D4AF37] shadow-sm hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)] transition-all whitespace-normal transform hover:-translate-y-1 snap-center">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-[#D4AF37] flex items-center justify-center font-serif text-lg flex-shrink-0">A</div>
                        <div>
                            <p className="font-bold text-xs text-[#1A1A1A] uppercase tracking-widest">Anna</p>
                            <div className="text-[#D4AF37] text-[10px] tracking-widest mt-1">★★★★★</div>
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium italic">"Amazing experience! Janna was so professional, thorough, knowledgeable, personable and TALENTED! Absolutely love my brows!!"</p>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <span className="text-[#1A1A1A] font-black text-[9px] uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors">Read on Google →</span>
                      <span className="text-[#D4AF37] text-[9px] font-black uppercase tracking-widest flex items-center gap-1">✓ Verified</span>
                    </div>
                </a>
                
                {/* Review 2 */}
                <a href="https://www.google.com/maps/place/Polaris+Aesthetics/@40.1442707,-82.9914008,17z/data=!3m1!4b1!4m6!3m5!1s0x8838f52e99680d51:0x15b295572df54161!8m2!3d40.1442707!4d-82.9888259!16s%2Fg%2F11jnf_hb4q?entry=ttu&g_ep=EgoyMDI2MDIyMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="inline-block w-[320px] sm:w-[400px] bg-[#FCFBF8] p-8 rounded-sm border border-[#D4AF37]/20 hover:border-[#D4AF37] shadow-sm hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)] transition-all whitespace-normal transform hover:-translate-y-1 snap-center">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-[#D4AF37] flex items-center justify-center font-serif text-lg flex-shrink-0">S</div>
                        <div>
                            <p className="font-bold text-xs text-[#1A1A1A] uppercase tracking-widest">Susana Cuero</p>
                            <div className="text-[#D4AF37] text-[10px] tracking-widest mt-1">★★★★★</div>
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium italic">"The service is excellent!!! You get what you expect!!! 😍😍😍 plus you feel like if you were in a SPA 🧘‍♀️."</p>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <span className="text-[#1A1A1A] font-black text-[9px] uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors">Read on Google →</span>
                      <span className="text-[#D4AF37] text-[9px] font-black uppercase tracking-widest flex items-center gap-1">✓ Verified</span>
                    </div>
                </a>

                {/* Review 3 */}
                <a href="https://maps.app.goo.gl/SYMzModDM8EXBM6F7" target="_blank" rel="noreferrer" className="inline-block w-[320px] sm:w-[400px] bg-[#FCFBF8] p-8 rounded-sm border border-[#D4AF37]/20 hover:border-[#D4AF37] shadow-sm hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)] transition-all whitespace-normal transform hover:-translate-y-1 snap-center">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-[#D4AF37] flex items-center justify-center font-serif text-lg flex-shrink-0">W</div>
                        <div>
                            <p className="font-bold text-xs text-[#1A1A1A] uppercase tracking-widest">Wendy</p>
                            <div className="text-[#D4AF37] text-[10px] tracking-widest mt-1">★★★★★</div>
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium italic">"Janna was very professional and made me feel very comfortable... She was very thorough in explaining the process and aftercare."</p>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <span className="text-[#1A1A1A] font-black text-[9px] uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors">Read on Google →</span>
                      <span className="text-[#D4AF37] text-[9px] font-black uppercase tracking-widest flex items-center gap-1">✓ Verified</span>
                    </div>
                </a>

              </div>
            ))}
         </div>
      </section>

      {/* 8. INTERACTIVE BEFORE & AFTER SLIDER (LOCAL IMAGES) */}
      <section className="py-24 lg:py-32 bg-[#FCFBF8] relative z-10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] tracking-tight mb-4">The Polaris <span className="italic text-[#D4AF37]">Transformation.</span></h2>
            <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">Interact & Slide to reveal</p>
          </div>
          <div className="relative max-w-[700px] mx-auto group perspective-[2000px]">
            <div className="absolute inset-[-5%] bg-gradient-to-r from-[#D4AF37]/20 via-transparent to-[#D4AF37]/20 rounded-full blur-[60px] opacity-50 pointer-events-none z-0"></div>
            
            <div 
              ref={sliderRef}
              className="relative z-10 w-full aspect-[4/5] sm:aspect-square rounded-sm overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.1)] border-[8px] border-white cursor-ew-resize select-none bg-gray-100"
              onMouseMove={onMouseMove}
              onTouchMove={onTouchMove}
              onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
              onTouchEnd={() => setIsDragging(false)}
            >
              {/* LOCAL BEFORE IMAGE */}
              <img src="/before.jpg" className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none grayscale opacity-70" alt="Before Brows" draggable="false" />
              
              {/* LOCAL AFTER IMAGE */}
              <img src="/after.jpg" className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none" style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }} alt="After Brows" draggable="false" />
              
              <div className="absolute inset-y-0 w-[2px] bg-white shadow-[0_0_15px_#D4AF37] z-20 pointer-events-none transition-transform duration-75" style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}>
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-md rounded-full shadow-[0_0_30px_rgba(212,175,55,0.5)] flex items-center justify-center border border-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
                    <div className="flex space-x-2 relative z-10 text-[#D4AF37]">
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7 1L2 6L7 11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L6 6L1 11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                 </div>
              </div>
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-[#1A1A1A] px-4 py-2 rounded-sm text-[9px] uppercase tracking-[0.3em] font-black z-20 shadow-lg pointer-events-none transition-opacity duration-300" style={{ opacity: sliderPosition > 15 ? 1 : 0 }}>After</div>
              <div className="absolute top-6 right-6 bg-[#1A1A1A]/90 backdrop-blur-sm text-white px-4 py-2 rounded-sm text-[9px] uppercase tracking-[0.3em] font-black z-20 shadow-lg pointer-events-none transition-opacity duration-300" style={{ opacity: sliderPosition < 85 ? 1 : 0 }}>Before</div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. AI VIRTUAL CONSULTATION */}
      <section className="relative py-24 lg:py-32 bg-[#FAF6F0] clip-chevron-bottom z-20 overflow-hidden border-t border-white">
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-6 text-center pb-[4vw]">
            <h4 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] mb-4">Virtual Assessment</h4>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] tracking-tight mb-6">Discover Your <span className="italic">Perfect Shape.</span></h2>
            <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                Upload 3 photos securely from your phone. Our Polaris AI will analyze your facial structure and give you an instant consultation on the best pigment and technique for your features.
            </p>

            <div className="max-w-xl mx-auto bg-white border border-[#D4AF37]/20 p-8 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
                    <span className="text-gray-400 text-[9px] uppercase tracking-[0.2em] font-black flex items-center gap-2"><span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></span> Polaris Bot Online</span>
                    <span className="bg-[#FAF6F0] text-[#D4AF37] px-4 py-1.5 rounded-sm text-[8px] font-black tracking-[0.2em] uppercase border border-[#D4AF37]/20">Secure Portal</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="aspect-square bg-[#FCFBF8] border border-dashed border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-sm flex flex-col items-center justify-center cursor-pointer transition-colors group">
                        <span className="text-2xl text-[#D4AF37] mb-2 group-hover:scale-110 transition-transform">+</span>
                        <span className="text-[8px] text-gray-500 uppercase tracking-[0.2em] font-black">Left Brow</span>
                    </div>
                    <div className="aspect-square bg-[#FCFBF8] border border-dashed border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-sm flex flex-col items-center justify-center cursor-pointer transition-colors group">
                        <span className="text-2xl text-[#D4AF37] mb-2 group-hover:scale-110 transition-transform">+</span>
                        <span className="text-[8px] text-gray-500 uppercase tracking-[0.2em] font-black">Right Brow</span>
                    </div>
                    <div className="aspect-square bg-[#FCFBF8] border border-dashed border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-sm flex flex-col items-center justify-center cursor-pointer transition-colors group">
                        <span className="text-2xl text-[#D4AF37] mb-2 group-hover:scale-110 transition-transform">+</span>
                        <span className="text-[8px] text-gray-500 uppercase tracking-[0.2em] font-black">Full Face</span>
                    </div>
                </div>

                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="w-full bg-[#1A1A1A] hover:bg-[#D4AF37] text-white py-4.5 rounded-sm text-[10px] md:text-xs font-black uppercase tracking-[0.2em] shadow-lg transition-colors"
                >
                    Initiate Mapping Scan
                </button>
            </div>
        </div>
      </section>

      {/* 10. THE FOOTER (WITH POLICY LINKS) */}
      <footer className="bg-white py-20 lg:py-24 border-t border-gray-100 -mt-[4vw] relative z-10 pt-[8vw]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            <div className="w-full lg:w-[35%]">
                <div className="font-serif text-3xl tracking-[0.2em] font-black uppercase text-[#1A1A1A] flex flex-col mb-6">
                  POLARIS <span className="text-[10px] tracking-[0.4em] text-[#D4AF37] font-sans mt-1">Microblading</span>
                </div>
                <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8 max-w-sm">
                  1158 Polaris Parkway Suite 20<br/>Columbus, OH 43240
                </p>
                <div className="flex items-center gap-4 mb-10">
                    <a href="https://www.instagram.com/polarismicroblading" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-gray-200 bg-[#FCFBF8] flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] group transition-all shadow-sm">
                       <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 1.76-6.98 6.979-.058 1.28-.072 1.688-.072 4.948s.014 3.668.072 4.948c.2 5.226 2.631 6.78 6.98 6.98 1.28.058 1.689.072 4.947.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-1.76 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-5.213-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                    <a href="https://www.facebook.com/PolarisMicroblading?mibextid=LQQJ4d" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-gray-200 bg-[#FCFBF8] flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] group transition-all shadow-sm">
                       <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                    </a>
                </div>
            </div>

            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-[#1A1A1A] text-[10px] font-black uppercase tracking-[0.3em] mb-8">Legal & Policies</h3>
                    <ul className="space-y-4 text-gray-500 font-medium text-sm">
                        <li className="hover:text-[#D4AF37] cursor-pointer transition"><a href="/policies">Booking & Clinic Policies</a></li>
                        <li className="hover:text-[#D4AF37] cursor-pointer transition"><a href="/terms">Terms & Conditions</a></li>
                        <li className="hover:text-[#D4AF37] cursor-pointer transition"><a href="/privacy">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-[#1A1A1A] text-[10px] font-black uppercase tracking-[0.3em] mb-8">Clinic Hours</h3>
                    <ul className="space-y-4 text-gray-500 font-medium text-sm mb-8">
                        <li><strong className="text-[#1A1A1A]">Mon & Sat:</strong> 10 AM - 7 PM</li>
                        <li><strong className="text-[#1A1A1A]">Tue & Sun:</strong> 1 PM - 7 PM</li>
                        <li><strong className="text-[#1A1A1A]">Wed - Fri:</strong> Closed</li>
                    </ul>
                </div>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
             <p>© 2026 Polaris Microblading.</p>
             <p>Designed by <a href="https://vireva.agency" target="_blank" rel="noreferrer" className="text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">Vireva Agency</a></p>
          </div>
        </div>
      </footer>

      {/* --- THE AI TRIAGE CHATBOT UI MODAL (BRIGHT) --- */}
      {isChatOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:justify-end sm:pr-8 sm:pb-8 pointer-events-none">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm sm:hidden pointer-events-auto" onClick={() => setIsChatOpen(false)}></div>

          <div className="relative w-full sm:w-[400px] h-[85vh] sm:h-[600px] bg-white border border-[#D4AF37]/20 rounded-t-[2rem] sm:rounded-[2rem] shadow-[0_40px_80px_rgba(0,0,0,0.15)] flex flex-col pointer-events-auto transform transition-all animate-slide-up overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#FAF6F0]">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#D4AF37] font-serif text-lg">P</div>
                  <div>
                    <h3 className="font-black text-[#1A1A1A] text-xs uppercase tracking-[0.2em] leading-none">Polaris Bot</h3>
                    <p className="text-[8px] text-green-500 font-black uppercase tracking-[0.3em] mt-2 flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online</p>
                  </div>
               </div>
               <button onClick={() => { setIsChatOpen(false); setChatStep(1); }} className="text-gray-400 hover:text-[#1A1A1A] transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
               {chatStep === 1 && (
                 <>
                    <div className="bg-[#FAF6F0] p-5 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl text-xs text-gray-600 leading-relaxed border border-[#D4AF37]/10">
                      Hi! I am the Polaris AI assistant. Let's see what pigment and shape works best for your facial structure. <br/><br/>First, who am I speaking with?
                    </div>
                    <form onSubmit={handleChatNext} className="space-y-4 pt-4">
                      <input required type="text" placeholder="First Name" className="w-full bg-[#FCFBF8] border border-gray-200 rounded-sm px-5 py-4 text-[#1A1A1A] text-xs focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-gray-400" />
                      <input required type="email" placeholder="Email Address" className="w-full bg-[#FCFBF8] border border-gray-200 rounded-sm px-5 py-4 text-[#1A1A1A] text-xs focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-gray-400" />
                      <input required type="tel" placeholder="Phone Number" className="w-full bg-[#FCFBF8] border border-gray-200 rounded-sm px-5 py-4 text-[#1A1A1A] text-xs focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-gray-400" />
                      <button type="submit" className="w-full bg-[#1A1A1A] text-white text-[10px] font-black uppercase tracking-[0.2em] py-4 rounded-sm shadow-xl mt-4 hover:bg-[#D4AF37] transition-colors">Continue</button>
                    </form>
                 </>
               )}

               {chatStep === 2 && (
                 <>
                    <div className="bg-[#FAF6F0] p-5 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl text-xs text-gray-600 leading-relaxed border border-[#D4AF37]/10">
                      Great. Now, securely upload 3 clear photos of your face so I can scan your bone structure and skin tone.
                    </div>
                    <div className="grid grid-cols-3 gap-3 pt-4">
                       <div className="aspect-square bg-[#FCFBF8] border border-dashed border-[#D4AF37]/50 rounded-sm flex flex-col items-center justify-center cursor-pointer hover:border-[#D4AF37] transition-colors">
                          <span className="text-[#D4AF37] text-2xl mb-2">+</span>
                          <span className="text-[8px] uppercase tracking-[0.2em] font-black text-gray-400">Left</span>
                       </div>
                       <div className="aspect-square bg-[#FCFBF8] border border-dashed border-[#D4AF37]/50 rounded-sm flex flex-col items-center justify-center cursor-pointer hover:border-[#D4AF37] transition-colors">
                          <span className="text-[#D4AF37] text-2xl mb-2">+</span>
                          <span className="text-[8px] uppercase tracking-[0.2em] font-black text-gray-400">Right</span>
                       </div>
                       <div className="aspect-square bg-[#FCFBF8] border border-dashed border-[#D4AF37]/50 rounded-sm flex flex-col items-center justify-center cursor-pointer hover:border-[#D4AF37] transition-colors">
                          <span className="text-[#D4AF37] text-2xl mb-2">+</span>
                          <span className="text-[8px] uppercase tracking-[0.2em] font-black text-gray-400">Front</span>
                       </div>
                    </div>
                    <button onClick={handleChatNext} className="w-full bg-[#1A1A1A] text-white text-[10px] font-black uppercase tracking-[0.2em] py-4 rounded-sm shadow-xl mt-6 hover:bg-[#D4AF37] transition-colors">Analyze Structure</button>
                 </>
               )}

               {chatStep === 3 && (
                 <div className="flex flex-col items-center justify-center h-full space-y-6">
                    <div className="w-16 h-16 border-[3px] border-[#FAF6F0] border-t-[#D4AF37] rounded-full animate-spin"></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse text-[#D4AF37]">Running PhiBrows AI...</p>
                 </div>
               )}

               {chatStep === 4 && (
                 <>
                    <div className="bg-[#FAF6F0] p-6 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl text-xs text-gray-600 leading-relaxed border border-[#D4AF37]/30 shadow-lg">
                      <strong className="text-[#1A1A1A] font-serif text-lg block mb-3">Scan Complete.</strong>
                      Based on your bone structure and skin undertones, you are an excellent candidate for <strong className="text-[#D4AF37]">Advanced Microblading with custom shading</strong>.<br/><br/>
                      Janna will review these images to prepare your custom pigment blend.<br/><br/>
                      Our clinic coordinator will text you shortly to schedule your session!
                    </div>
                    <button onClick={() => { setIsChatOpen(false); setChatStep(1); }} className="w-full border border-gray-200 text-[#1A1A1A] text-[10px] font-black uppercase tracking-[0.2em] py-4 rounded-sm hover:bg-gray-50 mt-6 transition-colors">Close Portal</button>
                 </>
               )}
            </div>
          </div>
        </div>
      )}

      {/* --- YOUTUBE VIDEO MODAL --- */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xl cursor-pointer transition-opacity" onClick={() => setIsVideoOpen(false)}></div>
          
          <div className="relative z-10 w-full max-w-5xl aspect-video bg-black rounded-sm overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] animate-slide-up border border-[#D4AF37]/20">
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/10 hover:bg-[#D4AF37] text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md border border-white/20 group"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
              title="Polaris Film" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}      
      
      {/* GLOBAL STYLES FOR ANIMATIONS AND CLIP-PATHS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide-up {
          0% { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes spin-slow {
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .clip-chevron-bottom {
          clip-path: polygon(0 0, 100% 0, 100% calc(100% - 4vw), 50% 100%, 0 calc(100% - 4vw));
          padding-bottom: calc(4vw + 5rem) !important;
        }
        .clip-diagonal-bottom {
          clip-path: polygon(0 0, 100% 0, 100% calc(100% - 5vw), 0 100%);
          padding-bottom: calc(5vw + 4rem) !important;
        }

        @media (max-width: 768px) {
          .clip-chevron-bottom {
             clip-path: polygon(0 0, 100% 0, 100% calc(100% - 30px), 50% 100%, 0 calc(100% - 30px));
             padding-bottom: calc(30px + 4rem) !important;
          }
          .clip-diagonal-bottom {
             clip-path: polygon(0 0, 100% 0, 100% calc(100% - 30px), 0 100%);
             padding-bottom: calc(30px + 4rem) !important;
          }
        }
      `}} />

    </div>
  );
}