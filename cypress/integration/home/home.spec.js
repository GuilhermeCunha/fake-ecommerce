/// <reference types="cypress" />

describe('Index page', () => {
  before(() => {
    cy.visit('/');
  });

  describe('Must be logged out', () => {
    it('Must allow login ', () => {
      cy.get('[data-cy=google-login-button]').should('exist');
    });
  });

  describe('Must allow choosing source', () => {
    it('Must render source options', () => {
      cy.get('[data-cy=select-sources-component]').should('exist');
    });

    it('must allow clicking on an option', () => {
      cy.get('[data-cy=select-sources-div] button').children().first().click();
    });
  });
});
