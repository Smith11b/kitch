// Dependencies: pnpm install lucide-react
import * as React from "react"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

const EmailInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ ...props }, ref) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-10">Email</Label>
      <div className="relative">
        <Input id="input-10" className="peer pe-9" placeholder="Email" type="email"  ref={ref}
        {...props} />
        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Mail size={16} strokeWidth={2} aria-hidden="true" />
        </div>
      </div>
    </div>
   )
   EmailInput.displayName = "PasswordInput"
}
)

export { EmailInput }
