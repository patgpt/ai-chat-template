import { describe, expect, it } from "bun:test";
import { cn } from "@/lib/utils";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

describe("unit: utils", () => {
  describe("cn utility function", () => {
    it("should merge class names correctly", () => {
      const result = cn("px-4", "py-2", "bg-blue-500");
      expect(result).toBe("px-4 py-2 bg-blue-500");
    });

    it("should handle conditional classes", () => {
      const isActive = true;
      const result = cn("base-class", isActive && "active-class");
      expect(result).toBe("base-class active-class");
    });

    it("should handle undefined and null values", () => {
      const result = cn("base-class", undefined, null, "another-class");
      expect(result).toBe("base-class another-class");
    });

    it("should merge conflicting Tailwind classes correctly", () => {
      const result = cn("px-4", "px-8", "bg-red-500", "bg-blue-500");
      expect(result).toBe("px-8 bg-blue-500");
    });

    it("should handle empty input", () => {
      const result = cn();
      expect(result).toBe("");
    });

    it("should handle array input", () => {
      const result = cn(["px-4", "py-2"], "bg-blue-500");
      expect(result).toBe("px-4 py-2 bg-blue-500");
    });

    it("should preserve non-conflicting classes", () => {
      const result = cn("text-lg", "font-bold", "text-center");
      expect(result).toBe("text-lg font-bold text-center");
    });
  });

  describe("integration with clsx and tailwind-merge", () => {
    it("should work with clsx conditional logic", () => {
      const isDisabled = false;
      const result = cn(clsx("btn", { "btn-disabled": isDisabled }));
      expect(result).toBe("btn");
    });

    it("should merge complex conditional classes", () => {
      const variant = "primary";
      const size = "lg";
      const disabled = false;

      const result = cn(
        "btn",
        {
          "btn-primary": variant === "primary",
          "btn-secondary": variant === "secondary",
          "btn-lg": size === "lg",
          "btn-sm": size === "sm",
          "btn-disabled": disabled,
        }
      );

      expect(result).toBe("btn btn-primary btn-lg");
    });
  });
});
