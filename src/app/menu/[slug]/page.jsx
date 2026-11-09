import { notFound, permanentRedirect } from "next/navigation";
import products from "../../../products.json";
import { Product } from "../../../site";

export const dynamicParams = false;

function findProduct(slug) {
  return products.find((product) => product.slug === slug || product.legacySlug === slug);
}

export function generateStaticParams() {
  return products.flatMap((product) =>
    [product.slug, product.legacySlug].filter(Boolean).map((slug) => ({ slug })),
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();
  if (slug !== product.slug) permanentRedirect(`/menu/${product.slug}`);
  return <Product product={product} />;
}
