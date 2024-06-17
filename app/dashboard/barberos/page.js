"use client";

import { useState, useEffect } from "react";

export default function Barberos() {
  useEffect(() => {
    console.log("sjbjsbjh");
  }, []);

  const barberos = true;
  return (
    <main className="max-w-3xl mx-auto mt-20 border-2">
      {!barberos ? (
        <section className="flex justify-center items-center mx-auto h-screen">
          <div className="border-2 px-10 py-6">
            <div className="flex flex-col space-y-2 items-center justify-center max-w-3xl  bg-white px-4 py-5 sm:px-6">
              <h1 className="font-bold">No tienes barberos</h1>

              <button className="border-[1px] px-4 py-2 font-bold hover:bg-gray-200">
                Agregar uno
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
          <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-4">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Job Postings
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit quam
                corrupti consectetur.
              </p>
            </div>
            <div className="ml-4 mt-4 flex-shrink-0">
              <button
                type="button"
                className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create new job
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
