"use server";
import dayjs from "dayjs";
import { google } from "googleapis";
import { RsvpFormValues } from "./app/components/RsvpEditorUnion";

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
        private_key: JSON.parse(process.env.GOOGLE_PRIVATE_KEY as string), // need "" inside '
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
    });

    const sheets = google.sheets({ version: "v4", auth });

    const range =
      process.env.VERCEL_ENV === "production"
        ? "production"
        : process.env.VERCEL_ENV
        ? "development"
        : "localhost";

    const { firstName, lastName, joinCeremony } = data;

    const attendantNum =
      data.joinCeremony === "yes" && data.attendantNum ? data.attendantNum : 0;
    const attendants = (data.joinCeremony === "yes" && data.attendants) || [];
    const needPickup = (data.joinCeremony === "yes" && data.needPickup) || "";
    const relationship =
      (data.joinCeremony === "yes" && data.relationship) || "";
    const pickupSpot =
      (data.joinCeremony === "yes" &&
        data.needPickup === "yes" &&
        data.pickupSpot) ||
      "";
    const email = data.joinCeremony === "yes" && data.email;

    // const header = [
    //   "firstName",
    //   "lastName",
    //   "relationship",

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
    // prevent same answer submission
    const doesExist = existingData.some(
      ([
        existingFirstName,
        existingLastName,
        existingJoinCeremony,
        existingRelationship,
        _existingAttendantNum,
        _existingAttendants,
        _existingNeedPickup,
        _existingPickupSpot,
        _existingDate,
      ]) =>
        existingFirstName === firstName && // should not change
        existingLastName === lastName && // should not change
        existingJoinCeremony === joinCeremony && // should not change unless want to change
        existingRelationship === relationship // should not change
      // existingNeedPickup === needPickup
    );

    // If firstName and lastName exist, return without appending new data
    if (doesExist) {
      return { success: false, errorCode: "already_submitted" };
    }

    const date = dayjs().format("DD/MMM/YYYY");

    const rowData = [
      [
        firstName,
        lastName,
        joinCeremony,
        relationship,
        attendantNum,
        attendants.map(
          (attendant, index) =>
            `${index + 1}) ${attendant.firstName} ${attendant.lastName}`
        ).join(`
`),
        needPickup,
        pickupSpot,
        email,
        `"${date}"`,
      ],
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

    console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    const range =
      process.env.VERCEL_ENV === "production"
        ? "prod"
        : process.env.VERCEL_ENV
        ? "dev"
        : "localhost";

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
