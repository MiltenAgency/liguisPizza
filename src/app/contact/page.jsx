import { Contact } from "../../site";

export const metadata = { title: "Contact us" };

export default async function ContactPage({ searchParams }) {
  const query = await searchParams;
  const productSlug = typeof query.product === "string" ? query.product : undefined;
  return <Contact productSlug={productSlug} />;
}
