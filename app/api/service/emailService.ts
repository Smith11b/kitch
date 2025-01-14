import { NextResponse } from "next/server";

 const emailService = {
    subscribe: async (email: string) => {
        if (!email) {
          return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        try {
          const emailToken = process.env.EMAIL_OCT_API_KEY;

          const response = await fetch(process.env.EMAIL_OCT_API_URL_CREATE, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${emailToken}`,
            },
            body: JSON.stringify({ email_address: email, status: 'subscribed' }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData.error }, { status: response.status });
          }

          const responseData = await response.json();
          return NextResponse.json({ success: true, data: responseData }, { status: 200 });
        } catch {
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
      }
 }

 export default emailService;
