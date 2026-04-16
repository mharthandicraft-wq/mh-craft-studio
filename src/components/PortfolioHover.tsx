import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const works = [
  
  { id: 1, title: "Persian Jewelry Box", cat: "Micro-Mosaic", img: "/images/portfolio/DSCF6530.webp" },
  { id: 2, title: "Classic Backgammon", cat: "Inlaid Wood", img: "/images/portfolio/handmade-khatam-jewelry-box.webp" },

  { id: 3, title: "Geometric Mirror", cat: "Traditional Craft", img: "/images/portfolio/DSCF7529.webp" },
  { id: 4, title: "Custom Display Box", cat: "Marquetry", img: "/images/portfolio/DSCF7578.webp" },
];

const PortfolioHover = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-brand-dark w-full py-24 md:py-32 px-6 md:px-12 flex flex-col justify-center overflow-hidden">
      
      {/* Mobile Version: Vertical Stack */}
      <div className="md:hidden flex flex-col gap-12">
        <div className="mb-8 text-center px-4">
          <span className="text-brand-gold font-sans text-xs uppercase tracking-[0.2em] mb-4 block font-semibold">Portfolio Preview</span>
          <h2 className="font-serif text-4xl text-white mb-4 leading-tight">Our Work</h2>
          <p className="font-sans text-neutral-400 text-sm leading-relaxed">
            A selection of handcrafted pieces created during different stages of our journey.
          </p>
        </div>
        {works.map((work) => (
          <div key={work.id} className="flex flex-col gap-4 border border-white/5 bg-white/[0.01] rounded-lg p-5">
            <img src={work.img} alt={work.title} className="w-full h-auto aspect-square object-cover object-center rounded-lg" />
            <div className="text-center pt-2">
              <h3 className="font-serif text-2xl text-white mb-1 leading-tight">{work.title}</h3>
              <span className="font-sans text-brand-gold text-xs uppercase tracking-widest font-semibold">{work.cat}</span>
            </div>
          </div>
        ))}
        <a href="/portfolio" className="mt-8 border border-brand-gold text-brand-gold px-8 py-5 uppercase tracking-[0.2em] text-sm hover:bg-brand-gold hover:text-brand-dark transition-colors w-full text-center">
          View Full Portfolio
        </a>
      </div>

      {/* Desktop Version: Grid Layout */}
      <div className="hidden md:flex flex-col max-w-[1700px] mx-auto w-full">
        
        {/* Centered Header */}
        <div className="text-center mb-12">
          <span className="text-brand-gold font-sans text-xs uppercase tracking-[0.2em] mb-4 block font-semibold">Portfolio Preview</span>
          <h2 className="font-serif text-5xl lg:text-6xl text-white mb-6 leading-tight">Our Work</h2>
          <p className="font-sans text-neutral-400 text-lg leading-relaxed">
            A selection of handcrafted pieces created during different stages of our journey.
          </p>
        </div>

        {/* Two Columns: Images Left, Titles Right */}
        <div className="grid grid-cols-12 gap-20 items-center">
          
          {/* Left Column: Images */}
          <div className="col-span-7 h-[70vh] relative rounded-lg overflow-hidden border-2 border-white/5 bg-white/[0.02] shadow-xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={works[activeIndex].img}
                alt={works[activeIndex].title}
               
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </AnimatePresence>
          </div>

          {/* Right Column: Titles */}
          <div className="col-span-5 flex flex-col gap-12 lg:pl-10">
            <div className="flex flex-col border-t border-white/10">
              {works.map((work, index) => (
                <div 
                  key={work.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  className="py-7 border-b border-white/10 cursor-pointer group flex justify-between items-center"
                >
                  <h3 className={`font-serif text-3xl transition-colors duration-500 leading-tight ${activeIndex === index ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                    {work.title}
                  </h3>
                  <span className={`font-sans text-sm font-semibold tracking-widest text-brand-gold transition-opacity duration-500 ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                    {work.cat}
                  </span>
                </div>
              ))}
            </div>

            <a href="/portfolio" className="mt-8 self-start border-b-2 border-brand-gold text-brand-gold pb-2 uppercase tracking-[0.2em] text-sm hover:text-white transition-colors">
              [ View Full Portfolio ]
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PortfolioHover;