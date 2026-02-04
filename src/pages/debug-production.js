import { useState } from "react";
import { client } from "../client";
import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";

const DebugProduction = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testSpecificSlug = async (slug) => {
    setLoading(true);
    setError(null);

    try {
      console.log(`Testing slug: ${slug}`);
      
      // Test 1: Direct query without sanitization
      const directQuery = `*[_type == "post" && slug.current == "${slug}"][0]{
        title,
        slug,
        publishedAt,
        description,
        'featureImg': mainImage.asset->url,
        body
      }`;
      
      const directResult = await client.fetch(directQuery);
      console.log('Direct query result:', directResult);

      // Test 2: With sanitization
      const sanitizedSlug = slug.replace(/[^a-zA-Z0-9\-_]/g, '');
      const sanitizedQuery = `*[_type == "post" && slug.current == "${sanitizedSlug}"][0]{
        title,
        slug,
        publishedAt,
        description,
        'featureImg': mainImage.asset->url,
        body
      }`;
      
      const sanitizedResult = await client.fetch(sanitizedQuery);
      console.log('Sanitized query result:', sanitizedResult);

      // Test 3: Check if slug exists in any post
      const allPostsQuery = `*[_type == "post"]{
        title,
        slug: slug.current,
        publishedAt
      }`;
      
      const allPosts = await client.fetch(allPostsQuery);
      const foundPost = allPosts.find(post => post.slug === slug);
      const foundSanitized = allPosts.find(post => post.slug === sanitizedSlug);
      
      console.log('All posts count:', allPosts.length);
      console.log('Found original slug:', foundPost);
      console.log('Found sanitized slug:', foundSanitized);

      setResults(prev => ({
        ...prev,
        [slug]: {
          originalSlug: slug,
          sanitizedSlug,
          directQuery,
          sanitizedQuery,
          directResult,
          sanitizedResult,
          foundPost,
          foundSanitized,
          allPostsCount: allPosts.length,
          matchingPosts: allPosts.filter(post => post.slug.includes(slug.substring(0, 10))).slice(0, 5)
        }
      }));
    } catch (err) {
      console.error(`Error testing ${slug}:`, err);
      setError(err.message);
      setResults(prev => ({
        ...prev,
        [slug]: {
          error: err.message,
          originalSlug: slug
        }
      }));
    } finally {
      setLoading(false);
    }
  };

  const testAllProblemSlugs = async () => {
    setLoading(true);
    setResults({});
    setError(null);

    const problemSlugs = [
      'artificial-intelligence-in-everyday-life',
      'satya-nadella-redefining-leadership-in-the-age-of-empathy-culture-and-intelligent-growth',
      'famous-entrepreneurs-in-canada-you-should-know'
    ];

    for (const slug of problemSlugs) {
      await testSpecificSlug(slug);
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
          Production Debug Tool
        </h1>

        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={testAllProblemSlugs}
            disabled={loading}
            style={{
              padding: '1rem 2rem',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Testing Problem Slugs...' : 'Test All Problem Slugs'}
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
          {Object.entries(results).map(([slug, result]) => (
            <div key={slug} style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              border: result.error ? '1px solid #f8d7da' : '1px solid #d4edda',
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
                  color: '#333',
                  wordBreak: 'break-all'
                }}>
                  {result.originalSlug}
                </h3>
                <div style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  background: result.error ? '#f8d7da' : '#d4edda',
                  color: result.error ? '#721c24' : '#155724'
                }}>
                  {result.error ? 'Failed' : 'Success'}
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

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                <div>
                  <strong>Original Slug:</strong> {result.originalSlug}
                </div>
                <div>
                  <strong>Sanitized Slug:</strong> {result.sanitizedSlug}
                </div>
                <div>
                  <strong>All Posts Count:</strong> {result.allPostsCount}
                </div>
                <div>
                  <strong>Found Original:</strong> {result.foundPost ? '✅ Yes' : '❌ No'}
                </div>
                <div>
                  <strong>Found Sanitized:</strong> {result.foundSanitized ? '✅ Yes' : '❌ No'}
                </div>
              </div>

              {result.directResult && (
                <div style={{ marginTop: '1rem' }}>
                  <strong>Direct Query Result:</strong>
                  <div style={{
                    background: '#e8f5e8',
                    padding: '0.75rem',
                    borderRadius: '4px',
                    marginTop: '0.5rem'
                  }}>
                    <div><strong>Title:</strong> {result.directResult.title}</div>
                    <div><strong>Slug:</strong> {result.directResult.slug}</div>
                    <div><strong>Published:</strong> {result.directResult.publishedAt}</div>
                  </div>
                </div>
              )}

              {result.matchingPosts && result.matchingPosts.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  <strong>Similar Posts Found:</strong>
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                    {result.matchingPosts.map(post => (
                      <li key={post.slug} style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                        {post.slug}
                      </li>
                    ))}
                  </ul>
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
            Production Environment Info
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
            <div>
              <strong>Client Status:</strong> {client ? 'Connected' : 'Not Connected'}
            </div>
          </div>
        </div>
      </div>

      <FooterTwo />
    </>
  );
};

export default DebugProduction;
