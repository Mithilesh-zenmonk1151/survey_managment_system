import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  console.log("helloii");
  try {
    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const survey_id = searchParams.get('survey_id');

    console.log("Survey ID:", survey_id);

    // Make sure the survey_id is included in the query parameters of the request
    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/question/question_of_survey`, {
      params: { survey_id }
    });

    console.log(res);
    if (!res) {
      console.error("Failed to get data from API");
      return NextResponse.json({ error: "Failed to get data from API" }, { status: 500 });
    }

    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
