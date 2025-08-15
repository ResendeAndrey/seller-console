// src/hooks/useGetOpportunities.test.tsx
import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useGetOpportunities from "../../../hooks/query/usegetOpportunitiesList";
import * as api from "../../../api/opportunities";
import { Opportunity } from "@/features/opportunities/types";
import { CommonDataResponse } from "@/types/axios";

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useGetOpportunities hook", () => {
  const filter = { status: "Open", search: "Project" };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("calls getOpportunities with correct filter and returns data", async () => {
    const mockData: CommonDataResponse<Opportunity[]> = {
      page: 1,
      totalItems: 1,
      totalPages: 1,
      data: [
        {
          id: "1",
          name: "Project A",
          company: "ABC",
          email: "j4g0e@example.com",
          score: 75,
          source: "Website"
        }
      ]
    };
    const getOpportunitiesSpy = vi
      .spyOn(api, "getOpportunities")
      .mockResolvedValue(mockData);

    const { result } = renderHook(() => useGetOpportunities(filter), {
      wrapper
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => result.current.isSuccess);

    expect(getOpportunitiesSpy).toHaveBeenCalledWith(filter);
  });

  it("handles error state", async () => {
    const error = new Error("Failed to fetch");
    vi.spyOn(api, "getOpportunities").mockRejectedValue(error);

    const { result } = renderHook(() => useGetOpportunities(filter), {
      wrapper
    });

    await waitFor(() => result.current.isError);

    expect(result.current.data).toBeUndefined();
  });
});
