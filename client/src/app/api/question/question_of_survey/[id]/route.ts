import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import { Context } from "vm";
export async function GET(req: NextApiRequest, res: NextApiResponse, context: Context) {
  if (req.method === "GET") {
    // const { survey_id } = req.query;
    const { id } = context
    console.log("RRREEEAAGHA QUUQUQERY",id);
    console.log("helloii======");

    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/question/question_of_survey/${id}`
    );
    res.status(200).json({ resp });

  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
