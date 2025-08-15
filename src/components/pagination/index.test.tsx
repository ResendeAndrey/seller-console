// src/components/Pagination.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Pagination from ".";

describe("Pagination component", () => {
  it("renders all pages if totalPages <= 5", () => {
    render(
      <Pagination currentPage={1} totalPages={4} onPageChange={() => {}} />
    );

    for (let i = 1; i <= 4; i++) {
      expect(screen.getByText(`${i}`)).toBeInTheDocument();
    }
  });

  it("renders ellipsis for totalPages > 5", () => {
    render(
      <Pagination currentPage={4} totalPages={10} onPageChange={() => {}} />
    );

    expect(screen.getAllByText("...").length).toBeGreaterThan(0);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("disables Prev button on first page", () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
    );
    expect(screen.getByText("Prev")).toBeDisabled();
  });

  it("disables Next button on last page", () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />
    );
    expect(screen.getByText("Next")).toBeDisabled();
  });

  it("calls onPageChange when clicking page numbers", async () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={handlePageChange}
      />
    );

    await userEvent.click(screen.getByText("3"));
    expect(handlePageChange).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange when clicking Prev and Next buttons", async () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={handlePageChange}
      />
    );

    await userEvent.click(screen.getByText("Prev"));
    expect(handlePageChange).toHaveBeenCalledWith(1);

    await userEvent.click(screen.getByText("Next"));
    expect(handlePageChange).toHaveBeenCalledWith(3);
  });

  it("renders loading skeletons when isLoading is true", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={() => {}}
        isLoading
      />
    );

    const skeletons = screen.getByTestId("pagination-skeleton").children;
    expect(skeletons.length).toBe(5);
  });
});
