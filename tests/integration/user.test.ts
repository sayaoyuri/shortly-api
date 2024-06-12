import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import app, { init } from '@/app';
import { conflictError } from '@/errors';
import { prisma } from '@/config';

beforeAll(() => {
  init();
});

beforeEach(async () => {
  await prisma.user.deleteMany({});
});

const server = supertest(app);

describe('POST /user/sign-up', () => {
  describe('SUCCESS', () => {
    it('should respond with status 201 when user is unique', async () => {
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

  describe('FAILURE', () => {
    it('should respond with status 422 when passwords dont match', async () => {
      const password = faker.internet.password();
      const body = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password,
        confirmPassword: faker.internet.password(),
      };

      const response = await server.post('/user/sign-up').send(body);
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should respond with status 409 when user is already registered', async () => {
      const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      await prisma.user.create({
        data: user,
      });

      const response = await server.post('/user/sign-up').send({
        ...user,
        confirmPassword: user.password,
      });
      expect(response.status).toBe(httpStatus.CONFLICT);
      expect(response.body).toEqual(
        expect.objectContaining({
          message: conflictError('E-mail').message,
        }),
      );
    });
  });
});
