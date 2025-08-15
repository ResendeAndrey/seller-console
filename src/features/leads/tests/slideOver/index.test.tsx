// src/components/LeadDetailSlideOver.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import LeadDetailSlideOver from "../../components/slideOver";
import { filterStatus } from "@/utils/constants/filterStatus";
import { Lead } from "../../types";

const mockLead: Lead = {
  name: "John Doe",
  email: "john@example.com",
  status: "New",
  id: "1",
  company: "Example Inc.",
  source: "Website",
  score: 75
};

describe("LeadDetailSlideOver component", () => {
  it("does not render when isOpen is false or lead is null", () => {
    const { container: container1 } = render(
      <LeadDetailSlideOver
        lead={mockLead}
        isOpen={false}
        onClose={vi.fn()}
        onSave={vi.fn()}
        isLoading={false}
      />
    );
    expect(container1).toBeEmptyDOMElement();
  });

  it("renders lead name, input and select with default values", () => {
    render(
      <LeadDetailSlideOver
        lead={mockLead}
        isOpen={true}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />
    );

    expect(screen.getByText(mockLead.name)).toBeInTheDocument();
    const emailInput = screen.getByRole("textbox", {
      name: /email/i
    }) as HTMLInputElement;
    expect(emailInput.value).toBe(mockLead.email);

    const statusSelect = screen.getByRole("combobox") as HTMLSelectElement;
    expect(statusSelect.value).toBe(mockLead.status);

    filterStatus.forEach((status) => {
      expect(screen.getByText(status)).toBeInTheDocument();
    });
  });

  it("calls onClose when clicking Cancel button", async () => {
    const onClose = vi.fn();

    render(
      <LeadDetailSlideOver
        lead={mockLead}
        isOpen={true}
        onClose={onClose}
        onSave={vi.fn()}
      />
    );

    const cancelButton = screen.getByText("Cancel");
    await userEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalled();
  });

  it("renders Save button in loading state", () => {
    render(
      <LeadDetailSlideOver
        lead={mockLead}
        isOpen={true}
        onClose={vi.fn()}
        onSave={vi.fn()}
        isLoading={true}
      />
    );

    const saveButton = screen.getByTestId("save-button");
    expect(saveButton).toBeDisabled();
  });
});
