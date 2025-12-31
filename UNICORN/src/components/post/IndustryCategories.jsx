import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";
import SectionTitle from "../elements/SectionTitle";

const IndustryCategories = () => {
  const query = `*[_type == "industryCategory"]{
    title,
    slug,
    altText,
    description,
    "imageUrl": image.asset->url
  } | order(title asc)`;

  const { data, isLoading, error } = useQuery({
    queryKey: ["industry-categories"],
    queryFn: async () => {
      const response = await client.fetch(query);
      return response;
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching industry categories</div>;
  if (!data) return null;

  return (
    <div className="section-gap section-gap-top__with-text" style={{ background: "#000", color: "#fff" }}>
      <div className="container">
        <SectionTitle
          title="Industries"
          btnText="All Industries"
          btnUrl={"/industries"}
          pClass="title-white m-b-xs-40"
        />
        <div className="row">
          {data.map((item) => (
            <div className="col-lg-3 col-md-4 col-6" key={item.slug?.current || item.title}>
              <Link
                href={`/industries/${item.slug?.current}`}
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    background: "rgba(0, 0, 0, 0.45)",
                  }}
                >
                  <div style={{ position: "relative", width: "100%", height: 140, overflow: "hidden" }}>
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.altText || item.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        style={{ objectFit: "cover" }}
                      />
                    ) : null}
                  </div>
                  <div style={{ padding: 12 }}>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>
                      {item.title}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustryCategories;
