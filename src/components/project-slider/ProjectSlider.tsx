import type { SanityImageObject } from "@sanity/image-url";

import { urlForImage } from "@/sanity/lib/image";

import { ProjectSliderCarousel } from "./ProjectSliderCarousel";

type ProjectCoverImage = SanityImageObject & {
  alt?: string;
};

export type ProjectSliderProject = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  coverImage?: ProjectCoverImage | null;
};

type ProjectSliderProps = {
  projects?: ProjectSliderProject[] | null;
};

export function ProjectSlider({ projects }: ProjectSliderProps) {
  const slides = (projects ?? []).flatMap((project) => {
    if (!project.title || !project.slug || !project.coverImage?.asset) {
      return [];
    }

    return [
      {
        id: project._id,
        title: project.title,
        href: `/projetos/${project.slug}`,
        imageUrl: urlForImage(project.coverImage)
          .width(2000)
          .height(1200)
          .fit("crop")
          .auto("format")
          .url(),
        imageAlt: project.coverImage.alt ?? "",
      },
    ];
  });

  if (slides.length === 0) {
    return null;
  }

  return <ProjectSliderCarousel slides={slides} />;
}
