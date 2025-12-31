import Image from "next/image";
import Link from "next/link";

const PostLayoutOne = ({ data }) => {
  return (
    <div
      className="axil-latest-post"
      style={
        {
          // background: "#ec597c",
        }
      }
    >
      <div className="media post-block m-b-xs-20">
        <figure className="fig-container" style={{ position: "relative", display: "inline-block", margin: 0 }}>
          <Link href={`/Magazine/${data?.slug.current}`}>
            <Image
              src={data?.featureImg}
              alt={data?.altText || data?.title}
              width={0}
              height={0}
              sizes="100vw"
              placeholder="blur"
              blurDataURL="/images/placeholder.png"
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </Link>
          <div
            className="post-cat-group m-b-xs-10"
            style={{
              position: "absolute",
              left: 16,
              bottom: -12,
              zIndex: 2
            }}
          >
            <Link
              className={`post-cat cat-btn ${"bg-color-blue-one"}`}
              href={`/category/${data?.category.slug}`}
            >
              {data?.category.title}
            </Link>
          </div>
        </figure>
        <div className="media-body" style={{ marginTop: 4 }}>
          <h3 className="axil-post-title hover-line hover-line">
            <Link href={`/post/${data?.slug.current}`}>{data?.title}</Link>
          </h3>
        </div>
      </div>
      {/* End of .post-block */}
    </div>
  );
};

export default PostLayoutOne;
