import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { client } from "../client";
import Loader from "../components/common/Loader";
import HeaderOne from "../components/header/HeaderOne";
import Faq from "../components/FAQ/Faq";
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
      <div style={{ color: "gold", textAlign: "center" }}>
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
        metaTitle="Exclusive Interviews with Entrepreneurs Featured in The Entrepreneurial Chronicles Magazine"
        metaDesc="Exclusive interviews with top entrepreneurs featured in The Entrepreneurial Chronicles Magazine."
      />

      <HeaderOne />

      <div style={{ width: "100%", minHeight: "100vh", background: "#000" }}>
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
              background: '#000',
              color: '#fff',
              border: '1px solid #333',
              outline: 'none',
              padding: '12px 16px',
              borderRadius: '8px',
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
              backgroundColor: "#101820", // optional contrast
            }}
          >
            <h2
              style={{
                fontSize: "2.2rem",
                margin: 0,
                color: "#ae8625", // golden color for visibility
                fontWeight: "bold",
              }}
            >
              {new Date().getFullYear()}
            </h2>
          </div>
        </div>

        {/* Magazine Grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: searchValue ? "center" : "flex-start",
            gap: "40px",
            maxWidth: "1600px",
            margin: "0 auto",
          }}
        >
          {filteredMagazines.length > 0 ? (
            filteredMagazines.map((post, index) => (
              <PostLayoutformag data={post} key={index} />
            ))
          ) : (
            <p
              style={{
                color: "white",
                textAlign: "center",
                width: "100%",
              }}
            >
              No magazines found.
            </p>
          )}
        </div>
      </div>

      <Faq/>

      <FooterTwo />
    </>
  );
};

export default Magazines; 