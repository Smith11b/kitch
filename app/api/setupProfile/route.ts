import { createClient } from "@/lib/supabaseServerClient";



export async function POST(request: Request) {
    const supabase  = await createClient();
    const body = await request.json();
    const {userId, name, email, company} = body;

    if (!userId || !name || !email || !company) {
        return new Response('Missing required fields', { status: 400 });
    }

    console.log('updating profile name and email for', userId);
    const { error: updateError } = await supabase.from('profiles').update({
        id: userId,
        full_name: name,
        email: email,
    }).eq('id', userId);

    if (updateError) {
        console.error('Profile update error:', updateError.message);
        return new Response('Error updating profile', { status: 500 });
    }

    console.log ('creating organization');
    const { error: organizationError } = await supabase.from('organizations').insert([{ name: company, owner_id: userId }]);

    if (organizationError) {
        console.error('Organization error:', organizationError.message);
        return new Response('Error creating organization', { status: 500 });
    }

    return new Response('Success', { status: 200 });
}
