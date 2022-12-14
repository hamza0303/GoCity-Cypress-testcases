describe("QA Engineer Code Challenge Assignment..", () => {
  beforeEach(function () {
    cy.viewport(1500, 1000);
    //prevent Cypress from failing the test
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  it("Navigating to the All Inclusive pass page", () => {
    cy.visit("https://gocity.com/boston/en-us/products/all-inclusive");
    //expected to include /all-inclusive
    cy.url({ timeout: 2000 }).should("include", "/all-inclusive");
  });

  it("Redirecting user to home page when selecting home link", () => {
    //Redirect user to homepage
    cy.get("ol").find("li").first().click();
    //expected to include en-us
    cy.url().should("contain", "en-us");
  });

  it("Redirect user to pricing page after clicking `Buy` button", () => {
    //Redirect to pricing page
    cy.get(".lc-font__regular").click();

    cy.get(".pass-product-comparison--button")
      .first()
      .find("a")
      //anchor tag should include 'Buy Now' text
      .should("have.text", "Buy Now")
      //Click on 'Buy Now' button
      .click();
    cy.wait(2000);
  });

  it("Select one day pass", () => {
    cy.get("div")
      .find(".lc-products-list__item")
      .find("div")
      .contains("1 day pass");
    //Click on '1 day pass' cart option
    cy.contains("Select").click({ force: true });

    cy.get(".lc-cart__item-function-pass").then((selected_pass) => {
      const selected_pass_text = selected_pass.text();
      //expected 1 day pass to equal 1 day pass on page
      expect(selected_pass_text).to.equal("1 day pass");
    });
  });
  it("Choose for one person and click on “Checkout” button", () => {
    cy.get(".lc-cart__item-amount-value")
      .first()
      .then((person_amount) => {
        //Fetch the value and convert into int
        const person_amount_count = person_amount.text();
        //expected 1 to equal to 1
        expect(parseInt(person_amount_count)).to.equal(1);
      });
    cy.wait(2000);
    //fire the event at the checkout button.
    cy.get("a").contains("Checkout").click({ force: true });
    cy.wait(2000);
  });

  it("Navigates to Home page from checkout page", () => {
    cy.get("a.logo.navbar-btn.pull-left").click();
    //expected to include /en-us
    cy.url().should("contain", "en-us");
  });

  it("Navigates to `Explorer` page", () => {
    cy.get('[data-testid="menu-main-pass_product-exp"]', {
      timeout: 2000,
    }).click();
    //expected to include /products/explorer
    cy.url().should("contain", "/products/explorer");
    cy.wait(2500);
  });

  it("Tests all the `Explorer` page links", () => {
    //Scroll to the bottom of the window
    cy.scrollTo("bottom");
    cy.get(".read-more-button > .lc-font__regular").click();

    cy.get("a").each((page_links) => {
      const message = page_links.text();
      //expected not to have attribute href with the value of #undefined
      expect(page_links, message).to.not.have.attr("href", "#undefined");
    });
  });

  it("Tests you can add an `Explorer` pass to the cart", () => {
    cy.get('[data-testid="attraction-aggregator-list-item-button"]', {
      timeout: 2000,
    })
      .first()
      .click({ force: true });
    //Remove the target attribute from the DOM
    cy.get("a").invoke("removeAttr", "target").contains("See details").click();
    cy.wait(2000);

    //Get the DOM element containing the text Buy a pass
    cy.get("a").contains("Buy a pass").click();

    //Get the child element
    cy.get("div").find(".lc-products-list__item").find("div");
    //Get the first DOM element
    cy.contains("Select").first().click({ force: true });

    cy.wait(2000);
    cy.get('[data-testid="sidecart-checkout-link"]').click();

    cy.get('[href="/boston/en-us"]').click();
    //expected to include /en-us
    cy.url().should("contain", "en-us");

    //Expected cart icon should contain 1 counter
    cy.get(".cart-icon__icon-counter").should("contain", 1);
  });

  it("Tests that you can remove an `Explorer` pass from the cart", () => {
    cy.get(".cart-icon__icon").click();

    //Delete the explorer pass from the cart
    cy.get(".lc-cart__item-delete").contains("Delete").first().click();
    //Expected to include Buy button
    cy.get(".lc-font__regular").contains("Buy").should("be.visible");
  });
});
