import { describe, it, expect } from 'vitest';
import request from 'supertest';
import type { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from 'express';
import { Application, Route } from '../index.js';

async function bootApp(setup: (app: Application) => void): Promise<Application> {
  const a = new Application(process.cwd()).withConfig({ logging: { level: 'silent' } });
  setup(a);
  await a.boot();
  a.httpKernel().finalize();
  return a;
}

describe('Express middleware compatibility', () => {
  it('cors-style middleware (RequestHandler) registered via app.use() runs first', async () => {
    const order: string[] = [];
    const corsLike = (_req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
      order.push('cors');
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
    };
    const helmetLike = (_req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
      order.push('helmet');
      res.setHeader('X-Frame-Options', 'DENY');
      next();
    };

    const app = await bootApp((a) => {
      a.use(corsLike).use(helmetLike).loadRoutesFrom(() => {
        Route.get('/ping', () => {
          order.push('route');
          return { ok: true };
        });
      });
    });

    const res = await request(app.httpKernel().express).get('/ping');
    expect(res.status).toBe(200);
    expect(res.headers['access-control-allow-origin']).toBe('*');
    expect(res.headers['x-frame-options']).toBe('DENY');
    expect(order).toEqual(['cors', 'helmet', 'route']);
  });

  it('per-route express middleware via .middleware() runs before handler', async () => {
    const tag = (_req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
      res.setHeader('X-Tagged', 'yes');
      next();
    };

    const app = await bootApp((a) =>
      a.loadRoutesFrom(() => {
        Route.get('/tagged', () => ({ ok: true })).middleware(tag);
        Route.get('/plain', () => ({ ok: true }));
      }),
    );

    const tagged = await request(app.httpKernel().express).get('/tagged');
    expect(tagged.headers['x-tagged']).toBe('yes');

    const plain = await request(app.httpKernel().express).get('/plain');
    expect(plain.headers['x-tagged']).toBeUndefined();
  });

  it('custom exceptionRenderer maps thrown errors to chosen status + body', async () => {
    const a = new Application(process.cwd()).withConfig({
      logging: { level: 'silent' },
      http: {
        exceptionRenderer: (err: unknown) => ({
          status: 418,
          body: { teapot: true, msg: (err as Error).message },
        }),
      },
    });
    a.loadRoutesFrom(() => {
      Route.get('/boom', () => {
        throw new Error('kaboom');
      });
    });
    await a.boot();
    a.httpKernel().finalize();

    const res = await request(a.httpKernel().express).get('/boom');
    expect(res.status).toBe(418);
    expect(res.body).toEqual({ teapot: true, msg: 'kaboom' });
  });

  it('Express middleware on a Route.group reads parsed body (runs after body parsing)', async () => {
    const inspect = (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
      res.setHeader('X-Body-Has-Name', String(Boolean((req.body as { name?: string })?.name)));
      next();
    };

    const app = await bootApp((a) =>
      a.loadRoutesFrom(() => {
        Route.group({ middleware: [inspect] }, () => {
          Route.post('/echo', (req) => req.body);
        });
      }),
    );

    const res = await request(app.httpKernel().express).post('/echo').send({ name: 'Alice' });
    expect(res.status).toBe(200);
    expect(res.headers['x-body-has-name']).toBe('true');
    expect(res.body).toEqual({ name: 'Alice' });
  });

  it('middleware variadic — app.use(a, b, c) registers all', async () => {
    const log: string[] = [];
    const a = (_r: ExpressRequest, _s: ExpressResponse, n: NextFunction) => { log.push('a'); n(); };
    const b = (_r: ExpressRequest, _s: ExpressResponse, n: NextFunction) => { log.push('b'); n(); };
    const c = (_r: ExpressRequest, _s: ExpressResponse, n: NextFunction) => { log.push('c'); n(); };

    const app = await bootApp((x) =>
      x.use(a, b, c).loadRoutesFrom(() => {
        Route.get('/x', () => ({ ok: true }));
      }),
    );

    await request(app.httpKernel().express).get('/x');
    expect(log).toEqual(['a', 'b', 'c']);
  });
});
