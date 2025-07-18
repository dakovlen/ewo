import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import validator from 'validator';
import { addContactToBrevo } from '@/lib/brevo';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { email, token } = await req.json();

    // Валідація email
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    if (!validator.isEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Перевірка reCAPTCHA
    const captchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;

    const captchaRes = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${captchaSecret}&response=${token}`,
    });

    const captchaData = await captchaRes.json();

    if (!captchaData.success || captchaData.score < 0.5) {
      return NextResponse.json({ error: 'Failed reCAPTCHA verification' }, { status: 400 });
    }

    // Перевірка дубліката
    const { data: existing } = await supabase
      .from('emails')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ message: 'Email already subscribed' }, { status: 200 });
    }

    // Збереження email у Supabase
    const { error } = await supabase.from('emails').insert([{ email }]);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Додавання до Brevo
    try {
      await addContactToBrevo(email);
    } catch (brevoErr: any) {
      console.error('Brevo error:', brevoErr);
    }

    return NextResponse.json({ message: 'Subscription successful' }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
