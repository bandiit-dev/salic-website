import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

import { client } from "@/sanity/lib/client";
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

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

  const project = await client.fetch(PROJECT_QUERY, { slug });

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const project = await client.fetch(PROJECT_QUERY, { slug });

  if (!project) {
    notFound();
  }

  return (
    <main>
      <h1>{project.title}</h1>

      {project.location && <p>{project.location}</p>}

      <p>{project.shortDescription}</p>

      <PortableText value={project.description} />

      <Image
        src={urlForImage(project.coverImage).width(1600).height(1000).url()}
        alt={project.coverImage.alt}
        width={1600}
        height={1000}
      />
    </main>
  );
}
