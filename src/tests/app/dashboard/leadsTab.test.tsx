// src/features/leads/pages/Leads.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import Leads from "@/app/pages/Dashboard/leadsTab";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock componentes internos
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
const queryClient = new QueryClient();

describe("Leads page (smoke test)", () => {
  it("renders main sections", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Leads />
      </QueryClientProvider>
    );

    expect(screen.getByTestId("filter")).toBeInTheDocument();
    expect(screen.getByTestId("ag-grid")).toBeInTheDocument();
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });
});
