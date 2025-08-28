import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { JWT } from 'google-auth-library';

async function getAccessToken() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL!;
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  const jwt = new JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  console.log('Email:', process.env.GOOGLE_CLIENT_EMAIL);
  console.log('Key starts with:', (process.env.GOOGLE_PRIVATE_KEY || '').slice(0, 30));

  const { access_token } = await jwt.authorize() as { access_token: string };
  return access_token!;
}

async function getValues(range: string) {
  const sheetId = process.env.SHEET_ID!;
  const token = await getAccessToken();
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}?majorDimension=ROWS`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Sheets API error ${res.status}`);
  const data = await res.json() as { values?: string[][] };
  return data.values ?? [];
}


test('Job tracker headers and rows are valid', async () => {
  const rows = await getValues(process.env.RANGE || 'Sheet1!A1:Z1000');
  expect(rows.length).toBeGreaterThan(1);

  const headers = rows[0]; // first row is header row
  console.log('Headers found:', headers);

  // pick only the columns you care about
  const required = ['Company', 'Position', 'Date Applied', 'Status'];

  // assert they exist
  for (const h of required) {
    expect(headers).toContain(h);
  }

  // helper to find column index by header name
  const colIndex = (name: string) => headers.indexOf(name);

  const companyIdx = colIndex('Company');
  const positionIdx = colIndex('Position');
  const dateIdx = colIndex('Date Applied');
  const statusIdx = colIndex('Status');

  // validate data rows
  const dateRe = /^\d{4}-\d{2}-\d{2}$/;
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r] || [];
    if (!row.length) continue; // skip empty lines

    expect((row[companyIdx] || '').trim()).not.toBe('');
    expect((row[positionIdx] || '').trim()).not.toBe('');
    expect((row[dateIdx] || '').trim()).toMatch(dateRe);
    expect((row[statusIdx] || '').trim()).toMatch(/^(Applied|Interviewing|Offer|Rejected|Ghosted)$/);
  }
});

