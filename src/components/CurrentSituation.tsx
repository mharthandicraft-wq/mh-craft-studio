import { motion } from "framer-motion";

const CurrentSituation = () => {
  const statusPoints = [
    "We do not have a dedicated workshop space",
    "We have limited tools and equipment",
    "We are not currently producing at a stable or consistent level",
    "Most of our time is divided between daily work and sustaining life needs"
  ];

  return (
    <section className="bg-brand-dark py-24 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Header using your exact words */}
          <div className="lg:col-span-5">
            <span className="text-brand-gold font-sans text-xs uppercase tracking-[0.2em] mb-4 block font-semibold">
              Our Current Situation
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
              Where We <br /> <span className="italic opacity-70">Are Now</span>
            </h2>
            <p className="font-sans text-neutral-400 text-lg leading-relaxed">
              At this stage, our work continues in a very limited and unstable environment.
            </p>
          </div>

          {/* Right Side: List using your exact bullet points */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {statusPoints.map((point, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-white/[0.02] border border-white/10 flex items-start gap-4 rounded-sm"
                >
                  {/* Small indicator of "Limited" status */}
                  <div className="mt-2 w-1.5 h-1.5 bg-neutral-600 rounded-full shrink-0"></div>
                  <p className="font-sans text-neutral-300 text-base md:text-lg leading-relaxed">
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Closing statement - exact words */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 p-8 border-l-2 border-brand-gold/30 bg-brand-gold/[0.02]"
            >
              <p className="font-serif text-xl md:text-2xl text-white italic leading-relaxed">
                "Despite this, we continue to protect the craft in a small and informal way whenever possible."
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CurrentSituation;