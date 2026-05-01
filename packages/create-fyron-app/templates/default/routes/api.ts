import { Route } from '@fyron/core';

Route.get('/', () => ({ name: '__APP_NAME__', framework: '@fyron/core' }));

Route.get('/health', () => ({ status: 'ok' }));
