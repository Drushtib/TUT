import { fetchAllPostSlugs, generateSitemap } from "../../lib/utils/sitemap";

export default async function handler(req, res) {
  try {
    const slugs = await fetchAllPostSlugs();
    const sitemap = generateSitemap(slugs);

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).json({ error: "Failed to generate sitemap" });
  }
}
