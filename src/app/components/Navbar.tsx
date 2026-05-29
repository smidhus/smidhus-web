"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type MobileNavItem = {
  label: string;
  href: string;
  external?: boolean;
};

const mobileNavItems: MobileNavItem[] = [
  { label: "01 // PROJECTS", href: "#projects" },
  { label: "02 // SYSTEMS", href: "#systems" },
  { label: "03 // SOURCE", href: "https://github.com", external: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <nav className="relative border-b border-[#1F242C] bg-[#0A0D10]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image
                src="/smidhus_logo.svg"
                width={32}
                height={32}
                alt="Smidhus Logo"
                priority
                style={{ width: "auto", height: "32px" }}
              />
            </Link>
            <span className="font-mono text-sm font-bold tracking-wider text-white">
              SMIDHUS
            </span>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-zinc-100 transition-colors hover:text-[#FF6B00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B00] md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((previousValue) => !previousValue)}
          >
            <span className="sr-only">Menu</span>
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span
                className={`absolute h-0.5 w-5 bg-current transition-transform duration-200 ease-in-out ${isOpen ? "rotate-45" : "-translate-y-1.5"}`}
              />
              <span
                className={`absolute h-0.5 w-5 bg-current transition-opacity duration-200 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute h-0.5 w-5 bg-current transition-transform duration-200 ease-in-out ${isOpen ? "-rotate-45" : "translate-y-1.5"}`}
              />
            </span>
          </button>
        </div>

        {isOpen ? (
          <div className="absolute top-16 left-0 z-50 flex w-full flex-col gap-5 border-b border-[#1F242C] bg-[#0A0D10]/95 p-6 backdrop-blur-lg md:hidden">
            {mobileNavItems.map((item) => {
              if (item.external) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm tracking-wider text-zinc-100 transition-colors hover:text-[#FF6B00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B00]"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-mono text-sm tracking-wider text-zinc-100 transition-colors hover:text-[#FF6B00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B00]"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        ) : null}
      </nav>
    </header>
  );
}
