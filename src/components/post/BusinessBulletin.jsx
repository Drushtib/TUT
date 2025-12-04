import SectionTitle from "../elements/SectionTitle";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import PostLayoutTwo from "./layout/PostLayoutTwo";
import Loader from "../common/Loader";
import PostLayoutTwo1 from "./layout/PostLayoutTwo1";

const BusinessBulletin = () => {
  const query = `
*[_type == "post" && categories[0]._ref == *[_type == "category" && slug.current == "business-bulletin"][0]._id] 
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
    queryKey: ["business-bulletin"],
    queryFn: async () => {
      const response = await client.fetch(query);
      return response;
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching posts</div>;

  if (!data) return null;

  return (
    <div style={{ background: 'var(--background)', color: 'var(--text)' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          color: 'var(--text)',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          {data[0]?.category.title || "Business Bulletin"}
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
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {data.map((post, index) => (
          <Link
            key={index}
            href={`/post/${post.slug.current}`}
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              {/* Image Container */}
              <div style={{
                width: '100%',
                height: '320px',
                overflow: 'hidden',
                borderRadius: '20px',
                position: 'relative',
                marginBottom: '-10px'
              }}>
                <Image
                  src={post.featureImg}
                  alt={post.altText || post.title}
                  width={400}
                  height={400}
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
              
              {/* Content Container - Half-in, Half-out with Negative Margin */}
              <div style={{ 
                background: 'var(--background)',
                border: '1px solid rgba(68, 68, 68, 0.3)',
                borderRadius: '8px',
                padding: '0',
                marginTop: '-140px',
                marginLeft: '1.5rem',
                marginRight: '1.5rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                zIndex: 2,
                overflow: 'hidden'
              }}>
                {/* Red Banner at Top */}
                <div style={{
                  background: 'var(--primary-color)',
                  color: 'var(--text-dark)',
                  padding: '0.5rem 1.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  width: '100%'
                }}>
                  {post.category?.title?.toUpperCase() || 'BUSINESS BULLETIN'}
                </div>
                
                {/* Content */}
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    marginBottom: '0.75rem',
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BusinessBulletin;
