import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

export interface LegalDocumentMetadata {
  title?: string;
  subtitle?: string;
  lastUpdated?: string;
}

export interface LegalDocument {
  slug: string;
  metadata: LegalDocumentMetadata;
  content: string;
}

const legalDirectory = path.join(process.cwd(), "content", "legal");

export async function getLegalSlugs(): Promise<string[]> {
  const entries = await readdir(legalDirectory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name.replace(/\.md$/, ""));
}

export async function getLegalDocument(slug: string): Promise<LegalDocument | null> {
  const filePath = path.join(legalDirectory, `${slug}.md`);

  try {
    await access(filePath);
  } catch {
    return null;
  }

  const source = await readFile(filePath, "utf8");
  const { data, content } = matter(source);

  return {
    slug,
    metadata: {
      title: typeof data.title === "string" ? data.title : undefined,
      subtitle: typeof data.subtitle === "string" ? data.subtitle : undefined,
      lastUpdated: typeof data.lastUpdated === "string" ? data.lastUpdated : undefined,
    },
    content,
  };
}
