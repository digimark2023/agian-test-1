import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(request: NextRequest) {
  const { email, name, message, messageType, communicationOption, phone } =
    await request.json();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: process.env.MY_EMAIL,
    subject: `New ${messageType} Message from ${name} (${email})`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px; background-color: #f4f4f4; text-align: center; color: #555;">
        <div style="max-width: 600px; margin: 20px auto; border-radius: 6px; background: #ffffff; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        <div style="padding: 20px; border-bottom: 2px solid #eeeeee; background-color: #7A77B9;"> <!-- Blue background color added -->
        <h2 style="color: #ffffff;">New Message Alert!</h2> <!-- Text color changed to white for contrast -->
      </div>
          <div style="padding: 20px; text-align: left; background-color: #ffffff;">
            <p style="color: #333; font-size: 18px; margin-top: 0;"><strong>Name:</strong> ${name}</p>
            <p style="color: #333; font-size: 18px;"><strong>Email:</strong> ${email}</p>
            <p style="color: #333; font-size: 18px;"><strong>Phone:</strong> ${phone}</p>
            <p style="color: #333; font-size: 18px;"><strong>Preferred Communication:</strong> ${communicationOption}</p>
            <p style="color: #333; font-size: 18px;"><strong>Message Category:</strong> ${messageType}</p>
            <p style="color: #333; font-size: 18px;"><strong>Message:</strong></p>
            <div style="background-color: #f8f8f8; padding: 15px; border-radius: 4px; line-height: 1.6; word-break: break-word; font-size: 20px;"> <!-- Increased font-size -->
              ${message.split("\n").join("<br>")}
            </div>
          </div>
          <footer style="padding: 20px; background-color: #7A77B9; color: #ffffff; border-radius: 0 0 6px 6px;">
            <p>Sent via BusinessVault</p>
          </footer>
        </div>
      </div>
    `,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: "Email sent" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
