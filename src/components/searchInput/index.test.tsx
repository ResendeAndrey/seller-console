// src/components/SearchInput.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import SearchInput from ".";

describe("SearchInput component", () => {
  it("renders input with placeholder", () => {
    const setSearch = vi.fn();
    render(<SearchInput search="" setSearch={setSearch} />);
    const input = screen.getByPlaceholderText("Search name or company...");
    expect(input).toBeInTheDocument();
  });

  it("updates value when typing", async () => {
    let value: string | undefined = "";
    const setSearch = vi.fn((val) => (value = val));
    render(<SearchInput search={value} setSearch={setSearch} />);

    const input = screen.getByPlaceholderText("Search name or company...");
    await fireEvent.change(input, { target: { value: "Test" } });

    expect(setSearch).toHaveBeenCalledTimes(1);
    expect(value).toBe("Test");
  });

  it("renders clear button when search has value", () => {
    const setSearch = vi.fn();
    render(<SearchInput search="Hello" setSearch={setSearch} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("clears input when clicking clear button", async () => {
    let value: string | undefined = "Hello";
    const setSearch = vi.fn((val) => (value = val));
    render(<SearchInput search={value} setSearch={setSearch} />);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(setSearch).toHaveBeenCalledWith("");
    expect(value).toBe("");
  });

  it("does not render clear button when search is empty", () => {
    const setSearch = vi.fn();
    render(<SearchInput search="" setSearch={setSearch} />);

    const button = screen.queryByRole("button");
    expect(button).toBeNull();
  });
});
