// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const data = ['test1', 'test2', 'test3'];
    const linkedData = generateLinkedList(data);
    const linkedList = {
      next: {
        next: { next: { next: null, value: null }, value: 'test3' },
        value: 'test2',
      },
      value: 'test1',
    };
    expect(linkedData).toStrictEqual(linkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const data = ['test1', 'test2', 'test3'];
    const linkedData = generateLinkedList(data);
    expect(linkedData).toMatchSnapshot();
  });
});
