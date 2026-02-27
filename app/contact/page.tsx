"use client";
import { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "de75332f-f09b-4b62-afc0-e22d429112fb");
    formData.append("subject", "New Contact Inquiry - Polaris Microblading");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      if (response.ok) setStatus("success");
      else setStatus("error");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="bg-[#FCFBF8] text-[#1A1A1A] font-sans antialiased selection:bg-[#D4AF37] selection:text-white min-h-screen flex flex-col relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-gradient-to-bl from-[#D4AF37]/10 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none"></div>

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

      <section className="relative z-10 max-w-[1200px] mx-auto px-4 lg:px-8 pt-32 pb-24 flex-grow flex flex-col lg:flex-row gap-16 items-center w-full">
         
         {/* Left Side: Typography */}
         <div className="lg:w-1/2 w-full">
            <h4 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
              <span className="w-8 h-px bg-[#D4AF37]"></span> Direct Line
            </h4>
            <h1 className="text-5xl md:text-7xl font-serif text-[#1A1A1A] tracking-tight mb-8">
              Let's <span className="italic text-[#D4AF37]">Connect.</span>
            </h1>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium mb-12 max-w-md">
              Whether you are inquiring about a master training course, complex scar camouflage, or securing your spot for advanced microblading, our clinic coordinator is ready to assist you.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 border-l-2 border-[#D4AF37] pl-4">
                <div>
                   <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">Clinic Location</p>
                   <p className="text-[#1A1A1A] font-bold text-sm">1158 Polaris Parkway Suite 20<br/>Columbus, OH 43240</p>
                </div>
              </div>
            </div>
         </div>

         {/* Right Side: Futuristic Glassmorphism Form */}
         <div className="lg:w-1/2 w-full">
            <div className="bg-white/80 backdrop-blur-3xl border border-[#D4AF37]/30 rounded-3xl p-8 md:p-12 shadow-[0_40px_80px_rgba(212,175,55,0.08)] relative">
               
               {status === "success" ? (
                 <div className="text-center py-16 animate-fade-in">
                    <div className="w-20 h-20 bg-[#FCFBF8] border border-[#D4AF37]/30 rounded-full flex items-center justify-center mx-auto mb-6">
                       <span className="text-3xl text-[#D4AF37]">✓</span>
                    </div>
                    <h3 className="font-serif text-2xl mb-2 text-[#1A1A1A]">Inquiry Received</h3>
                    <p className="text-gray-500 text-sm">Our clinic team will reach out to you within 24 hours.</p>
                 </div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-6">
                   <div className="grid grid-cols-2 gap-6">
                     <div>
                       <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-2 block">First Name</label>
                       <input required name="first_name" type="text" className="w-full bg-[#FCFBF8] border border-gray-200 rounded-sm px-4 py-3.5 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" />
                     </div>
                     <div>
                       <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-2 block">Last Name</label>
                       <input required name="last_name" type="text" className="w-full bg-[#FCFBF8] border border-gray-200 rounded-sm px-4 py-3.5 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" />
                     </div>
                   </div>
                   
                   <div>
                     <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-2 block">Email Address</label>
                     <input required name="email" type="email" className="w-full bg-[#FCFBF8] border border-gray-200 rounded-sm px-4 py-3.5 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" />
                   </div>

                   <div>
                     <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-2 block">How can we help you?</label>
                     <textarea required name="message" rows={4} className="w-full bg-[#FCFBF8] border border-gray-200 rounded-sm px-4 py-3.5 text-[#1A1A1A] text-sm focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"></textarea>
                   </div>

                   <button type="submit" disabled={status === "loading"} className="w-full bg-[#1A1A1A] hover:bg-[#D4AF37] text-white px-8 py-4.5 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all duration-500 disabled:opacity-50 mt-4">
                     {status === "loading" ? "Sending..." : "Submit Inquiry"}
                   </button>
                 </form>
               )}
            </div>
         </div>

      </section>
    </div>
  );
}