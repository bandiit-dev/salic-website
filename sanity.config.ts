// sanity.config.ts

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Website CMS",

  projectId,
  dataset,

  basePath: "/studio",

  plugins: [
    structureTool(),
    visionTool({
      defaultApiVersion: apiVersion,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
