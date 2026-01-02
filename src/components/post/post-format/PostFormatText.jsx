import Image from "next/image";
import { RichTextComponent } from "../RichTextComponent";
import { PortableText } from "@portabletext/react";
import { useState, useEffect } from "react";

const PostFormatText = ({ postData, allData }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style jsx>{`
        .post-single-wrapper {
          background-color: #ffffff;
          padding: 2rem 0;
        }

        .site-main {
          animation: slideInFromTop 0.8s ease forwards;
        }

        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .post-details {
          background: #ffffff;
          border-radius: 0;
          overflow: visible;
          box-shadow: none;
          border: none;
          padding: 2rem;
        }

        .single-blog-wrapper {
          padding: 0;
          background: #ffffff;
        }

        .axil-post-title {
          color: #000000;
          font-size: clamp(2rem, 4vw, 2.5rem);
          font-weight: 800;
          margin-bottom: 2rem;
          line-height: 1.2;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .post-content {
          font-size: 1.4rem;
          line-height: 1.8;
          color: #000000 !important;
          margin-bottom: 2rem;
        }

        .post-content p {
          font-size: 1.4rem;
          line-height: 1.8;
          color: #000000 !important;
          margin-bottom: 1.5rem;
        }

        .post-content h1,
        .post-content h2,
        .post-content h3,
        .post-content h4,
        .post-content h5,
        .post-content h6 {
          color: #000000 !important;
          font-size: 1.6rem;
          margin: 1.5rem 0 1rem;
        }

        .post-content ul,
        .post-content ol {
          font-size: 1.4rem;
          line-height: 1.8;
          color: #000000 !important;
          margin-bottom: 1.5rem;
          padding-left: 2rem;
        }

        .post-content li {
          font-size: 1.4rem;
          color: #000000 !important;
          margin-bottom: 0.5rem;
        }

        .post-content span {
          color: #000000 !important;
        }

        .post-content div {
          color: #000000 !important;
        }

        .post-content strong {
          color: #000000 !important;
        }

        .post-content em {
          color: #000000 !important;
        }

        /* Override Bootstrap classes */
        .post-content .my-3 {
          color: #000000 !important;
        }

        .post-content .display-4,
        .post-content .display-5,
        .post-content .display-6,
        .post-content .h2,
        .post-content .h3,
        .post-content .h4 {
          color: #000000 !important;
        }

        .post-content .fw-bold {
          color: #000000 !important;
        }

        .post-content .list-disc,
        .post-content .list-decimal {
          color: #000000 !important;
        }

        .post-content .ms-4 {
          color: #000000 !important;
        }

        /* Ensure all text elements are black */
        .post-content * {
          color: #000000 !important;
        }

        /* Links should still be visible */
        .post-content a {
          color: #007bff !important;
        }

        .post-content a:hover {
          color: #0056b3 !important;
        }

        @media (max-width: 991px) {
          .post-single-wrapper {
            padding: 1rem 0;
          }

          .post-details {
            padding: 1.5rem;
          }

          .axil-post-title {
            font-size: clamp(1.5rem, 3vw, 1.8rem);
          }

          .post-content {
            font-size: 1.3rem;
          }

          .post-content p {
            font-size: 1.3rem;
          }

          .post-content h1,
          .post-content h2,
          .post-content h3,
          .post-content h4,
          .post-content h5,
          .post-content h6 {
            font-size: 1.5rem;
          }

          .post-content ul,
          .post-content ol {
            font-size: 1.3rem;
          }

          .post-content li {
            font-size: 1.3rem;
          }
        }
      `}</style>
      <div className="post-single-wrapper p-t-xs-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <main className={`site-main ${isVisible ? "animate-in" : ""}`}>
                <article className="post-details">
                  <div className="single-blog-wrapper">
                    <h2 className="axil-post-title hover-line">
                      {postData?.title}
                    </h2>
                  </div>

                  <img
                    className="mb-4 w-full h-auto object-cover"
                    src={postData?.featureImg || "/images/placeholder.png"}
                    alt={postData?.altText || postData?.title || "Post image"}
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "cover",
                      background: "#f8f9fa",
                      display: "block",
                      borderRadius: "8px",
                    }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/placeholder.png";
                    }}
                  />

                  <div className="post-content">
                    <PortableText
                      value={postData?.body}
                      components={RichTextComponent}
                    />
                  </div>
                </article>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostFormatText;
