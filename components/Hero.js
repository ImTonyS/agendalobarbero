import Image from "next/image";
import TestimonialsAvatars from "./TestimonialsAvatars";
import config from "@/config";
import fotoHero from "@/app/images/barberHero.jpg"


const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20">
      <div className="hidden md:block lg:w-full">
        <Image
          src={fotoHero}
          alt="Product Demo"
          className="bg-contain w-full h-screen norepeat"
          priority={true}
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start px-8 py-16 lg:py-20">
      
        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
          No pierdas más citas, deja de perder dinero.
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
          Comienza tu nueva agenda electrónica, permitiendo a tu cliente agendar en segundos, ganas tú, ganan todos.
        </p>
        <button className="bg-pink-500 px-2 rounded-md text-white btn">
          {config.appName}!
        </button>

        <TestimonialsAvatars priority={true} />
      </div>
      
    </section>
  );
};

export default Hero;
