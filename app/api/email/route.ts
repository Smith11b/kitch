import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { email } = await req.json();

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
            throw new Error('Failed to create contact');
        }

        const data = await response.json();
        return NextResponse.json({ message: 'Contact created successfully', data }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
