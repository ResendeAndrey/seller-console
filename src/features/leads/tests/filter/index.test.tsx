// src/components/Filter.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Filter from "../../components/filter";
import { filterStatus } from "@/utils/constants/filterStatus";

describe("Filter component", () => {
  it("renders SearchInput component", () => {
    const setSearch = vi.fn();
    const setStatusFilter = vi.fn();

    render(
      <Filter
        search=""
        setSearch={setSearch}
        statusFilter=""
        setStatusFilter={setStatusFilter}
      />
    );

    const input = screen.getByPlaceholderText("Search name or company...");
    expect(input).toBeInTheDocument();
  });

  it("renders select with all filterStatus options", () => {
    const setSearch = vi.fn();
    const setStatusFilter = vi.fn();

    render(
      <Filter
        search=""
        setSearch={setSearch}
        statusFilter=""
        setStatusFilter={setStatusFilter}
      />
    );

    const select = screen.getByRole("combobox");
    filterStatus.forEach((status) => {
      expect(screen.getByText(status)).toBeInTheDocument();
    });
    expect(select).toBeInTheDocument();
  });

  it("calls setStatusFilter when selecting a new option", async () => {
    const setSearch = vi.fn();
    const setStatusFilter = vi.fn();

    render(
      <Filter
        search=""
        setSearch={setSearch}
        statusFilter=""
        setStatusFilter={setStatusFilter}
      />
    );

    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, filterStatus[1]);

    expect(setStatusFilter).toHaveBeenCalledWith(filterStatus[1]);
  });

  it("calls setSearch when typing in SearchInput", async () => {
    let searchValue: string | undefined = "";
    const setSearch = vi.fn((val) => (searchValue = val));
    const setStatusFilter = vi.fn();

    render(
      <Filter
        search={searchValue}
        setSearch={setSearch}
        statusFilter=""
        setStatusFilter={setStatusFilter}
      />
    );

    const input = screen.getByPlaceholderText("Search name or company...");
    await fireEvent.change(input, { target: { value: "Test" } });

    expect(setSearch).toHaveBeenCalledTimes(1);
    expect(searchValue).toBe("Test");
  });
});
