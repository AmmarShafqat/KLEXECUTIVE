import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    firstName,
    lastName,
    email,
    phone,
    pickup,
    destination,
    date,
    time,
    serviceType,
    miles,
    minutes,
  } = body as Record<string, string>;

  const to = process.env.BOOKING_NOTIFICATION_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!to) {
    return NextResponse.json(
      { error: "BOOKING_NOTIFICATION_EMAIL is not configured." },
      { status: 500 }
    );
  }

  const serviceLabel: Record<string, string> = {
    "one-way": "One Way",
    hourly: "Hourly",
    "round-trip": "Round Trip",
  };

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2a2825;">
      <div style="background: #2a2825; padding: 24px 32px;">
        <h1 style="color: #a88a4f; font-size: 22px; margin: 0; letter-spacing: 0.04em;">KL EXEC</h1>
        <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 4px 0 0; font-family: monospace;">New Booking Request</p>
      </div>
      <div style="padding: 32px; border: 1px solid #e8e4da; border-top: none;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td colspan="2" style="padding: 0 0 16px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #9a9488; font-family: monospace;">Guest Details</td></tr>
          <tr>
            <td style="padding: 8px 0; color: #9a9488; width: 140px;">Name</td>
            <td style="padding: 8px 0; font-weight: 600;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9a9488;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #a88a4f;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9a9488;">Phone</td>
            <td style="padding: 8px 0;">${phone}</td>
          </tr>
          <tr><td colspan="2" style="padding: 24px 0 16px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #9a9488; font-family: monospace; border-top: 1px solid #e8e4da;">Journey Details</td></tr>
          <tr>
            <td style="padding: 8px 0; color: #9a9488;">Service</td>
            <td style="padding: 8px 0; font-weight: 600;">${serviceLabel[serviceType] ?? serviceType}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9a9488;">Pickup</td>
            <td style="padding: 8px 0;">${pickup}</td>
          </tr>
          ${destination ? `<tr><td style="padding: 8px 0; color: #9a9488;">Destination</td><td style="padding: 8px 0;">${destination}</td></tr>` : ""}
          <tr>
            <td style="padding: 8px 0; color: #9a9488;">Date &amp; Time</td>
            <td style="padding: 8px 0;">${date} at ${time}</td>
          </tr>
          ${miles ? `<tr><td style="padding: 8px 0; color: #9a9488;">Est. Distance</td><td style="padding: 8px 0;">${parseFloat(miles).toFixed(1)} mi · ~${minutes} min</td></tr>` : ""}
        </table>
      </div>
      <div style="padding: 16px 32px; background: #f7f5ef; font-size: 11px; color: #9a9488; text-align: center;">
        Submitted via klexec.com booking form
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `New Booking — ${firstName} ${lastName} · ${serviceLabel[serviceType] ?? serviceType}`,
      html,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[booking/route]", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}
