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
    <h1 dir="ltr" className="font-serif text-left justify-start tracking-tight flex items-center overflow-hidden">
      
      {/* "MH" - Bold, Solid Background to cover the sliding text */}
      <span className="font-bold text-theme text-[10vw] sm:text-[14vw] md:text-[160px] z-10 relative bg-theme-header-block pr-1.5 sm:pr-3 transition-colors duration-500">
        MH
      </span>

      {/* Wrapper for the sliding text */}
      <span className="relative overflow-hidden inline-block flex-1">
        
        {/* "craft studio" - Same size, Lighter weight (font-normal) */}
        <motion.span
          variants={craftStudioVariants}
          initial="hidden"
          animate="visible"
          className="font-normal text-theme-soft whitespace-nowrap inline-block text-[10vw] sm:text-[14vw] md:text-[160px] pl-1 sm:pl-2 transition-colors duration-500"
        >
          craft studio
        </motion.span>

      </span>
    </h1>
  );
};

export default AnimatedHeader;