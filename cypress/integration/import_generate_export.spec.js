// cypress/integration/import_generate_export.spec.js
describe('Import -> Generate -> Export flow', () => {
  it('imports CSV, generates report and exports PDF', () => {
    cy.visit('/');
    // عنصر رفع الملف يجب أن يكون موجودًا وذو id=fileInput
    cy.get('#fileInput').attachFile('samples/sample_trial_balance_small.csv');
    cy.get('#importBtn').click();
    cy.contains('Import successful').should('exist');

    cy.get('#generateBtn').click();
    cy.contains('Balance Sheet').should('exist');
    cy.contains('Income Statement').should('exist');

    // export - قد تحتاج plugin للتحقق من الملف
    cy.get('#exportPdfBtn').click();
  });
});
