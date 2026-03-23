import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
const token = process.env.SANITY_API_WRITE_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newMessage = {
      _type: 'contactMessage',
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
    };

    const result = await client.create(newMessage);

    // Send email notification if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'CoCAHM Contact Form <onboarding@resend.dev>',
          to: process.env.ADMIN_EMAIL || 'info@cocahm.com',
          subject: `New Contact Message: ${subject}`,
          html: `
            <h2>New Contact Message Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
      }
    }

    return NextResponse.json(
      { message: 'Message sent successfully', id: result._id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting contact message:', error);
    return NextResponse.json(
      { message: 'Failed to send message', error: String(error) },
      { status: 500 }
    );
  }
}
