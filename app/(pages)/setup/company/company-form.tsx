'use client';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import UrlInput from "@/components/ui/urlInput";
import { useToast } from "@/hooks/use-toast";
import { getColorsFromWebsite } from "@/app/service/colorService/colors";

interface CompanyFormProps {
  companyData: {
    name: string
    address: string
    website: string
    primaryColor: string
    secondaryColor: string
  }
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onLogoUpload: (file: File | null) => void
}

export function CompanyForm({ companyData, onInputChange, onLogoUpload }: CompanyFormProps) {
    const {toast} = useToast();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    onLogoUpload(file)
  }

  const handleOnBlur = async(e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
     return
    }

    const urlPattern = new RegExp(/\b(https?:\/\/|www\.)[\w\-]+(\.[\w\-]+)+(:\d+)?(\/[\w\-.,@?^=%&:/~+#]*)?\b/)
      console.log(urlPattern.test(e.target.value))
      
    if (!urlPattern.test(e.target.value)) {

        toast({
            title: 'Error',
            description: 'Please enter a valid URL',
            duration: 5000,
        });
        return
    }
    const colors = await getColorsFromWebsite(e.target.value)
    if (colors) {
      const {primaryColor, secondaryColor} = colors
      onInputChange({target: {name: 'primaryColor', value: primaryColor}} as React.ChangeEvent<HTMLInputElement>)
      onInputChange({target: {name: 'secondaryColor', value: secondaryColor}} as React.ChangeEvent<HTMLInputElement>)
    }
}




  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="name">Company Name</Label>
        <Input
        aria-label="Company Name"
          id="name"
          name="name"
          value={companyData.name}
          onChange={onInputChange}
          placeholder="Enter company name"
        />
      </div>
      <div>
        <Label htmlFor="address">Company Address</Label>
        <Input
          id="address"
          name="address"
          value={companyData.address}
          onChange={onInputChange}
          placeholder="Enter company address"
        />
      </div>
      <div>
        <UrlInput
        id="company-website"
        name="website"
        placeholder="Enter company website"
        value={companyData.website}
        onBlur={handleOnBlur}
        onChange={onInputChange}
         />
      </div>
      <div>
        <Label htmlFor="logo">Company Logo</Label>
        <Input
          id="logo"
          name="logo"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
      <div>
        <Label htmlFor="primaryColor">Primary Brand Color</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="primaryColor"
            name="primaryColor"
            type="color"
            value={companyData.primaryColor}
            onChange={onInputChange}
            className="w-12 h-12 p-1"
          />
          <Input
            type="text"
            value={companyData.primaryColor}
            onChange={onInputChange}
            name="primaryColor"
            className="flex-grow"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="secondaryColor">Secondary Brand Color</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="secondaryColor"
            name="secondaryColor"
            type="color"
            value={companyData.secondaryColor}
            onChange={onInputChange}
            className="w-12 h-12 p-1"
          />
          <Input
            type="text"
            value={companyData.secondaryColor}
            onChange={onInputChange}
            name="secondaryColor"
            className="flex-grow"
          />
        </div>
      </div>
      <Button type="submit" className="w-full">Continue</Button>
    </form>
  )
}
