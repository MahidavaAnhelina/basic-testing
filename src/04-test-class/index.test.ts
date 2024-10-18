import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 5;
    const createdAccount = getBankAccount(initialBalance);
    expect(createdAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 5;
    const createdAccount = getBankAccount(initialBalance);
    const withdrawAmount = 10;
    const expectedError = new InsufficientFundsError(initialBalance);

    expect(() => createdAccount.withdraw(withdrawAmount)).toThrow(
      expectedError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 5;
    const createdAccount = getBankAccount(initialBalance);
    const secondAccount = getBankAccount(10);
    const expectedError = new InsufficientFundsError(initialBalance);

    expect(() => createdAccount.transfer(10, secondAccount)).toThrow(
      expectedError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 5;
    const createdAccount = getBankAccount(initialBalance);
    const expectedError = new TransferFailedError();

    expect(() => createdAccount.transfer(5, createdAccount)).toThrow(
      expectedError,
    );
  });

  test('should deposit money', () => {
    const initialBalance = 5;
    const createdAccount = getBankAccount(initialBalance);
    createdAccount.deposit(5);

    expect(createdAccount.getBalance()).toBe(10);
  });

  test('should withdraw money', () => {
    const initialBalance = 5;
    const createdAccount = getBankAccount(initialBalance);
    createdAccount.withdraw(5);

    expect(createdAccount.getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const initialBalance = 5;
    const createdAccount = getBankAccount(initialBalance);
    const secondAccount = getBankAccount(10);
    createdAccount.transfer(5, secondAccount);

    expect(createdAccount.getBalance()).toBe(0);
    expect(secondAccount.getBalance()).toBe(15);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 5;
    const createdAccount = getBankAccount(initialBalance);
    jest.spyOn(createdAccount, 'fetchBalance').mockResolvedValue(700);

    expect(await createdAccount.fetchBalance()).toBe(700);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 5;
    const createdAccount = getBankAccount(initialBalance);
    jest.spyOn(createdAccount, 'fetchBalance').mockResolvedValue(null);

    expect(await createdAccount.fetchBalance()).toBeNull();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 5;
    const createdAccount = getBankAccount(initialBalance);
    jest.spyOn(createdAccount, 'fetchBalance').mockResolvedValue(null);
    const expectedError = new SynchronizationFailedError();

    await expect(createdAccount.synchronizeBalance()).rejects.toThrow(
      expectedError,
    );
  });
});
