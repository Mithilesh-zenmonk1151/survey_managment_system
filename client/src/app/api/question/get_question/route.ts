import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageLimit = searchParams.get("pageLimit");
    const pageNumber = searchParams.get("pageNumber");
    console.log("PAgeedf#############",pageLimit);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/question`, 
      {
        params: {
          pageLimit,
          pageNumber,
        },
      }
    );

    console.log("getting question types", res.data);
    if (!res) {
      return NextResponse.json({ message: "Getting question failed" }, { status: 500 });
    }
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.log("error occurred during getting question type");
    return NextResponse.json({ message: "Error occurred", error: error.message }, { status: 500 });
  }
}
