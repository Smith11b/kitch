import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type UrlInputProps = {
    id: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    };

export default function UrlInput({ id, name, placeholder, value, onChange, onBlur }: UrlInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Website</Label>
      <div className="relative">
        <Input id={id} name={name} className="peer ps-20 focus:outline-none" placeholder={placeholder} type="text" value={value} onChange={onChange} onBlur={onBlur} />
        <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3  pr-2 text-sm text-muted-foreground peer-disabled:opacity-50 border-r-2">
          https://
        </span>
      </div>
    </div>
  );
}
