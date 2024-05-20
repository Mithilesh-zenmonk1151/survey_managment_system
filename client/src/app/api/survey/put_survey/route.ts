import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
    try {
        const data = await request.json();
        console.log(data);
        const res = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/survey/publish`, data);
        console.log(res);

        if (!res) {
            return NextResponse.json({ error: "Updating survey failed" }, { status: 500 });
        }

        return NextResponse.json(res.data);
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message || "An error occurred" }, { status: 500 });
    }
}
