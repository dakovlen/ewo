export interface Heading {
  text: string;
  level: number;
  id: string;
}

interface PortableTextChild {
  _type?: string;
  text: string;
}

interface PortableTextBlock {
  _type: string;
  style?: string;
  children: PortableTextChild[];
}

/**
 * Генерує валідний id з тексту
 */
export function generateId(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // видаляє неалфавітні символи
    .replace(/\s+/g, '-');    // пробіли → дефіси
}

/**
 * Витягує заголовки h2-h4 з body Portable Text.
 * Підтримує рівні 2, 3, 4.
 * @param body Масив блоків Portable Text
 * @returns Масив заголовків із текстом, рівнем та id
 */
export function extractHeadings(body: PortableTextBlock[]): Heading[] {
  const headings: Heading[] = [];

  for (const block of body) {
    if (
      block._type === 'block' && 
      block.style && 
      /^h[2-4]$/.test(block.style) &&
      Array.isArray(block.children)
    ) {
      const level = parseInt(block.style.replace('h', ''), 10);
      const text = block.children.map(child => child.text).join('');
      const id = generateId(text);
      headings.push({ text, level, id });
    }
  }

  return headings;
}
