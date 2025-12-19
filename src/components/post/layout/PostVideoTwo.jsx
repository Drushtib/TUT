import Image from "next/image";
import Link from "next/link";

const PostVideoTwo = ({ data, pClass }) => {
  // Guard against null/undefined slug
  if (!data || !data.slug || !data.slug.current) {
    return null; // Don't render if slug is missing
  }

  const slug = data.slug.current;
  const postUrl = `/post/${slug}`;

  return (
    <div
      className={`media post-block post-block__small ${
        pClass ?? "post-block__on-dark-bg m-b-xs-30"
      }`}
      style={{ gap: "0.75rem" }}
    >
      <Link className="align-self-center" href={postUrl}>
        <Image
          src={data.featureImg}
          alt={data?.altText || data.title}
          width={1000}
          height={100}
          style={{ objectFit: "contain" }}
        />
      </Link>

      <div className="media-body my-auto">
        <h3 className="axil-post-title">
          <Link href={postUrl} style={{ color: "#000000" }}>
            {data?.title}
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default PostVideoTwo;
