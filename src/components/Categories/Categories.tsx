import Link from "next/link";
import styles from "./Categories.module.css";
import { POST_QUERYResult } from "@/sanity/types";

type CategoriesProps = {
  categories: NonNullable<POST_QUERYResult>["categories"];
};

export function Categories({ categories }: CategoriesProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className={styles.wrap}>
      {categories.map((category) => {
        const slug = category?.slug?.current;
        if (!slug) return null;

        return (
          <Link
            key={category._id}
            href={`/category/${slug}`}
            className={styles.tag}
          >
            {category.title}
          </Link>
        );
      })}
    </div>
  );
}