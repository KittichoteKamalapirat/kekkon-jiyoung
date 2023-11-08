import { google } from "googleapis";
import React from "react";
import MyText from "../../components/MyText";

export async function getData(): Promise<Row[]> {
  // Auth
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // Query
  const range = "dev";

  // Perform the read operation
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: range,
  });

  //Assuming that you have data in the sheet and no error during API call, printed data will be 2-d array with row wise data.
  console.log(response.data.values);

  const rows = response.data.values?.map(
    ([firstName, lastName, participantsNum, submitDate], index) => ({
      firstName,
      lastName,
      participantsNum,
      submitDate,
    })
  ) as Row[];

  return rows;
  //   return response.data.values;
}

interface Row {
  firstName: string;
  lastName: string;
}

interface Props {}
export default async function Page() {
  const rows = await getData();
  return (
    <div>
      <div className="grid grid-cols-4">
        <MyText>First Name</MyText>
        <MyText>Last Name</MyText>
        <MyText>Participants No.</MyText>
        <MyText>Submit Date</MyText>
      </div>
      <div className="grid grid-cols-4">
        {rows.map(({ firstName, lastName }, index) => (
          <article key={`row-${index}`}>
            <h1>{firstName}</h1>
            <h1>{lastName}</h1>
          </article>
        ))}
      </div>
    </div>
  );
}
