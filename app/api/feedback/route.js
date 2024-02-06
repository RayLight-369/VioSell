import { insertData } from "@/app/Supabase/Supabase";
import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com', // Your Gmail address
    pass: 'your_password' // Your Gmail password
  }
});

// Define email options
let mailOptions = {
  from: 'webmaster@example.com', // Sender address
  to: 'somebody@example.com', // List of recipients
  cc: 'somebodyelse@example.com', // List of CC recipients
  subject: 'My subject', // Subject line
  text: 'Hello world!' // Plain text body
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
});
export const POST = async (req) => {

  const body = await req.json();

  await insertData({
    table: "feedbacks",
    object: body
  });

  try {

    return new Response(JSON.stringify(body.data), { status: 200 });

  } catch (err) {

    console.log(err);
    return new Response("Failed to post Feedback", { status: 500 });

  }
};