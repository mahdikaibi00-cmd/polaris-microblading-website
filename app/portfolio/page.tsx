"use client";

export default function PortfolioPage() {
  return (
    <div className="bg-[#FCFBF8] text-[#1A1A1A] font-sans antialiased selection:bg-[#D4AF37] selection:text-white min-h-screen flex flex-col">
      
      <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-2xl border-b border-[#D4AF37]/20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          <a href="/" className="font-serif text-xl tracking-[0.25em] font-black uppercase text-[#1A1A1A] flex flex-col">
            POLARIS <span className="text-[7px] tracking-[0.4em] text-[#D4AF37] font-sans -mt-1">Microblading</span>
          </a>
          <div className="flex gap-8 items-center">
             <a href="https://polarismicroblading.glossgenius.com/services" target="_blank" rel="noreferrer" className="hidden sm:block text-[9px] font-black uppercase tracking-[0.2em] text-[#D4AF37] hover:text-[#1A1A1A] transition-colors">Book Now</a>
             <a href="/" className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-[#D4AF37] transition-colors">← Back to Home</a>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-16 overflow-hidden bg-[#FCFBF8] z-0">
        <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h4 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] mb-4 flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-[#D4AF37]"></span> Visual Archives <span className="w-8 h-px bg-[#D4AF37]"></span>
          </h4>
          <h1 className="text-5xl md:text-7xl font-serif text-[#1A1A1A] tracking-tight mb-6">
            The <span className="italic text-[#D4AF37]">Portfolio.</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
            A curated gallery of undetectable enhancements. Real clients, unedited precision.
          </p>
        </div>
      </section>

      {/* FUTURISTIC MASONRY GRID */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 w-full flex-grow pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           
           {/* Portfolio Items - Alternating Shapes */}
           {[1, 2, 3, 4, 5, 6].map((item) => (
             <div key={item} className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_30px_60px_rgba(212,175,55,0.15)] transition-all duration-700 ${item % 2 === 0 ? 'aspect-square' : 'aspect-[4/5]'}`}>
                {/* Reveal Wrapper */}
                <div className="absolute inset-0 w-full h-full flex">
                    <img src="/before.jpg" className="w-full h-full object-cover object-center absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-1000 grayscale" alt="Before" />
                    <img src="/after.jpg" className="w-full h-full object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 scale-105 group-hover:scale-100" alt="After" />
                </div>
                
                {/* Glassmorphism Label */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-md border border-white/50 p-4 rounded-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex justify-between items-center">
                       <div>
                         <h4 className="font-bold text-sm text-[#1A1A1A]">Advanced Microblading</h4>
                         <p className="text-[9px] uppercase tracking-widest text-gray-500 mt-1">Custom Pigment Blend</p>
                       </div>
                       <span className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-[10px]">↗</span>
                    </div>
                </div>
             </div>
           ))}

        </div>
      </section>

      <footer className="bg-white py-12 border-t border-gray-100 text-center mt-auto">
         <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">© 2026 Polaris Microblading.</p>
         <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">Designed by <a href="https://vireva.agency" target="_blank" rel="noreferrer" className="text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">Vireva Agency</a></p>
      </footer>
    </div>
  );
}