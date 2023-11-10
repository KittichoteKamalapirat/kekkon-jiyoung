"use server";
import dayjs from "dayjs";
import { google } from "googleapis";
import { RsvpFormValues } from "./app/components/RsvpEditor";

export type SubmitErrorCode = "already_submitted" | "unknown_error";
type SubmitSuccessResponse = {
  success: true;
};

type SubmitErrorResponse = {
  success: false;
  errorCode: SubmitErrorCode;
};

export type SubmitResponse = SubmitSuccessResponse | SubmitErrorResponse;
export async function postToGoogleSheets(
  data: RsvpFormValues
): Promise<SubmitResponse> {
  "use server";
  try {
    // Auth
    const auth = await google.auth.getClient({
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets", // for write
      ],
      projectId: process.env.GOOGLE_PROJECT_ID,
      credentials: {
        private_key: JSON.parse(process.env.GOOGLE_PRIVATE_KEY as string),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
    });

    console.log("process.env.GOOGLE_PROJECT_ID", process.env.GOOGLE_PROJECT_ID);
    console.log(
      "process.env.GOOGLE_PRIVATE_KEY",
      process.env.GOOGLE_PRIVATE_KEY
    );
    console.log(
      "parse process.env.GOOGLE_PRIVATE_KEY",
      JSON.parse(process.env.GOOGLE_PRIVATE_KEY as string)
    );
    console.log(
      "process.env.GOOGLE_CLIENT_EMAIL",
      process.env.GOOGLE_CLIENT_EMAIL
    );

    const sheets = google.sheets({ version: "v4", auth });

    const range = `dev`;

    const { firstName, lastName, joinCeremony, needPickup } = data;

    // const header = [
    //   "firstName",
    //   "lastName",
    //   "ceremony",
    //   "pickup",
    //   "submiteDate",
    // ];
    // Get existing data
    const existingDataResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: range,
    });

    // Check if firstName and lastName already exist in existing data
    const existingData = existingDataResponse.data.values || [];
    const doesExist = existingData.some(
      ([
        existingFirstName,
        existingLastName,
        existingCeremony,
        existingPickup,
      ]) =>
        existingFirstName === firstName &&
        existingLastName === lastName &&
        existingCeremony === joinCeremony &&
        existingPickup === needPickup
    );

    // If firstName and lastName exist, return without appending new data
    if (doesExist) {
      return { success: false, errorCode: "already_submitted" };
    }

    const date = dayjs().format("DD/MMM/YYYY");

    const rowData = [
      [firstName, lastName, joinCeremony, needPickup, `"${date}"`],
    ]; // replace with your actual row data

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

    await sheets.spreadsheets.values.append(request);

    return { success: true };
  } catch (error) {
    console.error("error in server action", error);

    return { success: false, errorCode: "unknown_error" };
  }
}
export async function getFromGoogleSheets(data: RsvpFormValues) {
  try {
    // Auth
    const auth = await google.auth.getClient({
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets", // for write
      ],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Query

    const range = process.env.NODE_ENV === "production" ? "prod" : "dev";

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
