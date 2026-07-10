import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

export interface ForgeLogMetadata {
  title: string;
  subtitle: string;
  date: string;
  status: string;
  module: string;
  readingTime: string;
  difficulty: string;
  isSubLog?: boolean;
  imagePath?: string;
  imageCaption?: string;
  architecture?: string[];
  promptStrategy?: string[];
  codeSample?: string;
}

export interface ForgeLog {
  slug: string;
  metadata: ForgeLogMetadata;
  content: string;
}

const logsDirectory = path.join(process.cwd(), "content", "forge-logs");

const DIAGRAM_CAPTIONS: Record<string, string> = {
  "rephora-cognito": "Stateless JWT authentication and refresh flow",
  "rephora-generation": "Asynchronous AI question generation through SNS, SQS, DeepSeek, and FCM",
  "rephora-picker": "In-memory exponential race question selection",
  "rephora-session-end": "Synchronous endSession metrics and completion flow",
  "rephora-fanout": "Asynchronous study progress aggregate updates",
  "rephora-dynamodb": "Rephora DynamoDB multi-table topology and access indexes",
  "rephora-media": "S3 asset delivery with manifest and avatar caching",
  "rephora-gardener": "Gardener Lambda cascade purge workflow",
  "rephora-infrastructure": "Rephora AWS runtime topology",
  "rephora-opentofu": "OpenTofu remote state and deployment locking",
  "rephora-github": "GitHub Actions delivery paths for infrastructure, backend, and mobile",
};

export async function getForgeLogSlugs(): Promise<string[]> {
  try {
    const entries = await readdir(logsDirectory, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map((entry) => entry.name.replace(/\.md$/, ""));
  } catch {
    return [];
  }
}

export async function getForgeLog(slug: string): Promise<ForgeLog | null> {
  const filePath = path.join(logsDirectory, `${slug}.md`);

  try {
    await access(filePath);
  } catch {
    return null;
  }

  const source = await readFile(filePath, "utf8");
  const { data, content } = matter(source);

  // Dynamically resolve [DIAGRAM:name] placeholders by reading external .mermaid files
  let processedContent = content;
  const diagramRegex = /\[DIAGRAM:([a-zA-Z0-9_-]+)\]/g;
  let match;
  
  const matches: { placeholder: string; name: string }[] = [];
  while ((match = diagramRegex.exec(content)) !== null) {
    matches.push({ placeholder: match[0], name: match[1] });
  }

  if (matches.length > 0) {
    await Promise.all(
      matches.map(async ({ placeholder, name }) => {
        const diagramPath = path.join(process.cwd(), "public", "diagrams", `${name}.mermaid`);
        try {
          const diagramCode = await readFile(diagramPath, "utf8");
          const caption = DIAGRAM_CAPTIONS[name] ?? name.replace(/-/g, " ");
          processedContent = processedContent.replace(
            placeholder,
            `\`\`\`mermaid\n%% caption: ${caption}\n${diagramCode.trim()}\n\`\`\``
          );
        } catch {
          console.error(`Diagram file not found: ${diagramPath}`);
        }
      })
    );
  }

  return {
    slug,
    metadata: {
      title: typeof data.title === "string" ? data.title : "Untitled Log",
      subtitle: typeof data.subtitle === "string" ? data.subtitle : "",
      date: typeof data.date === "string" ? data.date : "UNKNOWN DATE",
      status: typeof data.status === "string" ? data.status : "STATUS: UNKNOWN",
      module: typeof data.module === "string" ? data.module : "UNKNOWN",
      readingTime: typeof data.readingTime === "string" ? data.readingTime : "5 MIN READ",
      difficulty: typeof data.difficulty === "string" ? data.difficulty : "DIFFICULTY: NOVICE",
      isSubLog: typeof data.isSubLog === "boolean" ? data.isSubLog : false,
      imagePath: typeof data.imagePath === "string" ? data.imagePath : undefined,
      imageCaption: typeof data.imageCaption === "string" ? data.imageCaption : undefined,
      architecture: Array.isArray(data.architecture) ? data.architecture : undefined,
      promptStrategy: Array.isArray(data.promptStrategy) ? data.promptStrategy : undefined,
      codeSample: typeof data.codeSample === "string" ? data.codeSample : undefined,
    },
    content: processedContent,
  };
}

export async function getAllForgeLogs(): Promise<ForgeLog[]> {
  const slugs = await getForgeLogSlugs();
  const logs = await Promise.all(slugs.map((slug) => getForgeLog(slug)));

  // Filter out any null logs and sort them
  const validLogs = logs.filter((log): log is ForgeLog => log !== null);

  // Filter out sub-logs from primary listing page
  const primaryLogs = validLogs.filter((log) => !log.metadata.isSubLog);

  // We sort in descending order based on dates
  return primaryLogs.sort((a, b) => {
    const timeA = new Date(a.metadata.date).getTime();
    const timeB = new Date(b.metadata.date).getTime();
    if (!isNaN(timeA) && !isNaN(timeB)) {
      return timeB - timeA;
    }
    return b.metadata.date.localeCompare(a.metadata.date);
  });
}

const REPHORA_SEQUENCE = [
  "rephora-portal",
  "rephora-cognito-security",
  "rephora-dynamodb-storage",
  "rephora-async-generation",
  "rephora-spaced-repetition",
  "rephora-media-caching",
  "rephora-serverless-lambdas",
  "rephora-infrastructure",
  "rephora-opentofu-iac",
  "rephora-github-delivery",
];

export interface LogNavigation {
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}

export async function getLogNavigation(slug: string): Promise<LogNavigation> {
  const idx = REPHORA_SEQUENCE.indexOf(slug);
  if (idx === -1) {
    return { previous: null, next: null };
  }

  const prevSlug = idx > 0 ? REPHORA_SEQUENCE[idx - 1] : null;
  const nextSlug = idx < REPHORA_SEQUENCE.length - 1 ? REPHORA_SEQUENCE[idx + 1] : null;

  const [prevLog, nextLog] = await Promise.all([
    prevSlug ? getForgeLog(prevSlug) : null,
    nextSlug ? getForgeLog(nextSlug) : null,
  ]);

  return {
    previous: prevLog ? { slug: prevLog.slug, title: prevLog.metadata.title } : null,
    next: nextLog ? { slug: nextLog.slug, title: nextLog.metadata.title } : null,
  };
}
