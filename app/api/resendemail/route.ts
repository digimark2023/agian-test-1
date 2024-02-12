import { NextResponse } from "next/server";
import { Resend } from "resend";

import WelcomeEmail from "../../../emails/welcome";

const resend = new Resend("re_YEgAbp5q_JTqZB24a6XUCfLiQmiTFpDSm");

export async function POST(request: Request) {
  const { firstName, email } = await request.json();

  try {
    console.log("Attempting to send email...", { firstName, email: email });

    // Ensure the email operation is awaited and capture the result
    const emailResponse = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "mahesh.rba@gmail.com", // Corrected email address typo
      subject: "hello mahesh",
      react: WelcomeEmail({ firstName }),
    });

    // Detailed success log
    console.log("Email sent successfully", {
      requestData: { firstName, email },
      emailResponse: emailResponse, // Log the response from the email service
    });

    return NextResponse.json({
      status: "Ok",
      message: "Email sent successfully",
      emailResponse: emailResponse, // Optionally include some response details in the API response for debugging
    });
  } catch (e: unknown) {
    console.error("Failed to send email", {
      error: e,
      requestData: { firstName, email },
    });

    let errorMessage = "Internal server error.";
    if (e instanceof Error) {
      errorMessage += ` Details: ${e.message}`;
    }

    return NextResponse.json(
      {
        error: errorMessage,
      },
      {
        status: 500,
      }
    );
  }
}
