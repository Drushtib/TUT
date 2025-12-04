"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import ErrorPage from "../../pages/404";
import Loader from "../common/Loader";

const SliderOne = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["slider-post"],
    queryFn: async () => {
      const query = `*[_type == 'post' && featured == true]{
      title,
      slug,
      altText,
      publishedAt,
      'featureImg': mainImage.asset->url,
      'cate': categories[0]->title
    }| order(publishedAt desc) [0...5]`;

      const response = await client.fetch(query);
      return response;
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage />;
  if (!data || data.length === 0) return null;

  const featuredPost = data[0];
  const sidePosts = data.slice(1, 4);

  return (
    <div style={{ background: 'var(--background)', position: 'relative' }}>
      <div className="editorial-grid-70-30" style={{ gap: '3rem', alignItems: 'start' }}>
        {/* Large Featured Post (70%) */}
        <div className="editorial-card-featured" style={{ padding: '0', overflow: 'hidden' }}>
          <Link href={`/post/${featuredPost.slug.current}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{ position: 'relative', width: '100%', height: '500px', overflow: 'hidden' }}>
              <Image
                src={featuredPost.featureImg}
                alt={featuredPost?.altText || featuredPost.title}
                width={1200}
                height={800}
                style={{ 
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  transition: 'transform 0.5s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                padding: '3rem 2rem 2rem',
              }}>
                <div className="editorial-caption" style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>
                  {featuredPost.cate || 'Featured Story'}
                </div>
                <h2 className="editorial-title" style={{ 
                  marginBottom: '1rem',
                  color: 'var(--text)',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                }}>
                  {featuredPost.title}
                </h2>
                <Link
                  href={`/post/${featuredPost.slug.current}`}
                  style={{
                    display: 'inline-block',
                    background: 'var(--gradient-primary)',
                    color: 'var(--text-dark)',
                    padding: '0.75rem 2rem',
                    borderRadius: '50px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 15px rgba(187, 5, 5, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(187, 5, 5, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(187, 5, 5, 0.3)';
                  }}
                >
                  Read More
                </Link>
              </div>
            </div>
          </Link>
        </div>

        {/* Smaller Featured Posts (30%) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {sidePosts.map((post, index) => (
            <Link 
              key={post.slug.current} 
              href={`/post/${post.slug.current}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="editorial-card" style={{ 
                padding: '0',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--primary-color)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(68, 68, 68, 0.3)';
              }}
              >
                <div style={{ position: 'relative', width: '100%', height: '150px', overflow: 'hidden' }}>
                  <Image
                    src={post.featureImg}
                    alt={post?.altText || post.title}
                    width={600}
                    height={400}
                    style={{ 
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div className="editorial-caption" style={{ 
                    marginBottom: '0.5rem',
                    fontSize: '0.75rem',
                    color: 'var(--primary-color)'
                  }}>
                    {post.cate || 'Featured'}
                  </div>
                  <h3 className="editorial-headline" style={{ 
                    fontSize: '1.25rem',
                    marginBottom: '0.5rem',
                    lineHeight: '1.4'
                  }}>
                    {post.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderOne;
