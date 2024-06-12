import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { userFactory } from '../factories/user-factory';
import { userService } from '@/services';
import { userRepository } from '@/repositories';
import { conflictError } from '@/errors';

describe('createUser Service', () => {
  it('should throw conflict error when e-mail already exists', async () => {
    const mockUser = userFactory.mockUserRequest();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(userRepository, 'readUnique').mockImplementationOnce((): any => {
      return mockUser;
    });

    const result = userService.createUser(mockUser);
    expect(result).rejects.toEqual(conflictError('E-mail'));
  });
});

describe('encryptPassword', () => {
  it('should encrypt password', () => {
    const password = faker.internet.password({ length: 15 });

    const hashedPassword = userService.encryptPassword(password);
    expect(hashedPassword).not.toBe(password);
    expect(bcrypt.compareSync(password, hashedPassword)).toBe(true);
  });
});
