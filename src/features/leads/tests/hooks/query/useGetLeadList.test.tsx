// src/hooks/useGetLeadList.test.tsx
import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useGetLeadList from "../../../hooks/query/useGetLeadList";
import * as api from "../../../api/leads";
import { Lead } from "@/features/leads/types";
import { CommonDataResponse } from "@/types/axios";

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useGetLeadList hook", () => {
  const filter = { status: "New", search: "John" };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("calls getLeads with correct filter and returns data", async () => {
    const mockData: CommonDataResponse<Lead[]> = {
      page: 1,
      totalPages: 1,
      totalItems: 2,
      data: [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          status: "New",
          company: "Example Inc.",
          source: "Website",
          score: 75
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          status: "Qualified",
          company: "Acme Corp.",
          source: "Referral",
          score: 85
        }
      ]
    };
    const getLeadsSpy = vi.spyOn(api, "getLeads").mockResolvedValue(mockData);

    const { result } = renderHook(() => useGetLeadList(filter), {
      wrapper
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => result.current.isSuccess);

    expect(getLeadsSpy).toHaveBeenCalledWith(filter);
  });

  it("handles error state", async () => {
    const error = new Error("Failed to fetch");
    vi.spyOn(api, "getLeads").mockRejectedValue(error);

    const { result } = renderHook(() => useGetLeadList(filter), {
      wrapper
    });

    await waitFor(() => result.current.isError);

    expect(result.current.data).toBeUndefined();
  });
});
