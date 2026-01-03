import { useQuery } from "@tanstack/react-query";
import { client } from "../client";
import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";
import Loader from "../components/common/Loader";

const TestIndustries = () => {
  // Fetch all industry categories
  const { data: categories, isLoading: catLoading } = useQuery({
    queryKey: ["test-categories"],
    queryFn: async () => {
      const query = `*[_type == "industryCategory"]{
        title,
        slug,
        'image': image.asset->url
      } | order(title asc)`;
      console.log("Categories query:", query);
      const response = await client.fetch(query);
      console.log("Categories response:", response);
      return response;
    },
  });

  // Fetch all industry posts
  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["test-posts"],
    queryFn: async () => {
      const query = `*[_type == "industryPost"]{
        title,
        slug,
        'category': industryCategory->title,
        'categorySlug': industryCategory->slug.current,
        publishedAt,
        description
      } | order(publishedAt desc)`;
      console.log("Posts query:", query);
      const response = await client.fetch(query);
      console.log("Posts response:", response);
      return response;
    },
  });

  // Test specific categories
  const { data: healthcarePosts, isLoading: healthLoading } = useQuery({
    queryKey: ["test-healthcare"],
    queryFn: async () => {
      const query = `*[_type == "industryPost" && industryCategory->slug.current == "healthcare"]{
        title,
        slug,
        'category': industryCategory->title,
        publishedAt
      }`;
      const response = await client.fetch(query);
      console.log("Healthcare posts:", response);
      return response;
    },
  });

  const { data: financePosts, isLoading: financeLoading } = useQuery({
    queryKey: ["test-finance"],
    queryFn: async () => {
      const query = `*[_type == "industryPost" && industryCategory->slug.current == "finance"]{
        title,
        slug,
        'category': industryCategory->title,
        publishedAt
      }`;
      const response = await client.fetch(query);
      console.log("Finance posts:", response);
      return response;
    },
  });

  const { data: legalPosts, isLoading: legalLoading } = useQuery({
    queryKey: ["test-legal"],
    queryFn: async () => {
      const query = `*[_type == "industryPost" && industryCategory->slug.current == "legal"]{
        title,
        slug,
        'category': industryCategory->title,
        publishedAt
      }`;
      const response = await client.fetch(query);
      console.log("Legal posts:", response);
      return response;
    },
  });

  const { data: cybersecurityPosts, isLoading: cyberLoading } = useQuery({
    queryKey: ["test-cybersecurity"],
    queryFn: async () => {
      const query = `*[_type == "industryPost" && industryCategory->slug.current == "cybersecurity"]{
        title,
        slug,
        'category': industryCategory->title,
        publishedAt
      }`;
      const response = await client.fetch(query);
      console.log("Cybersecurity posts:", response);
      return response;
    },
  });

  return (
    <>
      <HeaderOne />
      
      <div style={{ 
        background: '#fff', 
        color: '#000', 
        minHeight: '100vh',
        padding: '2rem'
      }}>
        <h1>Industry Content Debug</h1>
        
        <div style={{ marginBottom: '3rem' }}>
          <h2>Industry Categories ({categories?.length || 0})</h2>
          {catLoading ? (
            <Loader />
          ) : (
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '1rem', 
              borderRadius: '8px',
              maxHeight: '200px',
              overflow: 'auto'
            }}>
              {JSON.stringify(categories, null, 2)}
            </pre>
          )}
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h2>All Industry Posts ({posts?.length || 0})</h2>
          {postsLoading ? (
            <Loader />
          ) : (
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '1rem', 
              borderRadius: '8px',
              maxHeight: '300px',
              overflow: 'auto'
            }}>
              {JSON.stringify(posts, null, 2)}
            </pre>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '2rem' }}>
          <div>
            <h3>Healthcare Posts ({healthcarePosts?.length || 0})</h3>
            {healthLoading ? <Loader /> : (
              <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', fontSize: '12px' }}>
                {JSON.stringify(healthcarePosts, null, 2)}
              </pre>
            )}
          </div>

          <div>
            <h3>Finance Posts ({financePosts?.length || 0})</h3>
            {financeLoading ? <Loader /> : (
              <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', fontSize: '12px' }}>
                {JSON.stringify(financePosts, null, 2)}
              </pre>
            )}
          </div>

          <div>
            <h3>Legal Posts ({legalPosts?.length || 0})</h3>
            {legalLoading ? <Loader /> : (
              <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', fontSize: '12px' }}>
                {JSON.stringify(legalPosts, null, 2)}
              </pre>
            )}
          </div>

          <div>
            <h3>Cybersecurity Posts ({cybersecurityPosts?.length || 0})</h3>
            {cyberLoading ? <Loader /> : (
              <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', fontSize: '12px' }}>
                {JSON.stringify(cybersecurityPosts, null, 2)}
              </pre>
            )}
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <a href="/" style={{ 
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}>
            ← Back to Home
          </a>
        </div>
      </div>
      
      <FooterTwo />
    </>
  );
};

export default TestIndustries;
