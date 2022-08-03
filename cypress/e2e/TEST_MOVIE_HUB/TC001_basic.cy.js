describe('Navigation bar', () => {
    
  it('visit the movie hub', () => {
      cy.visit('/')
      cy.get('.hw-2').should('be.visible').click()
      cy.location('protocol').contains('eq', 'localhost')
      cy.get('.hw-3 pointer').should('be.visible').click()
      cy.location('protocol').contains('eq', 'localhost')
      cy.get('#searchInput').type('Batman')
      cy.get('.img-fluid').should('be.visible').click()
      cy.url().contains('eq', '268').should('be.visible')
      cy.get('.btn btn-primary').contains('eq', 'Watch online').should('be.visible')
})
it('naigates to popular people', () =>{
 cy.visit('/')
 cy.get('People').should('be.visible'),click()
 cy. contains('Popular People').should('be.visible'),click()
 cy.url().contains('eq', 'Popular People')
 cy.get('img[alt="Tom Holland"]').click()
 cy.contains('MOVIE CREDITS').should('be.visible')
 cy.url().contains('eq', '/1136406').click()
 cy.url().contains('eq', '3000/movieshub/').click()
})
})