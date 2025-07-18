export async function getRecaptchaToken(action: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !(window as any).grecaptcha) {
      return reject(new Error('reCAPTCHA not loaded'));
    }

    (window as any).grecaptcha.ready(() => {
      (window as any).grecaptcha
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, { action })
        .then(resolve)
        .catch(reject);
    });
  });
}
