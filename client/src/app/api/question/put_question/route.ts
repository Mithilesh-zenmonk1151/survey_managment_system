import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
    try {
        const data = await request.json();
        console.log("Request Data:", data);

        const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/question`;
        const res = await axios.put(apiUrl, data);
        console.log("Response:", res.data);

        if (!res.data) {
            return NextResponse.json({ error: "Empty response from server" }, { status: 500 });
        }

        return NextResponse.json(res.data);
    } catch (error: any) {
        console.error("Error:", error);

        const errorMessage = error.response?.data.message || "An error occurred";
        return NextResponse.json({ error: errorMessage }, { status: error.response?.status || 500 });
    }
}
