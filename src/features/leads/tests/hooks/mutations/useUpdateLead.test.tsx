// src/hooks/useUpdateLead.test.tsx
import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUpdateLead } from "../../../hooks/mutation/useUpdateLead";
import * as api from "../../../api/leads";
import { toast } from "sonner";
import { Lead } from "@/features/leads/types";

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useUpdateLead hook", () => {
  const lead: Lead = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "New",
    company: "Example Inc.",
    source: "Website",
    score: 75
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("calls updateLead and shows toast on success", async () => {
    const updateLeadMock = vi.spyOn(api, "updateLead").mockResolvedValue(lead);
    const toastSpy = vi.spyOn(toast, "success");

    const { result } = renderHook(() => useUpdateLead(), { wrapper });

    act(() => {
      result.current.mutate(lead);
    });

    await waitFor(() => result.current.isSuccess);

    expect(updateLeadMock).toHaveBeenCalledWith(lead);
    expect(toastSpy).toHaveBeenCalledWith(
      `Lead ${lead.name} updated successfully`
    );
  });
});
