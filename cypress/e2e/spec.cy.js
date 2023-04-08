describe('spec.cy.js', () => {
  it('should visit getCategory with systolic as 119 and diastolic as 89 will be normal', ()=> {
      cy.writeFile("cypress.test.log", "");
          cy.request({
              method: 'GET',
              url: 'http://localhost:22137/getCategory?systolic=119&diastolic=79',
              headers: {
                  'Content-Type': 'application/json; charset=utf-8',
              },
              body: null
          }).as('details');
      cy.get('@details').its('status').should('eq', 200);
      cy.get('@details').then((response) => {
          cy.writeFile("cypress.test.log", JSON.stringify(response.body),  { flag: 'a+' });
          expect(response.body.category).to.eq('Normal');
          expect(response.body.systolic).to.eq('119');
          expect(response.body.diastolic).to.eq('79');
      });

  })
})
