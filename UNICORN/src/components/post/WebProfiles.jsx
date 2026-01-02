import SectionTitle from "../elements/SectionTitle";
import PostVideoOne from "./layout/PostVideoOne";
import PostVideoTwo from "./layout/PostVideoTwo";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";
import { useState } from "react";

const WebProfiles = () => {
  const [selectedProfile, setSelectedProfile] = useState(0);
  
  const query = `
*[_type == "post" && categories[0]._ref == *[_type == "category" && slug.current == "web-profiles"][0]._id] 
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

} | order(publishedAt desc)[0...5] 
`;
  const { data, isLoading, error } = useQuery({
    queryKey: ["web-profiles"],
    queryFn: async () => {
      const response = await client.fetch(query);
      return response;
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching posts</div>;

  if (!data) return null;

  // Reorder data: Magnolia Yace first, Devang Raja second, Aanchal Gupta third
  const reorderedData = [...data];
  
  // Find and extract items
  const magnoliaItem = reorderedData.find(item => 
    item.title.toLowerCase().includes('magnolia') || 
    item.title.toLowerCase().includes('yace')
  );
  
  const devangItem = reorderedData.find(item => 
    item.title.toLowerCase().includes('devang') || 
    item.title.toLowerCase().includes('raja')
  );
  
  const anchelItem = reorderedData.find(item => 
    item.title.toLowerCase().includes('anchel') || 
    item.title.toLowerCase().includes('aanchal') ||
    item.title.toLowerCase().includes('gupta')
  );
  
  // Remove found items from array
  if (magnoliaItem) {
    const index = reorderedData.indexOf(magnoliaItem);
    if (index > -1) reorderedData.splice(index, 1);
  }
  if (devangItem) {
    const index = reorderedData.indexOf(devangItem);
    if (index > -1) reorderedData.splice(index, 1);
  }
  if (anchelItem) {
    const index = reorderedData.indexOf(anchelItem);
    if (index > -1) reorderedData.splice(index, 1);
  }
  
  // Insert items at the beginning in the correct order
  const orderedItems = [];
  if (magnoliaItem) orderedItems.push(magnoliaItem);
  if (devangItem) orderedItems.push(devangItem);
  if (anchelItem) orderedItems.push(anchelItem);
  
  // Combine ordered items with remaining items
  reorderedData.unshift(...orderedItems);

  const handleProfileClick = (index) => {
    setSelectedProfile(index);
  };

  return (
    <div className="axil-video-posts section-gap section-gap-top__with-text" style={{ background: '#000', color: '#fff' }}>
      <div className="container">
        <SectionTitle
          btnUrl={`/category/${data[0]?.category?.slug}`}
          title={`${data[0]?.category.title}` || "Web Profiles"}
          btnText="Read all Articles"
          pClass="title-white m-b-xs-40"
        />
        <div className="row">
          <div className="col-lg-8">
            <PostVideoOne data={reorderedData[selectedProfile]} />
          </div>
          <div className="col-lg-4">
            <div className="webprofile-names-list">
              <h4 className="names-list-title">Select Profile</h4>
              {reorderedData.map((post, index) => (
                <div
                  key={index}
                  className={`name-item ${selectedProfile === index ? 'active' : ''}`}
                  onClick={() => handleProfileClick(index)}
                >
                  <div className="name-content">
                    <div className="name-image">
                      <img 
                        src={post.featureImg} 
                        alt={post.title}
                        width={60}
                        height={60}
                      />
                    </div>
                    <span className="name-text">{post.title}</span>
                  </div>
                  <div className="name-indicator"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <style jsx>{`
          .webprofile-main-image img {
            max-width: 250px;
            max-height: 180px;
            object-fit: cover;
          }
          
          .webprofile-names-list {
            padding: 20px;
            background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            height: fit-content;
          }
          
          .names-list-title {
            color: #D4AF37;
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 20px;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .name-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 20px;
            margin-bottom: 10px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid transparent;
            position: relative;
            overflow: hidden;
          }
          
          .name-content {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          
          .name-image {
            width: 70px;
            height: 60px;
            border-radius: 6px;
            overflow: hidden;
            flex-shrink: 0;
          }
          
          .name-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 6px;
          }
          
          .name-item:hover {
            background: rgba(212, 175, 55, 0.1);
            transform: translateX(5px);
            border-color: rgba(212, 175, 55, 0.3);
          }
          
          .name-item.active {
            background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%);
            color: #000;
            border-color: #D4AF37;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
          }
          
          .name-item.active .name-text {
            color: #000;
            font-weight: 600;
          }
          
          .name-text {
            color: #fff;
            font-size: 1rem;
            font-weight: 500;
            transition: all 0.3s ease;
          }
          
          .name-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transition: all 0.3s ease;
          }
          
          .name-item.active .name-indicator {
            background: #000;
            transform: scale(1.2);
          }
          
          .name-item:hover .name-indicator {
            background: #D4AF37;
            transform: scale(1.1);
          }
        `}</style>
      </div>
    </div>
  );
};

export default WebProfiles;
