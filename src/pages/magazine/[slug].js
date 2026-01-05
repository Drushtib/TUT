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

  const { title, description, featureImg, publishedAt, issuuLink } = magazineContent;

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

      {/* ----------- MAGAZINE BOOK ONLY ------------- */}
      <div style={{ 
        maxWidth: '100vw', 
        margin: '0', 
        backgroundColor: '#000000',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1,
        padding: '0'
      }}>
        {/* Magazine Content - Issuu Embed Only */}
        {issuuLink ? (
          <div style={{
            width: '100vw',
            height: '100vh',
            margin: '0',
            padding: '0'
          }}>
            <iframe
              src={issuuLink}
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                border: 'none',
                margin: '0',
                padding: '0'
              }}
              allowFullScreen
              allow="autoplay"
                title={`${title} - Digital Magazine`}
              />
            </div>
        ) : (
          /* Fallback when no Issuu link */
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem',
            color: '#666',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh'
          }}>
            {featureImg && (
              <Image
                src={featureImg}
                alt={`${title} - Magazine Cover`}
                width={500}
                height={500}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  maxWidth: '500px'
                }}
              />
            )}
            
            <p style={{
              fontSize: '1.1rem',
              color: '#888',
              marginTop: '2rem'
            }}>
              The digital version of this magazine will be available soon.
            </p>
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
