import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface StatusContent {
  reality: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  currentSituation: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
    points: string[];
    quote: string;
  };
}

const StatusAndChallenges = ({ content }: { content: StatusContent }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateViewport = () => setIsDesktop(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      return;
    }

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
  }, [isDesktop]);

  return (
    <section ref={containerRef} className="relative bg-theme-base overflow-hidden transition-colors duration-500">
      
      {/* Background Spotlight Layer - Shared for both sections */}
      <div 
        className="absolute inset-0 z-0 hidden pointer-events-none lg:block"
        style={{
          backgroundColor: "var(--color-spotlight-base)",
          backgroundImage: "url('/images/home/artisan-Decorative-tray.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          WebkitMaskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
        }}
      ></div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 py-32 space-y-48">
        
        {/* PART 1: Why the Art Must Wait (Original Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32 text-center lg:text-start">
            <span className="text-brand-gold font-sans text-xs uppercase tracking-[0.3em] mb-6 block font-semibold">
              {content.reality.eyebrow}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-theme leading-tight mb-8">
              {content.reality.title}   <br />
              <span className="text-brand-gold  opacity-80 font-light">{content.reality.accent}</span>
            </h2>
            <p className="font-sans text-theme-muted text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
              {content.reality.description}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-8">
            {content.reality.items.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="group relative border theme-panel backdrop-blur-md p-8 rounded-lg"
              >
                <div className="flex items-start gap-6">
                  <div className="mt-2 w-2 h-2 bg-brand-gold rotate-45 shrink-0 group-hover:rotate-90 transition-all duration-500"></div>
                  <div>
                    <h3 className="font-serif text-2xl text-theme mb-3 group-hover:text-brand-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-theme-soft leading-relaxed text-base md:text-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* PART 2: Our Current Situation (Swapped Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start  pt-32">
          {/* List moved to LEFT (Col-span 7) */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="space-y-4">
              {content.currentSituation.points.map((point, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-theme-elevated backdrop-blur-md border border-theme-strong flex items-start gap-4 rounded-sm"
                >
                  <div className="mt-2 w-1.5 h-1.5 bg-theme-dot rounded-full shrink-0"></div>
                  <p className="font-sans text-theme-soft text-base md:text-lg leading-relaxed">
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 p-8 border-l-2 border-brand-gold/30 bg-brand-gold/[0.02] backdrop-blur-sm"
            >
              <p className="font-serif text-xl md:text-2xl text-theme italic leading-relaxed">
                "{content.currentSituation.quote}"
              </p>
            </motion.div>
          </div>

          {/* Header moved to RIGHT (Col-span 5) */}
          <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-32 text-center lg:text-start">
            <span className="text-brand-gold font-sans text-xs uppercase tracking-[0.2em] mb-4 block font-semibold">
              {content.currentSituation.eyebrow}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-theme mb-6 leading-tight">
              {content.currentSituation.title} <br /> <span className=" opacity-70 font-light text-brand-gold">{content.currentSituation.accent}</span>
            </h2>
            <p className="font-sans text-theme-muted text-lg leading-relaxed max-w-md mx-auto lg:ml-auto">
              {content.currentSituation.description}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StatusAndChallenges;