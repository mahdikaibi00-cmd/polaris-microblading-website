"use client";

export default function PoliciesPage() {
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
            Clinic Guidelines
            <span className="w-8 h-px bg-[#D4AF37]"></span>
          </h4>
          <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] tracking-tight mb-6">
            A Commitment to <span className="italic text-[#D4AF37]">Excellence.</span>
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed font-medium">
            To ensure every client receives the uninterrupted, world-class artistry they deserve, we strictly enforce our clinic policies. Precision takes time, and your results are our highest priority.
          </p>
        </div>
      </section>

      {/* LUXURY CONTENT CARD */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 lg:px-8 w-full flex-grow -mt-8 pb-24">
        <div className="bg-white/80 backdrop-blur-xl border border-[#D4AF37]/20 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-8 md:p-12">
          
          <div className="space-y-10 text-sm text-gray-600 leading-relaxed font-medium">
            <p>At Polaris Microblading, we are committed to providing every client with exceptional service, artistry, and dedicated time. To ensure the highest level of care and to respect the time of our Master Artist and other clients, we enforce the following clinic policies:</p>
            
            <div className="space-y-6">
              <div className="border-l-2 border-[#D4AF37] pl-6 py-1">
                <h3 className="text-[#1A1A1A] font-serif text-xl mb-2">Securing Your Appointment</h3>
                <p>A non-refundable 20% deposit is required at the time of booking to secure your appointment. This deposit is applied directly to the total cost of your scheduled service.</p>
              </div>
              
              <div className="border-l-2 border-[#D4AF37] pl-6 py-1">
                <h3 className="text-[#1A1A1A] font-serif text-xl mb-2">Cancellation & Rescheduling</h3>
                <p className="mb-2">We require a minimum of <strong className="text-[#1A1A1A]">3 days (72 hours)</strong> notice to cancel or reschedule your appointment.</p>
                <ul className="list-disc pl-4 space-y-2 text-gray-500">
                  <li>Cancellations made with less than 3 days' notice will incur a cancellation fee equal to 100% of the booked service charge.</li>
                  <li>If you provide the required 72-hour notice, your non-refundable deposit may be transferred to a rescheduled appointment one time only.</li>
                </ul>
              </div>

              <div className="border-l-2 border-[#D4AF37] pl-6 py-1">
                <h3 className="text-[#1A1A1A] font-serif text-xl mb-2">Late Arrivals</h3>
                <p>Precision artistry takes time. If you arrive more than 15 minutes late to your scheduled appointment, we may not be able to accommodate your service. In this event, your appointment will be canceled, and your deposit will be forfeited.</p>
              </div>

              <div className="border-l-2 border-[#D4AF37] pl-6 py-1">
                <h3 className="text-[#1A1A1A] font-serif text-xl mb-2">No-Shows</h3>
                <p>Clients who fail to show up for their scheduled appointment without prior communication will be charged 100% of the service fee and may be restricted from booking future appointments.</p>
              </div>

              <div className="border-l-2 border-[#D4AF37] pl-6 py-1">
                <h3 className="text-[#1A1A1A] font-serif text-xl mb-2">Health & Safety</h3>
                <p>For your safety and to comply with Franklin County Health Department regulations, please arrive at your appointment alone. No children, pets, or additional guests are permitted in the procedure room.</p>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100 flex justify-center">
               <a href="https://glossgenius.com" target="_blank" rel="noreferrer" className="bg-[#1A1A1A] hover:bg-[#D4AF37] text-white px-10 py-4.5 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] shadow-xl transition-all duration-500 text-center">
                 Acknowledge & Book Now
               </a>
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