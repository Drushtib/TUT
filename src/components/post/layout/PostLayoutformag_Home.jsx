import Image from "next/image";
import Link from "next/link";

const PostLayoutformag_Home = ({ data }) => {
  return (
    <div className="content-block">
      <Link href={`/magazine/${data.slug.current}`}>
        <div
          style={{
            padding: "10px", // adjust padding as needed
            border: "3px solid var(--primary-color)", // red border
            borderRadius: "8px", // adjust border radius for rounded corners
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)", // add a subtle shadow
            overflow: "hidden",
            margin: "2rem",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <Image
              src={data.featureImg}
              alt={data?.altText || data.title}
              width={1000}
              height={1000}
              className="img-fluid"
              style={{ display: "block" }}
            />
          </div>
          <div className="caption-content">
            <h4
              className="hover-line hover-line"
              style={{
                fontSize: "1.3rem",
                color: "var(--text-dark)",
                textDecoration: "none",
                marginTop: "2rem",
                padding: "0",
              }}
            >
              <Link
                href={`/magazine/${data.slug.current}`}
                style={{ color: "var(--text-dark)", textDecoration: "none" }}
              >
                {data.title}
              </Link>
            </h4>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostLayoutformag_Home;
