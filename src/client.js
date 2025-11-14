import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SANITY_CONFIG } from "./config/sanity";

export const client = sanityClient({
  projectId: SANITY_CONFIG.projectId,
  dataset: SANITY_CONFIG.dataset,
  apiVersion: SANITY_CONFIG.apiVersion,
  useCdn: SANITY_CONFIG.useCdn,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => {
  return builder.image(source);
};
