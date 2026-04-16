import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HeroScroll = () => {
  // رفرنسی برای کنترل کل مسیر اسکرول
  const targetRef = useRef<HTMLDivElement>(null);

  // محاسبه میزان پیشرفت اسکرول (از 0 تا 1)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // انیمیشن عکس: از 100% عرض صفحه شروع میشه و در 30% اول اسکرول به 60% میرسه
  const imageWidth = useTransform(scrollYProgress, [0, 0.3], ["100%", "60%"]);
  
  // انیمیشن متن اول (H1 و ساب‌تایتل): ظاهر شدن از 30 تا 40 درصد، پنهان شدن در 50 تا 60 درصد
  const text1Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.6], [0, 1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.6], [50, 0, 0, -50]);

  // انیمیشن متن دوم (داستان خانواده): ظاهر شدن از 60 تا 70 درصد اسکرول
  const text2Opacity = useTransform(scrollYProgress, [0.6, 0.7, 1], [0, 1, 1]);
  const text2Y = useTransform(scrollYProgress, [0.6, 0.7], [50, 0]);

  return (
    /* ارتفاع این کانتینر 3 برابر مانیتور است تا فضای کافی برای اسکرول داشته باشیم */
    <section ref={targetRef} className="h-[300vh] relative w-full bg-brand-dark">
      
      {/* بخش چسبنده که در حین اسکرول ثابت می‌ماند */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* ستون عکس */}
        <motion.div 
          style={{ width: imageWidth }} 
          className="h-full relative shrink-0"
        >
          {/* توجه: نام فایل عکس را اگر چیز دیگری گذاشتید اینجا تغییر دهید */}
          <img 
            src="/images/home/artisan-marquetry-jewelry-box.webp" 
            alt="Handcrafted Marquetry Art" 
            className="w-full h-full object-cover"
          />
          {/* یک سایه ملایم روی عکس تا اگر متن روی آن آمد خوانا بماند */}
          <div className="absolute inset-0 bg-brand-dark/20" />
        </motion.div>

        {/* ستون متن‌ها (در فضای خالی باقیمانده قرار می‌گیرد) */}
        <div className="flex-1 h-full relative flex items-center">
          
          {/* کانتینر متن اول */}
          <motion.div 
            style={{ opacity: text1Opacity, y: text1Y }}
            className="absolute inset-0 flex flex-col justify-center px-6 md:px-16"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-brand-gold mb-6 leading-tight tracking-tight">
              Hands That Create.<br/>A Craft That Survives.
            </h1>
            <p className="font-sans text-neutral-300 text-lg md:text-xl leading-relaxed max-w-2xl">
              A family-led traditional craft workshop in İzmit, working to revive the art of Khatam and create sustainable training opportunities for vulnerable communities.
            </p>
          </motion.div>

          {/* کانتینر متن دوم */}
          <motion.div 
            style={{ opacity: text2Opacity, y: text2Y }}
            className="absolute inset-0 flex flex-col justify-center px-6 md:px-16"
          >
            <p className="font-sans text-neutral-300 text-lg md:text-xl leading-relaxed max-w-2xl">
              We are a family of five who arrived in Türkiye as refugees 12 years ago and settled in İzmit.
              <br/><br/>
              We brought no resources with us — only our skills, our faith in work, and a traditional craft rooted in centuries of history: Khatam art.
              <br/><br/>
              Over the years, we built a life focused on community support and service to displaced families, while quietly working to keep this fragile craft alive.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroScroll;