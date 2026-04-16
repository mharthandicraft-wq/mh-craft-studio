import { motion } from "framer-motion";

const images = [
  { src: "/images/portfolio/DSCF0553.webp", title: "Royal Hexagon Box", time: "120 Hours" },
  { src: "/images/portfolio/DSCF6530.webp", title: "Traditional Backgammon", time: "250 Hours" },
  { src: "/images/portfolio/DSCF6534.webp", title: "Jewelry Storage", time: "80 Hours" },
  { src: "/images/portfolio/DSCF7529.webp", title: "Masterpiece Tray", time: "300 Hours" },
  { src: "/images/portfolio/DSCF7530.webp", title: "Geometric Art Piece", time: "150 Hours" },
  { src: "/images/portfolio/DSCF7578.webp", title: "Desk Organizer", time: "60 Hours" },
];

const PortfolioGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-20">
      {images.map((img, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group relative overflow-hidden bg-brand-gray dark:bg-brand-dark aspect-[3/4] cursor-none"
        >
          {/* Image */}
          <img
            src={img.src}
            alt={img.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
            <span className="text-brand-gold text-xs uppercase tracking-widest mb-2">{img.time} of Craftsmanship</span>
            <h3 className="font-serif text-2xl text-white">{img.title}</h3>
            <div className="w-0 group-hover:w-full h-[1px] bg-brand-gold transition-all duration-700 mt-4"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PortfolioGrid;