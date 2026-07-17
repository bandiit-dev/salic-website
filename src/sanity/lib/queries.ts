import { defineQuery } from "next-sanity";

export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "homepage"][0] {
    seo {
      title,
      description,
      image
    },

    slider[] {
      _key,
      heading,
      description,
      linkLabel,
      link,
      image {
        ...,
        alt
      }
    },

    about {
      eyebrow,
      title,
      text,
      image {
        ...,
        alt
      }
    },

    projectsSection {
      title,
      description,
      linkLabel,

      projects[]-> {
        _id,
        title,
        "slug": slug.current,
        shortDescription,
        location,
        completionYear,
        coverImage {
          ...,
          alt
        }
      }
    },

    contact {
      title,
      "address": coalesce(address, description),
      email,
      phone,
      image {
        ...,
        alt
      }
    }
  }
`);

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    location,
    completionYear,
    featured,
    coverImage {
      ...,
      alt
    }
  }
`);

export const PROJECT_QUERY = defineQuery(`
  *[
    _type == "project" &&
    slug.current == $slug
  ][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    description,
    location,
    completionYear,

    coverImage {
      ...,
      alt
    },

    gallery[] {
      _key,
      ...,
      alt,
      caption
    }
  }
`);

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[
    _type == "project" &&
    defined(slug.current)
  ] {
    "slug": slug.current
  }
`);
