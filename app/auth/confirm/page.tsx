'use client';

import { supabase } from "@/shared/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import styles from "./confirm.module.css";

export default function ConfirmPage() {
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

    return (
        <div className={styles.confirmContainer}>
        <div className={styles.confirmCard}>
            <Image src= "/images/logo pink.png" alt="logo" width={100} height={80} />
        <h1>Confirming email</h1>

        </div>
    </div>
    );
}
