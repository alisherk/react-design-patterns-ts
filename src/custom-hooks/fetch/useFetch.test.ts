import { renderHook } from '@testing-library/react-hooks';
import { useFetch } from './useFetch';

//@ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ post }),
  })
);


type Post = {
  id: number;
  title: string;
  body: string;
};

const post = { id: 1, title: 'test', body: 'test' };

describe('useFetch', () => {
  it('fetches data', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch<Post[]>('http://jsonplaceholder.typicode.com/posts')
    );
    expect(result.current.status).toBe('fetching');
    await waitForNextUpdate();
    expect(result.current).toEqual({
      status: 'fetched',
      error: null,
      data: { post },
    });
  });
});
