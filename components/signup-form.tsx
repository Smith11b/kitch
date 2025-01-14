'use client';
import { useState } from "react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { EmailInput } from "./ui/emaiInput"
import { PasswordInput } from "./ui/passwordInput"
import { Input } from "./ui/input"
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/config/supabaseClient";
import { handleGoogleLogin, handleSignupSetup } from "@/repository/auth/signupLogin";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export function SignupForm({ className, ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const { toast } = useToast();
    const router = useRouter();


    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { name, company, email, password, confirmPassword } = formData;

        if (!name || !company || !email || !password || !confirmPassword) {
            toast({ title: "Error", description: "All fields are required", duration: 5000 });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast({ title: "Error", description: "Invalid email address", duration: 5000 });
            return;
        }

        if (password.length <= 6) {
            toast({ title: "Error", description: "Password must be longer than 6 characters", duration: 5000 });
            return;
        }

        if (password !== confirmPassword) {
            toast({ title: "Error", description: "Passwords do not match", duration: 5000 });
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: process.env.NEXT_PUBLIC_CONFIRMATION_URL
            }
        });

        if (error) {
            toast({ title: "Error", description: error.message, duration: 5000 });
            return
        }
        await handleSignupSetup(data?.user, email, password, name, company, router);

    };

    return (
        <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create an Account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Join us today and streamline your kitchen operations!
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" type="text" placeholder="John Doe" onChange={handleChange} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" type="text" placeholder="Kitch Co" onChange={handleChange} />
                </div>
                <div className="grid gap-2">
                    <EmailInput id="email" type="email" placeholder="m@example.com" onChange={handleChange} />
                </div>
                <div className="grid gap-2">
                    <PasswordInput id="password" type="password" onChange={handleChange} />
                </div>
                <div className="grid gap-2">
                    <PasswordInput id="confirmPassword" type="password" label="Confirm Password" onChange={handleChange} />
                </div>
                <Button type="submit" className="w-full">
                    Login
                </Button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or
                    </span>
                </div>
                <Button variant="outline" type="submit" className="w-full" onClick={handleGoogleLogin}>
                    <Image src="/images/googlelogo.png" alt="Google Logo" width={35} height={20} />
                    Continue with Google
                </Button>
            </div>
            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                    Log in
                </Link>
            </div>
        </form>
    )
}
