import {
  ORDER_CARD,
  ORDER_MODAL,
  MODAL_CLOSE
} from '../../support/selectors';

describe('Feed Page - Order Details Modal', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/*').as('all');

    cy.visit('/feed');
    //cy.wait('@all');
  });

  it('should open order detail modal on clicking an order card', () => {
    cy.get(ORDER_CARD).first().click();
    cy.get(ORDER_MODAL).should('exist');
    cy.get(ORDER_MODAL).should('contain.text', 'Детали заказа');
  });

  it('should close order modal on close button click', () => {
    cy.get(ORDER_CARD).first().click();
    cy.get(ORDER_MODAL).should('exist');

    cy.get(MODAL_CLOSE).click();
    cy.get(ORDER_MODAL).should('not.exist');
  });
});
