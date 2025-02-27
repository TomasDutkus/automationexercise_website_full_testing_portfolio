describe("Automation Exercise Tests", () => {
  it("should load the homepage", () => {
    cy.visit("https://automationexercise.com/");
    cy.title().should("eq", "Automation Exercise");
  });

  it("should navigate to the Products page", () => {
    cy.visit("https://automationexercise.com/");
    cy.get('a[href="/products"]').click();
    cy.url().should("include", "/products");
    cy.get(".title").should("contain", "All Products");
  });
});
