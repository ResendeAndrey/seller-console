// src/hooks/useDebounce.test.tsx
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useDebounce } from "./useDebounce";

describe("useDebounce hook", () => {
  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("test", 500));
    expect(result.current).toBe("test");
  });

  it("updates value after the specified delay", async () => {
    vi.useFakeTimers();

    let value = "initial";
    const { result, rerender } = renderHook(() => useDebounce(value, 500));

    expect(result.current).toBe("initial");

    value = "updated";
    rerender();

    expect(result.current).toBe("initial");
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("updated");

    vi.useRealTimers();
  });

  it("clears previous timeout if value changes before delay", () => {
    vi.useFakeTimers();

    let value = "first";
    const { result, rerender } = renderHook(() => useDebounce(value, 500));

    value = "second";
    rerender();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("second");

    vi.useRealTimers();
  });
});
