"use client";

export default function PrivacyPage() {
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
            Data Protection
            <span className="w-8 h-px bg-[#D4AF37]"></span>
          </h4>
          <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] tracking-tight mb-6">
            Privacy <span className="italic text-[#D4AF37]">Policy.</span>
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed font-medium">
            Your trust is our foundation. We safeguard your clinical and personal data with the same meticulous attention to detail that we apply to our artistry.
          </p>
        </div>
      </section>

      {/* LUXURY CONTENT CARD */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 lg:px-8 w-full flex-grow -mt-8 pb-24">
        <div className="bg-white/80 backdrop-blur-xl border border-[#D4AF37]/20 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-8 md:p-12">
          
          <div className="space-y-8 text-sm text-gray-600 leading-relaxed font-medium">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <span className="text-[#1A1A1A] font-bold">Polaris Microblading</span>
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-black">Effective: Jan 1, 2026</span>
            </div>

            <p>Polaris Microblading ("we," "our," or "us") is committed to protecting your privacy and ensuring your personal information is handled securely. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or book our services at our Columbus, Ohio clinic.</p>
            
            <div className="bg-[#FAF6F0] p-6 rounded-sm border border-[#D4AF37]/10">
               <h3 className="text-[#1A1A1A] font-bold mb-2">Information We Collect</h3>
               <p className="text-sm">We collect information you voluntarily provide to us, including your name, email address, phone number, and any messages submitted through our website's contact forms.</p>
            </div>

            <div className="bg-[#FAF6F0] p-6 rounded-sm border border-[#D4AF37]/10">
               <h3 className="text-[#1A1A1A] font-bold mb-2">Booking Data</h3>
               <p className="text-sm">All appointment scheduling, payment processing, and related data collection are securely handled by our third-party booking partner, GlossGenius. We do not store your credit card information directly on our website servers.</p>
            </div>

            <div className="bg-[#FAF6F0] p-6 rounded-sm border border-[#D4AF37]/10">
               <h3 className="text-[#1A1A1A] font-bold mb-2">How We Use Your Information</h3>
               <p className="text-sm">We use the information collected solely to communicate with you regarding your inquiries, manage your appointments, and provide personalized semi-permanent makeup services. We may occasionally send you clinic updates or promotional offers, which you can opt out of at any time.</p>
            </div>

            <div className="bg-[#FAF6F0] p-6 rounded-sm border border-[#D4AF37]/10">
               <h3 className="text-[#1A1A1A] font-bold mb-2">Data Sharing & Security</h3>
               <p className="text-sm mb-4">We do not sell, trade, or rent your personal identification information to third parties. We only share information with trusted third-party service providers (such as our booking and payment processors) strictly as necessary to operate our business and service your appointments.</p>
               <p className="text-sm">We implement a variety of standard security measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure.</p>
            </div>

            <div className="pt-8 border-t border-gray-100">
               <h3 className="text-[#1A1A1A] font-serif text-xl mb-4">Contacting Us</h3>
               <p className="mb-1">If you have any questions regarding this Privacy Policy, please contact our clinic:</p>
               <p className="text-[#1A1A1A] font-bold">1158 Polaris Parkway Suite 20<br/>Columbus, OH 43240</p>
               <a href="mailto:polarismicroblading@gmail.com" className="text-[#D4AF37] hover:text-[#1A1A1A] transition-colors mt-2 block font-bold">polarismicroblading@gmail.com</a>
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