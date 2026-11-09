import { Shop } from "../../site";

export const metadata = { title: "Our menu" };

export default async function MenuPage({ searchParams }) {
  const query = await searchParams;
  const requestedCategory = typeof query.category === "string" ? query.category : undefined;
  return <Shop requestedCategory={requestedCategory} />;
}
