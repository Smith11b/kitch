"use client";
import { useState } from "react";
import { CompanyForm } from "./company-form";
import { PreviewCard } from "./preview-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CompanyPage() {
    const [companyData, setCompanyData] = useState({
        name: '',
        address: '',
        website: '',
        logo: null as File | null,
        primaryColor: '#0E2D3E',
        secondaryColor: '#ffffff'
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCompanyData(prev => ({ ...prev, [name]: value }))
    }

    const handleLogoUpload = (file: File | null) => {
        setCompanyData(prev => ({ ...prev, logo: file }))
    }

    return (
        <div className="container mx-auto bg-gray-100 ">
            <div className=" rounded-xl flex flex-col lg:flex-row gap-8 lg:border-r-2">
                <Card className="lg:h-screen pt-8">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold">
                            Company Info
                        </CardTitle>
                        <p className="text-gray-600">We&apos;ll start by filling in your company details to get to know you a little better. </p>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full">
                            <CompanyForm
                                companyData={companyData}
                                onInputChange={handleInputChange}
                                onLogoUpload={handleLogoUpload}
                            />
                        </div>
                    </CardContent>
                </Card>
                <div className="w-full flex justify-center">
                    <PreviewCard companyData={companyData} />
                </div>
            </div>
        </div>

    )
}
