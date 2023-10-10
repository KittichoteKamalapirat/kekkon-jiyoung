"use server";
import axios from "axios";
import { google } from "googleapis";
import { RsvpFormValues } from "./app/components/RsvpEditor";

export async function postToAppScriptUnauth(data: RsvpFormValues) {
  try {
    console.log("url", process.env.NEXT_PUBLIC_APP_SCRIPT_URL);
    console.log("data", data);
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);

    const result = await axios.post(
      process.env.NEXT_PUBLIC_APP_SCRIPT_URL as string,
      formData,
      {
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": `multipart/form-data`,
        },
      }
    );
    // console.log("result", result.data);
    return result;
  } catch (error) {
    console.error("error in server action", error);
  }
}

export async function postToGoogleSheets(data: RsvpFormValues) {
  try {
    // Auth
    const auth = await google.auth.getClient({
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets", // for write
      ],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Query

    const range = `dev`;

    const { firstName, lastName } = data;
    const rowData = [[firstName, lastName, "phone"]]; // replace with your actual row data

    const request = {
      spreadsheetId: process.env.GOOGLE_SHEET_ID, // replace with your Spreadsheet ID
      range: range,
      valueInputOption: "USER_ENTERED", // or "RAW", see link below
      insertDataOption: "INSERT_ROWS", // see link below
      resource: {
        values: rowData,
      },
      auth: auth,
    };

    const response = await sheets.spreadsheets.values.append(request);
    // console.log("result", result.data);
    return response;
  } catch (error) {
    console.error("error in server action", error);
  }
}
