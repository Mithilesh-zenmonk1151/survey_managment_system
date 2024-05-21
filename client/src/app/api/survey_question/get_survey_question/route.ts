import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  try {
    console.log("helloii======");
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/survey_type`
    );
    console.log("getting Survey types", res.data);
    if (!res) {
      alert("getting question  failed");
      return;
    }
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.log(error);
    console.log("error occurred during getting question type");
  }
}










