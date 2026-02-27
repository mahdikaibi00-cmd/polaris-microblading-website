"use client";
import Image from 'next/image';
import { useState, useRef, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent, useEffect } from 'react';

export default function Home() {
  
  // --- MOBILE MENU LOGIC ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- BEFORE/AFTER SLIDER LOGIC ---
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const onSliderMouseMove = (e: ReactMouseEvent) => {
    if (!isDraggingSlider) return;
    handleSliderMove(e.clientX);
  };

  const onSliderTouchMove = (e: ReactTouchEvent) => {
    handleSliderMove(e.touches[0].clientX);
  };

  // --- 3M DOLLAR MARQUEE LOGIC (AUTO-SCROLL + DRAG/SWIPE) ---
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const [isDraggingMarquee, setIsDraggingMarquee] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el || isMarqueePaused || isDraggingMarquee) return;
    
    let animationId: number;
    const scrollStep = () => {
      el.scrollLeft += 1; // Speed of the auto-scroll
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }
      animationId = requestAnimationFrame(scrollStep);
    };
    
    animationId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationId);
  }, [isMarqueePaused, isDraggingMarquee]);

  const onMarqueeMouseDown = (e: ReactMouseEvent) => {
    setIsDraggingMarquee(true);
    setIsMarqueePaused(true);
    if(marqueeRef.current) {
      setStartX(e.pageX - marqueeRef.current.offsetLeft);
      setScrollLeft(marqueeRef.current.scrollLeft);
    }
  };
  
  const onMarqueeMouseLeave = () => { 
    setIsDraggingMarquee(false); 
    setIsMarqueePaused(false); 
  };
  
  const onMarqueeMouseUp = () => { 
    setIsDraggingMarquee(false); 
    setIsMarqueePaused(false); 
  };

  const onMarqueeMouseMove = (e: ReactMouseEvent) => {
    if (!isDraggingMarquee || !marqueeRef.current) return;
    e.preventDefault();
    const x = e.pageX - marqueeRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    marqueeRef.current.scrollLeft = scrollLeft - walk;
  };

  // --- REVIEWS DATA ---
  const reviewsData = [
    { initial: "A", name: "Anna", link: "https://maps.app.goo.gl/SYMzModDM8EXBM6F7", text: "Amazing experience! Janna was so professional, thorough, knowledgeable, personable and TALENTED! Absolutely love my brows!!" },
    { initial: "S", name: "Susana Cuero", link: "https://www.google.com/maps/place/Polaris+Aesthetics/@40.1442707,-82.9914008,17z/data=!3m1!4b1!4m6!3m5!1s0x8838f52e99680d51:0x15b295572df54161!8m2!3d40.1442707!4d-82.9888259!16s%2Fg%2F11jnf_hb4q?entry=ttu&g_ep=EgoyMDI2MDIyMy4wIKXMDSoASAFQAw%3D%3D", text: "The service is excellent!!! You get what you expect!!! 😍😍😍 plus you feel like if you were in a SPA 🧘‍♀️." },
    { initial: "W", name: "Wendy", link: "https://maps.app.goo.gl/SYMzModDM8EXBM6F7", text: "Janna was very professional and made me feel very comfortable... She was very thorough in explaining the process and aftercare." }
  ];

  // --- VIRTUAL ASSESSMENT LOGIC ---
  const [assessmentStatus, setAssessmentStatus] = useState("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatStep, setChatStep] = useState(1);
  const [isVideoOpen, setIsVideoOpen] = useState(false); 
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File is too large. Please select an image under 5MB.");
        e.target.value = ""; 
        return;
      }
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleAssessmentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAssessmentStatus("loading");
    setChatStep(3); // Loading State
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "de75332f-f09b-4b62-afc0-e22d429112fb");
    formData.append("subject", "🚨 New Virtual Assessment & Photo - Polaris");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData // FormData automatically handles the multipart/form-data for the image
      });
      if (response.ok) {
        setAssessmentStatus("success");
        setChatStep(4);
      } else {
        setAssessmentStatus("error");
        setChatStep(4);
      }
    } catch (error) {
      setAssessmentStatus("error");
      setChatStep(4);
    }
  };

  return (
    <div className="bg-[#FCFBF8] text-[#1A1A1A] font-sans antialiased selection:bg-[#D4AF37] selection:text-white overflow-x-hidden">
      
      {/* --- MOBILE FULL-SCREEN MENU OVERLAY --- */}
      <div className={`fixed inset-0 z-[100] bg-[#FCFBF8]/95 backdrop-blur-3xl transition-all duration-500 flex flex-col ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="flex items-center justify-between px-4 lg:px-8 h-20 md:h-24 border-b border-[#D4AF37]/20">
          <div className="font-serif text-xl tracking-[0.2em] font-black uppercase text-[#1A1A1A]">POLARIS</div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-[#1A1A1A] p-2 focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center flex-grow space-y-10 text-base font-black uppercase tracking-[0.2em] text-[#1A1A1A]">
          <a href="https://polarismicroblading.glossgenius.com/services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D4AF37] transition-colors">Treatments</a>
          <a href="/portfolio" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D4AF37] transition-colors">Portfolio</a>
          <a href="#meet-janna" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D4AF37] transition-colors">Meet Janna</a>
          <a href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D4AF37] transition-colors">Contact</a>
          <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="mt-6 bg-[#1A1A1A] text-white hover:bg-[#D4AF37] px-12 py-5 rounded-sm text-xs shadow-[0_20px_40px_rgba(212,175,55,0.2)] transition-colors">Book Now</a>
        </div>
      </div>

      {/* 1. ULTRA-LUX NAVIGATION BAR */}
      <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-2xl border-b border-[#D4AF37]/20 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-20 md:h-24 flex items-center justify-between">
          
          <div className="flex lg:hidden w-full items-center justify-between relative">
            <button onClick={() => setIsMobileMenuOpen(true)} className="text-[#1A1A1A] hover:text-[#D4AF37] transition-colors focus:outline-none">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <div className="absolute left-1/2 transform -translate-x-1/2 font-serif text-xl tracking-[0.2em] font-black uppercase text-[#1A1A1A]">
              POLARIS
            </div>
            <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </a>
          </div>

          <div className="hidden lg:flex flex-shrink-0 relative z-50">
            <div className="font-serif text-2xl tracking-[0.25em] font-black uppercase text-[#1A1A1A] flex flex-col">
              POLARIS <span className="text-[9px] tracking-[0.4em] text-[#D4AF37] font-sans -mt-1">Microblading</span>
            </div>
          </div>
          
          <div className="hidden lg:flex space-x-10 text-[#1A1A1A] text-[11px] font-bold uppercase tracking-[0.15em] relative">
            
            <div className="relative group py-8">
              <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 cursor-pointer">
                Treatments <span className="text-[8px] group-hover:rotate-180 transition-transform duration-300">▼</span>
              </a>
              
              <div className="absolute top-[80px] left-1/2 transform -translate-x-1/2 pt-4 opacity-0 translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-500 ease-out w-[800px] z-50">
                <div className="bg-white/95 backdrop-blur-[64px] border border-gray-100 shadow-[0_40px_80px_rgba(0,0,0,0.1)] rounded-3xl p-8 relative overflow-hidden">
                  
                  <div className="grid grid-cols-3 gap-8 relative z-10">
                    <div>
                      <h4 className="text-[#D4AF37] font-black text-[9px] uppercase tracking-widest mb-4 border-b border-[#D4AF37]/20 pb-2">Facial Aesthetics</h4>
                      <ul className="space-y-3 font-semibold text-[#1A1A1A]">
                        <li><a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors flex justify-between">Eyebrow Services <span>→</span></a></li>
                        <li><a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors flex justify-between">Lip Services <span>→</span></a></li>
                        <li><a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors flex justify-between">Eyeliner <span>→</span></a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[#D4AF37] font-black text-[9px] uppercase tracking-widest mb-4 border-b border-[#D4AF37]/20 pb-2">Specialty Focus</h4>
                      <ul className="space-y-3 font-semibold text-[#1A1A1A]">
                        <li><a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors flex justify-between">Mens Services <span>→</span></a></li>
                        <li><a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors flex justify-between">Scalp Services <span>→</span></a></li>
                        <li><a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors flex justify-between">Scar Camouflage <span>→</span></a></li>
                      </ul>
                    </div>
                    <div className="bg-[#FAF6F0] rounded-xl p-5 border border-[#D4AF37]/20">
                      <h4 className="text-[#1A1A1A] font-black text-[9px] uppercase tracking-widest mb-2">Master Training</h4>
                      <p className="text-[10px] text-gray-600 leading-relaxed mb-4 font-medium">Elevate your craft. Get certified by a PhiBrows Master Artist.</p>
                      <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="text-[#D4AF37] text-[9px] font-black uppercase tracking-widest hover:text-[#1A1A1A] transition-colors">View Courses ▶</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <a href="/portfolio" className="hover:text-[#D4AF37] transition-colors flex items-center py-8">Portfolio</a>
            <a href="#meet-janna" className="hover:text-[#D4AF37] transition-colors flex items-center py-8">Meet Janna</a>
            <a href="/contact" className="hover:text-[#D4AF37] transition-colors flex items-center py-8">Contact</a>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="bg-[#1A1A1A] hover:bg-[#D4AF37] text-white px-8 py-3.5 rounded-sm text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all duration-500 transform hover:-translate-y-1">
              Book Now
            </a>
          </div>
        </div>
      </nav>

      {/* 2. THE MILLION-DOLLAR HERO SECTION */}
      <section className="relative pt-24 pb-12 lg:pt-40 lg:pb-32 overflow-hidden bg-[#FCFBF8] clip-chevron-bottom z-20">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#E6C5C0]/20 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center pb-10">
          
          <div className="order-1 max-w-2xl relative z-20 text-center lg:text-left pt-6 lg:pt-10">
            <h4 className="text-[#D4AF37] text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-4 lg:mb-6 flex items-center justify-center lg:justify-start gap-4">
              <span className="w-8 lg:w-12 h-px bg-[#D4AF37]"></span>
              Columbus's Premier PMU Clinic
            </h4>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#1A1A1A] leading-[1.1] mb-6 lg:mb-8 tracking-tight">
              The Art of <br className="hidden lg:block"/><span className="italic text-[#D4AF37] font-light">Undetectable</span> <br/>Enhancement.
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-500 mb-8 lg:mb-10 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0 tracking-wide">
              Where world-class PhiBrows precision meets bespoke facial mapping. Wake up flawlessly confident every single day with master artist Janna Sulemann.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="bg-[#D4AF37] hover:bg-[#1A1A1A] text-white px-8 lg:px-10 py-4 lg:py-4.5 rounded-sm text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(212,175,55,0.3)] transition-all duration-500 transform hover:-translate-y-1 text-center">
                Reserve Your Appt
              </a>
              <a href="/portfolio" className="bg-transparent border border-[#1A1A1A]/20 hover:border-[#D4AF37] hover:bg-white text-[#1A1A1A] px-8 lg:px-10 py-4 lg:py-4.5 rounded-sm text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-3 group">
                Visual Archive <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

          <div className="order-2 relative w-full aspect-[4/5] sm:aspect-square max-w-[300px] sm:max-w-[450px] lg:max-w-[600px] mx-auto lg:ml-auto group mt-4 lg:mt-0">
            <div className="absolute -inset-4 md:-inset-6 bg-white/40 backdrop-blur-2xl rounded-t-[10rem] rounded-b-lg border border-white/60 shadow-[0_30px_60px_rgba(0,0,0,0.05)] z-0 transform transition-transform duration-1000 group-hover:scale-105"></div>
            
            <div className="absolute inset-0 rounded-t-[9rem] rounded-b-sm overflow-hidden shadow-2xl z-10 bg-[#FAF6F0]">
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

      {/* 5. MIND-BLOWING BENTO GRID MENU (CENTERED TITLE) */}
      <section id="services" className="py-24 lg:py-36 bg-white relative z-20 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-bl from-[#D4AF37]/10 via-[#FAF6F0] to-transparent rounded-full blur-[100px] animate-spin-slow pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-[#E6C5C0]/20 to-transparent rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
          
          <div className="flex flex-col items-center text-center mb-16 border-b border-[#D4AF37]/20 pb-10">
             <h4 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] mb-4 flex items-center justify-center gap-3">
                <span className="w-6 h-px bg-[#D4AF37]"></span> Curated Artistry <span className="w-6 h-px bg-[#D4AF37]"></span>
             </h4>
             <h2 className="text-4xl md:text-6xl font-serif text-[#1A1A1A] tracking-tight mb-8">Signature <span className="italic text-[#D4AF37]">Treatments.</span></h2>
             <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-black text-[#1A1A1A] hover:text-[#D4AF37] transition-colors group bg-[#FAF6F0] px-8 py-4 rounded-full border border-[#D4AF37]/20 shadow-sm hover:shadow-[0_10px_20px_rgba(212,175,55,0.1)]">
               View Full Booking Menu <span className="group-hover:translate-x-1 transition-transform">→</span>
             </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 bg-[#FCFBF8] border border-gray-100 rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:shadow-[0_40px_80px_rgba(212,175,55,0.08)] hover:-translate-y-1 transition-all duration-500">
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
                       <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="text-[10px] uppercase tracking-widest font-black text-[#1A1A1A] hover:text-[#D4AF37] transition-colors border-b border-black hover:border-[#D4AF37] pb-1">Select Treatment</a>
                     </div>
                     <div>
                       <div className="flex justify-between items-end mb-2">
                         <h4 className="text-base font-bold text-[#1A1A1A]">6-12+ Month Refresh</h4>
                         <span className="text-[#D4AF37] font-black text-xs">$175+</span>
                       </div>
                       <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">90 Min</p>
                       <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="text-[10px] uppercase tracking-widest font-black text-[#1A1A1A] hover:text-[#D4AF37] transition-colors border-b border-black hover:border-[#D4AF37] pb-1">Select Treatment</a>
                     </div>
                  </div>
               </div>
            </div>

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
                         <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="text-[9px] uppercase tracking-widest font-black text-white hover:text-[#D4AF37] transition-colors">Book →</a>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                         <h4 className="font-bold text-sm">Lash Enhancement</h4>
                         <p className="text-[9px] uppercase tracking-widest text-gray-500 mt-1">90 Min</p>
                      </div>
                      <div className="text-right">
                         <span className="block text-[#D4AF37] font-black text-xs mb-1">$375+</span>
                         <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="text-[9px] uppercase tracking-widest font-black text-white hover:text-[#D4AF37] transition-colors">Book →</a>
                      </div>
                    </div>
                  </div>
               </div>
            </div>

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
                         <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="text-[9px] uppercase tracking-widest font-black text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">Book →</a>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                         <h4 className="font-bold text-sm text-[#1A1A1A]">Beardblade</h4>
                         <p className="text-[9px] uppercase tracking-widest text-gray-400 mt-1">180 Min</p>
                      </div>
                      <div className="text-right">
                         <span className="block text-[#D4AF37] font-black text-xs mb-1">$575+</span>
                         <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="text-[9px] uppercase tracking-widest font-black text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">Book →</a>
                      </div>
                    </div>
                  </div>
               </div>
            </div>

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
                         <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="text-[9px] uppercase tracking-widest font-black text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">Book →</a>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                         <h4 className="font-bold text-sm text-[#1A1A1A]">Scar / Vitiligo</h4>
                         <p className="text-[9px] uppercase tracking-widest text-gray-400 mt-1">Consultation</p>
                      </div>
                      <div className="text-right">
                         <span className="block text-[#D4AF37] font-black text-xs mb-1">$0</span>
                         <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="text-[9px] uppercase tracking-widest font-black text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">Book →</a>
                      </div>
                    </div>
                  </div>
               </div>
            </div>

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
                         <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="text-[9px] uppercase tracking-widest font-black text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">Book →</a>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                         <h4 className="font-bold text-sm text-[#1A1A1A]">Comprehensive</h4>
                         <p className="text-[9px] uppercase tracking-widest text-gray-500 mt-1">Full Certification</p>
                      </div>
                      <div className="text-right">
                         <span className="block text-[#D4AF37] font-black text-xs mb-1">$1,500</span>
                         <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="text-[9px] uppercase tracking-widest font-black text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">Book →</a>
                      </div>
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. ABOUT JANNA */}
      <section id="meet-janna" className="py-24 lg:py-32 bg-[#FCFBF8] relative z-10 border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center">
            
            <div className="md:w-1/2 relative w-full flex justify-center">
                <div className="absolute top-[10%] left-[-5%] w-[80%] h-[90%] bg-[#FAF6F0] rounded-t-[15rem] rounded-b-xl -z-10 border border-[#D4AF37]/20"></div>
                <div className="w-[85%] aspect-[2/3] rounded-t-[15rem] rounded-b-sm overflow-hidden shadow-2xl relative z-10 border-[6px] border-white bg-gray-100">
                    <img src="/janna.jpg" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Janna Sulemann" />
                </div>
                <div className="absolute bottom-10 -right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-[#D4AF37]/10 z-20">
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





{/* 7. RE-ENGINEERED 3M DOLLAR MARQUEE (ULTRA-LUXURY, SCROLLABLE, CLICKABLE) */}
      <section className="py-24 lg:py-40 bg-[#FCFBF8] clip-diagonal-bottom relative z-20 overflow-hidden border-t border-[#D4AF37]/10">
         {/* Ambient glow */}
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
         
         <div className="text-center mb-20 relative z-10">
             <h3 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.4em] mb-4 flex items-center justify-center gap-4">
                 <span className="w-8 h-px bg-[#D4AF37]"></span> Verified Excellence <span className="w-8 h-px bg-[#D4AF37]"></span>
             </h3>
             <h2 className="text-[#1A1A1A] text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight">A Reputation Built on <br className="hidden md:block"/><span className="italic text-[#D4AF37] font-light">Uncompromising Trust.</span></h2>
         </div>
         
         <div 
           ref={marqueeRef}
           onMouseEnter={() => setIsMarqueePaused(true)}
           onMouseLeave={() => { setIsDraggingMarquee(false); setIsMarqueePaused(false); }}
           onMouseDown={onMarqueeMouseDown}
           onMouseUp={onMarqueeMouseUp}
           onMouseMove={onMarqueeMouseMove}
           onTouchStart={() => setIsMarqueePaused(true)}
           onTouchEnd={() => setTimeout(() => setIsMarqueePaused(false), 1500)}
           className="flex overflow-x-auto gap-6 md:gap-10 px-6 md:px-12 pb-16 snap-x snap-mandatory relative z-10 cursor-grab active:cursor-grabbing no-scrollbar scroll-smooth"
           style={{ 
             maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', 
             WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' 
           }}
         >
            {/* We multiply the array to ensure long scrolling without running out of cards */}
            {[...reviewsData, ...reviewsData, ...reviewsData, ...reviewsData].map((review, i) => (
              <div 
                key={i} 
                className="flex-none w-[85vw] sm:w-[450px] lg:w-[500px] bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-[#D4AF37]/10 hover:shadow-[0_40px_80px_rgba(212,175,55,0.12)] transition-all duration-700 relative overflow-hidden group snap-center flex flex-col justify-between"
              >
                  {/* Background Luxury Quote Mark */}
                  <span className="absolute -top-10 -right-6 text-[200px] text-[#D4AF37] opacity-[0.03] font-serif leading-none pointer-events-none group-hover:scale-110 transition-transform duration-700">"</span>
                  
                  <div className="p-8 md:p-12 relative z-10 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-8">
                          <div className="flex items-center gap-5">
                              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1A1A1A] to-[#333] text-[#D4AF37] flex items-center justify-center font-serif text-2xl shadow-[0_10px_20px_rgba(0,0,0,0.1)] flex-shrink-0">{review.initial}</div>
                              <div>
                                  <p className="font-black text-sm text-[#1A1A1A] uppercase tracking-[0.15em] mb-1">{review.name}</p>
                                  <div className="flex gap-1 text-[#D4AF37] text-[12px]">★★★★★</div>
                              </div>
                          </div>
                          {/* Authentic Google Logo */}
                          <svg className="w-8 h-8 opacity-90 group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                      </div>
                      <p className="text-gray-600 text-base md:text-lg leading-relaxed font-medium mb-10 flex-grow">"{review.text}"</p>
                      
                      <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-auto">
                          <a href={review.link} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 bg-[#FCFBF8] border border-[#D4AF37]/20 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white text-[#1A1A1A] px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 z-20 cursor-pointer">
                            Read Original <span className="text-[14px] group-hover:translate-x-1 transition-transform">→</span>
                          </a>
                          <span className="text-[#D4AF37] text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span> Verified
                          </span>
                      </div>
                  </div>
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
              onMouseMove={onSliderMouseMove}
              onTouchMove={onSliderTouchMove}
              onMouseDown={(e) => { setIsDraggingSlider(true); handleSliderMove(e.clientX); }}
              onMouseUp={() => setIsDraggingSlider(false)}
              onMouseLeave={() => setIsDraggingSlider(false)}
              onTouchStart={(e) => { setIsDraggingSlider(true); handleSliderMove(e.touches[0].clientX); }}
              onTouchEnd={() => setIsDraggingSlider(false)}
            >
              <img src="/before.jpg" className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none grayscale opacity-70" alt="Before Brows" draggable="false" />
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

      {/* 9. LEAD CAPTURE MACHINE (ULTRA-LUXURY) */}
      <section className="relative py-24 lg:py-36 bg-[#FCFBF8] clip-chevron-bottom z-20 overflow-hidden border-t border-[#D4AF37]/10">
        
        {/* Subtle Ambient Background Light */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#D4AF37]/10 to-transparent rounded-full blur-[120px] pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-6 text-center pb-[4vw]">
            <h4 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] mb-4">Direct Expert Advice</h4>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] tracking-tight mb-6">Get a Free Virtual <span className="italic text-[#D4AF37]">Assessment.</span></h2>
            <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mb-16 leading-relaxed font-medium">
                Upload a clear photo of your brows securely from your phone. Janna will personally review your facial structure and email you a custom recommendation on the best pigment and technique for your features.
            </p>

            <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-3xl border border-white p-6 md:p-10 rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.06)] text-left relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                
                <div className="flex justify-between items-center mb-10 border-b border-[#D4AF37]/20 pb-6 relative z-10">
                    <span className="text-gray-500 text-[9px] uppercase tracking-[0.2em] font-black flex items-center gap-3">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4AF37]"></span>
                      </span>
                      Janna is receiving requests
                    </span>
                    <span className="bg-[#FCFBF8] text-[#D4AF37] px-4 py-1.5 rounded-full text-[8px] font-black tracking-[0.2em] uppercase border border-[#D4AF37]/20 shadow-sm">Secure Portal</span>
                </div>
                
                {assessmentStatus === "success" && chatStep === 4 ? (
                   <div className="text-center py-20 relative z-10 animate-fade-in flex flex-col items-center justify-center">
                      <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                         <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full animate-[ping_3s_ease-in-out_infinite]"></div>
                         <div className="absolute inset-2 bg-[#D4AF37]/40 rounded-full animate-pulse"></div>
                         <div className="relative w-16 h-16 bg-white shadow-[0_20px_40px_rgba(212,175,55,0.4)] rounded-full flex items-center justify-center transform transition-transform duration-500 hover:scale-110">
                           <span className="text-3xl text-[#D4AF37]">✓</span>
                         </div>
                      </div>
                      <h3 className="font-serif text-3xl mb-3 text-[#1A1A1A]">Securely Delivered.</h3>
                      <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">Your details and photo have been encrypted and sent directly to Janna. She will reach out to your email shortly.</p>
                   </div>
                ) : (
                  <form onSubmit={handleAssessmentSubmit} encType="multipart/form-data" className="relative z-10 flex flex-col md:flex-row gap-10 lg:gap-16">
                      
                      {/* Left: Cinematic Single Image Upload */}
                      <div className="w-full md:w-5/12 shrink-0">
                        <label className="relative flex flex-col items-center justify-center w-full aspect-[4/5] bg-[#FCFBF8] border-[1.5px] border-dashed border-[#D4AF37]/40 rounded-2xl cursor-pointer hover:border-[#D4AF37] transition-all duration-500 overflow-hidden group/upload shadow-inner">
                            <input required type="file" name="attachment" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={handleImageChange} />
                            
                            {previewUrl ? (
                              <>
                                <img src={previewUrl} alt="Upload Preview" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/upload:scale-105" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm z-10 pointer-events-none">
                                  <span className="text-white text-[9px] uppercase tracking-[0.3em] font-black border border-white/50 px-5 py-2.5 rounded-sm backdrop-blur-md">Replace Photo</span>
                                </div>
                              </>
                            ) : (
                              <div className="flex flex-col items-center justify-center p-6 text-center transform transition-transform duration-500 group-hover/upload:-translate-y-2 pointer-events-none z-10">
                                <div className="w-16 h-16 rounded-full bg-white shadow-[0_10px_30px_rgba(212,175,55,0.15)] flex items-center justify-center mb-5 text-[#D4AF37] group-hover/upload:scale-110 transition-transform duration-500">
                                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4"></path></svg>
                                </div>
                                <span className="text-[#1A1A1A] font-serif text-xl mb-2">Upload Photo</span>
                                <span className="text-[8px] text-gray-400 uppercase tracking-[0.2em] font-black leading-relaxed">Clear Lighting<br/>Straight On Angle</span>
                              </div>
                            )}
                        </label>
                      </div>

                      {/* Right: Floating Label Minimalist Inputs */}
                      <div className="w-full md:w-7/12 flex flex-col justify-between py-2">
                        <div className="space-y-8">
                          
                          <div className="grid grid-cols-2 gap-6">
                            <div className="relative group/input">
                              <input required name="first_name" type="text" id="fname" className="peer w-full bg-transparent border-b border-gray-300 py-3 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-transparent" placeholder="First Name" />
                              <label htmlFor="fname" className="absolute left-0 top-3 text-gray-400 text-[9px] uppercase tracking-[0.2em] font-black transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-[#D4AF37] peer-valid:-top-4 peer-valid:text-[9px] cursor-text">First Name</label>
                            </div>
                            <div className="relative group/input">
                              <input required name="last_name" type="text" id="lname" className="peer w-full bg-transparent border-b border-gray-300 py-3 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-transparent" placeholder="Last Name" />
                              <label htmlFor="lname" className="absolute left-0 top-3 text-gray-400 text-[9px] uppercase tracking-[0.2em] font-black transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-[#D4AF37] peer-valid:-top-4 peer-valid:text-[9px] cursor-text">Last Name</label>
                            </div>
                          </div>
                          
                          <div className="relative group/input">
                            <input required name="email" type="email" id="email" className="peer w-full bg-transparent border-b border-gray-300 py-3 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-transparent" placeholder="Email Address" />
                            <label htmlFor="email" className="absolute left-0 top-3 text-gray-400 text-[9px] uppercase tracking-[0.2em] font-black transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-[#D4AF37] peer-valid:-top-4 peer-valid:text-[9px] cursor-text">Email Address</label>
                          </div>
                          
                          <div className="relative group/input">
                            <input required name="phone" type="tel" id="phone" className="peer w-full bg-transparent border-b border-gray-300 py-3 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-transparent" placeholder="Phone Number" />
                            <label htmlFor="phone" className="absolute left-0 top-3 text-gray-400 text-[9px] uppercase tracking-[0.2em] font-black transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-[#D4AF37] peer-valid:-top-4 peer-valid:text-[9px] cursor-text">Phone Number</label>
                          </div>
                        </div>

                        <button 
                          type="submit"
                          disabled={assessmentStatus === "loading"}
                          className="w-full bg-[#1A1A1A] hover:bg-[#D4AF37] text-white py-5 rounded-sm text-[10px] md:text-xs font-black uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.3)] transition-all duration-500 disabled:opacity-50 mt-10 flex justify-center items-center gap-3"
                        >
                            {assessmentStatus === "loading" ? (
                              <span className="flex items-center gap-3">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Encrypting & Sending...
                              </span>
                            ) : "Submit to Janna"}
                            {assessmentStatus !== "loading" && <span className="text-[14px]">→</span>}
                        </button>
                        {assessmentStatus === "error" && <p className="text-red-500 text-[10px] uppercase tracking-widest text-center mt-3 font-bold">Connection error. Please try again.</p>}
                      </div>
                  </form>
                )}
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
      
      {/* GLOBAL STYLES FOR ANIMATIONS AND CLIP-PATHS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }

        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }

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