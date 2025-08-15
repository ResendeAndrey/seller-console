// sr
import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import Opportunities from "@/app/pages/Dashboard/opportunitiesTab";
import * as debounceHook from "@/hooks/customs/useDebounce";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("@/features/leads/components/filter", () => ({
  default: () => <div data-testid="filter" />
}));

vi.mock("@/components/pagination", () => ({
  default: () => <div data-testid="pagination" />
}));
vi.mock("ag-grid-react", () => ({
  AgGridReact: () => <div data-testid="ag-grid" />
}));
vi.mock("@/components/loading", () => ({
  default: () => <div>Loading...</div>
}));

vi.mock("@/components/searchInput", () => ({
  default: () => <div data-testid="search-input" />
}));

describe("Opportunities page (smoke test)", () => {
  const queryClient = new QueryClient();

  it("renders main sections", () => {
    vi.spyOn(debounceHook, "useDebounce").mockReturnValue(
      undefined as ReturnType<typeof debounceHook.useDebounce>
    );

    render(
      <QueryClientProvider client={queryClient}>
        <Opportunities />
      </QueryClientProvider>
    );

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("ag-grid")).toBeInTheDocument();
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });
});
