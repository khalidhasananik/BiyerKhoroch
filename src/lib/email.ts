import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NOTIFICATION_EMAIL_FROM,
    pass: process.env.NOTIFICATION_EMAIL_APP_PASSWORD,
  },
});

interface SubmissionNotificationData {
  slug: string;
  city: string;
  guestCount: number;
  venueName: string;
  totalCost: number;
  story: string;
}

export async function sendSubmissionNotification(
  data: SubmissionNotificationData
) {
  const adminUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/admin/queue`;
  const formattedCost = new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(data.totalCost);

  await transporter.sendMail({
    from: `"BiyerKhoroch" <${process.env.NOTIFICATION_EMAIL_FROM}>`,
    to: process.env.NOTIFICATION_EMAIL_TO,
    subject: `New submission: ${data.city} wedding (${data.guestCount} guests)`,
    text: [
      `A new story was submitted on BiyerKhoroch.`,
      ``,
      `City:        ${data.city}`,
      `Guests:      ${data.guestCount}`,
      `Venue:       ${data.venueName}`,
      `Total cost:  ${formattedCost}`,
      ``,
      `Story preview:`,
      data.story.slice(0, 300) + (data.story.length > 300 ? "…" : ""),
      ``,
      `Review it here: ${adminUrl}`,
    ].join("\n"),
    html: `
      <h2 style="color:#c0557a">New BiyerKhoroch submission</h2>
      <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
        <tr><td style="padding:4px 12px 4px 0;color:#666">City</td><td><strong>${data.city}</strong></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Guests</td><td>${data.guestCount}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Venue</td><td>${data.venueName}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Total cost</td><td><strong>${formattedCost}</strong></td></tr>
      </table>
      <p style="margin-top:16px;color:#444;font-family:sans-serif;font-size:14px">
        <em>${data.story.slice(0, 300)}${data.story.length > 300 ? "…" : ""}</em>
      </p>
      <p style="margin-top:16px">
        <a href="${adminUrl}" style="background:#c0557a;color:#fff;padding:8px 16px;border-radius:6px;text-decoration:none;font-family:sans-serif;font-size:14px">
          Review in admin queue
        </a>
      </p>
    `,
  });
}
