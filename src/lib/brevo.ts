export async function addContactToBrevo(email: string) {
  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        listIds: [Number(process.env.BREVO_LIST_ID)],
        updateEnabled: false,
      }),
    });

    const data = await res.json();

    console.log('Brevo response status:', res.status);
    console.log('Brevo response data:', data);

    if (!res.ok) {
      throw new Error(data.message || 'Failed to add contact to Brevo');
    }

    return data;
  } catch (error) {
    console.error('Error adding contact to Brevo:', error);
    throw error;
  }
}
