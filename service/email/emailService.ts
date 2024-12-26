import { supabaseServer } from "@/shared/supabaseClient";
import { nodeMailerClient } from "@/shared/nodeMailerClient";

async function checkUserExists(email: string) : Promise<boolean> {
const { data, error } = await supabaseServer.from('profiles').select().eq('username', email);
if (error) {
    throw new Error(`Error fetching users: ${error.message}`);
}
return data.some((user: any) => user.username === email);
}

export async function signInWithCustomEmail(email: string) {
    try {
        const userExists = await checkUserExists(email);
        if (!userExists) {
            throw new Error('User does not exist');
        }
        const { data, error} = await supabaseServer.auth.admin.generateLink({
            type: 'magiclink',
            email,
        })
        if(error) {
            throw new Error(`Error generating magic link: ${error.message}`);
        }
        await sendOtpEmail(email, data.properties.action_link);

    } catch (error: any) {
        throw new Error(`Error signing in: ${error.message}`);
    }
}


export async function sendOtpEmail(email: string, link: string) {
    try {
        await nodeMailerClient.sendMail({
            from: "info@gokitch.co",
            to: email,
            subject: 'Kitch Sign in link',
            text: `Click the link to sign in: ${link}`,
        });
    } catch (error:any) {
        throw new Error(`Error sending email: ${error.message}`);
    }

}
