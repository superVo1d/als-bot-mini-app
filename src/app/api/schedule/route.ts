import { NextResponse } from "next/server";
import { Auth, google } from "googleapis";
import { auth, Impersonated } from "google-auth-library";
import path from "path";
import fs from "fs";
import { JSONClient } from "google-auth-library/build/src/auth/googleauth";

const credentialsPath = path.join(process.cwd(), "/credentials.json");
const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));

const client = auth.fromJSON(credentials) as Exclude<
  Impersonated,
  Auth.GoogleAuth<JSONClient>
>;

// @ts-expect-error
client.scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

const sheets = google.sheets({ version: "v4", auth: client });

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const RANGE = "Лист1!A:E";

let cache: {
  data: IScheduleData | null;
  lastFetch: number;
} = { data: null, lastFetch: 0 };

export interface IScheduleItem {
  name: string;
  date: string;
  time: string;
}

export type IScheduleData = IScheduleItem[];

export async function GET() {
  const currentTime = Date.now();

  // Check if cached data exists and is less than 5 minutes old
  if (cache.data && currentTime - cache.lastFetch < 300000) {
    return NextResponse.json(cache.data);
  }

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return NextResponse.json({ message: "No data found." });
    }

    const data = rows.slice(1).map((row) => ({
      name: row[1],
      date: row[2],
      time: row[3],
    }));

    cache = { data, lastFetch: Date.now() };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Google Sheets" },
      { status: 500 }
    );
  }
}
