import httpStatus from 'http-status';
import supertest from 'supertest';
import app, { init } from '@/app';

beforeAll(() => {
  init();
});

const server = supertest(app);

describe('health', () => {
  it('should respond with status 200', async () => {
    const { status, text } = await server.get('/health');
    expect(status).toBe(httpStatus.OK);
    expect(text).toBe(`I'm up and running!`);
  });
});
