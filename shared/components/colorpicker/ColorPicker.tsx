'use client';
import { Saturation, Hue, IColor } from "react-color-palette";
import "react-color-palette/css";

type CustomColorPickerProps = {
    color: IColor;
    setColor: (color: IColor) => void;
}

export default function CustomColorPicker({ color, setColor }: CustomColorPickerProps) {
    return   (<div className="custom-layout">
    <Saturation height={100} color={color} onChange={setColor} />
    <Hue color={color} onChange={setColor} />
  </div>)

}
