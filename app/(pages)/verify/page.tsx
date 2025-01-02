
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MailCheck } from 'lucide-react';


export default function VerifyPage() {

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10 text-secondary-blue">
            <Card className="w-full max-w-sm md:max-w-3xl">
                <CardHeader>
                    <CardTitle className='text-secondary-blue'>Please Confirm your email address</CardTitle>
                    <CardDescription className='text-secondary-blue'>Take as second to make sure we have the correct email for you. </CardDescription>
                    <CardContent className='flex items-center justify-center pt-10 text-secondary-blue'><MailCheck size={64} /></CardContent>
                </CardHeader>
            </Card>
        </div>
    );
}
