import RSS from "rss";
import { fetchAllPost } from "../../utils";
import { RSS_CONFIG, SITE_URL } from "../../config/site";
import { ROUTES } from "../../config/routes";

export default async function handler(req, res) {
  try {
    const posts = await fetchAllPost();

    const feed = new RSS({
      title: RSS_CONFIG.title,
      description: RSS_CONFIG.description,
      site_url: RSS_CONFIG.siteUrl,
      feed_url: RSS_CONFIG.feedUrl,
      language: RSS_CONFIG.language,
      pubDate: new Date(),
      copyright: RSS_CONFIG.copyright,
    });

    posts.forEach((post) => {
      feed.item({
        title: post.title,
        url: `${SITE_URL}${ROUTES.POST_DETAIL.replace("[slug]", post.slug.current)}`,
        date: new Date(post.publishedAt),
        description: post.description,
        author: "The Entrepreneurial Chronicles",
      });
    });

    res.setHeader("Content-Type", "text/xml");
    res.write(feed.xml({ indent: true }));
    res.end();
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    res.status(500).json({ error: "Failed to generate RSS feed" });
  }
}
