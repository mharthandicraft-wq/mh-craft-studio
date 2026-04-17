import { motion } from "framer-motion";

interface Project {
  id: string;
  data: {
    translationKey: string;
    title: string;
    mainImage: string;
    gallery: Array<{
      src: string;
      alt: string;
    }>;
    time: string;
  }
}

const PortfolioGrid = ({ projects, lang }: { projects: Project[], lang: string }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-20">
      {projects.map((project) => (
        <a 
          href={`/${lang}/portfolio/${project.data.translationKey}`} 
          key={project.data.translationKey}
          className="group relative block h-[450px] w-full"
        >
          
          {project.data.gallery.slice(0, 2).map((img, i) => (
            <div
              key={i}
              className="absolute inset-0 z-0 transition-all duration-700 ease-in-out"
              style={{
                backgroundImage: `url(${img.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                
                transform: 'rotate(0deg) scale(1)',
              }}
              
              data-index={i}
            />
          ))}

         
          <div className="absolute inset-0 z-10 overflow-hidden bg-theme-surface shadow-md transition-transform duration-500 group-hover:-translate-y-2">
            <img
              src={project.data.mainImage}
              alt={project.data.title}
              className="w-full h-full object-cover"
            />
            
            
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
               <span className="text-brand-gold text-xs uppercase tracking-[0.2em] mb-2">{project.data.time}</span>
               <h3 className="text-white font-serif text-3xl">{project.data.title}</h3>
            </div>
          </div>

          
          <style dangerouslySetInnerHTML={{ __html: `
            .group:hover [data-index="0"] { 
              transform: rotate(-3deg) translateX(-10px) !important; 
              opacity: 0.6;
            }
            .group:hover [data-index="1"] { 
              transform: rotate(3deg) translateX(10px) !important; 
              opacity: 0.4;
            }
          `}} />
        </a>
      ))}
    </div>
  );
};

export default PortfolioGrid;