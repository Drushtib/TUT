import { Tab, Nav } from "react-bootstrap";
import PostVideoTwo from "../post/layout/PostVideoTwo";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";

const WidgetPost = () => {
  const webProfilesLimit = 7;
  const marketNewsLimit = 7;
  const businessBulletinsLimit = 7;
  const queryWebProfiles = `
*[_type == "post" && "web-profiles" in categories[]->slug.current] 
 {
    title,
    slug,
    'featureImg': mainImage.asset->url,
     'category': {
    'title': categories[0]->title,
    altText,
    'slug': categories[0]->slug.current,
    },
    publishedAt

} | order(publishedAt desc)[0...${webProfilesLimit}] 
`;
  const { data: webProfileData } = useQuery({
    queryKey: ["web-profile", webProfilesLimit],
    queryFn: async () => {
      const response = await client.fetch(queryWebProfiles);
      return response;
    },
  });

  const orderedWebProfiles = (() => {
    if (!webProfileData || webProfileData.length === 0) return [];

    const desiredOrder = [
      "ben sadgrove",
      "shoumo mitra",
      "magnolia yace",
      "devang raja",
      "aanchal gupta",
      "jordan meinster",
      "manuel rendon",
    ];

    const remaining = [...webProfileData];
    const picked = [];

    desiredOrder.forEach((needle) => {
      const idx = remaining.findIndex((p) => (p.title || "").toLowerCase().includes(needle));
      if (idx >= 0) {
        picked.push(remaining[idx]);
        remaining.splice(idx, 1);
      }
    });

    return picked.concat(remaining);
  })();

  const queryMarketNews = `
*[_type == "post" && "market-news" in categories[]->slug.current] 
 {
    title,
    slug,
    'featureImg': mainImage.asset->url,
     'category': {
    'title': categories[0]->title,
    altText,
    'slug': categories[0]->slug.current,
    },
    publishedAt

} | order(publishedAt desc)[0...${marketNewsLimit}] 
`;
  const { data: marketNewsData } = useQuery({
    queryKey: ["market-news", marketNewsLimit],
    queryFn: async () => {
      const response = await client.fetch(queryMarketNews);
      return response;
    },
  });

  const queryBusinessBulletins = `
*[_type == "post" && "business-bulletin" in categories[]->slug.current] 
 {
    title,
    slug,
    'featureImg': mainImage.asset->url,
     'category': {
    'title': categories[0]->title,
    altText,
    'slug': categories[0]->slug.current,
    },
    publishedAt

} | order(publishedAt desc)[0...${businessBulletinsLimit}] 
`;
  const { data: businessBulletinData } = useQuery({
    queryKey: ["business-bulletin", businessBulletinsLimit],
    queryFn: async () => {
      const response = await client.fetch(queryBusinessBulletins);
      return response;
    },
  });

  return (
    <div className="post-widget sidebar-post-widget m-b-xs-40">
      <Tab.Container id="widget-post" defaultActiveKey="recent">
        <Nav variant="pills" className="row no-gutters">
          <Nav.Item className="col">
            <Nav.Link eventKey="recent">Web Profiles</Nav.Link>
          </Nav.Item>
          <Nav.Item className="col">
            <Nav.Link eventKey="popular">Market News</Nav.Link>
          </Nav.Item>
          <Nav.Item className="col">
            <Nav.Link eventKey="comments">Business Bulletins</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="recent">
            {orderedWebProfiles && orderedWebProfiles?.length > 0 ? (
              orderedWebProfiles
                .slice(0, webProfilesLimit)
                .map((data, index) => (
                  <PostVideoTwo data={data} pClass="" key={index} />
                ))
            ) : (
              <p>No posts found.</p>
            )}
          </Tab.Pane>
          <Tab.Pane eventKey="popular">
            {marketNewsData && marketNewsData?.length > 0 ? (
              marketNewsData
                .slice(0, marketNewsLimit)
                .map((data, index) => (
                  <PostVideoTwo data={data} pClass="" key={index} />
                ))
            ) : (
              <p>No posts found.</p>
            )}
          </Tab.Pane>
          <Tab.Pane eventKey="comments">
            {businessBulletinData && businessBulletinData.length > 0 ? (
              businessBulletinData
                .slice(0, businessBulletinsLimit)
                .map((data, index) => (
                  <PostVideoTwo data={data} pClass="" key={index} />
                ))
            ) : (
              <p>No posts found.</p>
            )}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default WidgetPost;
