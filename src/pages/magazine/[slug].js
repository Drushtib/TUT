import HeaderOne from "../../components/header/HeaderOne";
import { useRouter } from "next/router";
import { client } from "../../client";
import Loader from "../../components/common/Loader";
import ErrorFallback from "../../components/common/ErrorFallback";
import HeadMetaDynamic from "../../components/elements/HeadMetaDynamic";
import { useMagazineBySlug } from "../../hooks/useMagazines";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

import {
  getMagazineBySlugQuery,
  getAllMagazineSlugsQuery,
} from "../../lib/sanity/queries/magazines";

const MagazineDetails = ({
  initialMagazineContent,
}) => {
  const router = useRouter();
  const { slug } = router.query;

  /** ---------------- FETCH MAGAZINE CONTENT ---------------- */
  const {
    data: magazineContent,
    isLoading: isLoadingMagazine,
    error: errorMagazine,
  } = useMagazineBySlug(slug, {
    enabled: !!slug,                        // ✅ PREVENT QUERIES BEFORE SLUG EXISTS
    initialData: initialMagazineContent || null,
  });

  /** ---------------- ERROR & LOADING HANDLING ---------------- */
  if (isLoadingMagazine) return <Loader />;
  if (errorMagazine) return <ErrorFallback error={errorMagazine} />;

  if (!magazineContent) return <div>No magazine content found</div>;

  // Debug: Log the magazine content to see what fields are available
  console.log('Magazine Content:', magazineContent);

  const { title, linkedArticle, description, featureImg, publishedAt } = magazineContent;
  
  // Get the first linked article (or use magazine data as fallback)
  const article = linkedArticle && linkedArticle.length > 0 ? linkedArticle[0] : null;
  const articleTitle = article?.title || title;
  const leaderPhoto = article?.leaderPhoto || featureImg;
  const content = article?.content;
  const articleDescription = article?.description || description;
  const articlePublishedAt = article?.publishedAt || publishedAt;

  return (
    <>
      <HeadMetaDynamic metaData={magazineContent} />
      <HeaderOne />
      
      {/* Global background override */}
      <style jsx global>{`
        body {
          background-color: #ffffff !important;
          background: #ffffff !important;
        }
        html {
          background-color: #ffffff !important;
          background: #ffffff !important;
        }
        #__next {
          background-color: #ffffff !important;
          background: #ffffff !important;
        }
        div {
          background-color: transparent !important;
        }
        .magazines-grid-wrapper {
          background-color: #ffffff !important;
        }
        .grid-wrapper {
          background-color: #ffffff !important;
        }
      `}</style>

      {/* ----------- MAGAZINE ARTICLE CONTENT ------------- */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Leader Photo Section */}
        {(leaderPhoto || featureImg) && (
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '3rem',
            position: 'relative',
            padding: '2rem 2rem 0 2rem'
          }}>
            <div style={{
              maxWidth: '500px',
              margin: '0 auto',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
            }}>
              <Image
                src={leaderPhoto || featureImg}
                alt={`${articleTitle} - Leader Photo`}
                width={600}
                height={600}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
        )}

        {/* Article Title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '0 2rem' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '800',
            color: '#171717',
            margin: '0 0 1rem 0',
            lineHeight: '1.2'
          }}>
            {articleTitle}
          </h1>
          
          {/* Article Meta */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
            fontSize: '1rem',
            color: '#666',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            {articlePublishedAt && (
              <span>
                {new Date(articlePublishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            )}
          </div>

          {/* Description */}
          {articleDescription && (
            <div style={{
              fontSize: '1.25rem',
              color: '#444',
              lineHeight: '1.6',
              maxWidth: '800px',
              margin: '0 auto 3rem auto',
              fontStyle: 'italic'
            }}>
              {articleDescription}
            </div>
          )}

          {/* Leader Description Section */}
          <div style={{
            fontSize: '1.1rem',
            color: '#333',
            lineHeight: '1.7',
            maxWidth: '900px',
            margin: '0 auto 3rem auto',
            padding: '2rem',
            backgroundColor: '#fafafa',
            borderRadius: '12px',
            border: '1px solid #e5e5e5'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#171717',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              About the Leader
            </h3>
            <p style={{
              margin: '0',
              textAlign: 'center',
              color: '#555'
            }}>
              Suzanne Robb is a distinguished leader in the health, wellness, and fitness industry, 
              serving as the Chief Operating Officer at Alloy Personal Training Franchise. With her 
              innovative approach and dedication to transforming the fitness landscape, she has been 
              recognized as one of the most trailblazing women leaders to watch in 2025. Her expertise 
              in franchise development and commitment to excellence has positioned her as a key figure 
              in shaping the future of personal training and wellness services.
            </p>
          </div>
        </div>

        {/* Article Content */}
        {content && (
          <div style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#333',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <PortableText
              value={content}
              components={{
                block: {
                  normal: ({children}) => <p style={{ marginBottom: '1.5rem' }}>{children}</p>,
                  h1: ({children}) => <h1 style={{ fontSize: '2.5rem', fontWeight: '700', margin: '2rem 0 1rem 0', color: '#171717' }}>{children}</h1>,
                  h2: ({children}) => <h2 style={{ fontSize: '2rem', fontWeight: '600', margin: '1.5rem 0 0.75rem 0', color: '#171717' }}>{children}</h2>,
                  h3: ({children}) => <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: '1.25rem 0 0.5rem 0', color: '#171717' }}>{children}</h3>,
                },
                listItem: ({children}) => <li style={{ marginBottom: '0.5rem', marginLeft: '1.5rem' }}>{children}</li>,
              }}
            />
          </div>
        )}

        {/* Fallback if no content */}
        {!content && !(leaderPhoto || featureImg) && (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem',
            color: '#666'
          }}>
            <p>Article content is not available at this time.</p>
            {/* Debug info */}
            <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#999' }}>
              <p>Debug: Available fields: {Object.keys(magazineContent).join(', ')}</p>
              <p>Has linkedArticle: {!!linkedArticle && linkedArticle.length > 0}</p>
              <p>Has featureImg: {!!featureImg}</p>
              <p>Has content: {!!content}</p>
              <p>Has description: {!!articleDescription}</p>
              <p>Linked article count: {linkedArticle?.length || 0}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MagazineDetails;

/* ------------------------------------------------------ */
/* ------------------- STATIC PROPS ---------------------- */
/* ------------------------------------------------------ */

export async function getStaticProps({ params }) {
  const { slug } = params;

  const magazineQuery = getMagazineBySlugQuery(slug);

  const magData = await client.fetch(magazineQuery);

  return {
    props: {
      initialMagazineContent: magData?.[0] || null,   // ✅ normalized
    },
    revalidate: 10,
  };
}

/* ------------------------------------------------------ */
/* ------------------- STATIC PATHS --------------------- */
/* ------------------------------------------------------ */

export async function getStaticPaths() {
  const query = getAllMagazineSlugsQuery();
  const slugs = await client.fetch(query);

  const paths = slugs
    .map((mag) => mag?.slug?.current)
    .filter(Boolean)
    .map((slug) => ({
      params: { slug },
    }));

  return {
    paths,
    fallback: "blocking",
  };
}
