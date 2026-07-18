import {
  AboutUs,
  type AboutUsContent,
} from "@/components/about-us/AboutUs";
import {
  ContactUs,
  type ContactUsContent,
} from "@/components/contact-us/ContactUs";
import {
  ProjectSlider,
  type ProjectSliderProject,
} from "@/components/project-slider/ProjectSlider";
import { client } from "@/sanity/lib/client";
import {
  HOMEPAGE_QUERY,
  PROJECT_SLIDER_QUERY,
} from "@/sanity/lib/queries";

type HomepageData = {
  about?: AboutUsContent | null;
  contact?: ContactUsContent | null;
};

export default async function Homepage() {
  const [homepage, projects] = await Promise.all([
    client.fetch<HomepageData | null>(HOMEPAGE_QUERY),
    client.fetch<ProjectSliderProject[]>(PROJECT_SLIDER_QUERY),
  ]);

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
      <ProjectSlider projects={projects} />
      <ContactUs content={homepage.contact} />
    </main>
  );
}
