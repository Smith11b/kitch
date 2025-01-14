import nodemailer from 'nodemailer';

export const nodeMailerClient = nodemailer.createTransport({
    host: 'smtp-relay.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASS,
    },
});
