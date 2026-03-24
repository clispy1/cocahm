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
      allergies, allergyDetails, passportPicture, paymentReference 
    } = body;

    // Basic validation
    const requiredFields = [
      'surname', 'firstName', 'dob', 'pob', 'gender', 'nationality',
      'phone', 'email', 'address', 'emergencyContact', 'guardianName',
      'guardianPhone', 'guardianResidence', 'lastSchool', 'educationLevel',
      'programCategory', 'program', 'accommodation', 'experience',
      'disability', 'allergies', 'passportPicture', 'paymentReference'
    ];

    const missingFields = requiredFields.filter(field => !body[field]);

    if (body.experience === 'yes' && !body.experienceDetails) missingFields.push('experienceDetails');
    if (body.disability === 'yes' && !body.disabilityDetails) missingFields.push('disabilityDetails');
    if (body.allergies === 'yes' && !body.allergyDetails) missingFields.push('allergyDetails');

    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    if (!process.env.SANITY_API_WRITE_TOKEN) {
      return NextResponse.json(
        { message: 'Server configuration error: SANITY_API_WRITE_TOKEN is missing.' },
        { status: 500 }
      );
    }

    // Upload passport picture to Sanity
    const imageAsset = await client.assets.upload('image', Buffer.from(passportPicture.split(',')[1], 'base64'), {
      filename: `passport-${firstName}-${surname}.jpg`,
    });

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
      passportPicture: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id,
        },
      },
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
      paymentReference,
    };

    const result = await client.create(newEnrollment);

    // Send email notification if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      try {
        // Send to Admin
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

        // Send to Applicant
        await resend.emails.send({
          from: 'CoCAHM Admissions <onboarding@resend.dev>',
          to: email,
          subject: `Application Received - CoCAHM`,
          html: `
            <h2>Application Received</h2>
            <p>Dear ${firstName},</p>
            <p>Thank you for applying to the College of Culinary Arts and Hospitality Management (CoCAHM).</p>
            <p>We have successfully received your application and payment (Reference: ${paymentReference}).</p>
            <p>Our admissions team will review your details within 48 hours. You will receive another email with instructions for the entrance interview.</p>
            <p>Please prepare your academic transcripts and identification documents.</p>
            <br/>
            <p>Best regards,</p>
            <p><strong>CoCAHM Admissions Team</strong></p>
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
  } catch (error: any) {
    console.error('Error submitting enrollment:', error);
    return NextResponse.json(
      { message: 'Failed to submit enrollment', error: error.message || String(error) },
      { status: 500 }
    );
  }
}
