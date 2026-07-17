import {
  AboutUs,
  type AboutUsContent,
} from "@/components/about-us/AboutUs";
import { client } from "@/sanity/lib/client";
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries";

type HomepageData = {
  about?: AboutUsContent | null;
};

export default async function Homepage() {
  const homepage = await client.fetch<HomepageData | null>(HOMEPAGE_QUERY);

  if (!homepage) {
    return (
      <main id="home">
        <h1>Homepage content has not been created yet.</h1>
      </main>
    );
  }

  return (
    <main id="home">
      <h1>Salic - Arquitetura de Interiores</h1>
      <AboutUs content={homepage.about} />
    </main>
  );
}
