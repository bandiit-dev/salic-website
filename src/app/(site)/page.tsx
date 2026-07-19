import { AboutUs, type AboutUsContent } from "@/components/about-us/AboutUs";
import {
  ContactUs,
  type ContactUsContent,
} from "@/components/contact-us/ContactUs";
import {
  MainSlider,
  type MainSliderItem,
} from "@/components/main-slider/MainSlider";
import {
  ProjectSlider,
  type ProjectSliderProject,
} from "@/components/project-slider/ProjectSlider";
import { client } from "@/sanity/lib/client";
import { HOMEPAGE_QUERY, PROJECT_SLIDER_QUERY } from "@/sanity/lib/queries";

import styles from "./Homepage.module.scss";

type HomepageData = {
  seo?: {
    heading?: string | null;
  } | null;
  slider?: MainSliderItem[] | null;
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
      <h1 className={styles.visuallyHidden}>
        {homepage.seo?.heading ?? "Salic Arquitetura de Interiores"}
      </h1>
      <MainSlider items={homepage.slider} />
      <AboutUs content={homepage.about} />
      <ProjectSlider projects={projects} />
      <ContactUs content={homepage.contact} />
    </main>
  );
}
