import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <nav className="border-b border-[#1F242C] bg-[#0A0D10]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
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
        </div>
      </nav>
    </header>
  );
}
