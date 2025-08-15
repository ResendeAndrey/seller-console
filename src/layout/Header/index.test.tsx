// src/layout/Header.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Header from ".";
import * as useThemeHook from "@/context/theme/useTheme";

describe("Header component", () => {
  it("renders MoonIcon when darkMode is false", () => {
    vi.spyOn(useThemeHook, "useTheme").mockReturnValue({
      darkMode: false,
      toggleDarkMode: vi.fn()
    });

    render(<Header />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(
      screen.getByTestId("moon-icon") || screen.getByText(/MoonIcon/i)
    ).toBeDefined();
  });

  it("renders SunIcon when darkMode is true", () => {
    vi.spyOn(useThemeHook, "useTheme").mockReturnValue({
      darkMode: true,
      toggleDarkMode: vi.fn()
    });

    render(<Header />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(
      screen.getByTestId("sun-icon") || screen.getByText(/SunIcon/i)
    ).toBeDefined();
  });

  it("calls toggleDarkMode on button click", () => {
    const toggleMock = vi.fn();
    vi.spyOn(useThemeHook, "useTheme").mockReturnValue({
      darkMode: false,
      toggleDarkMode: toggleMock
    });

    render(<Header />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(toggleMock).toHaveBeenCalled();
  });
});
