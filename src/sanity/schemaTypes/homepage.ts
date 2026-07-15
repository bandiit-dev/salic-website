// src/sanity/schemaTypes/homepage.ts

import { defineArrayMember, defineField, defineType } from "sanity";

export const homepageType = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",

  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Page title",
          type: "string",
          validation: (rule) => rule.required().max(60),
        }),

        defineField({
          name: "description",
          title: "Meta description",
          type: "text",
          rows: 3,
          validation: (rule) => rule.required().max(160),
        }),

        defineField({
          name: "image",
          title: "Social sharing image",
          type: "image",
        }),
      ],
    }),

    defineField({
      name: "slider",
      title: "Homepage slider",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: "slide",
          title: "Slide",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
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
              name: "heading",
              title: "Heading",
              type: "string",
            }),

            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),

            defineField({
              name: "linkLabel",
              title: "Button label",
              type: "string",
            }),

            defineField({
              name: "link",
              title: "Button link",
              type: "string",
              description: "Example: /projects or /projects/project-name",
            }),
          ],

          preview: {
            select: {
              title: "heading",
              media: "image",
            },
          },
        }),
      ],
    }),

    defineField({
      name: "about",
      title: "About us",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Small heading",
          type: "string",
        }),

        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (rule) => rule.required(),
        }),

        defineField({
          name: "text",
          title: "Text",
          type: "array",
          of: [
            {
              type: "block",
            },
          ],
          validation: (rule) => rule.required(),
        }),

        defineField({
          name: "image",
          title: "Image",
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
      ],
    }),

    defineField({
      name: "projectsSection",
      title: "Projects section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Section title",
          type: "string",
          validation: (rule) => rule.required(),
        }),

        defineField({
          name: "description",
          title: "Section description",
          type: "text",
          rows: 3,
        }),

        defineField({
          name: "projects",
          title: "Selected projects",
          type: "array",
          of: [
            {
              type: "reference",
              to: [
                {
                  type: "project",
                },
              ],
            },
          ],
          validation: (rule) => rule.unique(),
        }),

        defineField({
          name: "linkLabel",
          title: "View all button label",
          type: "string",
          initialValue: "View all projects",
        }),
      ],
    }),

    defineField({
      name: "contact",
      title: "Contact section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (rule) => rule.required(),
        }),

        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
          validation: (rule) => rule.required(),
        }),

        defineField({
          name: "email",
          title: "Email address",
          type: "string",
          validation: (rule) => rule.email(),
        }),

        defineField({
          name: "phone",
          title: "Phone number",
          type: "string",
        }),

        defineField({
          name: "buttonLabel",
          title: "Button label",
          type: "string",
          initialValue: "Contact us",
        }),
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Homepage",
      };
    },
  },
});
