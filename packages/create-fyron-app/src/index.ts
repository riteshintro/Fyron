import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { cac } from 'cac';
import pc from 'picocolors';
import { scaffold } from './scaffold.js';

const pkgDir = dirname(fileURLToPath(import.meta.url));
const { version } = JSON.parse(
  readFileSync(resolve(pkgDir, '..', 'package.json'), 'utf8'),
) as { version: string };
const defaultVersion = `^${version}`;

const cli = cac('create-fyron-app');

cli
  .command('[name]', 'Create a new fyron application')
  .option('--core-version <v>', 'fyron core version', { default: defaultVersion })
  .option('--cli-version <v>', '@fyron/cli version', { default: defaultVersion })
  .action(async (name: string | undefined, opts: { coreVersion?: string; cliVersion?: string }) => {
    const projectName = name ?? 'my-fyron-app';
    const targetDir = resolve(process.cwd(), projectName);
    console.log(pc.bold(`\nCreating ${pc.cyan(projectName)} at ${pc.dim(targetDir)}\n`));
    await scaffold({
      name: projectName,
      targetDir,
      coreVersion: opts.coreVersion,
      cliVersion: opts.cliVersion,
    });
    console.log(pc.green('✓ Project created.'));
    console.log(pc.bold('\nNext steps:\n'));
    console.log(`  cd ${projectName}`);
    console.log('  pnpm install');
    console.log('  cp .env.example .env  # set DATABASE_URL');
    console.log('  pnpm fyron serve');
    console.log('');
  });

cli.help();
cli.version(version);
cli.parse();
