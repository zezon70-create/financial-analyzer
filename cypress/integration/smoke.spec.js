describe('FA Ultimate smoke', ()=>{
  it('loads ultimate page and shows header', ()=>{
    cy.visit('/ultimate/index.html');
    cy.contains('المحلل المالي');
  });
});
