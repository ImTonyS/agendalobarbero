import Image from "next/image";
import TestimonialsAvatars from "./TestimonialsAvatars";
import config from "@/config";
import fotoHero from "@/app/images/barberHero.png";
import { OrbitingCirclesDemo } from "./OrbitingCirclesDemo";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-start justify-center gap-16">
      <div className="flex flex-1 flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start px-8 py-16">
        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
          No pierdas <strong className="text-barber-red">más citas</strong>,
          deja de perder <strong className="text-barber-blue">dinero.</strong>
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
          Comienza tu nueva agenda electrónica con citas prepagadas, permitiendo
          a tu cliente agendar en segundos, ganas tú, ganan todos.
        </p>
        <button className="bg-barber-blue px-4 py-2 text-white btn">
          {config.appName}!
        </button>

        <TestimonialsAvatars priority={true} />
      </div>
      <div className="flex-1">
        <OrbitingCirclesDemo />
      </div>
    </section>
  );
};

export default Hero;
