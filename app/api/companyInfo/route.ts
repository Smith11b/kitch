import { NextResponse } from "next/server";
import companyService from "../service/companyService";

export async function POST(request: Request) {
    const { name, address, website, primaryColor, secondaryColor } = await request.json();
    return NextResponse.json(companyService.saveCompanyInfo(name, address, website, primaryColor, secondaryColor,));
}

export function OPTIONS() {
    return NextResponse.json({}, { status: 200, headers: { Allow: "POST" } });
}
