import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTranslations, normalizeLang } from "../lib/i18n";

interface PreviewContent {
  eyebrow: string;
  title: string;
  description: string;
}

interface PreviewProject {
  data: {
    translationKey: string;
    title: string;
    category?: string;
    mainImage: string;
    mainImageAlt: string;
  };
}

const PortfolioHover = ({ lang, content, projects }: { lang: string; content: PreviewContent; projects: PreviewProject[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeLang = normalizeLang(lang);
  const t = getTranslations(activeLang);
  const visibleProjects = projects.slice(0, 4);

  if (visibleProjects.length === 0) {
    return null;
  }

  return (
    <section className="bg-theme-base w-full py-10 md:py-32 md:py-32 px-6 md:px-12 flex flex-col justify-center overflow-hidden transition-colors duration-500">
      
      {/* Mobile Version: Vertical Stack */}
      <div className="md:hidden flex flex-col gap-12">
        <div className="mb-8 text-center px-4">
          <span className="text-brand-gold font-sans text-xs uppercase tracking-[0.2em] mb-4 block font-semibold">{content.eyebrow}</span>
          <h2 className="font-serif text-4xl text-theme mb-4 leading-tight">{content.title}</h2>
          <p className="font-sans text-theme-muted text-sm leading-relaxed">
            {content.description}
          </p>
        </div>
        {visibleProjects.map((project) => (
          <div key={project.data.translationKey} className="flex flex-col gap-4 border theme-card rounded-lg p-5">
            <img src={project.data.mainImage} alt={project.data.mainImageAlt} className="w-full h-auto aspect-square object-cover object-center rounded-lg" />
            <div className="text-center pt-2">
              <h3 className="font-serif text-2xl text-theme mb-1 leading-tight">{project.data.title}</h3>
              <span className="font-sans text-brand-gold text-xs uppercase tracking-widest font-semibold">{project.data.category}</span>
            </div>
          </div>
        ))}
        <a href={`/${activeLang}/portfolio`} className="mt-8 border border-brand-gold text-brand-gold px-8 py-5 uppercase tracking-[0.2em] text-sm hover:bg-brand-gold hover:text-theme-contrast transition-colors w-full text-center">
          {t.ui.viewFullPortfolio}
        </a>
      </div>

      {/* Desktop Version: Grid Layout */}
      <div className="hidden md:flex flex-col max-w-[1700px] mx-auto w-full">
        
        {/* Centered Header */}
        <div className="text-center mb-12">
          <span className="text-brand-gold font-sans text-xs uppercase tracking-[0.2em] mb-4 block font-semibold">{content.eyebrow}</span>
          <h2 className="font-serif text-5xl lg:text-6xl text-theme mb-6 leading-tight">{content.title}</h2>
          <p className="font-sans text-theme-muted text-lg leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Two Columns: Images Left, Titles Right */}
        <div className="grid grid-cols-12 gap-20 items-center">
          
          {/* Left Column: Images */}
          <div className="col-span-7 h-[70vh] relative rounded-lg overflow-hidden border-2 border-theme-soft bg-theme-surface-strong shadow-xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={visibleProjects[activeIndex].data.mainImage}
                alt={visibleProjects[activeIndex].data.mainImageAlt}
               
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
            <div className="flex flex-col border-t border-theme">
              {visibleProjects.map((project, index) => (
                <div 
                  key={project.data.translationKey}
                  onMouseEnter={() => setActiveIndex(index)}
                  className="py-7 border-b border-theme cursor-pointer group flex justify-between items-center"
                >
                  <h3 className={`font-serif text-3xl transition-colors duration-500 leading-tight ${activeIndex === index ? 'text-theme' : 'text-[var(--color-foreground-dim)] group-hover:text-[var(--color-foreground-faint)]'}`}>
                    {project.data.title}
                  </h3>
                  <span className={`font-sans text-sm font-semibold tracking-widest text-brand-gold transition-opacity duration-500 ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                    {project.data.category}
                  </span>
                </div>
              ))}
            </div>

            <a href={`/${activeLang}/portfolio`} className="mt-8 self-start border-b-2 border-brand-gold text-brand-gold pb-2 uppercase tracking-[0.2em] text-sm hover:text-theme transition-colors">
              [ {t.ui.viewFullPortfolio} ]
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PortfolioHover;