import 'jest-environment-jsdom';

global.fetch = jest.fn();

Object.defineProperty(globalThis, 'import', {
  value: {
    meta: {
      env: {
        VITE_API_BASE_URL: 'http://localhost:3001'
      }
    }
  },
  writable: true,
  configurable: true
});

beforeEach(() => {
  jest.clearAllMocks();
});
