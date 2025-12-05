import HeaderOne from "../../components/header/HeaderOne";
import FooterTwo from "../../components/footer/FooterTwo";
import RelatedArticles from "../../components/post/RelatedArticles";
import { useRouter } from "next/router";
import { client } from "../../client";
import Loader from "../../components/common/Loader";
import ErrorFallback from "../../components/common/ErrorFallback";
import HeadMetaDynamic from "../../components/elements/HeadMetaDynamic";
import { useMagazineBySlug } from "../../hooks/useMagazines";
import { useWebProfiles } from "../../hooks/usePosts";
import { QUERY_LIMITS } from "../../config/constants";

import {
  getMagazineBySlugQuery,
  getAllMagazineSlugsQuery,
} from "../../lib/sanity/queries/magazines";

import {
  getRelatedArticlesForMagazineQuery,
  getLinkedArticleForMagazineQuery,
} from "../../lib/sanity/queries/posts";

const MagazineDetails = ({
  initialMagazineContent,
  initialAllArticles,
  initialCurrentMagArticle,
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

  /** ---------------- FETCH RELATED ARTICLES ---------------- */
  const {
    data: allArticles,
    isLoading: isLoadingAllArticles,
    error: errorAllArticles,
  } = useWebProfiles(QUERY_LIMITS.RELATED_POSTS || 3, {
    enabled: !!slug,                        // ✅ Add enabled condition
    initialData: initialAllArticles || [],
  });

  /** ---------------- FIX LINKED ARTICLE FORMAT ---------------- */
  const linkedArticle =
    initialCurrentMagArticle?.length ? initialCurrentMagArticle[0] : null;

  /** ---------------- ERROR & LOADING HANDLING ---------------- */
  if (isLoadingMagazine || isLoadingAllArticles) return <Loader />;
  if (errorMagazine) return <ErrorFallback error={errorMagazine} />;
  if (errorAllArticles) return <ErrorFallback error={errorAllArticles} />;

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
          height: "90vh",
          width: "100%",
          border: "2px solid black",
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

      {/* ----------- RELATED ARTICLES SECTION ----------- */}
      <div style={{ marginTop: 0 }}>
        <RelatedArticles
          currentMagArticle={linkedArticle ? [linkedArticle] : []}
          allMagazinesArticles={allArticles || []}
        />
        <FooterTwo />
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
  const relatedArticlesQuery = getRelatedArticlesForMagazineQuery(3);
  const linkedArticleQuery = getLinkedArticleForMagazineQuery(slug);

  const [magData, relatedArticles, linkedArticle] = await Promise.all([
    client.fetch(magazineQuery),
    client.fetch(relatedArticlesQuery),
    client.fetch(linkedArticleQuery),
  ]);

  return {
    props: {
      initialMagazineContent: magData?.[0] || null,   // ✅ normalized
      initialAllArticles: relatedArticles || [],
      initialCurrentMagArticle: linkedArticle || [],
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
