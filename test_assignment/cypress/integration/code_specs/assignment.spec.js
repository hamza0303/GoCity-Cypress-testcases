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

    it("Select one day pass", () => {
      cy.get("div")
        .find(".lc-products-list__item")
        .find("div")
        .contains("1 day pass");   
      cy.contains("Select").click({ force: true }); //Click on '1 day pass' cart option
  
      cy.get(".lc-cart__item-function-pass").then((selected_pass) => {
        const selected_pass_text = selected_pass.text();
        expect(selected_pass_text).to.equal("1 day pass"); //expected 1 day pass to equal 1 day pass on page
      });
    });
    it("Choose for one person and click on “Checkout” button", () => {
      cy.get(".lc-cart__item-amount-value")
        .first()
        .then((person_amount) => {
          const person_amount_count = person_amount.text(); //Fetch the value and convert into int
          expect(parseInt(person_amount_count)).to.equal(1); //expected 1 to equal to 1
        });
      cy.wait(2000);
      cy.get("a").contains("Checkout").click({ force: true }); //fire the event at the checkout button.
      cy.wait(2000);
    });

    it("Navigates to Home page from checkout page", () => {
      cy.get("a.logo.navbar-btn.pull-left").click();
      cy.url().should("contain", "en-us"); //expected to inlcude /en-us
    });
  });
