import SectionTitle from "../elements/SectionTitle";
import PostLayoutOne from "./layout/PostLayoutOne";
import PostLayoutTwo from "./layout/PostLayoutTwo";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";

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

} | order(publishedAt desc)[0...4] 
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

  if (!data) return null;

  return (
    <div style={{ background: 'var(--background)' }}>
      <div className="editorial-grid-60-40" style={{ gap: '3rem', alignItems: 'start' }}>
        {/* Large Featured Post (60%) */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <PostLayoutOne data={data[0]} />
        </div>
        
        {/* Sidebar with List (40%) */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <SectionTitle
            title={`${data[0]?.category.title}` || "Market News"}
            btnUrl={`/category/${data[0]?.category?.slug}`}
            btnText="all posts"
            pClass="m-b-xs-10"
          />
          <div className="axil-content" style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
            {data.slice(1).map((post, index) => (
              <div key={index}>
                <PostLayoutTwo data={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketNews;
