// Test setup file for Bun test runner
import { GlobalRegistrator } from "happy-dom";

// Register happy-dom globals for DOM testing
const registrator = new GlobalRegistrator();

// Clean up after tests
afterEach(() => {
  // Reset DOM
  document.body.innerHTML = "";
  document.head.innerHTML = "";
});

// Global cleanup
afterAll(() => {
  registrator.unregister();
});

// Mock environment variables for testing
process.env.NODE_ENV = "test";

// Mock console methods to reduce noise in tests (optional)
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = originalConsoleError;
});

// Mock jest functions for compatibility with React Testing Library
global.jest = {
  fn: (fn?: (...args: any[]) => any) => {
    const mockFn = (...args: any[]) => {
      if (fn) return fn(...args);
      return undefined;
    };
    mockFn.mockReturnValue = (value: any) => mockFn;
    mockFn.mockImplementation = (fn: (...args: any[]) => any) => mockFn;
    mockFn.mockResolvedValue = (value: any) => mockFn;
    mockFn.mockRejectedValue = (value: any) => mockFn;
    return mockFn;
  },
  clearAllMocks: () => {},
  clearAllTimers: () => {},
} as any;
