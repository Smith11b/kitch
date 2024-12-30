import { supabase } from "@/shared/supabaseClient";
import { User } from "@supabase/supabase-js";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";

export async function handleSignupSetup(user: User | null, email:string, password:string, name:string, company:string, router: AppRouterInstance) {
   try {
    await fetch('/api/setupProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId: user?.id, name, email, company }),
    });

    router.push('/verify')

   } catch (error:any) {
       console.error('Signup error:', error.message);
   }
}


export async function handleLogin(email: string, password: string, router: AppRouterInstance, setError: Dispatch<SetStateAction<string>>, setHasError: Dispatch<SetStateAction<boolean>>) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setError('Enter a valid email address');
        setHasError(true);
        setTimeout(() => {
            setHasError(false);
        }, 2000);
        return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        setError(error.message);
        setHasError(true);
        setTimeout(() => {
            setHasError(false);
        }, 2000);
        return;
    }

    try {
    if (data && data.session) {
        const { access_token, refresh_token } = data.session;
        await fetch('/api/setSession', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ access_token, refresh_token }),
        });

        router.push('/dashboard');
    }
} catch (error: any) {
    setError(error.message);
    setHasError(true);
    setTimeout(() => {
        setHasError(false);
    }, 2000);
    return;
}
}


export async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL,
        },
    });

    if (error) {
        console.error('Google sign-in error:', error.message);
        return;
    }
}
