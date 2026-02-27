"use client";
import { useState, useEffect, MouseEvent } from 'react';

export default function PortfolioPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // --- INTERACTIVE PHYSICS: Mouse Tracking Spotlight ---
  const handleMouseMove = (e: MouseEvent) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    setMousePos({
      x: clientX - left,
      y: clientY - top,
    });
  };

  // --- DYNAMIC IMAGE GENERATOR (potfolion01.jpeg to potfolion40.jpeg) ---
  const portfolioImages = Array.from({ length: 40 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return `/images/potfolion${num}.jpeg`;
  });

  return (
    <div className="bg-[#FCFBF8] text-[#1A1A1A] font-sans antialiased selection:bg-[#D4AF37] selection:text-white min-h-screen flex flex-col">
      
      {/* --- MOBILE FULL-SCREEN MENU OVERLAY --- */}
      <div className={`fixed inset-0 z-[100] bg-[#FCFBF8]/95 backdrop-blur-3xl transition-all duration-500 flex flex-col ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="flex items-center justify-between px-4 lg:px-8 h-20 md:h-24 border-b border-[#D4AF37]/20">
          <div className="font-serif text-xl tracking-[0.2em] font-black uppercase text-[#1A1A1A]">POLARIS</div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-[#1A1A1A] p-2 focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center flex-grow space-y-10 text-base font-black uppercase tracking-[0.2em] text-[#1A1A1A]">
          <a href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D4AF37] transition-colors">Home</a>
          <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors">Treatments</a>
          <a href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D4AF37] transition-colors">Contact</a>
          <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="mt-6 bg-[#1A1A1A] text-white hover:bg-[#D4AF37] px-12 py-5 rounded-sm text-xs shadow-[0_20px_40px_rgba(212,175,55,0.2)] transition-colors">Book Now</a>
        </div>
      </div>

      {/* --- ULTRA-LUX NAVIGATION BAR --- */}
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
            <a href="/" className="font-serif text-2xl tracking-[0.25em] font-black uppercase text-[#1A1A1A] flex flex-col hover:text-[#D4AF37] transition-colors">
              POLARIS <span className="text-[9px] tracking-[0.4em] text-[#D4AF37] font-sans -mt-1">Microblading</span>
            </a>
          </div>
          
          <div className="hidden lg:flex space-x-10 text-[#1A1A1A] text-[11px] font-bold uppercase tracking-[0.15em] items-center">
            <a href="/" className="hover:text-[#D4AF37] transition-colors">Home</a>
            <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors">Treatments</a>
            <a href="/contact" className="hover:text-[#D4AF37] transition-colors">Contact</a>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="bg-[#1A1A1A] hover:bg-[#D4AF37] text-white px-8 py-3.5 rounded-sm text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all duration-500 transform hover:-translate-y-1">
              Book Now
            </a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION: THE SALESMAN (WITH PHYSICS) --- */}
      <section 
        onMouseMove={handleMouseMove}
        className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#FCFBF8] z-20 group border-b border-[#D4AF37]/10"
      >
        {/* Mouse-Tracking Spotlight (Reveals Gold Glow) */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-0"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.08), transparent 40%)`
          }}
        />

        {/* Ambient Floating Orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none animate-spin-slow"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#E6C5C0]/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-8">
          <h4 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-[#D4AF37]"></span>
            The Visual Archive
            <span className="w-8 h-px bg-[#D4AF37]"></span>
          </h4>
          <h1 className="text-5xl md:text-7xl font-serif text-[#1A1A1A] tracking-tight mb-8 leading-[1.1]">
            Uncompromising <br/><span className="italic text-[#D4AF37]">Artistry.</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium max-w-2xl mx-auto mb-10">
            We don't just promise flawless results—we document them. Browse our extensive, unedited gallery of genuine client transformations. Your dream shape, structure, and symmetry are already here.
          </p>

          <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="inline-flex items-center gap-4 bg-[#1A1A1A] hover:bg-[#D4AF37] text-white px-10 py-5 rounded-sm text-[10px] md:text-xs font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(212,175,55,0.15)] transition-all duration-500 transform hover:-translate-y-1">
            Secure Your Transformation <span className="text-[14px]">→</span>
          </a>
        </div>
      </section>

      {/* --- MASONRY GALLERY SECTION --- */}
      <section className="relative z-10 max-w-[1600px] mx-auto px-4 lg:px-8 w-full flex-grow pt-16 pb-32">
        
        {/* Apple-style Masonry Columns */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
           
           {portfolioImages.map((src, index) => (
             <div key={index} className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-[0_40px_80px_rgba(212,175,55,0.2)] transition-all duration-700 cursor-crosshair break-inside-avoid border border-[#D4AF37]/10 bg-white">
                
                {/* Image */}
                <img 
                  src={src} 
                  loading="lazy"
                  className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105" 
                  alt={`Polaris Microblading Result ${index + 1}`} 
                />
                
                {/* Frost Glass Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0">
                    <div className="flex justify-between items-end border-t border-[#D4AF37]/30 pt-4">
                       <div>
                         <h4 className="font-serif text-lg text-white mb-1">Flawless Result</h4>
                         <p className="text-[8px] uppercase tracking-[0.3em] text-[#D4AF37] font-black">Healed / Unedited</p>
                       </div>
                       <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-xs group-hover:rotate-45 transition-transform duration-500">
                         ✦
                       </div>
                    </div>
                </div>

             </div>
           ))}

        </div>

        {/* Bottom CTA Fade */}
        <div className="mt-32 text-center bg-gradient-to-b from-transparent to-[#FAF6F0] rounded-b-3xl p-16 border-b border-x border-[#D4AF37]/10">
            <h2 className="text-3xl font-serif text-[#1A1A1A] mb-4">Ready for your reveal?</h2>
            <p className="text-gray-500 text-sm mb-8">Join the hundreds of women waking up with perfect symmetry.</p>
            <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="inline-block bg-[#1A1A1A] text-white px-8 py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#D4AF37] transition-colors">
              Book a Consultation
            </a>
        </div>
      </section>

      {/* --- MINIMAL FOOTER --- */}
      <footer className="bg-white py-16 border-t border-gray-100 text-center mt-auto">
         <div className="font-serif text-2xl tracking-[0.2em] font-black uppercase text-[#1A1A1A] flex flex-col mb-8">
            POLARIS <span className="text-[8px] tracking-[0.4em] text-[#D4AF37] font-sans mt-1">Microblading</span>
         </div>
         <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">© 2026 Polaris Microblading.</p>
         <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">Designed by <a href="https://vireva.agency" target="_blank" rel="noreferrer" className="text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">Vireva Agency</a></p>
      </footer>

      {/* --- GLOBAL STYLES --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-slow {
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
      `}} />

    </div>
  );
}