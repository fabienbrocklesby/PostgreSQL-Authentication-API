import postmark from 'postmark';

const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

// eslint-disable-next-line import/prefer-default-export
export const sendEmail = async (email, subject, body) => {
  client.sendEmail({
    From: process.env.POSTMARK_FROM_EMAIL,
    To: email,
    Subject: subject,
    TextBody: body,
  });
};
