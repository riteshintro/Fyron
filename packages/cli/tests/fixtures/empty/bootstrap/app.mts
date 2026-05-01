import { Application } from '@avoxjs/avox';

export default async function () {
  return new Application(process.cwd()).withConfig({
    logging: { level: 'silent' },
  });
}
