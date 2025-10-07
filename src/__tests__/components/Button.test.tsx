import { describe, expect, it } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("unit: Button component", () => {
  it("should render children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("should handle click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should apply variant styles correctly", () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole("button");

    // Check if the button has the expected classes for destructive variant
    expect(button).toHaveClass("bg-destructive");
  });

  it("should apply size styles correctly", () => {
    render(<Button size="sm">Small Button</Button>);
    const button = screen.getByRole("button");

    // Check if the button has the expected classes for small size
    expect(button).toHaveClass("h-8");
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:cursor-not-allowed");
  });

  it("should not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled Button
      </Button>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should apply custom className", () => {
    render(<Button className="custom-class">Custom Button</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("custom-class");
  });

  it("should render as different HTML elements when asChild is used", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("Link Button");
    expect(link).toHaveAttribute("href", "/test");
  });

  it("should handle loading state", () => {
    render(<Button loading>Loading Button</Button>);
    const button = screen.getByRole("button");

    // The button should be disabled when loading
    expect(button).toBeDisabled();
  });

  it("should have proper accessibility attributes", () => {
    render(<Button aria-label="Close dialog">×</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("aria-label", "Close dialog");
  });

  it("should handle keyboard navigation", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Keyboard Button</Button>);
    const button = screen.getByRole("button");

    // Focus the button
    button.focus();
    expect(button).toHaveFocus();

    // Press Enter
    fireEvent.keyDown(button, { key: "Enter", code: "Enter" });
    expect(handleClick).toHaveBeenCalledTimes(1);

    // Press Space
    fireEvent.keyDown(button, { key: " ", code: "Space" });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
