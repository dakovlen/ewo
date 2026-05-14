import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';
import { addContactToBrevo } from '@/lib/brevo';

export async function POST(req: NextRequest) {
  try {
    const { email, token } = await req.json();

    // Email validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    if (!validator.isEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // reCAPTCHA verification
    const captchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const captchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${captchaSecret}&response=${token}`,
    });

    const captchaData = await captchaRes.json();

    if (!captchaData.success || captchaData.score < 0.5) {
      return NextResponse.json({ error: 'Failed reCAPTCHA verification' }, { status: 400 });
    }

    // Add to Brevo (handles duplicates gracefully via updateEnabled: true)
    await addContactToBrevo(email);

    return NextResponse.json({ message: 'Subscription successful' }, { status: 200 });
  } catch (err: any) {
    console.error('Subscribe error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}