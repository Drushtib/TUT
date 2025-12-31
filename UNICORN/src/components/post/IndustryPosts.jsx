import SectionTitle from "../elements/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";
import Image from "next/image";
import Link from "next/link";

const IndustryPosts = () => {
  const query = `*[_type == "industryPost"]{
    title,
    slug,
    altText,
    "featureImg": mainImage.asset->url,
    publishedAt,
    description,
    "category": {
      "title": industryCategory->title,
      "slug": industryCategory->slug.current
    }
  } | order(publishedAt desc)[0...6]`;

  const { data, isLoading, error } = useQuery({
    queryKey: ["industry-posts"],
    queryFn: async () => {
      const response = await client.fetch(query);
      return response;
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching industry posts</div>;
  if (!data) return null;

  return (
    <div className="section-gap section-gap-top__with-text" style={{ background: "#000", color: "#fff" }}>
      <div className="container">
        <SectionTitle
          title="Industry Posts"
          btnText="All Posts"
          btnUrl={"/industries"}
          pClass="title-white m-b-xs-40"
        />
        <div className="row">
          {data.map((post) => (
            <div className="col-lg-4 col-md-6" key={post.slug?.current || post.title}>
              <div
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  background: "rgba(0, 0, 0, 0.45)",
                }}
              >
                <Link href={`/industry-post/${post.slug?.current}`} style={{ display: "block" }}>
                  <div style={{ position: "relative", width: "100%", height: 180, overflow: "hidden" }}>
                    <Image
                      src={post.featureImg}
                      alt={post.altText || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      placeholder="blur"
                      blurDataURL="/images/placeholder.png"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </Link>

                <div style={{ padding: 16 }}>
                  <div className="post-cat-group m-b-xs-10">
                    <Link className={`post-cat cat-btn ${"bg-color-blue-one"}`} href={`/industries/${post.category?.slug}`}>
                      {post.category?.title}
                    </Link>
                  </div>
                  <h3 className="axil-post-title hover-line hover-line color-white" style={{ marginBottom: 8 }}>
                    <Link href={`/industry-post/${post.slug?.current}`}>{post.title}</Link>
                  </h3>
                  <p className="mid" style={{ marginBottom: 0, color: "rgba(255,255,255,0.85)" }}>
                    {post?.description && post.description.length > 80
                      ? `${post.description.slice(0, 120)}...`
                      : post.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustryPosts;
