import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SANITY_CONFIG } from "./config/sanity";

export const client = sanityClient({
  projectId: SANITY_CONFIG.projectId,
  dataset: SANITY_CONFIG.dataset,
  apiVersion: SANITY_CONFIG.apiVersion,
  useCdn: SANITY_CONFIG.useCdn,
  // Add timeout and retry configuration
  timeout: 30000,
  retry: 2,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => {
  return builder.image(source);
};

// Test client connection
export const testClientConnection = async () => {
  try {
    const result = await client.fetch('*[_type == "post"][0]{title}');
    console.log('Client connection test:', result ? 'SUCCESS' : 'FAILED');
    return !!result;
  } catch (error) {
    console.error('Client connection test failed:', error);
    return false;
  }
};
