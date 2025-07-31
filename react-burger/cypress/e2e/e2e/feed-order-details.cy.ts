describe('Feed Page - Order Details Modal', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/*').as('all');

    cy.visit('/feed');
    //cy.wait('@all');
  });

  it('should open order detail modal on clicking an order card', () => {
    cy.get('[data-testid="order-card"]').first().click();
    cy.get('[data-testid="order-modal"]').should('exist');
    cy.get('[data-testid="order-modal"]').should('contain.text', 'Детали заказа');
  });

  it('should close order modal on close button click', () => {
    cy.get('[data-testid="order-card"]').first().click();
    cy.get('[data-testid="order-modal"]').should('exist');

    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="order-modal"]').should('not.exist');
  });
});
