'use client';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Incrementer from "@/components/ui/incrementer";

interface PreviewCardProps {
  companyData: {
    name: string
    primaryColor: string
    secondaryColor: string
    logo: File | null
  }
}

export function PreviewCard({ companyData }: PreviewCardProps) {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span style={{ color: companyData.primaryColor }}>{companyData.name || 'Company Name'}</span>
            {companyData.logo && (
              <img
                src={URL.createObjectURL(companyData.logo)}
                alt="Company Logo"
                className="w-12 h-12 object-contain"
              />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
            <img src="/images/meap-prep.jpg" alt="Meal Prep" className="w-full h-48 object-cover mb-4" />
          <p className="text-lg font-semibold mb-2">Chicken Salad</p>
          <p>Delicious and nutricious chicken setLogoUploaded prepared just for you!</p>
          <ul className="list-disc pl-5 my-4">
            <li>Chicken</li>
            <li>Lettuce</li>
            <li>Tomatoes</li>
            <li>Cucumbers</li>
            <li>Olive Oil</li>
            <li>Salt</li>
            <li>Pepper</li>
          </ul>
          <p className="font-semibold mt-2 w-full text-right text-lg ">$12.99</p>

        </CardContent>
        <CardFooter className="flex items-center gap-4">
            <Incrementer />
          <Button className="w-full" style={{ backgroundColor: companyData.primaryColor, color: companyData.secondaryColor }}>
            Order Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
