import SwagLabsPage from '../support/page-objects/swagLabs.page';

describe('Swag Labs Automation', () => {
  beforeEach(() => {
    // Navigate to the site and log in once before all tests
    cy.visit(Cypress.env('baseUrl'));
    cy.get(SwagLabsPage.login.userName).type(Cypress.env('userName'));
    cy.get(SwagLabsPage.login.password).type(Cypress.env('password'));
    cy.get(SwagLabsPage.login.loginButton).click();
    
  });

  it('User should be able to add, edit and sort items', () => {
    //Adding items to the cart
    cy.get(SwagLabsPage.addItems.item1).click();
    cy.get(SwagLabsPage.addItems.item2).click();
    cy.get(SwagLabsPage.addItems.cartIcon).should('be.visible');
    cy.get(SwagLabsPage.addItems.cart_badge).should('have.text', '2');

    //Edidting the cart
    cy.get(SwagLabsPage.addItems.cartIcon).click();
    cy.get(SwagLabsPage.editCart.removeItem1).click();
    cy.get(SwagLabsPage.editCart.continueShopping).click();
    cy.get(SwagLabsPage.addItems.cart_badge).should('have.text', '1');

    //sorting the items
    cy.get(SwagLabsPage.sortItems.sortDropdown).select('Price (low to high)');
    cy.get(SwagLabsPage.sortItems.sortOption).should('have.text', 'Price (low to high)');
  });

  it('negative test scenario with login', () => {
    cy.get(SwagLabsPage.applicationHeader.sidebar_menu).click();
    cy.get(SwagLabsPage.login.logoutButton).click();
    cy.get(SwagLabsPage.login.userName).type(Cypress.env('negativeUserName'));
    cy.get(SwagLabsPage.login.password).type(Cypress.env('password'));
    cy.get(SwagLabsPage.login.loginButton).click();
    cy.get(SwagLabsPage.login.errorMessage).should('be.visible');
  });
 });