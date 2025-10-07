import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { Message, MessageContent } from "@/components/ai-elements/message";

describe("unit: Message component", () => {
  it("should render message content correctly", () => {
    render(
      <Message from="user">
        <MessageContent>Hello, world!</MessageContent>
      </Message>
    );

    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
  });

  it("should apply correct styles for user messages", () => {
    render(
      <Message from="user">
        <MessageContent>User message</MessageContent>
      </Message>
    );

    const message = screen.getByText("User message").closest("div");
    expect(message).toHaveClass("ml-auto", "bg-primary");
  });

  it("should apply correct styles for assistant messages", () => {
    render(
      <Message from="assistant">
        <MessageContent>Assistant message</MessageContent>
      </Message>
    );

    const message = screen.getByText("Assistant message").closest("div");
    expect(message).toHaveClass("mr-auto", "bg-muted");
  });

  it("should handle different message roles", () => {
    const { rerender } = render(
      <Message from="system">
        <MessageContent>System message</MessageContent>
      </Message>
    );

    expect(screen.getByText("System message")).toBeInTheDocument();

    // Test assistant message
    rerender(
      <Message from="assistant">
        <MessageContent>Assistant response</MessageContent>
      </Message>
    );

    expect(screen.getByText("Assistant response")).toBeInTheDocument();
  });

  it("should handle empty message content", () => {
    render(
      <Message from="user">
        <MessageContent></MessageContent>
      </Message>
    );

    // Should still render the message container
    const messageContainer = document.querySelector(".flex");
    expect(messageContainer).toBeInTheDocument();
  });

  it("should handle multiline content", () => {
    const multilineContent = `Line 1
Line 2
Line 3`;

    render(
      <Message from="assistant">
        <MessageContent>{multilineContent}</MessageContent>
      </Message>
    );

    expect(screen.getByText(multilineContent)).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    render(
      <Message from="user" className="custom-message">
        <MessageContent>Custom message</MessageContent>
      </Message>
    );

    const message = screen.getByText("Custom message").closest("div");
    expect(message).toHaveClass("custom-message");
  });

  it("should render with proper semantic structure", () => {
    render(
      <Message from="user">
        <MessageContent>Test content</MessageContent>
      </Message>
    );

    // Check that the structure is correct
    const messageDiv = screen.getByText("Test content").parentElement;
    expect(messageDiv).toHaveClass("flex", "w-full");

    const contentDiv = messageDiv?.querySelector(".rounded-lg");
    expect(contentDiv).toBeInTheDocument();
  });
});
