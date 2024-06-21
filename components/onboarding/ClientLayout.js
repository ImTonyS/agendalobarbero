"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "@/app/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import ButtonAccount from "../ButtonAccount";
import { usePathname } from "next/navigation";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ClientLayout({ children }) {
  const path = usePathname();

  return (
    <>
      <Disclosure as="nav" className="bg-barber-red">
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="p-1 bg-white rounded-full">
                <Image src={Logo} width={30} height={30} alt="Logo" />
              </div>
              <div className="px-1">
                <ButtonAccount />
              </div>
            </div>
          </div>
        </>
      </Disclosure>
      <div>{children}</div>
    </>
  );
}
