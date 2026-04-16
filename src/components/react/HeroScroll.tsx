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
    <>
      <section className="w-full bg-theme-base transition-colors duration-500 lg:hidden">
        <div className="flex min-h-screen flex-col">
          <div className="relative h-[42vh] w-full sm:h-[48vh]">
            <img
              src="/images/home/artisan-marquetry-jewelry-box.webp"
              alt="Handcrafted Marquetry Art"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[color:color-mix(in_srgb,var(--color-page-bg)_10%,transparent)]" />
          </div>

          <div className="flex flex-1 items-center justify-center bg-theme-base px-6 py-12 text-center transition-colors duration-500 sm:px-10 sm:py-16">
            <div className="mx-auto flex max-w-3xl flex-col items-center">
              <h1 className="mb-6 font-serif text-4xl font-bold leading-tight tracking-tight text-theme transition-colors duration-500 sm:text-5xl">
                Hands That Create.<br />
                <span className="text-brand-gold italic">A Craft That Survives.</span>
              </h1>
              <p className="max-w-2xl font-sans text-lg leading-relaxed text-theme-muted transition-colors duration-500 sm:text-xl">
                A family-led traditional craft workshop in İzmit, working to revive the art of Khatam and create sustainable training opportunities for vulnerable communities.
              </p>

              <div className="mt-10 max-w-2xl font-sans text-lg leading-relaxed text-theme-muted transition-colors duration-500 sm:mt-12 sm:text-xl">
                <p className="mb-6">
                  We are a family of five who arrived in Türkiye as refugees 12 years ago and settled in İzmit.
                </p>
                <p className="mb-6 border-l-2 border-brand-gold/30 pl-4 text-center font-medium italic text-theme sm:px-4">
                  We brought no resources with us — only our skills, our faith in work, and a traditional craft rooted in centuries of history: Khatam art.
                </p>
                <p>
                  Over the years, we built a life focused on community support and service to displaced families, while quietly working to keep this fragile craft alive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={targetRef} className="relative hidden h-[300vh] w-full bg-theme-base transition-colors duration-500 lg:block">
        <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
          <motion.div
            style={{ width: imageWidth }}
            className="relative h-full shrink-0"
          >
            <img
              src="/images/home/artisan-marquetry-jewelry-box.webp"
              alt="Handcrafted Marquetry Art"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[color:color-mix(in_srgb,var(--color-page-bg)_10%,transparent)]" />
          </motion.div>

          <div className="relative flex h-full flex-1 items-center bg-theme-base transition-colors duration-500">
            <motion.div
              style={{ opacity: text1Opacity, y: text1Y }}
              className="absolute inset-0 flex flex-col justify-center px-6 md:px-16"
            >
              <h1 className="mb-6 font-serif text-4xl font-bold leading-tight tracking-tight text-theme transition-colors duration-500 md:text-5xl lg:text-6xl">
                Hands That Create.<br/>
                <span className="text-brand-gold italic">A Craft That Survives.</span>
              </h1>
              <p className="max-w-2xl font-sans text-lg leading-relaxed text-theme-muted transition-colors duration-500 md:text-xl">
                A family-led traditional craft workshop in İzmit, working to revive the art of Khatam and create sustainable training opportunities for vulnerable communities.
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: text2Opacity, y: text2Y }}
              className="absolute inset-0 flex flex-col justify-center px-6 md:px-16"
            >
              <div className="max-w-2xl font-sans text-lg leading-relaxed text-theme-muted transition-colors duration-500 md:text-xl">
                <p className="mb-6">
                  We are a family of five who arrived in Türkiye as refugees 12 years ago and settled in İzmit.
                </p>
                <p className="mb-6 border-l-2 border-brand-gold/30 pl-4 font-medium italic text-theme">
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
    </>
  );
};

export default HeroScroll;