// Google Apps Script — receives leads from the xenstayhomes.com form
// and appends them as a new row in a Google Sheet.
//
// Setup instructions are in README.md under "Lead capture setup".

const SHEET_NAME = 'Leads';

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
    || SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Submitted At', 'First Name', 'Last Name', 'Email', 'Phone',
      'City', 'Property Type', 'Situation', 'Notes', 'Source'
    ]);
  }

  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.firstName || '',
    data.lastName || '',
    data.email || '',
    data.phone || '',
    data.city || '',
    data.propertyType || '',
    data.situation || '',
    data.notes || '',
    data.source || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
