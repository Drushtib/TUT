import Image from "next/image";
import Link from "next/link";

const PostLayoutformag_Home = ({ data }) => {
  return (
    <div className="content-block">
      <Link href={`/magazine/${data.slug.current}`}>
        <div
          className="magazine-card-container"
          style={{
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            overflow: "visible",
            margin: "2rem",
            transition: "all 0.3s ease",
            height: "520px",
            minHeight: "520px",
            maxHeight: "520px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="magazine-image-wrapper" style={{ 
            marginBottom: "8px",
            overflow: "visible",
            padding: "10px",
            position: "relative",
            flex: "0 0 auto",
            minHeight: "400px",
            maxHeight: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Image
              src={data.featureImg}
              alt={data?.altText || data.title}
              width={1000}
              height={1000}
              className="img-fluid magazine-image"
              style={{ 
                display: "block",
                width: "100%",
                height: "auto",
                maxHeight: "380px",
                transition: "transform 0.3s ease",
                objectFit: "contain"
              }}
            />
          </div>
          <div className="caption-content" style={{
            flex: "0 0 auto",
            display: "flex",
            alignItems: "flex-start"
          }}>
            <h4
              className="hover-line hover-line magazine-title"
              style={{
                fontSize: "1.6rem",
                color: "var(--text-dark)",
                textDecoration: "none",
                marginTop: "0.5rem",
                marginBottom: "0",
                padding: "0",
                fontWeight: 600,
                lineHeight: "1.5",
              }}
            >
              <Link
                href={`/magazine/${data.slug.current}`}
                style={{ 
                  color: "var(--text-dark)", 
                  textDecoration: "none",
                  transition: "color 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#545454";
                  e.currentTarget.style.textDecoration = "none";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-dark)";
                  e.currentTarget.style.textDecoration = "none";
                }}
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
