'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function GoogleCallbackPage() {
    const router = useRouter();

    useEffect(() => {
        async function handleAuthCallback() {
            const { data, error } = await supabase.auth.getSession();

            if (error || !data.session) {
                console.error('Callback error or no session:', error);
                router.replace('/login');
                return;
            }

            const { access_token, refresh_token } = data.session;

            await fetch('/api/setSession', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    access_token,
                    refresh_token,
                }),
            });

            router.push('/dashboard');
        }
        handleAuthCallback();
    }, [router]);

    return <p>Finishing Google login...</p>;
}
