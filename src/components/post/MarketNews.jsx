import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";
import Image from "next/image";
import Link from "next/link";

const MarketNews = () => {
  const query = `
*[_type == "post" && categories[0]._ref == *[_type == "category" && slug.current == "market-news"][0]._id] 
 {
    title,
    slug,
    altText,
    'featureImg': mainImage.asset->url,
    publishedAt,
    description,
    'category': {
      'title': categories[0]->title,
      'slug': categories[0]->slug.current
    }
} | order(publishedAt desc)[0...6] 
`;

  const { data, isLoading, error } = useQuery({
    queryKey: ["market-news"],
    queryFn: async () => {
      const response = await client.fetch(query);
      return response;
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching posts</div>;

  // Images from assets folder - different image for each news item
  const assetImages = [
    "/assest/hero1.jpg",
    "/assest/bg.jpg",
    "/assest/wavy_background_4.jpg",
    "/assest/bf9abef8-a5f5-4363-8751-61fae2f18c61.jpg",
    "/images/posts/post_1.jpg",
    "/images/posts/post_2.jpg",
    "/images/posts/post_3.jpg",
    "/images/posts/post_4.jpg",
    "/images/posts/post_5.jpg",
    "/images/posts/post_6.jpg",
  ];

  // Create news items with images from assets folder
  let newsItems = [];
  
  if (!data || data.length === 0) {
    // Use placeholder data with images from assets
    newsItems = [
      {
        title: "Bentleyville named 'Best Holiday Light Display' by USA Today for fourth year in a row",
        slug: { current: "bentleyville-holiday-lights" },
        image: assetImages[0],
        category: "NEWS",
        updated: "17 hours ago",
        author: "Marisa Ornat",
        description: "This is Bentleyville's 22nd season, and its sixth win since 2018."
      },
      {
        title: "3 Wisconsin Department of Corrections employees on leave after Morgan Geyser escape",
        slug: { current: "wisconsin-corrections-leave" },
        image: assetImages[1],
        category: "POLITICS",
        updated: "20 hours ago",
        author: "Vanessa Kjeldsen",
        description: "The Department of Corrections has more than a 20% vacancy rate for staff in their Electronic Monitoring Center."
      },
      {
        title: "'The Nutcracker: A Duluth Tale' returns to the DECC",
        slug: { current: "nutcracker-duluth-tale" },
        image: assetImages[2],
        category: "COMMUNITY",
        updated: "21 hours ago",
        author: "Hannah Morgan",
        description: "While it follows the classic 'Nutcracker' story, it has ties into the Northland."
      },
      {
        title: "Keeping the tradition alive: how Duluth's sea shanty group began",
        slug: { current: "duluth-sea-shanty-group" },
        image: assetImages[3],
        category: "COMMUNITY",
        updated: "21 hours ago",
        author: "Hannah Morgan",
        description: "The group, now known as All Hands, meets at the Duluth Folk School in Lincoln Park."
      },
      {
        title: "Minnesota lawmakers discuss rural health",
        slug: { current: "minnesota-rural-health" },
        image: assetImages[4],
        category: "TWIN PORTS",
        updated: "Dec. 11, 2025 at 8:53 AM GMT+5:30",
        author: "Hannah Morgan",
        description: "The group included DFL Senator Grant Hauschild and republican representative Cal Warwas."
      },
      {
        title: "Ashland asks for transparency after $870,000 in local taxes go to private school vouchers",
        slug: { current: "ashland-school-vouchers" },
        image: assetImages[5],
        category: "NW WISCONSIN",
        updated: "Dec. 11, 2025 at 6:40 AM GMT+5:30",
        author: "Kyre Johnson",
        description: "They say public funds generated from taxes often end"
      },
    ];
  } else {
    // Use Sanity data but replace images with assets folder images
    newsItems = data.slice(0, 6).map((post, index) => ({
      title: post.title,
      slug: post.slug,
      image: assetImages[index] || post.featureImg,
      category: post.category?.title || "MARKET NEWS",
      updated: post.publishedAt ? formatTimeAgo(post.publishedAt) : "Recently",
      author: "Editor",
      description: post.description || ""
    }));
  }

  // Split into left and right columns (3 items each)
  const leftColumnItems = newsItems.slice(0, 3);
  const rightColumnItems = newsItems.slice(3, 6);

  function formatTimeAgo(dateString) {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  return (
    <>
      <style jsx>{`
        .market-news-section {
          width: 100%;
          animation: fadeIn 0.8s ease-out;
        }

        .market-news-heading {
          font-size: 3rem;
          font-weight: 700;
          color: #000000;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0 0 2.5rem 0;
          padding-bottom: 1rem;
          border-bottom: 2px solid #e0e0e0;
          text-align: center;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .market-news-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .news-column {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .news-card {
          display: flex;
          gap: 1.5rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid #e0e0e0;
          transition: transform 0.3s ease;
        }

        .news-card:last-child {
          border-bottom: none;
        }

        .news-card:hover {
          transform: translateX(5px);
        }

        .news-image-wrapper {
          position: relative;
          width: 200px;
          height: 150px;
          flex-shrink: 0;
          overflow: hidden;
          background: #f5f5f5;
        }

        .news-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .news-card:hover .news-image-wrapper img {
          transform: scale(1.1);
        }

        .category-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #000000;
          color: #ffffff;
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          z-index: 2;
        }

        .news-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .news-title-wrapper {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .play-icon {
          width: 20px;
          height: 20px;
          background: #000000;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 0.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .play-icon::before {
          content: '';
          width: 0;
          height: 0;
          border-left: 6px solid #ffffff;
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
          margin-left: 2px;
        }

        .news-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #000000;
          margin: 0;
          line-height: 1.4;
          flex: 1;
        }

        .news-title a {
          color: #000000;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .news-title a:hover {
          color: #545454;
        }

        .news-meta {
          font-size: 1rem;
          color: #666666;
          margin-bottom: 0.75rem;
        }

        .news-description {
          font-size: 1.2rem;
          color: #666666;
          line-height: 1.6;
          margin: 0;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .market-news-layout {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .news-column {
            gap: 0;
          }

          .news-card {
            padding: 1.25rem 0;
          }
        }

        @media (max-width: 768px) {
          .news-card {
            flex-direction: column;
            gap: 1rem;
          }

          .news-image-wrapper {
            width: 100%;
            height: 200px;
          }

          .news-title {
            font-size: 1.3rem;
          }

          .news-meta {
            font-size: 0.95rem;
          }

          .news-description {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .news-card {
            padding: 1rem 0;
          }

          .news-image-wrapper {
            height: 180px;
          }

          .market-news-heading {
            font-size: 2rem;
          }

          .news-title {
            font-size: 1.2rem;
          }

          .news-meta {
            font-size: 0.9rem;
          }

          .news-description {
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="market-news-section">
        <h2 className="market-news-heading">Market News</h2>
        <div className="market-news-layout">
          {/* Left Column */}
          <div className="news-column">
            {leftColumnItems.map((item, index) => (
              <div key={index} className="news-card">
                <div className="news-image-wrapper">
                  <div className="category-badge">{item.category}</div>
                  <Link href={`/post/${item.slug.current}`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={200}
                      height={150}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Link>
                </div>
                <div className="news-content">
                  <div className="news-title-wrapper">
                    <div className="play-icon"></div>
                    <h3 className="news-title">
                      <Link href={`/post/${item.slug.current}`}>
                        {item.title}
                      </Link>
                    </h3>
                  </div>
                  <div className="news-meta">
                    Updated: {item.updated} | By {item.author}
                  </div>
                  {item.description && (
                    <p className="news-description">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="news-column">
            {rightColumnItems.map((item, index) => (
              <div key={index} className="news-card">
                <div className="news-image-wrapper">
                  <div className="category-badge">{item.category}</div>
                  <Link href={`/post/${item.slug.current}`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={200}
                      height={150}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Link>
                </div>
                <div className="news-content">
                  <div className="news-title-wrapper">
                    <div className="play-icon"></div>
                    <h3 className="news-title">
                      <Link href={`/post/${item.slug.current}`}>
                        {item.title}
                      </Link>
                    </h3>
                  </div>
                  <div className="news-meta">
                    Updated: {item.updated} | By {item.author}
                  </div>
                  {item.description && (
                    <p className="news-description">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketNews;
