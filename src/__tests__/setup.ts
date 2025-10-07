// Test setup file for Bun test runner
import { GlobalRegistrator } from "happy-dom";

// Register happy-dom globals for DOM testing
const registrator = new GlobalRegistrator();

// Clean up after tests
afterEach(() => {
  // Clear all timers
  jest.clearAllTimers();
  // Clear all mocks
  jest.clearAllMocks();
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
