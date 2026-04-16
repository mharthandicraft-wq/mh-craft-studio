import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const challenges = [
  {
    id: "01",
    title: "Workshop Space",
    desc: "Khatam-kari requires a stable, dust-free environment for precise gluing and cutting. Currently, we work from a limited living space.",
  },
  {
    id: "02",
    title: "Precision Tools",
    desc: "The craft depends on specialized saws and presses. Without them, we can only produce small-scale items.",
  },
  {
    id: "03",
    title: "Raw Materials",
    desc: "Sourcing high-quality brass, bone, and wood requires upfront capital that is currently prioritized for survival.",
  },
];

const CreativeChallenges = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="relative bg-theme-base overflow-hidden transition-colors duration-500">
      
      {/* Background Spotlight Layer */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundColor: "var(--color-spotlight-base)",
          backgroundImage: "url('/images/home/backgammon.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          WebkitMaskImage: `radial-gradient(circle 300px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(circle 300px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
        }}
      ></div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 py-10 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side */}
          <div className="lg:col-span-5 lg:sticky  lg:top-32">
            <span className="text-brand-gold font-sans text-xs uppercase tracking-[0.3em] mb-6 block font-semibold">
              The Reality
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-theme leading-tight mb-8">
              Why the Art <br /> 
              <span className="text-brand-gold italic opacity-80 font-light">Must Wait</span>
            </h2>
            <p className="font-sans text-theme-muted text-lg leading-relaxed max-w-md">
              We haven't stopped; we are simply preserving our energy for the moment we have the structural support to rebuild.
            </p>
          </div>

          {/* Right Side - Updated Cards with Blur for Readability */}
          <div className="lg:col-span-7 space-y-8">
            {challenges.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }}
                /* Added 'backdrop-blur-md' and a slightly darker 'bg-brand-dark/60' 
                   to ensure text is readable even when spotlight passes underneath.
                */
                className="group relative border theme-panel backdrop-blur-md p-8 transition-all duration-500 hover:border-brand-gold/30 rounded-lg"
              >
                <div className="flex items-start gap-6">
                  <div className="mt-2 w-2 h-2 bg-brand-gold rotate-45 shrink-0 group-hover:rotate-90 transition-all duration-500"></div>
                  <div>
                    <h3 className="font-serif text-2xl text-theme mb-3 group-hover:text-brand-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-theme-soft leading-relaxed text-base md:text-lg">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default CreativeChallenges;