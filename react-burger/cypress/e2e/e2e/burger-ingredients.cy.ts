/// <reference types="cypress" />

describe('Burger Ingredients UI', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('should render all ingredient sections and tabs', () => {
    cy.contains('Булки').should('exist');
    cy.contains('Соусы').should('exist');
    cy.contains('Начинки').should('exist');

    cy.get('[data-testid="ingredient-bun"]').should('exist');
    cy.get('[data-testid="ingredient-sauce"]').should('exist');
    cy.get('[data-testid="ingredient-main"]').should('exist');
  });

  it('should switch tabs and scroll to correct section', () => {
    cy.contains('Соусы').click();
    cy.wait(300); // allow scroll effect to apply
    cy.get('[data-testid="ingredient-sauce"]').should('exist');

    cy.contains('Начинки').click();
    cy.wait(300);
    cy.get('[data-testid="ingredient-main"]').should('exist');

    cy.contains('Булки').click();
    cy.wait(300);
    cy.get('[data-testid="ingredient-bun"]').should('exist');
  });

  it('should open ingredient modal on click and close it', () => {
    cy.get('[data-testid="ingredient-bun"]').first().click();

    // Check modal opens
    cy.get('[data-testid="ingredient-modal"]').should('exist');

    // Check ingredient name/details inside modal
    cy.get('[data-testid="ingredient-modal"]')
      .should('contain.text', 'Краторная булка N-200i') 

    // Close modal
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="ingredient-modal"]').should('not.exist');
  });
});
