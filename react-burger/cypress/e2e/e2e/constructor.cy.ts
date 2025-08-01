/// <reference types="cypress" />
import {
  INGREDIENT_BUN,
  INGREDIENT_MAIN,
  CONSTRUCTOR_DROPZONE,
  CONSTRUCTOR_BUN_TOP,
  CONSTRUCTOR_BUN_BOTTOM,
  CONSTRUCTOR_MAIN,
  ORDER_MODAL,
  MODAL_CLOSE
} from '../../support/selectors';

describe('Burger Constructor Flow', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('POST', '**/orders', {
      statusCode: 200,
      body: {
        success: true,
        name: 'Флюоресцентный бургер',
        order: { number: 12345 },
      },
    }).as('makeOrder');

    cy.setCookie('accessToken', 'mockedToken');

    cy.visit('/');
    cy.wait('@getIngredients', { timeout: 10000 });
  });

  it('should drag ingredients and create an order', () => {
    // Drag bun
    cy.get(INGREDIENT_BUN)
      .first()
      .trigger('dragstart');
    cy.get(CONSTRUCTOR_DROPZONE)
      .trigger('drop');

    // Drag another ingredient (e.g., main)
    cy.get(INGREDIENT_MAIN)
      .first()
      .trigger('dragstart');
    cy.get(CONSTRUCTOR_DROPZONE)
      .trigger('drop');

    // Verify items were added
    cy.get(CONSTRUCTOR_BUN_TOP).should('exist');
    cy.get(CONSTRUCTOR_BUN_BOTTOM).should('exist');
    cy.get(CONSTRUCTOR_MAIN).should('exist');

    // Click "Оформить заказ"
    cy.get('button').contains('Оформить заказ').click();

    // Should show modal with order number
    cy.wait('@makeOrder');
    cy.get(ORDER_MODAL).should('contain.text', '12345');

    // Close modal
    cy.get(MODAL_CLOSE).click();
    cy.get(ORDER_MODAL).should('not.exist');
  });
});
