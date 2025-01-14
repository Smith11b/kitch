
import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
    return (
        <main className="grid min-h-svh lg:grid-cols-2">
            <div aria-label="left-column" className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="flex h-24 w-24 items-center justify-center text-primary-foreground">
                            <img src="/images/kitch.png" alt="Logo" />
                        </div>

                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <SignupForm />
                    </div>
                </div>
            </div>
            <div aria-label="right-column" className="relative hidden bg-muted lg:block">
                <img
                    src="/images/meal-prep.jpg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </main>
    )
}
