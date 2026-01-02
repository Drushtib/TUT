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
    <>
      <style jsx global>{`
        .section-gap {
          background-color: #ffffff !important;
          color: #171717 !important;
        }
        
        .industry-category-card {
          background: #ffffff !important;
          border: 1px solid #e5e5e5 !important;
          border-radius: 16px !important;
          overflow: hidden !important;
          transition: all 0.3s ease !important;
          cursor: pointer !important;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08) !important;
        }
        
        .industry-category-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 8px 25px rgba(220, 53, 69, 0.15) !important;
          border-color: #dc3545 !important;
        }
        
        .industry-category-title {
          color: #171717 !important;
          font-weight: 700 !important;
          font-size: 16px !important;
          line-height: 1.3 !important;
        }
      `}</style>
      
      <div className="section-gap section-gap-top__with-text" style={{ background: "#ffffff", color: "#171717" }}>
        <div className="container">
          <SectionTitle
            title="Industries"
            btnText="All Industries"
            btnUrl={"/industries"}
            pClass="title-white m-b-xs-40"
          />
          <div className="row">
            {data.map((category) => (
              <div className="col-lg-3 col-md-4 col-6" key={category.slug?.current || category.title}>
                <Link
                  href={`/industries/${category.slug?.current || category.slug}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    className="industry-category-card"
                    style={{
                      borderRadius: 16,
                      overflow: "hidden",
                      border: "1px solid #e5e5e5",
                      background: "#ffffff",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow = "0 8px 25px rgba(220, 53, 69, 0.15)";
                      e.currentTarget.style.borderColor = "#dc3545";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.08)";
                      e.currentTarget.style.borderColor = "#e5e5e5";
                    }}
                  >
                    <div style={{ position: "relative", width: "100%", height: 140, overflow: "hidden" }}>
                      {category.imageUrl ? (
                        <Image
                          src={category.imageUrl}
                          alt={category.altText || category.title}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          style={{ objectFit: "cover" }}
                        />
                      ) : null}
                    </div>
                    <div style={{ padding: "1rem", borderTop: "3px solid #dc3545" }}>
                      <div 
                        className="industry-category-title"
                        style={{ color: "#171717", fontWeight: 700, fontSize: 16, lineHeight: 1.3 }}
                      >
                        {category.title}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default IndustryCategories;
