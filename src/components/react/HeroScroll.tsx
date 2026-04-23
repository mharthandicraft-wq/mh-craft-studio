import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroContent {
  image?: {
    src: string;
    alt: string;
  };
  videoId?: string;
  headline: string;
  highlight: string;
  summary: string;
  story: string[];
}

const HeroScroll = ({ content }: { content: HeroContent }) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const imageWidth = useTransform(scrollYProgress, [0, 0.28], ["100%", "60%"]);
  
  const text1Opacity = useTransform(scrollYProgress, [0, 0.12, 0.3, 0.42], [0, 1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.12, 0.3, 0.42], [30, 0, 0, -30]);

  const text2Opacity = useTransform(scrollYProgress, [0.34, 0.48, 0.86, 0.94], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.34, 0.48, 0.94], [30, 0, -18]);

  return (
    <>
      <section className="w-full bg-theme-base transition-colors duration-500 lg:hidden">
        <div className="flex min-h-screen flex-col">
          <div className="relative h-[42vh] w-full sm:h-[48vh]">
            {content.image ? (
              <>
                <img
                  src={content.image.src}
                  alt={content.image.alt}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[color:color-mix(in_srgb,var(--color-page-bg)_10%,transparent)]" />
              </>
            ) : content.videoId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${content.videoId}?autoplay=1&mute=1&start=40`}
                title="Hero Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            ) : null}
          </div>

          <div className="flex flex-1 items-center justify-center bg-theme-base px-6 py-12 text-center transition-colors duration-500 sm:px-10 sm:py-16">
            <div className="mx-auto flex max-w-3xl flex-col items-center">
              <h1 className="mb-6 font-serif text-4xl font-bold leading-tight tracking-tight text-theme transition-colors duration-500 sm:text-5xl">
                {content.headline}<br />
                <span className="text-brand-gold ">{content.highlight}</span>
              </h1>
              <p className="max-w-2xl font-sans text-lg leading-relaxed text-theme-muted transition-colors duration-500 sm:text-xl">
                {content.summary}
              </p>

              <div className="mt-10 max-w-2xl font-sans text-lg leading-relaxed text-theme-muted transition-colors duration-500 sm:mt-12 sm:text-xl">
                <p className="mb-6">
                  {content.story[0]}
                </p>
                <p className="mb-6 border-l-2 border-brand-gold/30 pl-4 text-center font-medium italic text-theme sm:px-4">
                  {content.story[1]}
                </p>
                <p>
                  {content.story[2]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={targetRef} className="relative z-10 hidden h-[360vh] w-full bg-theme-base transition-colors duration-500 lg:block">
        <div className="sticky top-0 z-20 flex h-screen w-full items-center overflow-hidden bg-theme-base">
          <motion.div
            style={{ width: imageWidth }}
            className="relative h-full shrink-0"
          >
            {content.image ? (
              <>
                <img
                  src={content.image.src}
                  alt={content.image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[color:color-mix(in_srgb,var(--color-page-bg)_10%,transparent)]" />
              </>
            ) : content.videoId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${content.videoId}?autoplay=1&mute=1&start=40`}
                title="Hero Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : null}
          </motion.div>

          <div className="relative flex h-full flex-1 items-center bg-theme-base transition-colors duration-500">
            <motion.div
              style={{ opacity: text1Opacity, y: text1Y }}
              className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-16"
            >
              <h1 className="mb-6 font-serif text-4xl font-bold leading-tight tracking-tight text-theme transition-colors duration-500 md:text-5xl lg:text-6xl">
                {content.headline}<br/>
                <span className="text-brand-gold ">{content.highlight}</span>
              </h1>
              <p className="max-w-2xl font-sans text-lg leading-relaxed text-theme-muted transition-colors duration-500 md:text-xl">
                {content.summary}
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: text2Opacity, y: text2Y }}
              className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-16"
            >
              <div className="max-w-2xl font-sans text-lg leading-relaxed text-theme-muted transition-colors duration-500 md:text-xl">
                <p className="mb-6">
                  {content.story[0]}
                </p>
                <p className="mb-6 border-l-2 border-brand-gold/30 pl-4 font-medium italic text-theme">
                  {content.story[1]}
                </p>
                <p>
                  {content.story[2]}
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