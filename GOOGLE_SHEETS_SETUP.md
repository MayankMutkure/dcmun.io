# Connect DCMUN Registrations To Google Sheets

1. Create a new Google Sheet.
2. In the Sheet, go to Extensions > Apps Script.
3. Replace the starter code with the code from `google-apps-script.js`.
4. In the function dropdown, choose `setupSheet` and click Run once.
5. Approve the permissions when Google asks.
6. Optional: choose `testRegistration` and click Run to add one sample row.
7. Click Deploy > New deployment.
8. Choose Web app.
9. Set "Execute as" to yourself.
10. Set "Who has access" to anyone.
11. Deploy and copy the Web app URL.
12. Open `script.js` and replace:

```js
PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE
```

with your Web app URL.

After this, every website registration will be added to the `Registrations` tab in your Google Sheet.

Do not click Run on `doPost` inside Apps Script. `doPost` is only used when the website submits the form to the deployed Web app URL.
