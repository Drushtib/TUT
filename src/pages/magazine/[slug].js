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

  const {
    data: magazineContent,
    isLoading: isLoadingMagazine,
    error: errorMagazine,
  } = useMagazineBySlug(slug, {
    initialData: initialMagazineContent?.[0],
  });

  const {
    data: allArticles,
    isLoading: isLoadingAllArticles,
    error: errorAllArticles,
  } = useWebProfiles(QUERY_LIMITS.RELATED_POSTS || 3, {
    initialData: initialAllArticles,
  });

  // Fetch linked article separately since it's not a standard hook
  const linkedArticle = initialCurrentMagArticle?.[0] || null;

  if (isLoadingMagazine || isLoadingAllArticles) return <Loader />;
  if (errorMagazine) return <ErrorFallback error={errorMagazine} />;
  if (errorAllArticles) return <ErrorFallback error={errorAllArticles} />;
  if (!magazineContent) return <div>No magazine content found</div>;

  const { issuuLink } = magazineContent;

  return (
    <>
      <HeadMetaDynamic metaData={magazineContent} />

      <HeaderOne />
      <div
        style={{
          position: "relative",
          height: "90vh",
          width: "100%",
          paddingBottom: "0px",
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
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
          src={issuuLink}
        />
      </div>
      <div style={{ marginTop: 0 }}>
        <RelatedArticles
          currentMagArticle={linkedArticle ? [linkedArticle] : []}
          allMagazinesArticles={allArticles}
        />
        <FooterTwo />
      </div>
    </>
  );
};

export default MagazineDetails;

export async function getStaticProps({ params }) {
  const { slug } = params;

  const magazineQuery = getMagazineBySlugQuery(slug);
  const relatedArticlesQuery = getRelatedArticlesForMagazineQuery(3);
  const linkedArticleQuery = getLinkedArticleForMagazineQuery(slug);

  const [initialMagazineContent, initialAllArticles, initialCurrentMagArticle] = await Promise.all([
    client.fetch(magazineQuery).then((result) => result?.[0] ? [result[0]] : []),
    client.fetch(relatedArticlesQuery),
    client.fetch(linkedArticleQuery).then((result) => result || []),
  ]);

  return {
    props: {
      initialMagazineContent,
      initialAllArticles,
      initialCurrentMagArticle,
    },
  };
}

export async function getStaticPaths() {
  const query = getAllMagazineSlugsQuery();
  const slugs = await client.fetch(query);

  const paths = slugs
    .map((magazine) => magazine?.slug?.current)
    .filter(Boolean)
    .map((slug) => ({
      params: { slug },
    }));

  return {
    paths,
    fallback: "blocking",
  };
}
