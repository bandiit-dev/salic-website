import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Project title",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "shortDescription",
      title: "Short description",
      description: "Displayed on homepage project cards.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(250),
    }),

    defineField({
      name: "description",
      title: "Full description",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "gallery",
      title: "Project gallery",
      type: "array",
      of: [
        {
          name: "galleryImage",
          title: "Gallery image",
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
      ],
      options: {
        layout: "grid",
      },
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),

    defineField({
      name: "completionYear",
      title: "Completion year",
      type: "number",
      validation: (rule) =>
        rule
          .integer()
          .min(1900)
          .max(new Date().getFullYear() + 10),
    }),

    defineField({
      name: "featured",
      title: "Featured project",
      description: "Show this project in highlighted homepage sections.",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Display order",
      description: "Lower numbers appear first.",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),
  ],

  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [
        {
          field: "order",
          direction: "asc",
        },
      ],
    },
  ],

  preview: {
    select: {
      title: "title",
      media: "coverImage",
      location: "location",
    },
    prepare({ title, media, location }) {
      return {
        title,
        media,
        subtitle: location || "No location",
      };
    },
  },
});
