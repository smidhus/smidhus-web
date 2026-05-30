"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

const navItems: NavItem[] = [
  { label: "FORGE", href: "/#forge-output" },
  { label: "CRAFT", href: "/#core-craft" },
  { label: "COMMS", href: "/#comms" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      <nav className="relative border-b border-[#1F242C] bg-[#1c2125]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D38B5b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D10]"
            aria-label="Go to Smidhus home"
            onClick={handleCloseMenu}
          >
            <Image
              src="/smidhus_logo.svg"
              width={32}
              height={32}
              alt=""
              priority
              aria-hidden="true"
              style={{
                width: "32px",
                height: "32px",
              }}
            />

            <span className="font-mono text-sm font-bold uppercase tracking-wider text-smidhus-bone">
              SMIDHUS
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              if (item.external) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm font-semibold uppercase tracking-[0.12em] text-smidhus-bone-dim transition-colors duration-300 hover:text-[#D38B5b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D38B5b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D10]"
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-mono text-sm font-semibold uppercase tracking-[0.12em] text-smidhus-bone-dim transition-colors duration-300 hover:text-[#D38B5b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D38B5b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D10]"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-smidhus-bone transition-colors duration-300 hover:text-[#D38B5b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D38B5b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D10] md:hidden"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((previousValue) => !previousValue)}
          >
            <span className="sr-only">
              {isOpen ? "Close navigation menu" : "Open navigation menu"}
            </span>

            <span className="relative flex h-5 w-5 items-center justify-center">
              <span
                className={`absolute h-0.5 w-5 bg-current transition-transform duration-200 ease-in-out ${isOpen ? "rotate-45" : "-translate-y-1.5"
                  }`}
              />
              <span
                className={`absolute h-0.5 w-5 bg-current transition-opacity duration-200 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"
                  }`}
              />
              <span
                className={`absolute h-0.5 w-5 bg-current transition-transform duration-200 ease-in-out ${isOpen ? "-rotate-45" : "translate-y-1.5"
                  }`}
              />
            </span>
          </button>
        </div>

        {isOpen ? (
          <div
            id="mobile-navigation"
            className="absolute left-0 top-16 z-50 flex w-full flex-col gap-5 border-b border-[#1F242C] bg-[#0A0D10]/95 p-6 backdrop-blur-lg md:hidden"
          >
            {navItems.map((item) => {
              if (item.external) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm font-semibold uppercase tracking-[0.12em] text-smidhus-bone transition-colors duration-300 hover:text-[#D38B5b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D38B5b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D10]"
                    onClick={handleCloseMenu}
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-mono text-sm font-semibold uppercase tracking-[0.12em] text-smidhus-bone transition-colors duration-300 hover:text-[#D38B5b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D38B5b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D10]"
                  onClick={handleCloseMenu}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        ) : null}
      </nav>
    </header>
  );
}