# Abbott SAP AI & Joule Session — Follow-Up Notes

Internal session notes page from the SAP AI & Joule discovery workshop with Abbott.

**Live page:** https://shreyas1981.github.io/abbott-sap-joule-session/

---

## Visitor Tracking Setup (Google Sheets)

Visits are logged to a Google Sheet via a Google Apps Script web app.

### One-time setup (5 minutes)

1. **Create a Google Sheet**
   - Go to [sheets.google.com](https://sheets.google.com) → create a new spreadsheet
   - Name it **Abbott Joule Session Visitors**
   - Copy the Sheet ID from the URL:
     `https://docs.google.com/spreadsheets/d/**SHEET_ID**/edit`

2. **Deploy the Apps Script**
   - Go to [script.google.com](https://script.google.com) → **New Project**
   - Paste the contents of `tracking/apps-script.gs`
   - The Sheet ID `166WjsM_d0O9PECVbDxpDlYTuArUlMytiD-xLoWVTp3Q` is already pre-filled
   - Click **Deploy → New Deployment**
     - Type: **Web app**
     - Execute as: **Me**
     - Who has access: **Anyone**
   - Copy the **Web App URL**

3. **Wire it into the page**
   - In `index.html`, find the line:
     ```js
     const SHEET_ENDPOINT = 'REPLACE_WITH_YOUR_APPS_SCRIPT_URL';
     ```
   - Replace the placeholder with your Web App URL
   - Commit and push — GitHub Pages will redeploy automatically

### What gets logged

| Column | Description |
|--------|-------------|
| Timestamp | ISO timestamp of the visit |
| Name | Visitor's self-entered name |
| Page | Page title |
| Referrer | Where they came from (or "direct") |
| Date (Local) | Human-readable US Central time |

---

*Confidential — Internal Use Only · © 2026 Abbott Laboratories*
