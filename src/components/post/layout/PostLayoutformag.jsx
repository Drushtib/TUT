import Image from "next/image";
import Link from "next/link";

const PostLayoutformag = ({ data }) => {
  return (
    <div className="post-container">
      <Link href={`/magazine/${data.slug.current}`}>
        <div className="image-container">
          <Image
            src={data.featureImg}
            alt={data?.altText || data.title}
            width={750}   // slightly increased width
            height={840}  // slightly reduced height
            className="img-fluid"
          />
        </div>
      </Link>
      <div className="title-container">
        <div className="line" />
        <h4
          style={{
            marginTop: "1rem",
            fontSize: "1.55rem",
            color: "#111",
            textAlign: "center",
          }}
        >
          <Link href={`/magazine/${data.slug.current}`} style={{ color: "#111" }}>
            {data.title}
          </Link>
        </h4>
      </div>

      <style jsx>{`
        .post-container {
          width: 100%;
          max-width: 340px; /* slightly increased from 300px */
          margin: 1rem auto;
        }

        .image-container {
          border-radius: 10px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 0;
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.12);
        }

        .image-container:hover {
          transform: scale(1.03);
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.18);
        }

        .line {
          width: 100%;
          height: 4px;
          background-color: #111;
          margin: 1rem 0;
        }

        .title-container h4,
        .title-container h4 a {
          color: #111111 !important;
        }

        /* Layout styling for 4 per row */
        :global(.magazine-grid) {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          justify-items: center;
        }

        @media (max-width: 1024px) {
          :global(.magazine-grid) {
            grid-template-columns: repeat(2, 1fr);
          }
          .post-container {
            max-width: 320px;
          }
        }

        @media (max-width: 768px) {
          :global(.magazine-grid) {
            grid-template-columns: repeat(1, 1fr);
          }
          .post-container {
            max-width: 90%;
          }
        }
      `}</style>
    </div>
  );
};

export default PostLayoutformag;
