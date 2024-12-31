import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import CustomColorPicker from "./ColorPicker"
import { IColor } from "react-color-palette";

type ColorPickerInputProps = {
    name: string;
    color: IColor;
    setColor: (color: IColor) => void;

}

export default function ColorPickerInput({ color, setColor, name }: ColorPickerInputProps) {

    return (
        <div className="relative w-[90%]">
            <Popover>
                <PopoverTrigger>
                    <div className="absolute inset-y-0 left-0 flex items-center">
                        <div className={`w-14 h-full rounded-sm border`} style={{ backgroundColor: color.hex }}></div>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="ml-4">
                    <CustomColorPicker color={color} setColor={setColor} />
                </PopoverContent>
            </Popover>
            <input name={name} title="color-picker" type="text" value={color.hex} onChange={(e) => setColor({ ...color, hex: e.target.value })} className="border-solid border-2 rounded-md p-[13px] pl-16 w-full text-lg focus:outline-none" />
        </div>
    )
}
