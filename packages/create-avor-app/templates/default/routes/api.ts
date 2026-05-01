import { Route } from 'avorjs';

Route.get('/', () => ({ name: '__APP_NAME__', framework: 'avor' }));

Route.get('/health', () => ({ status: 'ok' }));
