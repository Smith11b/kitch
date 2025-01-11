import { NextResponse } from "next/server";
import emailService from "@/app/api/service/emailService";

export async function POST(request: Request) {
    const { email } = await request.json();
    return emailService.subscribe(email);
}

export function OPTIONS() {
    return NextResponse.json({}, { status: 200, headers: { Allow: "POST" } });
}
