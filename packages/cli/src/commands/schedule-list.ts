import pc from 'picocolors';
import { loadApp } from '../load-app.js';

export interface ScheduleListOpts {
  cwd?: string;
}

export async function scheduleList(opts: ScheduleListOpts = {}): Promise<void> {
  const cwd = opts.cwd ?? process.cwd();
  const app = await loadApp(cwd);
  await app.boot();

  const tasks = app.scheduler().tasks;
  if (tasks.length === 0) {
    console.log(pc.yellow('No scheduled tasks registered.'));
    await app.shutdown();
    return;
  }

  const wName = Math.max(4, ...tasks.map((t) => t.name.length));
  const wExpr = Math.max(4, ...tasks.map((t) => t.cronExpression.length));
  console.log(pc.bold(`${'NAME'.padEnd(wName)}  ${'CRON'.padEnd(wExpr)}  TIMEZONE`));
  console.log(pc.dim('-'.repeat(wName + wExpr + 12)));
  for (const t of tasks) {
    const tz = t.options.timezone ?? pc.dim('(local)');
    console.log(`${pc.cyan(t.name.padEnd(wName))}  ${t.cronExpression.padEnd(wExpr)}  ${tz}`);
  }
  await app.shutdown();
}
