import { Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/hero/Hero";

import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <Hero />
        <FAQ />
        {/* <CTA /> */}
      </main>
      <Footer />
    </>
  );
}
