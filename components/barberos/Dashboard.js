"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "@/app/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import ButtonAccount from "../ButtonAccount";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", current: true },
  { name: "Barberos", href: "/dashboard/barberos", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard({ children }) {
  const path = usePathname();
  const [current, setCurrent] = useState("/dashboard");

  return (
    <>
      <Disclosure as="nav" className="bg-barber-red">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-1 bg-white rounded-full">
                    <Image src={Logo} width={30} height={30} alt="Logo" />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-[#F08748] text-white"
                              : "text-zinc-50 hover:bg-[#DADADA] hover:text-gray-900",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex items-center">
                    {/* Profile dropdown */}
                    <ButtonAccount />
                  </div>
                </div>
                <div className="-mr-2 flex gap-x-2 sm:hidden">
                  {/* Mobile menu button */}
                  <ButtonAccount />
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-barber-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-barber-red">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
              </div>
            </div>

            <DisclosurePanel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <DisclosureButton
                  as="a"
                  href="#"
                  className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                >
                  Dashboard
                </DisclosureButton>
                <DisclosureButton
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Team
                </DisclosureButton>
                <DisclosureButton
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Projects
                </DisclosureButton>
                <DisclosureButton
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Calendar
                </DisclosureButton>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
      <div className="mt-10">{children}</div>
    </>
  );
}