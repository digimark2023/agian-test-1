"use server";
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Received request to send email", req.body); // Log incoming request data

  if (req.method !== "POST") {
    console.log("Method not allowed. Only POST requests are accepted."); // Log wrong method usage
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  console.log(
    `Attempting to send email from ${email} to ${process.env.EMAIL_USER}`
  ); // Log email send attempt

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Send to your own email
    subject: `New message from ${name}`,
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully", result); // Log successful email sending
    res.status(200).json({ success: true, result });
  } catch (error) {
    // Properly type-check the error object
    if (error instanceof Error) {
      console.error("Failed to send email due to an error:", error.message); // Log detailed error message
      res.status(500).json({ success: false, error: error.message });
    } else {
      // If the error is not an instance of Error, handle it generically
      console.error("An unexpected error occurred while sending an email"); // Log unexpected error
      res
        .status(500)
        .json({ success: false, error: "An unexpected error occurred" });
    }
  }
}
