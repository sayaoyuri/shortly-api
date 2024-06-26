import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import { userFactory } from '../factories/user-factory';
import app, { init } from '@/app';
import { conflictError, signInError } from '@/errors';
import { clearDb } from '@/config';

beforeAll(() => {
  init();
});

beforeEach(async () => {
  await clearDb();
});

const server = supertest(app);

describe('POST /user/sign-up', () => {
  describe('SUCCESS', () => {
    it('should respond with status 201 when user is unique', async () => {
      const body = userFactory.mockUserRequest();

      const response = await server.post('/user/sign-up').send(body);
      expect(response.status).toBe(httpStatus.CREATED);
    });
  });

  describe('FAILURE', () => {
    it('should respond with status 422 when passwords dont match', async () => {
      const { name, email, password } = userFactory.mockUserRequest();

      const body = {
        name,
        email,
        password,
        confirmPassword: faker.internet.password(),
      };

      const response = await server.post('/user/sign-up').send(body);
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should respond with status 422 when required field is missing', async () => {
      const { name, email, password } = userFactory.mockUserRequest();

      const body = { name, email, password };

      const response = await server.post('/user/sign-up').send(body);
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should respond with status 409 when user is already registered', async () => {
      const { name, email } = await userFactory.createUser();

      const password = faker.internet.password();

      const body = {
        name,
        email,
        password,
        confirmPassword: password,
      };

      const response = await server.post('/user/sign-up').send(body);
      expect(response.status).toBe(httpStatus.CONFLICT);
      expect(response.body).toEqual(
        expect.objectContaining({
          message: conflictError('E-mail').message,
        }),
      );
    });
  });
});

describe('POST /user/sign-in', () => {
  describe('SUCCESS', () => {
    it('should respond with status 200 when sign in is complete', async () => {
      const { name, email, password } = userFactory.mockUserRequest();

      await userFactory.createUser({ name, email, password });

      const body = { email, password };

      const response = await server.post('/user/sign-in').send(body);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.headers['set-cookie']).not.toBe(null);
      expect(response.headers['set-cookie'][0]).toMatch('sessionToken=');
    });
  });

  describe('FAILLURE', () => {
    it('should respond with status 401 when user does not exist', async () => {
      const { email, password } = userFactory.mockUserRequest();

      const body = { email, password };

      const response = await server.post('/user/sign-in').send(body);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      expect(response.body).toEqual(
        expect.objectContaining({
          message: signInError().message,
        }),
      );
    });

    it('should respond with status 401 when user password doesnt match stored password', async () => {
      const user = await userFactory.createUser();

      const body = {
        email: user.email,
        password: faker.internet.password(),
      };

      const response = await server.post('/user/sign-in').send(body);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      expect(response.body).toEqual(
        expect.objectContaining({
          message: signInError().message,
        }),
      );
    });
  });
});
