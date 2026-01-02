import HeaderOne from "../../components/header/HeaderOne";
import { useRouter } from "next/router";
import { client } from "../../client";
import Loader from "../../components/common/Loader";
import ErrorFallback from "../../components/common/ErrorFallback";
import HeadMetaDynamic from "../../components/elements/HeadMetaDynamic";
import { useMagazineBySlug } from "../../hooks/useMagazines";

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

  const { issuuLink } = magazineContent;

  return (
    <>
      <HeadMetaDynamic metaData={magazineContent} />
      <HeaderOne />

      {/* ----------- ISSUU VIEWER ------------- */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
          border: "none",
          overflow: "hidden",
          margin: 0,
          padding: 0,
        }}
      >
        <iframe
          allow="clipboard-write"
          sandbox="allow-top-navigation allow-top-navigation-by-user-activation allow-downloads allow-scripts allow-same-origin allow-popups allow-modals allow-popups-to-escape-sandbox allow-forms"
          allowFullScreen={true}
          style={{
            position: "absolute",
            border: "none",
            width: "100%",
            height: "100%",
            inset: 0,
          }}
          src={issuuLink}
        />
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
