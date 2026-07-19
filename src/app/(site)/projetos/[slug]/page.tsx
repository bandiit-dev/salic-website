import type { PortableTextBlock } from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import type { SanityImageObject } from "@sanity/image-url";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/lib/queries";

import styles from "./ProjectPage.module.scss";

type ProjectImage = SanityImageObject & {
  alt?: string;
};

type GalleryImage = ProjectImage & {
  _key: string;
  caption?: string;
  dimensions?: {
    width: number;
    height: number;
  };
};

type ProjectData = {
  title: string;
  shortDescription?: string;
  description?: PortableTextBlock[];
  location?: string;
  completionYear?: number;
  areaSquareMeters?: number;
  projectType?: string;
  coverImage: ProjectImage;
  gallery?: GalleryImage[];
};

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const projects =
    await client.fetch<Array<{ slug: string }>>(PROJECT_SLUGS_QUERY);

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await client.fetch<ProjectData | null>(PROJECT_QUERY, {
    slug,
  });

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.shortDescription,
    alternates: {
      canonical: `/projetos/${slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await client.fetch<ProjectData | null>(PROJECT_QUERY, {
    slug,
  });

  if (!project?.coverImage?.asset) {
    notFound();
  }

  const coverHotspot = project.coverImage.hotspot;
  const coverImageUrl = urlForImage(project.coverImage)
    .width(2560)
    .auto("format")
    .url();
  const technicalDetails: Array<{
    label: string;
    value: string | number | undefined;
  }> = [
    {
      label: "Ano",
      value: project.completionYear,
    },
    {
      label: "M²",
      value:
        project.areaSquareMeters === undefined
          ? undefined
          : new Intl.NumberFormat("pt-BR").format(project.areaSquareMeters),
    },
    {
      label: "Tipo",
      value: project.projectType,
    },
    {
      label: "Local",
      value: project.location,
    },
  ];
  const availableTechnicalDetails = technicalDetails.filter(
    (detail): detail is { label: string; value: string | number } =>
      detail.value !== undefined && detail.value !== null && detail.value !== "",
  );

  return (
    <main className={styles.projectPage}>
      <div className={styles.projectPage__hero}>
        <Image
          src={coverImageUrl}
          alt={project.coverImage.alt ?? ""}
          fill
          sizes="100vw"
          preload
          style={{
            objectPosition: `${(coverHotspot?.x ?? 0.5) * 100}% ${(coverHotspot?.y ?? 0.5) * 100}%`,
          }}
        />
      </div>

      <div className={styles.projectPage__body}>
        <section className={styles.projectPage__intro}>
          <article className={styles.projectPage__card}>
            <h1>{project.title}</h1>

            {project.description?.length ? (
              <div className={styles.projectPage__description}>
                <PortableText value={project.description} />
              </div>
            ) : project.shortDescription ? (
              <p className={styles.projectPage__description}>
                {project.shortDescription}
              </p>
            ) : null}

            {availableTechnicalDetails.length > 0 && (
              <div className={styles.projectPage__technical}>
                <h2>Ficha técnica</h2>

                <dl>
                  {availableTechnicalDetails.map(({ label, value }) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </article>

          <div className={styles.projectPage__pattern} aria-hidden="true">
            <Image
              src="/images/icon-pattern-project.png"
              alt=""
              width={665}
              height={468}
            />
          </div>
        </section>

        {project.gallery?.length ? (
          <div className={styles.projectPage__gallery}>
            {project.gallery.map((image) => {
              if (!image.asset) {
                return null;
              }

              const sourceWidth = image.dimensions?.width ?? 1600;
              const sourceHeight = image.dimensions?.height ?? 1000;
              const width = Math.min(sourceWidth, 2400);
              const height = Math.round(width * (sourceHeight / sourceWidth));
              const imageUrl = urlForImage(image)
                .width(width)
                .auto("format")
                .url();

              return (
                <figure key={image._key}>
                  <Image
                    src={imageUrl}
                    alt={image.alt ?? ""}
                    width={width}
                    height={height}
                    sizes="(max-width: 475px) calc(100vw - 60px), calc(100vw - 120px)"
                  />

                  {image.caption && <figcaption>{image.caption}</figcaption>}
                </figure>
              );
            })}
          </div>
        ) : null}
      </div>
    </main>
  );
}
