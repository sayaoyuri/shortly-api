import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import app, { init } from '@/app';

beforeAll(() => {
  init();
});

const server = supertest(app);

describe('POST /user/sign-up', () => {
  describe('SUCCESS', () => {
    it('should respond with status 201', async () => {
      const password = faker.internet.password();

      const body = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password,
        confirmPassword: password,
      };

      const response = await server.post('/user/sign-up').send(body);
      expect(response.status).toBe(httpStatus.CREATED);
    });
  });
});
