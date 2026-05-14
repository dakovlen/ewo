export async function addContactToBrevo(email: string) {
  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      listIds: [Number(process.env.BREVO_LIST_ID)],
      updateEnabled: true, // якщо контакт вже є — просто оновить список
    }),
  });

  const data = await res.json();

  // 204 = created, 400 with code "duplicate_parameter" = already exists — обидва ОК
  if (!res.ok && res.status !== 204) {
    throw new Error(data.message || 'Failed to add contact to Brevo');
  }

  return data;
}