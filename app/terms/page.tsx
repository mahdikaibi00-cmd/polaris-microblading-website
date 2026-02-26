"use client";

export default function TermsPage() {
  return (
    <div className="bg-[#FCFBF8] text-[#1A1A1A] font-sans antialiased selection:bg-[#D4AF37] selection:text-white min-h-screen flex flex-col">
      
      {/* SIMPLIFIED LUXURY NAV */}
      <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-2xl border-b border-[#D4AF37]/20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          <a href="/" className="font-serif text-xl tracking-[0.25em] font-black uppercase text-[#1A1A1A] flex flex-col">
            POLARIS <span className="text-[7px] tracking-[0.4em] text-[#D4AF37] font-sans -mt-1">Microblading</span>
          </a>
          <a href="/" className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-[#D4AF37] transition-colors">
            ← Back to Home
          </a>
        </div>
      </nav>

      {/* ANIMATED HERO SECTION */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-[#FCFBF8] z-0">
        <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] bg-[#E6C5C0]/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h4 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] mb-4 flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-[#D4AF37]"></span>
            Legal & Medical
            <span className="w-8 h-px bg-[#D4AF37]"></span>
          </h4>
          <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] tracking-tight mb-6">
            Terms & <span className="italic text-[#D4AF37]">Conditions.</span>
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed font-medium">
            We operate at the highest echelon of clinical safety and aesthetic standards. By engaging with our services, you align with our uncompromising protocols.
          </p>
        </div>
      </section>

      {/* LUXURY CONTENT CARD */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 lg:px-8 w-full flex-grow -mt-8 pb-24">
        <div className="bg-white/80 backdrop-blur-xl border border-[#D4AF37]/20 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-8 md:p-12">
          
          <div className="space-y-10 text-sm text-gray-600 leading-relaxed font-medium">
            <p>Welcome to Polaris Microblading. By accessing our website and booking our services, you explicitly agree to the following Terms and Conditions.</p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-[#1A1A1A] font-serif text-xl mb-3 flex items-center gap-2">
                  <span className="text-[#D4AF37] text-xs">01.</span> Nature of Services
                </h3>
                <p className="pl-6 border-l border-gray-100">Polaris Microblading provides semi-permanent cosmetic makeup and paramedical tattooing services. Please be aware that all procedures are a form of tattooing. While our Master Artist utilizes the highest quality pigments and advanced techniques (including PhiBrows standards), exact color matches, perfect symmetry, and specific healed results cannot be 100% guaranteed.</p>
              </div>
              
              <div>
                <h3 className="text-[#1A1A1A] font-serif text-xl mb-3 flex items-center gap-2">
                  <span className="text-[#D4AF37] text-xs">02.</span> The Healing Process & Touch-Ups
                </h3>
                <p className="pl-6 border-l border-gray-100">Semi-permanent makeup is a multi-step process. Healed results vary per individual depending on skin type, age, lifestyle, and strict adherence to provided aftercare instructions. A mandatory touch-up session (typically 6-8 weeks after the initial procedure) is highly recommended for optimal results.</p>
              </div>

              <div>
                <h3 className="text-[#1A1A1A] font-serif text-xl mb-3 flex items-center gap-2">
                  <span className="text-[#D4AF37] text-xs">03.</span> Right to Refuse Service
                </h3>
                <p className="pl-6 border-l border-gray-100">For your safety, Polaris Microblading reserves the right to refuse service to anyone at our discretion. This includes, but is not limited to, individuals who are pregnant, nursing, have specific contraindicated medical conditions, or those who arrive with skin trauma in the procedure area.</p>
              </div>

              <div>
                <h3 className="text-[#1A1A1A] font-serif text-xl mb-3 flex items-center gap-2">
                  <span className="text-[#D4AF37] text-xs">04.</span> Pricing & Payments
                </h3>
                <p className="pl-6 border-l border-gray-100">All prices are subject to change without prior notice. Prices are only guaranteed once an appointment is booked and the 20% deposit is secured. All remaining balances are due in full on the day of the procedure. We accept cash and major credit cards.</p>
              </div>

              <div>
                <h3 className="text-[#1A1A1A] font-serif text-xl mb-3 flex items-center gap-2">
                  <span className="text-[#D4AF37] text-xs">05.</span> Photography and Media
                </h3>
                <p className="pl-6 border-l border-gray-100">We respect your privacy. However, before-and-after photos are a standard part of our clinical record-keeping. With your explicit, signed consent provided in-clinic, these images may be used for marketing, educational, or portfolio purposes on our website and social media channels.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MINIMAL FOOTER */}
      <footer className="bg-white py-12 border-t border-gray-100 text-center mt-auto">
         <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">© 2026 Polaris Microblading.</p>
         <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">Designed by <a href="https://vireva.agency" target="_blank" rel="noreferrer" className="text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">Vireva Agency</a></p>
      </footer>
    </div>
  );
}