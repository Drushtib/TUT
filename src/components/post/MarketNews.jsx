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
  <div className="recent-news-wrapper section-gap p-t-xs-15 p-t-sm-60" style={{ paddingTop: "8px", paddingBottom: "8px" }}>
      <div className="container">
        <div className="row align-items-stretch">
          <div className="col-lg-6" style={{ display: "flex" }}>
            <div style={{ marginBottom: "2px", width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
              <PostLayoutOne data={data[0]} />
            </div>
          </div>
          <div className="col-lg-6" style={{ display: "flex" }}>
            <div className="axil-recent-news" style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
              <SectionTitle
                title={`${data[0]?.category.title}` || "Market News"} // Dynamic title
                btnUrl={`/category/${data[0]?.category?.slug}`}
                btnText="all posts"
                pClass="m-b-xs-10"
              />
              <div className="axil-content" style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                {data.slice(1).map((post, index) => (
                  <div key={index} style={{ marginBottom: "10px" }}>
                    <PostLayoutTwo data={post} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketNews;
