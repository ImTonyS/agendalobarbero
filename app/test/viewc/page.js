import Image from "next/image";
import Logo from "@/public/images/logo.png";
import { Divider } from "@/components/fields";

export default function Test() {
  return (
    <main className="h-screen w-screen flex justify-center items-center drop-shadow-xl ">
      <section className="max-w-3xl w-full h-3/4 bg-white border-2 border-zinc-100 flex rounded-3xl">
        <div className="flex-1 px-8 py-4 flex flex-col justify-between">
          <div className="mt-4 flex flex-col items-start ">
            <Image src={Logo} height={40} width={40} className="mb-2" />
            <h2 className="text-[10px] font-light">@RodStudio</h2>
            <h1 className="text-xl font-bold">Estás en RodStudio</h1>
            <h2 className="text-[12px] font-medium">614-457-7880</h2>
          </div>
          <div className="font-semibold pb-2">
            <h1>¿Qué servicio necesitas?</h1>
          </div>
        </div>
        <div className="flex-1">button</div>
      </section>
    </main>
  );
}
