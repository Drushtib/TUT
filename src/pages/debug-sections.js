import { useState } from "react";
import { client } from "../client";
import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";

const DebugSections = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testQuery = async (name, query) => {
    setLoading(true);
    setError(null);

    try {
      console.log(`Testing ${name} with query:`, query);
      const result = await client.fetch(query);
      console.log(`${name} result:`, result);
      
      setResults(prev => ({
        ...prev,
        [name]: {
          success: true,
          data: result,
          query,
          count: result?.length || 0
        }
      }));
    } catch (err) {
      console.error(`Error in ${name}:`, err);
      setError(err.message);
      setResults(prev => ({
        ...prev,
        [name]: {
          success: false,
          error: err.message,
          query,
          count: 0
        }
      }));
    } finally {
      setLoading(false);
    }
  };

  const testAllQueries = async () => {
    setLoading(true);
    setResults({});
    setError(null);

    const queries = [
      {
        name: 'Compact Blogs (Component Query)',
        query: `*[_type == "post" && (lower(categories[0]->title) match "*blog*" || lower(categories[0]->title) match "*article*")] {title, "slug": slug.current, publishedAt, description, 'featureImg': mainImage.asset->url, 'category': {'title': categories[0]->title, 'slug': categories[0]->slug.current}} | order(publishedAt desc)[0...15]`
      },
      {
        name: 'Business Bulletin (Component Query)',
        query: `*[_type == "post" && "business-bulletin" in categories[]->slug.current] {title, slug, altText, 'featureImg': mainImage.asset->url, publishedAt, description, 'category': {'title': categories[0]->title, 'slug': categories[0]->slug.current}} | order(publishedAt desc)[0...8]`
      },
      {
        name: 'Master Talks (Component Query)',
        query: `*[_type == "post" && "master-talks" in categories[]->slug.current] {title, altText, slug, 'featureImg': mainImage.asset->url, description, 'category': {'title': categories[0]->title, 'slug': categories[0]->slug.current}, publishedAt} | order(publishedAt desc)[0...12]`
      },
      {
        name: 'Business Bulletin (Query Function)',
        query: `*[_type == "post" && categories[0]->slug.current == "business-bulletin"] {title, slug, altText, 'featureImg': mainImage.asset->url, publishedAt, description, keywords, 'category': {'title': categories[0]->title, 'slug': categories[0]->slug.current}} | order(publishedAt desc)[0...8]`
      },
      {
        name: 'Master Talks (Query Function)',
        query: `*[_type == "post" && categories[0]._ref == *[_type == "category" && slug.current == "master-talks"][0]._id] {title, altText, keywords, slug, 'featureImg': mainImage.asset->url, body, description, 'category': {'title': categories[0]->title, 'slug': categories[0]->slug.current}, publishedAt} | order(publishedAt desc)[0...12]`
      },
      {
        name: 'All Posts',
        query: `*[_type == "post"]{title, slug, publishedAt, 'category': categories[0]->title}[0...10]`
      },
      {
        name: 'All Categories',
        query: `*[_type == "category"]{title, slug}`
      }
    ];

    for (const { name, query } of queries) {
      try {
        console.log(`Testing ${name}...`);
        const result = await client.fetch(query);
        console.log(`${name} result:`, result);
        
        setResults(prev => ({
          ...prev,
          [name]: {
            success: true,
            data: result,
            query,
            count: result?.length || 0
          }
        }));
      } catch (err) {
        console.error(`Error in ${name}:`, err);
        setResults(prev => ({
          ...prev,
          [name]: {
            success: false,
            error: err.message,
            query,
            count: 0
          }
        }));
      }
    }

    setLoading(false);
  };

  return (
    <>
      <HeaderOne />
      
      <div style={{ 
        padding: '2rem', 
        maxWidth: '1400px', 
        margin: '0 auto',
        background: '#f5f5f5',
        minHeight: '100vh'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#333' }}>
          Sections Debug Tool
        </h1>

        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={testAllQueries}
            disabled={loading}
            style={{
              padding: '1rem 2rem',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Testing All Queries...' : 'Test All Sections'}
          </button>
        </div>

        {error && (
          <div style={{
            color: 'red',
            background: '#ffebee',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            border: '1px solid #ffcdd2'
          }}>
            <strong>Global Error:</strong> {error}
          </div>
        )}

        <div style={{ display: 'grid', gap: '2rem' }}>
          {Object.entries(results).map(([name, result]) => (
            <div key={name} style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              border: result.success ? '1px solid #d4edda' : '1px solid #f8d7da',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  margin: 0,
                  color: '#333'
                }}>
                  {name}
                </h3>
                <div style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  background: result.success ? '#d4edda' : '#f8d7da',
                  color: result.success ? '#155724' : '#721c24'
                }}>
                  {result.success ? `${result.count} Results` : 'Failed'}
                </div>
              </div>

              {result.error && (
                <div style={{
                  color: 'red',
                  background: '#ffebee',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  marginBottom: '1rem',
                  fontSize: '0.9rem'
                }}>
                  <strong>Error:</strong> {result.error}
                </div>
              )}

              <div style={{ marginBottom: '1rem' }}>
                <strong>Query:</strong>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  overflow: 'auto',
                  maxHeight: '150px',
                  marginTop: '0.5rem'
                }}>
                  {result.query}
                </pre>
              </div>

              {result.data && (
                <div>
                  <strong>Data Preview:</strong>
                  <pre style={{
                    background: '#f8f9fa',
                    padding: '0.75rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    overflow: 'auto',
                    maxHeight: '200px',
                    marginTop: '0.5rem'
                  }}>
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Environment Info */}
        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px',
          marginTop: '2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#333' }}>
            Environment Info
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'N/A'}
            </div>
            <div>
              <strong>Environment:</strong> {process.env.NODE_ENV || 'Unknown'}
            </div>
            <div>
              <strong>Sanity Project:</strong> lres172w
            </div>
            <div>
              <strong>Dataset:</strong> production
            </div>
          </div>
        </div>
      </div>

      <FooterTwo />
    </>
  );
};

export default DebugSections;
