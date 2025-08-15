describe("Leads to Opportunities flow", () => {
  it("converts a lead and navigates to opportunities", () => {
    cy.visit("/");

    cy.get("[data-testid=ag-grid]").should("exist");

    cy.get("button").contains("Convert").click();

    cy.get("button").contains("Opportunities").click();

    cy.get(".ag-center-cols-container")
      .contains("No opportunities found")
      .should("not.exist");
  });
});
