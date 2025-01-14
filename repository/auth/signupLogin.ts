import { supabase } from "@/config/supabaseClient";
import { User } from "@supabase/supabase-js";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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


export async function handleLogin(email: string, password: string, router: AppRouterInstance, toast: any, ) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        toast({
            title: 'Error',
            description: error.message,
            duration: 5000,
        });
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
    toast({
        title: 'Error',
        description: error.message,
        duration: 5000,
    });
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
