'use client';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EmailInput } from "./ui/emaiInput";
import { PasswordInput } from "./ui/passwordInput";
import { handleGoogleLogin, handleLogin } from '@/repository/auth/signupLogin';
import Link from "next/link";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!email || !password) {
            toast({
                title: 'Error',
                description: 'Please enter your email and password',
                duration: 5000,
            });
            return;
        }

        if (!validateEmail(email)) {
            toast({
                title: 'Error',
                description: 'Please enter a valid email address',
                duration: 5000,
            });
            return;
        }

        if (password.length < 6) {
            toast({
                title: 'Error',
                description: "Password must be at least 6 characters",
                duration: 5000,
            });
            return;
        }

        await handleLogin(email, password, router, toast);
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" onSubmit={(event) => handleSubmit(event)}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Welcome back</h1>
                                <p className="text-balance text-muted-foreground">
                                    Login to your Kitch account
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <EmailInput
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={onEmailChange}
                                />
                            </div>
                            <div className="grid">
                                <div className="flex items-center">
                                </div>
                                <PasswordInput id="password" placeholder="******" value={password} onChange={onPasswordChange} />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                    Or
                                </span>

                            </div>
                            <div className="grid gap-4">
                                <Button variant="outline" type="submit" className="w-full" onClick={handleGoogleLogin}>
                                    <Image src="/images/googlelogo.png" alt="Google Logo" width={35} height={20} />
                                    Continue with Google
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link href="/signup" className="underline underline-offset-4">
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="/images/kitch-meal-prep.png"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}
