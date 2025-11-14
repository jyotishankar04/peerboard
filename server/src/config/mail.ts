import nodemailer from 'nodemailer';
import _env from '.';

const transporter = nodemailer.createTransport({
    host: _env.MAIL_HOST,
    port: parseInt(_env.MAIL_PORT || "1025"),
    secure: false,      // MailHog does not use SSL
    auth: undefined,    // no auth required
});

const sendMail = async (mailOptions: { to: string | string[]; subject: string; html: string; }) => {
    try {
        const to = Array.isArray(mailOptions.to) ? mailOptions.to : [mailOptions.to];
        const res = await transporter.sendMail({
            from: "patrajyotishankar@gmail.com",
            to,
            subject: mailOptions.subject,
            html: mailOptions.html,
        });
        return res;
    } catch (error) {
        console.error("Mail send error:", error);
        throw error;
    }
};

export default transporter;
export { sendMail };