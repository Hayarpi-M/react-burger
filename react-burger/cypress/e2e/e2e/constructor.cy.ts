/// <reference types="cypress" />

describe('Burger Constructor Flow', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');

    // simulate user is authenticated by setting accessToken cookie
    cy.setCookie('accessToken', 'mockedToken');

    cy.intercept('POST', '**/orders', {
      statusCode: 200,
      body: {
        success: true,
        name: 'Флюоресцентный бургер',
        order: { number: 12345 },
      },
    }).as('makeOrder');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('should drag ingredients and create an order', () => {
    // Drag bun
    cy.get('[data-testid="ingredient-bun"]')
      .first()
      .trigger('dragstart');
    cy.get('[data-testid="constructor-dropzone"]')
      .trigger('drop');

    // Drag another ingredient (e.g., main)
    cy.get('[data-testid="ingredient-main"]')
      .first()
      .trigger('dragstart');
    cy.get('[data-testid="constructor-dropzone"]')
      .trigger('drop');

    // Verify items were added
    cy.get('[data-testid="constructor-bun-top"]').should('exist');
    cy.get('[data-testid="constructor-bun-bottom"]').should('exist');
    cy.get('[data-testid="constructor-main"]').should('exist');

    // Click "Оформить заказ"
    cy.get('button').contains('Оформить заказ').click();

    // Should show modal with order number
    cy.wait('@makeOrder');
    cy.get('[data-testid="order-modal"]').should('contain.text', '12345');

    // Close modal
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="order-modal"]').should('not.exist');
  });
});
