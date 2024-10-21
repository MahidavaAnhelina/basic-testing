import axios from 'axios';
import { throttledGetDataFromApi } from './index';
jest.mock('axios');

jest.mock('lodash', () => ({
  throttle: (func: unknown) => func,
}));

describe('throttledGetDataFromApi', () => {
  // let axiosInstance: jest.Mocked<typeof axios>;
  beforeEach(() => {
    axios.create = jest.fn(() => axios);

    (axios.get as jest.Mock).mockImplementation((url) => {
      console.log('I AM GET');
      console.log(url, 'url');
      return Promise.resolve({
        data: url,
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/posts/1');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/posts/1');
    expect(axios.get).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const response = await throttledGetDataFromApi('/posts/1');
    expect(response).toEqual('/posts/1');
  });
});
