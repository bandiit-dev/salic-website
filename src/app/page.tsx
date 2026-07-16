import { client } from "@/sanity/lib/client";
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries";

export default async function Homepage() {
  const homepage = await client.fetch(HOMEPAGE_QUERY);

  if (!homepage) {
    return (
      <main>
        <h1>Homepage content has not been created yet.</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>Salic - Arquitetura de Interiores</h1>
    </main>
  );
}
