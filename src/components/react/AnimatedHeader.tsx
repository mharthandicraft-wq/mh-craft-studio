import { motion, type Variants } from "framer-motion";

const AnimatedHeader = () => {
  // Adding ': Variants' tells TypeScript exactly what this object is
  const craftStudioVariants: Variants = {
    hidden: { 
      x: "-100%" 
    },
    visible: { 
      x: "0%", 
      transition: { 
        duration: 2.2, 
        delay: 0.3, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  return (
    <h1 className="font-serif text-left tracking-tight flex items-center overflow-hidden">
      
      {/* "MH" - Bold, Solid Background to cover the sliding text */}
      <span className="font-bold text-white text-[14vw] md:text-[160px] z-10 relative bg-brand-dark pr-3">
        MH
      </span>

      {/* Wrapper for the sliding text */}
      <span className="relative overflow-hidden inline-block flex-1">
        
        {/* "craft studio" - Same size, Lighter weight (font-normal) */}
        <motion.span
          variants={craftStudioVariants}
          initial="hidden"
          animate="visible"
          className="font-normal text-neutral-300 whitespace-nowrap inline-block text-[14vw] md:text-[160px] pl-2"
        >
          craft studio
        </motion.span>

      </span>
    </h1>
  );
};

export default AnimatedHeader;