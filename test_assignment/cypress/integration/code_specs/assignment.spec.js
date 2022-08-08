describe("QA Engineer Code Challenge Assignment..", () => {
    beforeEach(function () {
      cy.viewport(1500, 1000);
      Cypress.on("uncaught:exception", (err, runnable) => {
        //prevent Cypress from failing the test
        return false;
      });
    });
  
    it("Navigating to the All Inclusive pass page", () => {
      cy.visit("https://gocity.com/boston/en-us/products/all-inclusive");
      cy.url({ timeout: 2000 }).should("include", "/all-inclusive"); //expected to include /all-inclusive
    });

    it("Redirecting user to home page when selecting home link", () => {
      cy.get("ol").find("li").first().click(); //Redirect user to homepage
      cy.url().should("contain", "en-us"); //expected to include en-us
    });

    it("Redirect user to pricing page after clicking `Buy` button", () => {
      cy.get(".lc-font__regular").click(); //Redirect to pricing page
  
      cy.get(".pass-product-comparison--button") 
        .first()
        .find("a")
        .should("have.text", "Buy Now") //anchor tag should include 'Buy Now' text
        .click(); //Click on 'Buy Now' button
      cy.wait(2000);
    });
   
  });
