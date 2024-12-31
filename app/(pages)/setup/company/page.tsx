"use client";
import { useState } from "react";
import { useColor } from "react-color-palette";
import ColorPickerInput from "@/shared/components/colorpicker/ColorPickerInput";
import Button from "@/shared/components/button/Button";
import { lightenColor } from "@/utils/colorUtils/colorUtils";
import Image from "next/image";

export default function CompanyPage() {
    const [color, setColor] = useColor("#000");
    const [secondaryColor, setSecondaryColor] = useColor("#000");
    const [logo, setLogo] = useState<File | null>(null);
    const [logoUploaded, setLogoUploaded] = useState(false);

    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          setLogo(file);
          setLogoUploaded(true);
        }
      };

    return (
        <div className="flex text-secondary-blue w-full h-screen">
            <div className="w-2/5 py-8 px-8 border-solid border flex flex-col gap-8">
                <h1 className="text-3xl">Company Info</h1>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col max-w-[450px]">
                        <label className="text-lg">Company Name</label>
                        <input name="company_name" type="text" placeholder="Company Name" className="border-solid border-2 rounded-md p-[13px] w-[90%] text-lg focus:outline-none" />
                    </div>
                    <div className="flex flex-col max-w-[450px]">
                        <label className="text-lg">Company Phone</label>
                        <input name="company_phone" type="phone" placeholder="(555)-555-1234" className="border-solid border-2 rounded-md p-[13px] w-[90%] text-lg focus:outline-none" />
                    </div>
                    <div className="flex flex-col max-w-[450px]">
                        <label className="text-lg">Company Address</label>
                        <input name="company_street" type="text" placeholder="123 Main St" className="border-solid border-2 rounded-md p-[13px] w-[90%] text-lg focus:outline-none mb-4" />
                        <div className="flex gap-4 w-[90%]">
                            <input name="company_state" type="text" placeholder="IA" className="border-solid border-2 rounded-md p-[13px] w-16 text-lg focus:outline-none" />
                            <input name="company_zip" type="text" placeholder="50210" className="border-solid border-2 rounded-md p-[13px] w-[80%] text-lg focus:outline-none" />
                        </div>
                    </div>
                    <div className="flex flex-col max-w-[450px]">
                        <label className="text-lg">Website (Optional)</label>
                        <input name="company_website" type="url" placeholder="https://mywebsite.com" className="border-solid border-2 rounded-md p-[13px] w-[90%] text-lg focus:outline-none" />
                    </div>
                    <div className="flex flex-col items-center justify-center w-full max-w-[450px]">
                        {logoUploaded ? (
          <div className="relative">
            <Image src={URL.createObjectURL(logo!)} alt="Company Logo" className="w-full h-64 object-contain" />
          </div>
        ) : (
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleLogoUpload} />
          </label>
        )}
                    </div>
                    <div className="flex flex-col w-full max-w-[450px]">
                        <label className="text-lg">Primary Color</label>
                     <ColorPickerInput name="primaty_color" color={color} setColor={setColor} />
                    </div>
                    <div className="flex flex-col w-full max-w-[450px]">
                        <label className="text-lg">Secondary Color</label>
                     <ColorPickerInput name="secondary_color" color={secondaryColor} setColor={setSecondaryColor} />
                    </div>
                </form>
                <div className="flex justify-start w-full max-w-[450px]">
                    <Button onClick={()=>{}}  text="Continue" type="Primary" className="!w-[90%]" style={{backgroundColor: color.hex}} />
                    </div>
            </div>
            <div className="flex flex-col items-center justify-center h-screen w-3/5" style={{ backgroundColor: lightenColor(color.hex, 50) }}>
            <div className="flex flex-col items-center justify-center gap-4 bg-white py-6 rounded-lg shadow-lg w-[80%] max-w-[450px]">
                <h2 className="text-2xl font-bold">Chicken Teriyaki</h2>
                <p className="w-[90%]">Delicous grilled chicken put over a silantro base sauce with peppers, olives, and a delicous gause. </p>
                <Button onClick={()=>{}} text="Order Now" type="Primary" className="!w-[90%]" style={{backgroundColor: color.hex}} />

            </div>
            </div>
        </div>
    )
}
