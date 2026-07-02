const SHEET_NAME = "Registrations";

function doPost(e) {
  const sheet = getRegistrationSheet_();
  const data = e && e.parameter ? e.parameter : null;

  if (!data) {
    return jsonResponse_({
      result: "error",
      message: "doPost only works when the website sends the form. Run setupSheet or testRegistration from the Apps Script editor instead."
    });
  }

  sheet.appendRow([
    new Date(),
    data.conference || "",
    data.committee || "",
    data.fullName || "",
    data.email || "",
    data.phone || "",
    data.school || "",
    data.grade || "",
    data.country || "",
    data.experience || "",
    data.portfolioPreferences || "",
    data.motivation || "",
    data.consent || ""
  ]);

  return jsonResponse_({ result: "success" });
}

function setupSheet() {
  getRegistrationSheet_();
}

function testRegistration() {
  const sheet = getRegistrationSheet_();

  sheet.appendRow([
    new Date(),
    "DCMUN 2026 Online Edition",
    "UNHRC",
    "Test Delegate",
    "test@example.com",
    "1234567890",
    "Test School",
    "Grade 10",
    "India",
    "First-time delegate",
    "India, Japan, Brazil",
    "I want to learn diplomacy.",
    "Yes"
  ]);
}

function doGet() {
  return jsonResponse_({
    result: "ready",
    message: "DCMUN registration endpoint is working. Submit the website form to add registrations."
  });
}

function getRegistrationSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Conference",
      "Committee",
      "Full Name",
      "Email",
      "Phone",
      "School",
      "Grade",
      "Country",
      "MUN Experience",
      "Portfolio Preferences",
      "Motivation",
      "Consent"
    ]);
  }

  return sheet;
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
