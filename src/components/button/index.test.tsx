// src/components/Button.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Button from ".";

describe("Button component", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies default width class 'w-50' if no width class is provided", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("w-50");
  });

  it("does not apply 'w-50' if a width class is provided", () => {
    render(<Button className="w-100">Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).not.toHaveClass("w-50");
    expect(button).toHaveClass("w-100");
  });

  it("renders a spinner and disables button when isLoading is true", () => {
    render(<Button isLoading>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button.querySelector("div.animate-spin")).toBeInTheDocument();
    expect(screen.queryByText("Click me")).toBeNull();
  });

  it("calls onClick when clicked and not loading", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when isLoading", async () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} isLoading>
        Click me
      </Button>
    );

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
