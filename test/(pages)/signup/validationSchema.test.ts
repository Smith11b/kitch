import { signupSchema } from '@/app/(pages)/signup/validationSchema';

describe('signupSchema', () => {
  test('validates a valid signup form', async () => {
    const validData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      passwordConfirm: 'password123',
      company: 'Example Company',
    };

    await expect(signupSchema.isValid(validData)).resolves.toBe(true);
  });

  test('validates an invalid signup form with missing fields', async () => {
    const invalidData = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      company: '',
    };

    await expect(signupSchema.isValid(invalidData)).resolves.toBe(false);
  });

  test('validates an invalid signup form with invalid email', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      password: 'password123',
      passwordConfirm: 'password123',
      company: 'Example Company',
    };

    await expect(signupSchema.isValid(invalidData)).resolves.toBe(false);
  });

  test('validates an invalid signup form with short password', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123',
      passwordConfirm: '123',
      company: 'Example Company',
    };

    await expect(signupSchema.isValid(invalidData)).resolves.toBe(false);
  });

  test('validates an invalid signup form with non-matching passwords', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      passwordConfirm: 'differentpassword',
      company: 'Example Company',
    };

    await expect(signupSchema.isValid(invalidData)).resolves.toBe(false);
  });
});
