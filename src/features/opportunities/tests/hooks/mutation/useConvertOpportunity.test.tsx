// src/hooks/useConvertOpportunity.test.tsx
import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useConvertOpportunity } from "../../../hooks/mutation/useConvertOpportunity";
import * as api from "../../../api/opportunities";
import { toast } from "sonner";
import { Opportunity } from "@/features/opportunities/types";

describe("useConvertOpportunity hook", () => {
  const opportunity: Opportunity = {
    id: "1",
    name: "Converted Opportunity",
    company: "Company",
    email: "j8W1f@example.com",
    score: 5,
    source: "Source"
  };
  const leadId = "1";

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("calls postOpportunity and shows toast on success", async () => {
    const postOpportunityMock = vi
      .spyOn(api, "postOpportunity")
      .mockResolvedValue(opportunity);
    const toastSpy = vi.spyOn(toast, "success");

    const queryClient = new QueryClient();

    const { result } = renderHook(() => useConvertOpportunity(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )
    });

    act(() => {
      result.current.mutate(leadId);
    });

    await waitFor(() => result.current.isSuccess);

    expect(postOpportunityMock).toHaveBeenCalledWith(leadId);
    expect(toastSpy).toHaveBeenCalledWith("Lead converted to opportunity");
  });
});
