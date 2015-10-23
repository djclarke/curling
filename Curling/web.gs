function includeStylesheet() {
  return HtmlService.createTemplateFromFile('stylesheet').getRawContent();
}

function getDates() {
  var datesRange = SpreadsheetApp.openById(SHEET_ID).getRangeByName('draw1dates');
  return datesRange.getValues()[0];
}
