import Image from "next/image";
import Link from "next/link";

const PostVideoOne = ({ data }) => {
  // Guard against null/undefined slug
  if (!data || !data.slug || !data.slug.current) {
    return null; // Don't render if slug is missing
  }

  const slug = data.slug.current;
  const postUrl = `/post/${slug}`;

  return (
    <div className="axil-img-container flex-height-container">
      <Link className="d-block h-100" href={postUrl}>
        <Image
          src={data.featureImg}
          alt={data?.altText || data.title}
          width={1000}
          height={1000}
          className="w-100"
        />
        <div className="grad-overlay grad-overlay__transparent" />
      </Link>
      <div className="media post-block grad-overlay__transparent position-absolute m-b-xs-30">
        <div className="media-body media-body__big">
          <div className="axil-media-bottom mt-auto">
            <h3 className="axil-post-title hover-line hover-line" style={{ color: '#ffffff' }}>
              <Link href={postUrl} style={{ color: '#ffffff' }}>{data.title}</Link>
            </h3>
          </div>
        </div>
        {/* End of .media-body */}
      </div>
      {/* End of .post-block */}
    </div>
  );
};

export default PostVideoOne;
