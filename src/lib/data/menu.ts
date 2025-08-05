import type { ReactNode } from "react";

export type MenuItem = {
  href: string;
  label: string;
  icon?: ReactNode; // якщо пізніше буде реалізація іконки
};

export const menuItems: MenuItem[] = [
  { 
    href: "/about", 
    label: "About" 
  },
  { 
    href: "/blog",
    label: "Blog"
  },
  { 
    href: "/contact",
    label: "Contact"
  },

  // { href: "/studio", label: "Studio" }, // закоментовано поки немає авторизації
];
