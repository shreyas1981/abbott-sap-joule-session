// ══════════════════════════════════════════════════════════════════════════════
// Abbott SAP Joule Session — Visitor Tracker
// Google Apps Script Web App
//
// HOW TO DEPLOY:
//   1. Go to script.google.com → New Project → paste this entire file
//   2. In the script, click the "spreadsheetId" variable and replace it with
//      the ID from your Google Sheet URL:
//        https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
//   3. Click Deploy → New Deployment → Web App
//      - Execute as: Me
//      - Who has access: Anyone
//   4. Copy the deployment URL
//   5. In index.html, replace REPLACE_WITH_YOUR_APPS_SCRIPT_URL with that URL
// ══════════════════════════════════════════════════════════════════════════════

// ── CHANGE THIS to your Google Sheet ID ──
const SPREADSHEET_ID = '166WjsM_d0O9PECVbDxpDlYTuArUlMytiD-xLoWVTp3Q';
const SHEET_NAME     = 'Visitors';

function doGet(e) {
  try {
    const params = e.parameter || {};
    appendVisit(
      params.name     || 'Anonymous',
      params.page     || '',
      params.referrer || 'direct',
      params.ts       || new Date().toISOString()
    );
  } catch (err) {
    // log silently — never break the visitor's page experience
    console.error(err);
  }

  // Return a 1×1 transparent GIF so no-cors fetch succeeds
  return ContentService
    .createTextOutput('OK')
    .setMimeType(ContentService.MimeType.TEXT);
}

function appendVisit(name, page, referrer, ts) {
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  let   sheet = ss.getSheetByName(SHEET_NAME);

  // Create sheet + headers on first run
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Name', 'Page', 'Referrer', 'Date (Local)']);
    sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  const localDate = new Date(ts).toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true
  });

  sheet.appendRow([ts, name, page, referrer, localDate]);
}
