// cypress/e2e/leads.cy.ts
/// <reference types="cypress" />

describe("Leads Page E2E", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders Filter, AgGrid, and Pagination", () => {
    cy.get('input[placeholder="Search name or company..."]').should("exist");
    cy.get('[data-testid="ag-grid-leads"]').should("exist");
    cy.get('[data-testid="pagination"]').should("exist");
  });

  it("opens LeadDetailSlideOver when a row is clicked", () => {
    cy.get('[data-testid="ag-grid-leads"]').click();
    cy.get("button").contains("Edit").click();
    cy.get('[data-testid="slide-over"]').should("exist");
  });

  it("filters leads using search input", () => {
    const searchTerm = "Test Lead";
    cy.get('input[placeholder="Search name or company..."]').type(searchTerm);
    cy.get('input[placeholder="Search name or company..."]').should(
      "have.value",
      searchTerm
    );
  });

  it("changes page with pagination", () => {
    cy.get('[data-testid="pagination"]').click();
  });
});
