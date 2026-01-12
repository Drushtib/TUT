import SectionTitle from "../elements/SectionTitle";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import PostLayoutTwo from "./layout/PostLayoutTwo";
import Loader from "../common/Loader";
import PostLayoutTwo1 from "./layout/PostLayoutTwo1";
import { getBusinessBulletinQuery } from "../../lib/sanity/queries/posts";

const BusinessBulletin = () => {
  const limit = 8;
  const { data, isLoading, error } = useQuery({
    queryKey: ["business-bulletin", limit],
    queryFn: async () => {
      try {
        const query = getBusinessBulletinQuery(limit);
        console.log('Business Bulletin query:', query);
        const response = await client.fetch(query);
        console.log('Business Bulletin result:', response);
        return response;
      } catch (error) {
        console.error('Business Bulletin error:', error);
        throw error;
      }
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching posts</div>;

  if (!data) return null;

  return (
    <div style={{ background: '#f5f5f5', color: '#171717' }}>
      <div style={{ position: 'relative', marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          color: '#171717',
          margin: 0,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          textAlign: 'center'
        }}>
          {data[0]?.category.title || "Business Bulletin"}
        </h2>
        <Link 
          href={`/category/${data[0]?.category?.slug}`}
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: 'inherit',
            fontSize: '1.2rem',
            fontWeight: 500,
            color: '#000000',
            textDecoration: 'underline',
            textDecorationColor: '#000000',
            textTransform: 'none',
            letterSpacing: '1px',
            transition: 'opacity 0.3s ease',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          View all
        </Link>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        columnGap: '2rem',
        rowGap: '5rem'
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
                height: '250px',
                overflow: 'hidden',
                borderRadius: '8px',
                position: 'relative',
                marginBottom: '100px',
                background: '#f2f2f2'
              }}>
                <img
                  src={post.featureImg || '/images/placeholder.png'}
                  alt={post.altText || post.title || 'Post image'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    display: 'block'
                  }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/placeholder.png';
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
                background: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                padding: '0',
                marginTop: '-140px',
                marginLeft: '1.5rem',
                marginRight: '1.5rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
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
                  color: '#ffffff',
                  WebkitTextFillColor: '#ffffff',
                  padding: '0.5rem 1.5rem',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  width: '100%',
                  textAlign: 'center'
                }}>
                  {post.category?.title?.toUpperCase() || 'BUSINESS BULLETIN'}
                </div>
                
                {/* Content */}
                    <div style={{ padding: '1.5rem 1.5rem 1rem' }}>
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: '#171717',
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
                          fontSize: '1.4rem',
                          color: '#444444',
                          lineHeight: '1.6',
                          margin: 0,
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
