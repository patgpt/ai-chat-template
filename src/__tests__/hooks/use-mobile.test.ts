import { describe, expect, it, beforeEach, afterEach } from "bun:test";
import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock window.matchMedia
const mockMatchMedia = jest.fn();
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: mockMatchMedia,
});

// Mock window.innerWidth
Object.defineProperty(window, "innerWidth", {
  writable: true,
  value: 1024,
});

describe("unit: useIsMobile hook", () => {
  let mockMQL: { matches: boolean; addEventListener: jest.Mock; removeEventListener: jest.Mock };

  beforeEach(() => {
    mockMQL = {
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    mockMatchMedia.mockReturnValue(mockMQL);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return false for desktop screens", () => {
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("should return true for mobile screens", () => {
    // Mock mobile breakpoint (768px)
    mockMQL.matches = true;
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 600,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("should listen for media query changes", () => {
    const { result } = renderHook(() => useIsMobile());

    expect(mockMQL.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );

    // Simulate media query change to mobile
    const changeHandler = mockMQL.addEventListener.mock.calls[0][1];
    mockMQL.matches = true;

    act(() => {
      changeHandler();
    });

    expect(result.current).toBe(true);
  });

  it("should cleanup event listener on unmount", () => {
    const { unmount } = renderHook(() => useIsMobile());

    unmount();

    expect(mockMQL.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });

  it("should handle initial mobile state correctly", () => {
    // Set initial state to mobile
    mockMQL.matches = true;
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 600,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("should handle window resize events", () => {
    const { result } = renderHook(() => useIsMobile());

    // Simulate window resize to mobile
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 600,
    });

    // The hook doesn't directly listen to resize events,
    // but the media query listener should handle changes
    const changeHandler = mockMQL.addEventListener.mock.calls[0][1];
    mockMQL.matches = true;

    act(() => {
      changeHandler();
    });

    expect(result.current).toBe(true);
  });
});
