import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const works = [
  { id: 1, title: "Persian Jewelry Box", cat: "Micro-Mosaic", img: "/images/portfolio/luxury-inlaid-wood-display-box.webp" },
  { id: 2, title: "Classic Backgammon", cat: "Inlaid Wood", img: "/images/portfolio/handmade-khatam-jewelry-box.webp" },
  { id: 3, title: "Geometric Mirror", cat: "Traditional Craft", img: "/images/portfolio/DSCF7529.webp" },
  { id: 4, title: "Custom Display Box", cat: "Marquetry", img: "/images/portfolio/DSCF7578.webp" },
];

const PortfolioHorizontal = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ 
    target: targetRef
  });
  
  /**
   * Optimization: 
   * Reduced the transform range to prevent the "empty space" at the end.
   * -65% is usually the sweet spot for 4-5 wide items.
   */
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section className="bg-brand-dark w-full overflow-hidden">
      
      {/* Mobile Version: Vertical Stack */}
      <div className="md:hidden px-6 py-20 flex flex-col gap-10">
        <div className="mb-4">
          <span className="text-brand-gold font-sans text-xs uppercase tracking-[0.2em] mb-4 block font-semibold">Portfolio Preview</span>
          <h2 className="font-serif text-4xl text-white mb-4">Our Work</h2>
          <p className="font-sans text-neutral-400 text-sm leading-relaxed">
            A selection of handcrafted pieces created during different stages of our journey.
          </p>
        </div>
        {works.map((work) => (
          <div key={work.id} className="flex flex-col gap-5 border border-white/5 bg-white/[0.01] rounded-lg p-5">
            <img src={work.img} alt={work.title} className="w-full h-auto aspect-square object-cover object-center rounded-lg" />
            <div>
              <h3 className="font-serif text-2xl text-white mb-1">{work.title}</h3>
              <span className="font-sans text-brand-gold text-xs uppercase tracking-widest">{work.cat}</span>
            </div>
          </div>
        ))}
        <a href="/portfolio" className="mt-4 border border-brand-gold text-brand-gold px-8 py-5 uppercase tracking-[0.2em] text-sm text-center">
          View Full Portfolio
        </a>
      </div>

      {/* Desktop Version: Horizontal Scroll */}
      {/* Changed height to 300vh to reduce dead scroll space */}
      <div ref={targetRef} className="hidden md:block h-[300vh] relative w-full bg-brand-dark">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          
          {/* Fixed Headline */}
          <div className="absolute top-24 left-12 z-20 max-w-sm">
            <span className="text-brand-gold font-sans text-xs uppercase tracking-[0.2em] mb-4 block font-semibold">Portfolio Preview</span>
            <h2 className="font-serif text-6xl text-white mb-6 drop-shadow-lg">Our Work</h2>
            <p className="font-sans text-neutral-300 text-lg leading-relaxed drop-shadow-md">
              A selection of handcrafted pieces created during different stages of our journey.
            </p>
          </div>

          <motion.div style={{ x }} className="flex h-[60vh] pl-[40vw] gap-12 items-center">
            {works.map((work) => (
              <div key={work.id} className="relative h-full w-[50vw] shrink-0 group rounded-lg overflow-hidden border border-white/5 shadow-2xl">
                <div className="absolute inset-0 bg-brand-dark/20 z-10 transition-colors duration-500 group-hover:bg-transparent"></div>
                <img 
                  src={work.img} 
                  alt={work.title} 
                  className="w-full h-full object-cover object-center" 
                />
                <div className="absolute bottom-10 left-10 z-20">
                  <h3 className="font-serif text-4xl text-white mb-1 tracking-wide">{work.title}</h3>
                  <span className="font-sans text-brand-gold text-sm uppercase tracking-widest font-semibold">{work.cat}</span>
                </div>
              </div>
            ))}
            
            {/* CTA at the end of the track */}
            <div className="h-full w-[40vw] shrink-0 flex items-center justify-center pr-[10vw]">
              <a href="/portfolio" className="border border-brand-gold text-brand-gold px-12 py-6 uppercase tracking-[0.2em] text-sm hover:bg-brand-gold hover:text-brand-dark transition-all duration-300">
                View Full Portfolio
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PortfolioHorizontal;