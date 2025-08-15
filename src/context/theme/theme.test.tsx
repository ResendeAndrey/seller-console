// src/contexts/ThemeContext.test.tsx
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider, ThemeContext } from "./theme";
import { useContext } from "react";

describe("ThemeContext", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
    document.body.dataset.agThemeMode = "";
  });

  it("provides default darkMode as false if localStorage is empty", () => {
    const TestComponent = () => {
      const { darkMode } = useContext(ThemeContext);
      return <span>{darkMode ? "dark" : "light"}</span>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText("light")).toBeInTheDocument();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(document.body.dataset.agThemeMode).toBe("light");
  });

  it("reads darkMode from localStorage if present", () => {
    localStorage.setItem("darkMode", "true");

    const TestComponent = () => {
      const { darkMode } = useContext(ThemeContext);
      return <span>{darkMode ? "dark" : "light"}</span>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText("dark")).toBeInTheDocument();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.body.dataset.agThemeMode).toBe("dark-blue");
  });

  it("toggles darkMode correctly", () => {
    const TestComponent = () => {
      const { darkMode, toggleDarkMode } = useContext(ThemeContext);
      return (
        <div>
          <span>{darkMode ? "dark" : "light"}</span>
          <button onClick={toggleDarkMode}>Toggle</button>
        </div>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByText("Toggle");

    expect(screen.getByText("light")).toBeInTheDocument();

    act(() => {
      button.click();
    });

    expect(screen.getByText("dark")).toBeInTheDocument();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.body.dataset.agThemeMode).toBe("dark-blue");

    act(() => {
      button.click();
    });

    expect(screen.getByText("light")).toBeInTheDocument();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(document.body.dataset.agThemeMode).toBe("light");
  });

  it("updates localStorage when toggled", () => {
    const TestComponent = () => {
      const { toggleDarkMode } = useContext(ThemeContext);
      return <button onClick={toggleDarkMode}>Toggle</button>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByText("Toggle");

    act(() => {
      button.click();
    });

    expect(localStorage.getItem("darkMode")).toBe("true");

    act(() => {
      button.click();
    });

    expect(localStorage.getItem("darkMode")).toBe("false");
  });
});
