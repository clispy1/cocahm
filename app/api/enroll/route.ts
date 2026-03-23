import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { projectId, dataset, apiVersion } from '../../../sanity/env';

// This client uses a token to authenticate and write data to Sanity
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN, // The user needs to set this in Vercel/AI Studio
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, courseId, message } = body;

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !courseId) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the document in Sanity
    const newEnrollment = {
      _type: 'enrollment',
      firstName,
      lastName,
      email,
      phone,
      course: {
        _type: 'reference',
        _ref: courseId,
      },
      message,
      status: 'New',
      submittedAt: new Date().toISOString(),
    };

    const result = await client.create(newEnrollment);

    // TODO: Here you could also trigger an email notification using Resend, SendGrid, etc.
    // e.g., await sendEmail({ to: 'admin@cocahm.com', subject: 'New Enrollment', ... })

    return NextResponse.json(
      { message: 'Enrollment submitted successfully', id: result._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting enrollment:', error);
    return NextResponse.json(
      { message: 'Failed to submit enrollment' },
      { status: 500 }
    );
  }
}
