import { z } from "zod";
import { Resend } from "resend";

// Validation schema — name and email are required, message needs some substance.
const contactSchema = z.object({
  name:    z.string().min(1, "Name is required"),
  email:   z.string().email("A valid email address is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Escape HTML entities to prevent injection when embedding input in email HTML.
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(request: Request) {
  // Parse request body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Validate with Zod (v4 uses .issues, not .errors)
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    const firstError = result.error.issues[0]?.message ?? "Invalid input";
    return Response.json({ error: firstError }, { status: 400 });
  }

  const { name, email, message } = result.data;

  // Sanitize all inputs before including in email HTML
  const safeName    = escapeHtml(name);
  const safeEmail   = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  const apiKey = process.env.RESEND_API_KEY;
  const from   = process.env.RESEND_FROM;
  const to     = process.env.CONTACT_FORM_TO;

  if (!apiKey || !from || !to) {
    console.error("Contact form: missing env vars (RESEND_API_KEY, RESEND_FROM, CONTACT_FORM_TO)");
    return Response.json({ error: "Email service is not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New contact form submission from ${safeName}`,
      html: `
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage.replace(/\n/g, "<br>")}</p>
      `,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact form: Resend send failed", err);
    return Response.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
