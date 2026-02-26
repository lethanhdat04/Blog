import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data to avoid conflicts
  await prisma.projectTag.deleteMany();
  await prisma.project.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.postMeta.deleteMany();

  // ─── Tags ───────────────────────────────────────────────
  const tagNames = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "AI/ML",
    "DevOps",
    "Database",
    "Full Stack",
    "Mobile",
    "API",
    "Open Source",
  ];
  const tags: Record<string, string> = {};
  for (const name of tagNames) {
    const slug = name.toLowerCase().replace(/[/\s]/g, "-");
    const tag = await prisma.tag.create({ data: { name, slug } });
    tags[slug] = tag.id;
  }

  // ─── Projects ───────────────────────────────────────────
  const project1 = await prisma.project.create({
    data: {
      title: "AI Code Assistant",
      slug: "ai-code-assistant",
      description:
        "An intelligent VS Code extension powered by LLMs that helps developers write, review, and debug code with context-aware suggestions and one-click refactoring.",
      content: `
<h2>Overview</h2>
<p>AI Code Assistant is a VS Code extension that integrates large language models directly into the developer workflow. It provides real-time code suggestions, automated code reviews, and intelligent debugging assistance — all without leaving the editor.</p>

<h2>Key Features</h2>
<ul>
  <li><strong>Context-Aware Completions</strong> — Understands your entire codebase, not just the current file. Suggests functions, imports, and patterns consistent with your project.</li>
  <li><strong>One-Click Refactoring</strong> — Select any block of code, describe what you want, and get a refactored version with an inline diff preview.</li>
  <li><strong>Automated Code Review</strong> — Runs on every pull request via a GitHub Action. Posts inline comments about potential bugs, security issues, and style violations.</li>
  <li><strong>Smart Debugging</strong> — Paste an error message and get a root-cause analysis with a suggested fix, grounded in your source code.</li>
  <li><strong>Chat Interface</strong> — Ask questions about your codebase in natural language. "Where is the authentication middleware?" returns the exact file and line.</li>
</ul>

<h2>Architecture</h2>
<p>The extension communicates with a Next.js backend that manages model routing, prompt templates, and usage analytics. Code context is indexed using a vector database (Pinecone) for fast semantic search across repositories.</p>
<ul>
  <li><strong>Frontend:</strong> VS Code Extension API (TypeScript), React-based webview panels</li>
  <li><strong>Backend:</strong> Next.js API routes, Prisma ORM, PostgreSQL</li>
  <li><strong>AI Layer:</strong> OpenAI GPT-4o, Anthropic Claude, custom prompt chains</li>
  <li><strong>Indexing:</strong> Tree-sitter for AST parsing, Pinecone for vector storage</li>
</ul>

<h2>Demo</h2>
<p>The live demo provides a playground where you can paste code and test the refactoring and explanation features without installing the extension. API usage is rate-limited to 20 requests per hour for anonymous users.</p>

<h2>Results</h2>
<ul>
  <li>10,000+ active installs on the VS Code Marketplace</li>
  <li>4.7-star average rating from 320+ reviews</li>
  <li>Reduces average code review turnaround by 45%</li>
  <li>Adopted by 3 enterprise teams for internal code review workflows</li>
</ul>
      `.trim(),
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop",
      screenshots: [
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop",
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=450&fit=crop",
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=450&fit=crop",
      ],
      liveUrl: "https://ai-code-demo.vercel.app",
      githubUrl: "https://github.com/datto/ai-code-assistant",
      techStack: ["Next.js", "TypeScript", "OpenAI", "Prisma", "PostgreSQL", "Pinecone", "Tree-sitter"],
      featured: true,
      order: 1,
      status: "published",
    },
  });
  await prisma.projectTag.createMany({
    data: [
      { projectId: project1.id, tagId: tags["react"] },
      { projectId: project1.id, tagId: tags["next.js"] },
      { projectId: project1.id, tagId: tags["typescript"] },
      { projectId: project1.id, tagId: tags["ai-ml"] },
    ],
  });

  const project2 = await prisma.project.create({
    data: {
      title: "DevOps Dashboard",
      slug: "devops-dashboard",
      description:
        "A real-time monitoring dashboard for CI/CD pipelines, Kubernetes clusters, and infrastructure health with alerting and incident management.",
      content: `
<h2>Overview</h2>
<p>DevOps Dashboard aggregates data from GitHub Actions, GitLab CI, Jenkins, Kubernetes, and AWS CloudWatch into a single unified view. Teams get real-time visibility into build status, deployment progress, cluster health, and cost trends — all from one screen.</p>

<h2>Key Features</h2>
<ul>
  <li><strong>Pipeline Monitor</strong> — Live-updating build and deployment status across multiple CI/CD providers. Click any pipeline to see logs, artifacts, and timing breakdowns.</li>
  <li><strong>Kubernetes Overview</strong> — Pod status, resource usage heatmaps, and node capacity charts. Highlights pods in CrashLoopBackOff or OOMKilled state.</li>
  <li><strong>Alerting System</strong> — Configurable alert rules with Slack, PagerDuty, and email channels. Supports escalation policies and on-call rotation.</li>
  <li><strong>Incident Timeline</strong> — Automatic incident creation when alerts fire. Tracks resolution steps, postmortems, and MTTR metrics.</li>
  <li><strong>Cost Explorer</strong> — Daily and monthly AWS/GCP cost breakdown by service, team, and environment. Budget threshold alerts.</li>
  <li><strong>Custom Dashboards</strong> — Drag-and-drop widget builder with 15+ pre-built chart types. Share dashboards with team members via URL.</li>
</ul>

<h2>Architecture</h2>
<ul>
  <li><strong>Frontend:</strong> React 18 with Recharts, TanStack Table, and WebSocket for live data</li>
  <li><strong>Backend:</strong> Node.js with Express, Bull queues for data ingestion</li>
  <li><strong>Data:</strong> TimescaleDB for metrics, Redis for caching and pub/sub</li>
  <li><strong>Infrastructure:</strong> Docker Compose for local dev, Helm chart for Kubernetes deployment</li>
</ul>

<h2>Demo</h2>
<p>A read-only demo instance is available with synthetic data from a simulated microservices environment. It showcases the pipeline monitor, Kubernetes view, and cost explorer with 30 days of historical data.</p>

<h2>Results</h2>
<ul>
  <li>Used by 12 engineering teams across 3 organizations</li>
  <li>Reduced mean time to detect (MTTD) incidents by 65%</li>
  <li>Saved $15k/month in infrastructure costs through cost visibility</li>
  <li>600+ GitHub stars, 45 contributors</li>
</ul>
      `.trim(),
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
      screenshots: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=450&fit=crop",
      ],
      githubUrl: "https://github.com/datto/devops-dashboard",
      liveUrl: "https://devops-dash-demo.vercel.app",
      techStack: ["React", "Node.js", "Docker", "Kubernetes", "TimescaleDB", "Redis", "WebSocket"],
      featured: true,
      order: 2,
      status: "published",
    },
  });
  await prisma.projectTag.createMany({
    data: [
      { projectId: project2.id, tagId: tags["react"] },
      { projectId: project2.id, tagId: tags["node.js"] },
      { projectId: project2.id, tagId: tags["devops"] },
      { projectId: project2.id, tagId: tags["full-stack"] },
    ],
  });

  const project3 = await prisma.project.create({
    data: {
      title: "Data Pipeline Engine",
      slug: "data-pipeline-engine",
      description:
        "A scalable ETL framework for building, scheduling, and monitoring data pipelines with a visual DAG editor and real-time streaming support.",
      content: `
<h2>Overview</h2>
<p>Data Pipeline Engine provides a Python-based framework for defining ETL (Extract, Transform, Load) pipelines as code. It includes a web-based visual editor for building pipeline DAGs, a scheduler with cron and event-based triggers, and a monitoring dashboard for tracking pipeline runs.</p>

<h2>Key Features</h2>
<ul>
  <li><strong>Pipeline-as-Code</strong> — Define pipelines in Python with a decorator-based API. Full type checking and IDE autocompletion support.</li>
  <li><strong>Visual DAG Editor</strong> — Drag-and-drop interface for creating and modifying pipeline graphs. Generates Python code automatically.</li>
  <li><strong>Streaming & Batch</strong> — Supports both batch processing (scheduled) and real-time streaming via Apache Kafka consumers.</li>
  <li><strong>Built-in Connectors</strong> — Pre-built connectors for PostgreSQL, MySQL, MongoDB, S3, BigQuery, Snowflake, and REST APIs.</li>
  <li><strong>Monitoring</strong> — Real-time pipeline execution status, data lineage tracking, and automatic failure retry with exponential backoff.</li>
  <li><strong>Alerting</strong> — Slack and email notifications on pipeline failures or data quality issues.</li>
</ul>

<h2>Architecture</h2>
<ul>
  <li><strong>Core:</strong> Python 3.11+, Click CLI, Pydantic for config validation</li>
  <li><strong>Scheduler:</strong> Celery + Redis with cron-based and event-driven triggers</li>
  <li><strong>Streaming:</strong> Apache Kafka consumer groups with exactly-once semantics</li>
  <li><strong>Web UI:</strong> React + React Flow for the DAG editor, FastAPI backend</li>
  <li><strong>Storage:</strong> PostgreSQL for metadata, S3 for data artifacts</li>
</ul>

<h2>Demo</h2>
<p>The documentation site includes an interactive playground where you can build a sample pipeline, run it against a demo dataset, and see the execution logs and output in real time.</p>

<h2>Results</h2>
<ul>
  <li>Processing 2.5 billion rows per day across production deployments</li>
  <li>50+ pre-built pipeline templates in the community library</li>
  <li>Reduced pipeline development time by 70% compared to raw Airflow DAGs</li>
  <li>800+ GitHub stars, published on PyPI with 12k monthly downloads</li>
</ul>
      `.trim(),
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop",
      screenshots: [
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=450&fit=crop",
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=450&fit=crop",
      ],
      githubUrl: "https://github.com/datto/data-pipeline-engine",
      liveUrl: "https://pipeline-docs.vercel.app",
      techStack: ["Python", "Apache Kafka", "PostgreSQL", "Redis", "Docker", "React", "FastAPI"],
      featured: true,
      order: 3,
      status: "published",
    },
  });
  await prisma.projectTag.createMany({
    data: [
      { projectId: project3.id, tagId: tags["python"] },
      { projectId: project3.id, tagId: tags["database"] },
      { projectId: project3.id, tagId: tags["devops"] },
      { projectId: project3.id, tagId: tags["open-source"] },
    ],
  });

  const project4 = await prisma.project.create({
    data: {
      title: "CollabNote",
      slug: "collabnote",
      description:
        "A real-time collaborative note-taking app with Notion-like block editing, multiplayer cursors, and end-to-end encryption.",
      content: `
<h2>Overview</h2>
<p>CollabNote is a real-time collaborative workspace inspired by Notion and Google Docs. Multiple users can edit the same document simultaneously with live cursor positions, presence indicators, and conflict-free merging powered by CRDTs.</p>

<h2>Key Features</h2>
<ul>
  <li><strong>Block Editor</strong> — Rich block-based editor supporting headings, paragraphs, lists, code blocks, images, tables, callouts, and embeds. Slash-command menu for quick insertion.</li>
  <li><strong>Real-Time Collaboration</strong> — See other users' cursors and selections in real time. Changes merge automatically with zero conflicts using Yjs CRDTs.</li>
  <li><strong>End-to-End Encryption</strong> — Documents are encrypted on the client before syncing. The server never sees plaintext content. Key sharing via invite links.</li>
  <li><strong>Offline Support</strong> — Full offline editing with automatic sync when reconnected. Works as an installable PWA.</li>
  <li><strong>Version History</strong> — Browse and restore any previous version of a document. Visual diff comparison between versions.</li>
  <li><strong>Workspace Organization</strong> — Nested pages, tags, favorites, and full-text search across all documents.</li>
</ul>

<h2>Architecture</h2>
<ul>
  <li><strong>Frontend:</strong> Next.js 14, Tiptap editor (ProseMirror), Yjs for CRDT sync</li>
  <li><strong>Backend:</strong> Node.js, Hocuspocus (Yjs WebSocket server), PostgreSQL</li>
  <li><strong>Auth:</strong> NextAuth with magic link and Google OAuth</li>
  <li><strong>Encryption:</strong> Web Crypto API with AES-256-GCM</li>
  <li><strong>Search:</strong> Meilisearch for full-text search indexing</li>
</ul>

<h2>Demo</h2>
<p>Try the live demo with a temporary workspace — no signup required. Collaboration works instantly: open the same link in two browser tabs to see multiplayer editing in action.</p>

<h2>Results</h2>
<ul>
  <li>3,000+ registered users in the first 3 months after launch</li>
  <li>99.9% uptime with WebSocket connections handling 500+ concurrent editors</li>
  <li>Average page load time under 800ms (Lighthouse performance score: 96)</li>
  <li>Featured in JavaScript Weekly and Hacker News front page</li>
</ul>
      `.trim(),
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&h=450&fit=crop",
      screenshots: [
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=450&fit=crop",
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=450&fit=crop",
        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=450&fit=crop",
      ],
      githubUrl: "https://github.com/datto/collabnote",
      liveUrl: "https://collabnote-demo.vercel.app",
      techStack: ["Next.js", "TypeScript", "Tiptap", "Yjs", "PostgreSQL", "WebSocket", "Meilisearch"],
      featured: false,
      order: 4,
      status: "published",
    },
  });
  await prisma.projectTag.createMany({
    data: [
      { projectId: project4.id, tagId: tags["next.js"] },
      { projectId: project4.id, tagId: tags["typescript"] },
      { projectId: project4.id, tagId: tags["full-stack"] },
    ],
  });

  const project5 = await prisma.project.create({
    data: {
      title: "FitTrack Mobile",
      slug: "fittrack-mobile",
      description:
        "A cross-platform fitness tracking app with workout logging, progress charts, AI-generated training plans, and Apple Health / Google Fit integration.",
      content: `
<h2>Overview</h2>
<p>FitTrack is a React Native fitness app that helps users track workouts, monitor progress, and get personalized training plans generated by AI. It integrates with Apple Health and Google Fit for automatic activity syncing.</p>

<h2>Key Features</h2>
<ul>
  <li><strong>Workout Logger</strong> — Log sets, reps, weight, and RPE for any exercise. Timer for rest periods. Supports supersets and circuits.</li>
  <li><strong>Exercise Library</strong> — 500+ exercises with animated demonstrations, muscle group targeting, and form tips.</li>
  <li><strong>Progress Charts</strong> — Track strength progression, body measurements, and workout volume over time with interactive charts.</li>
  <li><strong>AI Training Plans</strong> — Answer a questionnaire about your goals, schedule, and equipment, and get a fully personalized multi-week training program.</li>
  <li><strong>Health Integration</strong> — Two-way sync with Apple Health and Google Fit. Steps, heart rate, and calorie data appears in the dashboard.</li>
  <li><strong>Social Features</strong> — Follow friends, share workout summaries, and compete on weekly leaderboards.</li>
</ul>

<h2>Architecture</h2>
<ul>
  <li><strong>Mobile:</strong> React Native with Expo, React Navigation, Reanimated 3</li>
  <li><strong>Backend:</strong> Node.js with Fastify, Prisma, PostgreSQL</li>
  <li><strong>AI:</strong> GPT-4o for training plan generation with structured output</li>
  <li><strong>Push Notifications:</strong> Expo Push + Firebase Cloud Messaging</li>
  <li><strong>Charts:</strong> Victory Native for interactive data visualization</li>
</ul>

<h2>Demo</h2>
<p>Download the Expo Go app and scan the QR code on the project page to try FitTrack on your phone. The demo account comes pre-loaded with 3 months of sample workout data so you can explore the progress charts and analytics.</p>

<h2>Results</h2>
<ul>
  <li>5,000+ downloads on iOS and Android within the first month</li>
  <li>4.6-star average rating on both app stores</li>
  <li>Users log an average of 4.2 workouts per week</li>
  <li>AI-generated plans have a 78% completion rate (vs 35% industry average)</li>
</ul>
      `.trim(),
      image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=450&fit=crop",
      screenshots: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop",
        "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=450&fit=crop",
      ],
      githubUrl: "https://github.com/datto/fittrack-mobile",
      liveUrl: "https://fittrack.app",
      techStack: ["React Native", "Expo", "TypeScript", "Node.js", "Fastify", "PostgreSQL", "OpenAI"],
      featured: false,
      order: 5,
      status: "published",
    },
  });
  await prisma.projectTag.createMany({
    data: [
      { projectId: project5.id, tagId: tags["react"] },
      { projectId: project5.id, tagId: tags["typescript"] },
      { projectId: project5.id, tagId: tags["mobile"] },
      { projectId: project5.id, tagId: tags["ai-ml"] },
    ],
  });

  const project6 = await prisma.project.create({
    data: {
      title: "OpenAPI Forge",
      slug: "openapi-forge",
      description:
        "A developer tool that generates type-safe API clients, server stubs, and documentation from OpenAPI 3.1 specifications with a plugin architecture.",
      content: `
<h2>Overview</h2>
<p>OpenAPI Forge is a CLI tool and library that takes an OpenAPI 3.1 specification and generates production-ready code. Unlike generic generators, it produces idiomatic, type-safe output for each target language with full support for discriminated unions, nullable types, and streaming responses.</p>

<h2>Key Features</h2>
<ul>
  <li><strong>Multi-Language Output</strong> — Generate TypeScript (fetch/axios), Python (httpx/requests), Go, and Rust clients from a single spec.</li>
  <li><strong>Server Stubs</strong> — Generate Express, Fastify, or FastAPI server scaffolds with request validation middleware already wired up.</li>
  <li><strong>Documentation Site</strong> — Auto-generates a beautiful interactive API docs site with "Try it" buttons, similar to Swagger UI but faster and more customizable.</li>
  <li><strong>Plugin Architecture</strong> — Write custom generators as npm packages. Hooks for pre-processing the spec, customizing templates, and post-processing output.</li>
  <li><strong>Spec Linting</strong> — Built-in linter catches common OpenAPI mistakes: missing descriptions, inconsistent naming, unused schemas, and breaking changes.</li>
  <li><strong>Watch Mode</strong> — Regenerates code on spec file changes. Pairs perfectly with spec-first API development workflows.</li>
</ul>

<h2>Architecture</h2>
<ul>
  <li><strong>Core:</strong> TypeScript, uses @apidevtools/swagger-parser for spec validation</li>
  <li><strong>Templates:</strong> Handlebars templates with custom helpers for each language target</li>
  <li><strong>CLI:</strong> Built with Commander.js, supports config files and CI/CD integration</li>
  <li><strong>Docs Generator:</strong> Astro-based static site with client-side API console</li>
  <li><strong>Testing:</strong> Snapshot tests for generated code, integration tests against real APIs</li>
</ul>

<h2>Demo</h2>
<p>Paste any OpenAPI spec URL into the online playground and see generated code for all supported languages instantly. The playground also shows linting results and a preview of the generated documentation.</p>

<h2>Results</h2>
<ul>
  <li>1,200+ GitHub stars and 80+ forks</li>
  <li>15,000+ weekly npm downloads</li>
  <li>Used by 8 companies in production for internal API client generation</li>
  <li>Community has contributed 6 language plugins</li>
</ul>
      `.trim(),
      image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&h=450&fit=crop",
      screenshots: [
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=450&fit=crop",
        "https://images.unsplash.com/photo-1623282033815-40b05d96c903?w=800&h=450&fit=crop",
      ],
      githubUrl: "https://github.com/datto/openapi-forge",
      liveUrl: "https://openapi-forge.dev",
      techStack: ["TypeScript", "Node.js", "Handlebars", "Astro", "Commander.js", "OpenAPI"],
      featured: false,
      order: 6,
      status: "published",
    },
  });
  await prisma.projectTag.createMany({
    data: [
      { projectId: project6.id, tagId: tags["typescript"] },
      { projectId: project6.id, tagId: tags["node.js"] },
      { projectId: project6.id, tagId: tags["api"] },
      { projectId: project6.id, tagId: tags["open-source"] },
    ],
  });

  // ─── Experience ─────────────────────────────────────────
  await prisma.experience.create({
    data: {
      id: "exp-1",
      company: "TechCorp AI",
      position: "Senior Software Engineer",
      logo: "https://ui-avatars.com/api/?name=TC&background=6366f1&color=fff&size=64",
      location: "San Francisco, CA",
      startDate: new Date("2023-01-15"),
      current: true,
      description:
        "Leading a team of 6 engineers building AI-powered developer tools. Own the full product lifecycle from architecture design to production deployment. Report directly to the VP of Engineering.",
      highlights: [
        "Designed and shipped the AI Code Assistant VS Code extension, reaching 10k+ active installs within 6 months",
        "Architected a microservices migration from a Rails monolith, reducing p95 API latency from 1.2s to 180ms",
        "Built a real-time code indexing pipeline processing 50M+ lines of code per day using Tree-sitter and Pinecone",
        "Introduced trunk-based development and feature flags, cutting release cycle from 2 weeks to same-day",
        "Mentored 3 junior engineers through promotion to mid-level; ran weekly architecture office hours",
        "Reduced CI build times by 60% through Turborepo adoption and selective test execution",
      ],
      techStack: ["Next.js", "TypeScript", "Python", "AWS", "Docker", "Kubernetes", "OpenAI", "PostgreSQL"],
      order: 1,
    },
  });

  await prisma.experience.create({
    data: {
      id: "exp-2",
      company: "StartupX",
      position: "Full Stack Developer",
      logo: "https://ui-avatars.com/api/?name=SX&background=f59e0b&color=fff&size=64",
      location: "Remote",
      startDate: new Date("2021-03-01"),
      endDate: new Date("2022-12-31"),
      current: false,
      description:
        "Core engineer at a Series A SaaS startup building a collaborative project management platform. Worked across the entire stack from database schema design to frontend animations.",
      highlights: [
        "Built real-time collaborative editing using WebSocket and CRDTs (Yjs), supporting 200+ concurrent users per document",
        "Designed and implemented a role-based access control system with team, project, and document-level permissions",
        "Optimized PostgreSQL queries and added strategic indexes, reducing average page load time by 40%",
        "Created a reusable component library (30+ components) used across 4 product teams, cutting UI development time in half",
        "Implemented CI/CD pipeline with GitHub Actions: automated testing, linting, preview deployments, and semantic versioning",
        "Led the migration from Create React App to Next.js, improving SEO scores from 45 to 92",
      ],
      techStack: ["React", "Next.js", "Node.js", "PostgreSQL", "Redis", "WebSocket", "GitHub Actions", "Tailwind CSS"],
      order: 2,
    },
  });

  await prisma.experience.create({
    data: {
      id: "exp-3",
      company: "WebDev Agency",
      position: "Frontend Developer",
      logo: "https://ui-avatars.com/api/?name=WD&background=10b981&color=fff&size=64",
      location: "New York, NY",
      startDate: new Date("2019-09-01"),
      endDate: new Date("2021-02-28"),
      current: false,
      description:
        "Developed responsive, accessible web applications for agency clients across e-commerce, healthcare, and fintech verticals. Collaborated directly with designers and clients.",
      highlights: [
        "Delivered 15+ client projects on time and within budget, including 3 e-commerce sites generating $2M+ annual revenue",
        "Built a shared React component library adopted across all agency projects, reducing per-project setup time by 30%",
        "Migrated 4 legacy jQuery applications to React with zero downtime, improving Core Web Vitals scores by 60%",
        "Implemented accessibility (WCAG 2.1 AA) audits as part of the QA process, achieving compliance on all delivered projects",
        "Introduced Storybook for design system documentation, improving designer-developer handoff efficiency",
      ],
      techStack: ["React", "JavaScript", "TypeScript", "CSS/Sass", "Firebase", "Storybook", "Figma", "Webpack"],
      order: 3,
    },
  });

  await prisma.experience.create({
    data: {
      id: "exp-4",
      company: "University of California, Berkeley",
      position: "Research Assistant — NLP Lab",
      logo: "https://ui-avatars.com/api/?name=UC&background=1d4ed8&color=fff&size=64",
      location: "Berkeley, CA",
      startDate: new Date("2018-01-15"),
      endDate: new Date("2019-08-30"),
      current: false,
      description:
        "Worked in the Natural Language Processing research group developing tools for automated text summarization and sentiment analysis.",
      highlights: [
        "Co-authored a paper on transformer-based extractive summarization accepted at ACL 2019 Workshop",
        "Built a Python pipeline for preprocessing and annotating 500k+ academic paper abstracts",
        "Developed a Flask web interface for researchers to interact with trained summarization models",
        "Managed GPU cluster scheduling for model training across 8 NVIDIA V100 GPUs",
      ],
      techStack: ["Python", "PyTorch", "Flask", "spaCy", "Hugging Face", "Linux", "CUDA"],
      order: 4,
    },
  });

  await prisma.experience.create({
    data: {
      id: "exp-5",
      company: "Freelance",
      position: "Web Developer (Contract)",
      logo: "https://ui-avatars.com/api/?name=FL&background=8b5cf6&color=fff&size=64",
      location: "Remote",
      startDate: new Date("2017-06-01"),
      endDate: new Date("2018-01-14"),
      current: false,
      description:
        "Took on freelance web development projects while completing my degree. Built WordPress sites, landing pages, and small business web apps.",
      highlights: [
        "Built 8 WordPress sites for local businesses, handling design, development, and hosting setup",
        "Created a booking system for a dental clinic using PHP and MySQL, handling 200+ appointments per month",
        "Developed a responsive landing page campaign that achieved a 4.2% conversion rate for an e-commerce client",
      ],
      techStack: ["HTML/CSS", "JavaScript", "PHP", "WordPress", "MySQL", "Bootstrap"],
      order: 5,
    },
  });

  // ─── Skills ─────────────────────────────────────────────
  const skills = [
    // Frontend
    { name: "React", category: "Frontend", level: 95, order: 1 },
    { name: "Next.js", category: "Frontend", level: 92, order: 2 },
    { name: "TypeScript", category: "Frontend", level: 93, order: 3 },
    { name: "Tailwind CSS", category: "Frontend", level: 90, order: 4 },
    { name: "React Native", category: "Frontend", level: 75, order: 5 },
    { name: "Framer Motion", category: "Frontend", level: 80, order: 6 },
    // Backend
    { name: "Node.js", category: "Backend", level: 90, order: 7 },
    { name: "Python", category: "Backend", level: 82, order: 8 },
    { name: "PostgreSQL", category: "Backend", level: 87, order: 9 },
    { name: "Prisma", category: "Backend", level: 88, order: 10 },
    { name: "Redis", category: "Backend", level: 78, order: 11 },
    { name: "GraphQL", category: "Backend", level: 76, order: 12 },
    // DevOps & Cloud
    { name: "Docker", category: "DevOps & Cloud", level: 82, order: 13 },
    { name: "AWS", category: "DevOps & Cloud", level: 75, order: 14 },
    { name: "Kubernetes", category: "DevOps & Cloud", level: 68, order: 15 },
    { name: "GitHub Actions", category: "DevOps & Cloud", level: 85, order: 16 },
    { name: "Vercel", category: "DevOps & Cloud", level: 90, order: 17 },
    // AI & Data
    { name: "OpenAI / LLMs", category: "AI & Data", level: 85, order: 18 },
    { name: "LangChain", category: "AI & Data", level: 72, order: 19 },
    { name: "PyTorch", category: "AI & Data", level: 65, order: 20 },
    // Tools
    { name: "Git", category: "Tools", level: 92, order: 21 },
    { name: "Figma", category: "Tools", level: 70, order: 22 },
    { name: "Linux/CLI", category: "Tools", level: 85, order: 23 },
    { name: "VS Code", category: "Tools", level: 95, order: 24 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({
      data: { id: `skill-${skill.order}`, ...skill },
    });
  }

  // ─── Post Meta ──────────────────────────────────────────
  await prisma.postMeta.createMany({
    data: [
      { slug: "blog/hello-world", views: 1247, likes: 38 },
      { slug: "blog/mastering-typescript", views: 3891, likes: 112 },
      { slug: "blog/nextjs-server-actions", views: 2156, likes: 67 },
    ],
  });

  console.log("Seed completed: 6 projects, 5 experiences, 24 skills, 12 tags, 3 post metas");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
