"use server";

import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";
import { siteConfig } from "@/config/site";

export async function submitContactForm(data: ContactFormData) {
  const validated = contactSchema.parse(data);

  try {
    // Save to database
    await prisma.contactSubmission.create({
      data: validated,
    });

    // Send notification email to admin
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: `${siteConfig.name} <onboarding@resend.dev>`,
        to: siteConfig.author.email,
        subject: `New Contact: ${validated.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${validated.name}</p>
          <p><strong>Email:</strong> ${validated.email}</p>
          <p><strong>Subject:</strong> ${validated.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${validated.message.replace(/\n/g, "<br>")}</p>
        `,
      });

      // Send auto-reply
      await resend.emails.send({
        from: `${siteConfig.name} <onboarding@resend.dev>`,
        to: validated.email,
        subject: `Thanks for reaching out, ${validated.name}!`,
        html: `
          <h2>Thanks for your message!</h2>
          <p>Hi ${validated.name},</p>
          <p>I've received your message and will get back to you as soon as possible.</p>
          <p>Best regards,<br>${siteConfig.author.name}</p>
        `,
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, error: "Failed to send message. Please try again." };
  }
}
