import { useRouter } from "next/router";
import HeaderOne from "../../components/header/HeaderOne";
import FooterTwo from "../../components/footer/FooterTwo";
import Loader from "../../components/common/Loader";
import ErrorFallback from "../../components/common/ErrorFallback";
import HeadMetaDynamic from "../../components/elements/HeadMetaDynamic";
import { PortableText } from "@portabletext/react";
import { RichTextComponent } from "../../components/post/RichTextComponent";
import { client } from "../../client";
import { useEffect, useState } from "react";
import Link from "next/link";

/* ======================================================
   PAGE COMPONENT
====================================================== */

const PostDetails = ({ post }) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  if (router.isFallback) return <Loader />;

  if (!post) return <ErrorFallback error={{ message: "Post not found" }} />;

  return (
    <>
      <HeadMetaDynamic metaData={post} />
      <HeaderOne />

      <div className="postPage">
        <div className="postContainer">

          <div className={`postHeader ${isVisible ? "animate-in" : ""}`}>
            <h1 className="postTitle">{post.title}</h1>
          </div>

          <div className={`postHero ${isVisible ? "animate-in" : ""}`}>
            <img
              src={post.featureImg || "/images/placeholder.png"}
              alt={post.altText || post.title}
            />
          </div>

          {post.description && (
            <div className={`postIntro ${isVisible ? "animate-in" : ""}`}>
              <p>{post.description}</p>
            </div>
          )}

          <article className={`postBody ${isVisible ? "animate-in" : ""}`}>
            {post.body && (
              <PortableText value={post.body} components={RichTextComponent} />
            )}
          </article>

          {post.related?.length > 0 && (
            <section className="relatedSection">
              <h2>Related Blogs</h2>

              <div className="relatedGrid">
                {post.related.map((item) => (
                  <div key={item.slug} className="relatedCard">
                    <img
                      src={item.featureImg || "/images/placeholder.png"}
                      alt={item.title}
                    />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <Link href={`/post/${item.slug}`}>Read More</Link>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>

      <FooterTwo />
    </>
  );
};

export default PostDetails;

/* ======================================================
   SERVER SIDE FETCH (SAFE)
====================================================== */

export async function getServerSideProps({ params }) {
  const { slug } = params;

  if (!slug) {
    return { notFound: true };
  }

  try {
    /* ---------- MAIN POST ---------- */
    const postQuery = `
      *[_type == "post" && slug.current == $slug][0]{
        title,
        description,
        body,
        altText,
        publishedAt,
        "slug": slug.current,
        "featureImg": mainImage.asset->url,
        categories[]->{
          title
        }
      }
    `;

    const post = await client.fetch(postQuery, { slug });

    if (!post) {
      return { notFound: true };
    }

    /* ---------- RELATED POSTS ---------- */
    const relatedQuery = `
      *[
        _type == "post" &&
        slug.current != $slug
      ] | order(publishedAt desc)[0...4]{
        title,
        description,
        "slug": slug.current,
        "featureImg": mainImage.asset->url
      }
    `;

    const related = await client.fetch(relatedQuery, { slug });

    return {
      props: {
        post: {
          ...post,
          related: related || [],
        },
      },
    };
  } catch (error) {
    console.error("SSR ERROR:", error);
    return { notFound: true };
  }
}
