/// <reference types="cypress" />
import {INGREDIENT_BUN, 
INGREDIENT_SAUCE, 
INGREDIENT_MAIN, 
INGREDIENT_MODAL, 
MODAL_CLOSE} from '../../support/selectors';

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

    cy.get(INGREDIENT_BUN).should('exist');
    cy.get(INGREDIENT_SAUCE).should('exist');
    cy.get(INGREDIENT_MAIN).should('exist');
  });

  it('should switch tabs and scroll to correct section', () => {
    cy.contains('Соусы').click();
    cy.wait(300);
    cy.get(INGREDIENT_SAUCE).should('exist');

    cy.contains('Начинки').click();
    cy.wait(300);
    cy.get(INGREDIENT_MAIN).should('exist');

    cy.contains('Булки').click();
    cy.wait(300);
    cy.get(INGREDIENT_BUN).should('exist');
  });

  it('should open ingredient modal on click and close it', () => {
    cy.get(INGREDIENT_BUN).first().click();

    // Check modal opens
    cy.get(INGREDIENT_MODAL).should('exist');

    cy.get(INGREDIENT_MODAL)
      .should('contain.text', 'Краторная булка N-200i') 

    // Close modal
    cy.get(MODAL_CLOSE).click();
    cy.get(INGREDIENT_MODAL).should('not.exist');
  });
});
