import AdBanner from "../common/AdBanner";
import WidgetAd from "../widget/WidgetAd";
import WidgetCategory from "../widget/WidgetCategory";
import WidgetInstagram from "../widget/WidgetInstagram";
import WidgetNewsletter from "../widget/WidgetNewsletter";
import WidgetPost from "../widget/WidgetPost";
import WidgetSocialShare from "../widget/WidgetSocialShare";
import PostLayoutTwo from "./layout/PostLayoutTwo";
import Link from "next/link";
import Image from "next/image";

import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import SectionTitle from "../elements/SectionTitle";
import Loader from "../common/Loader";

const MasterTalks = ({ postData, adBanner, pClass }) => {
  const query = `
*[_type == "post" && categories[0]._ref == *[_type == "category" && slug.current == "master-talks"][0]._id] 
{
  title,
   altText,
  slug,
  'featureImg': mainImage.asset->url,
  description,
  'category': {
    'title': categories[0]->title,
    'slug': categories[0]->slug.current
  },
  publishedAt
} | order(publishedAt desc)[0...7] 
`;
  const { data, isLoading, error } = useQuery({
    queryKey: ["categoryFivePosts"],
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
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          color: 'var(--text)',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          {data[0]?.category.title || "Master Talks"}
        </h2>
        <Link 
          href={`/category/${data[0]?.category?.slug}`}
          style={{
            color: 'var(--primary-color)',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'opacity 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          View All Posts →
        </Link>
      </div>
      
      <div className="editorial-grid-65-35" style={{ gap: '3rem', alignItems: 'stretch' }}>
        {/* Main Content - Card Grid */}
        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {data.slice(0, 6).map((post, index) => (
              <Link
                key={index}
                href={`/post/${post.slug.current}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="editorial-card" style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = 'var(--primary-color)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(68, 68, 68, 0.3)';
                }}
                >
                  {/* Image */}
                  <div style={{
                    width: '100%',
                    height: '200px',
                    overflow: 'hidden',
                    borderRadius: '8px 8px 0 0',
                    marginBottom: '1rem'
                  }}>
                    <Image
                      src={post.featureImg}
                      alt={post.altText || post.title}
                      width={400}
                      height={300}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                  </div>
                  
                  {/* Content */}
                  <div style={{ padding: '0 0.5rem 1rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{
                      display: 'inline-block',
                      background: 'var(--primary-color)',
                      color: 'var(--text-dark)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: '0.75rem',
                      width: 'fit-content'
                    }}>
                      {post.category?.title || 'Master Talks'}
                    </div>
                    
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: 'var(--text)',
                      marginBottom: '0.5rem',
                      lineHeight: '1.4',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {post.title}
                    </h3>
                    
                    {post.description && (
                      <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)',
                        lineHeight: '1.6',
                        marginTop: 'auto',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {post.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Sidebar - Compact */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          height: '100%'
        }}>
          <div className="post-sidebar" style={{ 
            display: "flex", 
            flexDirection: "column",
            gap: "0.75rem",
            height: '100%',
            justifyContent: 'flex-start'
          }}>
            <div style={{ 
              transform: 'scale(0.8)', 
              transformOrigin: 'top left',
              marginBottom: '-5%'
            }}>
              <WidgetNewsletter />
            </div>
            <div style={{ 
              transform: 'scale(0.8)', 
              transformOrigin: 'top left',
              marginBottom: '-5%'
            }}>
              <WidgetCategory cateData={data} />
            </div>
            <div style={{ 
              transform: 'scale(0.8)', 
              transformOrigin: 'top left',
              marginBottom: '-5%'
            }}>
              <WidgetSocialShare />
            </div>
            <div style={{ 
              transform: 'scale(0.8)', 
              transformOrigin: 'top left'
            }}>
              <WidgetPost dataPost={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterTalks;
