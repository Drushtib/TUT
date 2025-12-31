import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../client";
import Loader from "../common/Loader";
import ErrorFallback from "../common/ErrorFallback";

const IndustryBlogs = () => {
  // Fetch categories for industry blogs
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ["industry-categories"],
    queryFn: async () => {
      console.log("Fetching industry categories...");
      const query = `*[_type == "industryCategory"]{
        title,
        slug,
        'image': image.asset->url
      }[0...3]`;
      console.log("IndustryBlogs query:", query);
      const response = await client.fetch(query);
      console.log("IndustryBlogs response:", response);
      return await client.fetch(query);
    },
  });

  console.log("IndustryBlogs state:", { isLoading, error, categoriesCount: categories?.length });

  if (isLoading) return <Loader />;
  if (error) return <ErrorFallback error={error} />;
  if (!categories || categories.length === 0) return null;

  // Fallback categories if no data
  const industryCategories = categories.length > 0 ? categories : [
    { title: "Education", slug: { current: "education" }, image: "/images/education.jpg" },
    { title: "Finance", slug: { current: "finance" }, image: "/images/finance.jpg" },
    { title: "Healthcare", slug: { current: "healthcare" }, image: "/images/healthcare.jpg" }
  ];

  return (
    <div style={{ 
      background: '#ffffff', 
      padding: '4rem 0',
      margin: '4rem 0'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          color: '#171717',
          marginBottom: '3rem',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Our Industry Blogs
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem',
          justifyContent: 'center'
        }}>
          {industryCategories.map((category, index) => (
            <Link
              key={category.slug?.current || index}
              href={`/industries/${category.slug?.current || category.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                {/* Circular Icon */}
                <div style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  marginBottom: '1.5rem',
                  border: '4px solid var(--primary-color)',
                  boxShadow: '0 8px 25px rgba(187, 5, 5, 0.3)',
                  background: 'var(--background-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={200}
                      height={200}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%'
                      }}
                    />
                  ) : (
                    <div style={{
                      fontSize: '3rem',
                      fontWeight: 900,
                      color: 'var(--primary-color)',
                      textTransform: 'uppercase',
                      letterSpacing: '2px'
                    }}>
                      {category.title.charAt(0)}
                    </div>
                  )}
                </div>
                
                {/* Category Title */}
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#171717',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {category.title}
                </h3>
                
                {/* Read More Button */}
                <div style={{
                  background: 'var(--primary-color)',
                  color: 'var(--text-dark)',
                  padding: '0.75rem 2rem',
                  borderRadius: '0',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  fontSize: '0.875rem',
                  border: '2px solid var(--primary-color)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--primary-color)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--primary-color)';
                  e.currentTarget.style.color = 'var(--text-dark)';
                }}
                >
                  Read More
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustryBlogs;

