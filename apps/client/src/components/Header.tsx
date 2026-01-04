"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const menuItems = [
  { label: "QUẦN", href: "/" },
  { label: "ÁO", href: "/" },
  { label: "GIÀY", href: "/" },
  { label: "PHỤ KIỆN", href: "/" },
  { label: "THÔNG TIN", href: "/" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-center">
          {/* Desktop Menu */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="
                      relative text-sm font-medium tracking-widest text-black
                      after:absolute after:left-0 after:-bottom-2
                      after:h-px after:w-0 after:bg-black
                      after:transition-all after:duration-500
                      hover:after:w-full
                    "
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="fixed inset-0 z-50 bg-white lg:hidden">
            {/* Header mobile */}
            <div className="flex h-16 items-center justify-between border-b px-6">
              <Image src="/logo.png" alt="logo" width={150} height={45} />
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={24} />
              </button>
            </div>

            {/* Menu content */}
            <nav className="flex h-[calc(100vh-4rem)] items-center justify-center">
              <ul className="flex flex-col gap-8 text-center">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-base font-medium tracking-widest text-black"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
