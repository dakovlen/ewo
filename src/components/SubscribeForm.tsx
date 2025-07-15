'use client';

import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import Script from 'next/script';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';

function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

async function waitForRecaptcha(): Promise<void> {
  return new Promise((resolve, reject) => {
    const maxTime = 5000;
    const intervalTime = 100;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += intervalTime;
      if (window.grecaptcha) {
        clearInterval(interval);
        resolve();
      } else if (elapsed >= maxTime) {
        clearInterval(interval);
        reject(new Error('reCAPTCHA not loaded'));
      }
    }, intervalTime);
  });
}

async function subscribe(email: string, token: string) {
  const res = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, token }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Subscription failed');
  }
  return res.json();
}

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [inputError, setInputError] = useState(false);
  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (inputError && errorRef.current) {
      errorRef.current.focus();
    }
  }, [inputError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setInputError(true);
      toast.error('Please enter a valid email address.');
      return;
    } else {
      setInputError(false);
    }

    setStatus('loading');

    try {
      await waitForRecaptcha();
      const token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, { action: 'subscribe' });
      await subscribe(email, token);

      setStatus('success');
      setEmail('');
      toast.success('Thank you for subscribing!');
    } catch (error: any) {
      setStatus('error');
      toast.error(error.message || 'Something went wrong.');
    }
  };
console.log('Button disabled:', status === 'loading');
  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />
      <section className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-10 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-4">
            Stay Connected
          </h2>
          <p className="text-center text-gray-600 mb-6 text-lg">
            Get new content and updates right to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3" noValidate>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (inputError) setInputError(false);
              }}
              placeholder="Enter your email"
              required
              aria-invalid={inputError}
              aria-describedby={inputError ? 'email-error' : undefined}
              disabled={status === 'loading'}
              className={inputError ? 'border-red-600 focus:ring-red-600' : undefined}
            />

            <Button size="xl" className="bg-teal-700 cursor-pointer" disabled={status === 'loading'} type="submit">
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>

          {inputError && (
            <p
              id="email-error"
              ref={errorRef}
              tabIndex={-1}
              role="alert"
              aria-live="assertive"
              className="mt-2 text-red-600 text-center text-sm"
            >
              Please enter a valid email address.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
