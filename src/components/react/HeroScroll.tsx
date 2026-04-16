import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HeroScroll = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const imageWidth = useTransform(scrollYProgress, [0, 0.3], ["100%", "60%"]);
  
  const text1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.5], [0, 1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.5], [30, 0, 0, -30]);

  const text2Opacity = useTransform(scrollYProgress, [0.4, 0.55, 0.9], [0, 1, 1]);
  const text2Y = useTransform(scrollYProgress, [0.4, 0.55], [30, 0]);

  return (
    <section ref={targetRef} className="h-[300vh] relative w-full bg-brand-light dark:bg-brand-dark">
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* Image Column */}
        <motion.div 
          style={{ width: imageWidth }} 
          className="h-full relative shrink-0"
        >
          <img 
            src="/images/home/artisan-marquetry-jewelry-box.webp" 
            alt="Handcrafted Marquetry Art" 
            className="w-full h-full object-cover"
          />
          {/* Subtle overlay changed to a light tint to match the theme */}
          <div className="absolute inset-0 bg-brand-light/10 dark:bg-brand-dark/10" />
        </motion.div>

        {/* Content Column */}
        <div className="flex-1 h-full relative flex items-center bg-brand-light dark:bg-brand-dark">
          
          {/* First Message Container */}
          <motion.div 
            style={{ opacity: text1Opacity, y: text1Y }}
            className="absolute inset-0 flex flex-col justify-center px-6 md:px-16"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 leading-tight tracking-tight">
              Hands That Create.<br/>
              <span className="text-brand-gold italic">A Craft That Survives.</span>
            </h1>
            <p className="font-sans text-neutral-600 dark:text-neutral-300 text-lg md:text-xl leading-relaxed max-w-2xl">
              A family-led traditional craft workshop in İzmit, working to revive the art of Khatam and create sustainable training opportunities for vulnerable communities.
            </p>
          </motion.div>

          {/* Second Message Container */}
          <motion.div 
            style={{ opacity: text2Opacity, y: text2Y }}
            className="absolute inset-0 flex flex-col justify-center px-6 md:px-16"
          >
            <div className="font-sans text-neutral-600 text-lg md:text-xl leading-relaxed max-w-2xl">
              <p className="mb-6">
                We are a family of five who arrived in Türkiye as refugees 12 years ago and settled in İzmit.
              </p>
              <p className="mb-6 text-neutral-800 font-medium italic border-l-2 border-brand-gold/30 pl-4">
                We brought no resources with us — only our skills, our faith in work, and a traditional craft rooted in centuries of history: Khatam art.
              </p>
              <p>
                Over the years, we built a life focused on community support and service to displaced families, while quietly working to keep this fragile craft alive.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroScroll;