import { type RenderOptions, render } from "@testing-library/react";
import type { ReactElement } from "react";

// Custom render function that includes providers
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  // Add any additional providers here if needed
}

export function customRender(
  ui: ReactElement,
  options: CustomRenderOptions = {},
) {
  const { ...renderOptions } = options;

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything from testing-library
export * from "@testing-library/react";

// Override render with our custom version
export { customRender as render };

// Test data factories
export const createMockMessage = (overrides = {}) => ({
  id: "test-message-id",
  role: "user" as const,
  content: "Test message content",
  createdAt: new Date(),
  ...overrides,
});

export const createMockChatMessage = (overrides = {}) => ({
  id: "test-chat-id",
  role: "assistant" as const,
  parts: [
    {
      type: "text" as const,
      text: "Assistant response",
    },
  ],
  ...overrides,
});

// Mock AI providers for testing
export const mockAIProviders = {
  openai: {
    name: "GPT-4o",
    value: "openai/gpt-4o",
  },
  google: {
    name: "Gemini Pro",
    value: "google/gemini-pro",
  },
  deepseek: {
    name: "DeepSeek R1",
    value: "deepseek/deepseek-r1",
  },
};

// Helper to wait for async operations
export const waitForAsync = () =>
  new Promise((resolve) => setTimeout(resolve, 0));

// Helper to create mock functions with typed return values
export function createMockFn<T extends (...args: any[]) => any>(
  returnValue?: ReturnType<T>,
) {
  return jest.fn().mockReturnValue(returnValue);
}

// Helper to create mock event handlers
export const createMockEventHandler = <T = any>(
  handler?: (event: T) => void,
) => {
  return jest.fn(handler);
};

// Test user event helpers
export const userEventHelpers = {
  type: (element: HTMLElement, text: string) => {
    // Simulate typing character by character for more realistic testing
    for (const char of text) {
      element.dispatchEvent(new KeyboardEvent("keydown", { key: char }));
      // In a real implementation, you might need to use @testing-library/user-event
    }
  },

  clear: (element: HTMLElement) => {
    // Simulate clearing an input
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    )?.set;
    nativeInputValueSetter?.call(element, "");
    element.dispatchEvent(new Event("input", { bubbles: true }));
  },
};

// Assertion helpers for common patterns
export const expectToBeVisible = (element: HTMLElement) => {
  expect(element).toBeVisible();
  expect(element).not.toHaveClass("hidden");
};

export const expectToHaveClass = (element: HTMLElement, className: string) => {
  expect(element).toHaveClass(className);
};

export const expectToBeDisabled = (element: HTMLElement) => {
  expect(element).toBeDisabled();
};

export const expectToBeEnabled = (element: HTMLElement) => {
  expect(element).not.toBeDisabled();
};

// Snapshot testing helper
export const createSnapshotTest = (componentName: string) => {
  return (component: ReactElement, testName?: string) => {
    const testId = testName ? `${componentName}-${testName}` : componentName;
    expect(component).toMatchSnapshot(testId);
  };
};
