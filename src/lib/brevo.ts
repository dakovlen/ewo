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
      updateEnabled: true,
    }),
  });

  // 204 = success with no body, 201 = created
  if (res.status === 204 || res.status === 201) {
    return;
  }

  // Для інших відповідей парсимо JSON
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};

  if (!res.ok) {
    throw new Error(data.message || `Brevo error: ${res.status}`);
  }

  return data;
}