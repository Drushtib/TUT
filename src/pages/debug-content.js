import { useQuery } from "@tanstack/react-query";
import { client } from "../client";
import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";
import Loader from "../components/common/Loader";

const DebugContent = () => {
  // Fetch all categories
  const { data: categories, isLoading: catLoading } = useQuery({
    queryKey: ["all-categories"],
    queryFn: async () => {
      const query = `*[_type == "category"]{
        title,
        slug,
        'image': image.asset->url
      }`;
      const response = await client.fetch(query);
      console.log("All categories:", response);
      return response;
    },
  });

  // Fetch all posts
  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["all-posts"],
    queryFn: async () => {
      const query = `*[_type == "post"]{
        title,
        slug,
        'category': category->title,
        'categorySlug': category->slug.current,
        publishedAt,
        description
      }`;
      const response = await client.fetch(query);
      console.log("All posts:", response);
      return response;
    },
  });

  // Fetch healthcare posts specifically
  const { data: healthcarePosts, isLoading: healthLoading } = useQuery({
    queryKey: ["healthcare-posts-debug"],
    queryFn: async () => {
      const query = `*[_type == "post" && category->slug.current == "healthcare"]{
        title,
        slug,
        'category': category->title,
        'categorySlug': category->slug.current,
        publishedAt,
        description
      }`;
      const response = await client.fetch(query);
      console.log("Healthcare posts:", response);
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
        <h1>Sanity Content Debug</h1>
        
        <div style={{ marginBottom: '3rem' }}>
          <h2>All Categories ({categories?.length || 0})</h2>
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
          <h2>All Posts ({posts?.length || 0})</h2>
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

        <div style={{ marginBottom: '3rem' }}>
          <h2>Healthcare Posts Only ({healthcarePosts?.length || 0})</h2>
          {healthLoading ? (
            <Loader />
          ) : (
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '1rem', 
              borderRadius: '8px',
              maxHeight: '200px',
              overflow: 'auto'
            }}>
              {JSON.stringify(healthcarePosts, null, 2)}
            </pre>
          )}
        </div>

        <div>
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

export default DebugContent;
