import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { client } from "../client";
import Loader from "../components/common/Loader";
import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";
import PostLayoutformag from "../components/post/layout/PostLayoutformag";
import HeadMeta from "../components/elements/HeadMeta";

const Magazines = () => {
  const [searchValue, setSearchValue] = useState("");

  const query = `
    *[_type == "magazine"] {
      title,
      slug,
      'featureImg': mainImage.asset->url,
      publishedAt,
      _createdAt
    } | order(_createdAt desc)
  `;

  const { data, isLoading, error } = useQuery({
    queryKey: ["allMagazines"],
    queryFn: async () => {
      const response = await client.fetch(query);
      return response.sort((a, b) => {
        const aKey = a._createdAt || a.publishedAt || 0;
        const bKey = b._createdAt || b.publishedAt || 0;
        return new Date(bKey) - new Date(aKey);
      });
    },
  });

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div style={{ color: "#111", textAlign: "center" }}>
        Error fetching magazines
      </div>
    );
  if (!data) return null;

  const filteredMagazines = searchValue
    ? data.filter((mag) =>
        (mag.title || "").toLowerCase().includes(searchValue.toLowerCase())
      )
    : data;

  return (
    <>
      <HeadMeta
        metaTitle="Magazines | The Unicorn Times"
        metaDesc="Explore magazines and exclusive interviews with entrepreneurs featured in The Unicorn Times."
      />

      <HeaderOne />

      <div className="magazines-page" style={{ width: "100%", minHeight: "100vh", background: "#fff" }}>
        {/* Simple local search (magazine titles only) */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '2rem 1rem 0',
        }}>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search magazines by name..."
            aria-label="Search magazines by name"
            style={{
              width: '100%',
              maxWidth: '640px',
              background: '#fff',
              color: '#111',
              border: '1px solid rgba(0,0,0,0.25)',
              outline: 'none',
              padding: '12px 16px',
              borderRadius: '8px',
              boxShadow: '0 10px 26px rgba(0,0,0,0.08)',
            }}
          />
        </div>
        {/* Hero / Text Section */}
        {/* <div
          style={{
            width: "100%",
            backgroundImage: `url('/images/mag_bg.jpg')`,
            backgroundRepeat: "repeat",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem 0",
            backgroundSize: "cover",
          }}
        >
          <div
            style={{
              width: "90%",
              maxWidth: "1200px",
              textAlign: "center",
              padding: "0 1rem",
            }}
          >
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "bolder",
                marginBottom: "2px",
                color: "white",
              }}
            >
              LATEST MAGAZINES
            </p>
            <p
              style={{
                fontSize: "1.7rem",
                fontWeight: "lighter",
                color: "white",
              }}
            >
              Welcome to The Entrepreneurial Chronicles Magazine, where we
              spotlight trailblazers from all sectors transforming the business
              magazine landscape. Our mission is to inspire and empower new
              leaders with groundbreaking ideas worldwide.
            </p>
          </div>
        </div> */}

        {/* Year Badge */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "2rem 0",
          }}
        >
          <div
            className="year-badge"
            style={{
              width: "30%",
              maxWidth: "40rem",
              height: "6rem",
              borderRadius: "10rem",
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#bb0505",
              border: "none",
            }}
          >
            <h2
              style={{
                fontSize: "2.4rem",
                margin: 0,
                fontWeight: "bold",
              }}
            >
              Latest Edition
            </h2>
          </div>
        </div>

        {/* Magazine Grid */}
        <div
          className="magazine-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem",
            maxWidth: "1600px",
            margin: "0 auto",
            padding: "0 4rem",
            justifyContent: "center",
          }}
        >
          {filteredMagazines.length > 0 ? (
            filteredMagazines.map((post, index) => (
              <PostLayoutformag data={post} key={index} />
            ))
          ) : (
            <p
              style={{
                color: "#111",
                textAlign: "center",
                width: "100%",
              }}
            >
              No magazines found.
            </p>
          )}
        </div>
      </div>

      <style jsx global>{`
        .magazines-page {
          background: #ffffff !important;
          color: #111111 !important;
          -webkit-text-fill-color: #111111 !important;
        }

        .magazines-page h2,
        .magazines-page h3,
        .magazines-page h4,
        .magazines-page p,
        .magazines-page a {
          color: #111111 !important;
          -webkit-text-fill-color: #111111 !important;
        }

        .magazines-page a:hover {
          color: #bb0505 !important;
          -webkit-text-fill-color: #bb0505 !important;
        }

        .magazines-page .year-badge h2 {
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
        }

        /* Responsive grid layout for magazine cards */
        .magazine-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 4rem;
          justify-items: center;
        }

        @media (max-width: 1200px) {
          .magazine-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            padding: 0 2rem;
          }
        }

        @media (max-width: 768px) {
          .magazine-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            padding: 0 1rem;
          }
        }

        @media (max-width: 480px) {
          .magazine-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
            padding: 0 1rem;
          }
        }
      `}</style>

      <FooterTwo />
    </>
  );
};

export default Magazines;