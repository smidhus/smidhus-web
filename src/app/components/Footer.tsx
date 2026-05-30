const legalLinks = [
  { label: "PRIVACY POLICY", href: "/legal/privacy-policy" },
  { label: "LEGAL NOTICE", href: "/legal/legal-notice" },
];

const profileLinks = [
  { label: "X_TWITTER", href: "https://x.com/smidhus_forge" },
  { label: "GITHUB", href: "https://github.com/smidhus" },
  { label: "LINKEDIN", href: "https://www.linkedin.com/company/smidhus" },
];

const copyrightYear = 2026;
const copyrightOwner = "smidhus dev";

const linkClassName =
  "transition-opacity duration-200 hover:opacity-80 focus-visible:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D38B5b]";

export default function Footer() {
  const copyright = `\u00A9 Copyright ${copyrightYear}, all ${copyrightOwner}`;

  return (
    <footer className="border-t border-[#1F242C] bg-[#1c2125] px-6 py-4">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] tracking-wider text-zinc-500 font-mono md:justify-between">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {legalLinks.map((link) => (
            <a key={link.label} href={link.href} className={linkClassName}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {profileLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={linkClassName}
            >
              {link.label}
            </a>
          ))}
        </div>

        <p>{copyright}</p>
      </div>
    </footer>
  );
}
