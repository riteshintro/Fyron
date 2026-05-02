import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="space-y-2">
        <h1 className="text-5xl font-bold tracking-tight">Fyron</h1>
        <p className="text-xl text-fd-muted-foreground max-w-xl">
          Laravel-style Node.js framework built on Fastify&nbsp;5, Drizzle ORM, and TypeScript.
        </p>
      </div>

      <div className="flex gap-4">
        <Link
          href="/docs"
          className="rounded-lg bg-fd-primary px-6 py-2.5 text-sm font-semibold text-fd-primary-foreground shadow transition-colors hover:bg-fd-primary/90"
        >
          Get started
        </Link>
        <a
          href="https://github.com/riteshintro/Fyron"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-fd-border px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-fd-accent"
        >
          GitHub
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 text-left sm:grid-cols-3 mt-4 max-w-2xl">
        {[
          ['Routing', 'Laravel-style Route facade on Fastify 5'],
          ['Database', 'Active Record pattern over Drizzle ORM'],
          ['Auth', 'better-auth with email verification & reset'],
          ['Mail', 'Handlebars templates via nodemailer'],
          ['Scheduler', 'Cron tasks with a clean Schedule facade'],
          ['CLI', '12 artisan-style generator & runtime commands'],
        ].map(([title, desc]) => (
          <div key={title} className="rounded-lg border border-fd-border p-4">
            <p className="font-semibold text-sm mb-1">{title}</p>
            <p className="text-xs text-fd-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
