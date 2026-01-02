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

  const { title, leaderPhoto, content, publishedAt, author, description, featureImg } = magazineContent;

  return (
    <>
      <HeadMetaDynamic metaData={magazineContent} />
      <HeaderOne />

      {/* ----------- MAGAZINE ARTICLE CONTENT ------------- */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '2rem',
        backgroundColor: '#ffffff'
      }}>
        {/* Leader Photo Section */}
        {leaderPhoto && (
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '3rem',
            position: 'relative'
          }}>
            <div style={{
              maxWidth: '600px',
              margin: '0 auto',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
            }}>
              <Image
                src={leaderPhoto}
                alt={`${title} - Leader Photo`}
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
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '800',
            color: '#171717',
            margin: '0 0 1rem 0',
            lineHeight: '1.2'
          }}>
            {title}
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
            {author && (
              <span style={{ fontWeight: '600' }}>
                By {author}
              </span>
            )}
            {publishedAt && (
              <span>
                {new Date(publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            )}
          </div>

          {/* Description */}
          {description && (
            <div style={{
              fontSize: '1.25rem',
              color: '#444',
              lineHeight: '1.6',
              maxWidth: '800px',
              margin: '0 auto 3rem auto',
              fontStyle: 'italic'
            }}>
              {description}
            </div>
          )}
        </div>

        {/* Article Content */}
        {content && (
          <div style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#333',
            maxWidth: '900px',
            margin: '0 auto'
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
        {!content && !leaderPhoto && (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem',
            color: '#666'
          }}>
            <p>Article content is not available at this time.</p>
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
