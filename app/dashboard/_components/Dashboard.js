"use client";
import {
  Button,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ButtonAccount from "@/components/ButtonAccount";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Calendario", href: "#", current: false },
  { name: "Barberos", href: "#", current: false },
  { name: "Projectos", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard({ children }) {
  return (
    <>
      <html class="h-full bg-gray-100">
        <body class="h-full">
          <div className="min-h-full">
            <Disclosure as="nav" className="bg-barber-red">
              {({ open }) => (
                <>
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                      <div className="flex items-center">
                        <div className="hidden md:block">
                          <div className=" flex items-baseline space-x-4">
                            {navigation.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? "bg-barber-white text-black"
                                    : "text-white hover:text-black hover:bg-barber-white hover:bg-opacity-75",
                                  "rounded-md px-3 py-2 text-sm font-medium"
                                )}
                                aria-current={item.current ? "page" : undefined}
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          <ButtonAccount />
                        </div>
                      </div>

                      <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}

                        <div className="px-2">
                          <ButtonAccount />
                        </div>

                        <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-barber-white hover:bg-opacity-30 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-barber-red">
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <Bars3Icon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </DisclosureButton>
                      </div>
                    </div>
                  </div>
                  <DisclosurePanel className="md:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                      {navigation.map((item) => (
                        <DisclosureButton
                          key={item.name}
                          as="a"
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-barber-white text-black"
                              : "text-white hover:text-black hover:bg-barber-white hover:bg-opacity-75",
                            "block rounded-md px-3 py-2 text-base font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </DisclosureButton>
                      ))}
                    </div>
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>

            <header className="bg-white shadow-sm">
              <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <h1 className="text-lg font-semibold leading-6 text-gray-900">
                  AgendaloBarbero
                </h1>
              </div>
            </header>
            <main>
              <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </body>
      </html>
    </>
  );
}
