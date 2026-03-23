import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { projectId, dataset, apiVersion } from '../../../sanity/env';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const { 
      surname, firstName, otherNames, dob, pob, gender, nationality, 
      phone, email, address, emergencyContact, guardianName, guardianPhone, 
      guardianResidence, lastSchool, educationLevel, programCategory, program, 
      accommodation, experience, experienceDetails, disability, disabilityDetails, 
      allergies, allergyDetails 
    } = body;

    // Basic validation
    if (!firstName || !surname || !email || !phone || !program) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the document in Sanity
    const newEnrollment = {
      _type: 'enrollment',
      surname,
      firstName,
      otherNames,
      dob,
      pob,
      gender,
      nationality,
      phone,
      email,
      address,
      emergencyContact,
      guardianName,
      guardianPhone,
      guardianResidence,
      lastSchool,
      educationLevel,
      course: {
        _type: 'reference',
        _ref: program,
      },
      accommodation,
      experience,
      experienceDetails,
      disability,
      disabilityDetails,
      allergies,
      allergyDetails,
      status: 'New',
      submittedAt: new Date().toISOString(),
    };

    const result = await client.create(newEnrollment);

    // Send email notification if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'CoCAHM Admissions <onboarding@resend.dev>',
          to: process.env.ADMIN_EMAIL || 'info@cocahm.com',
          subject: `New Enrollment Application: ${firstName} ${surname}`,
          html: `
            <h2>New Enrollment Application Received</h2>
            <p><strong>Name:</strong> ${firstName} ${surname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Program ID:</strong> ${program}</p>
            <p>Please log in to the Sanity Studio to view the full application details.</p>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // We don't fail the whole request if just the email fails
      }
    }

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
