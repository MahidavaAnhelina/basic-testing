import {
  resolveValue,
  throwError,
  throwCustomError,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  describe('resolveValue', () => {
    test.each([
      [26, 26],
      ['test', 'test'],
      [{ key: 'test' }, { key: 'test' }],
      [null, null],
    ])('should resolve provided value %p', async (value, expected) => {
      const result = await resolveValue(value);
      expect(result).toEqual(expected);
    });
  });
});

describe('throwError', () => {
  test.each([
    ['Custom error message', 'Custom error message'],
    [undefined, 'Oops!'],
  ])('should throw error with message %p', (input, expectedMessage) => {
    expect(() => throwError(input)).toThrowError(expectedMessage);
  });
});

describe('throwCustomError', () => {
  test.each([[MyAwesomeError, 'This is my awesome custom error!']])(
    'should throw custom error %p with message %s',
    (errorClass, expectedMessage) => {
      expect(() => throwCustomError()).toThrowError(errorClass);
      expect(() => throwCustomError()).toThrowError(expectedMessage);
    },
  );
});

describe('rejectCustomError', () => {
  test.each([
    [MyAwesomeError, 'This is my awesome custom error!'], // Rejected custom error with message
  ])(
    'should reject custom error %p with message %s',
    async (errorClass, expectedMessage) => {
      await expect(rejectCustomError()).rejects.toThrowError(errorClass);
      await expect(rejectCustomError()).rejects.toThrowError(expectedMessage);
    },
  );
});
