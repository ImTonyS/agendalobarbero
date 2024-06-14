import Image from "next/image";
import config from "@/config";
import corteBarbero from "@/app/images/corteCabello.webp";

const CTA = () => {
  return (
    <section className="relative hero overflow-hidden min-h-screen">
      <Image
        src={corteBarbero}
        alt="Background"
        className="object-cover w-full"
        fill
      />
      <div className="relative hero-overlay bg-neutral bg-opacity-70"></div>
      <div className="relative hero-content text-center text-neutral-content p-8">
        <div className="flex flex-col items-center max-w-xl p-8 md:p-0">
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-8 md:mb-12">
            Entrega el mejor servicio a tus clientes
          </h2>
          

          <button className="px-4 py-4 bg-barber-blue rounded-lg font-semibold hover:bg-white hover:opacity-60">
            Comienza con {config.appName}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
