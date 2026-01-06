import { useState } from "react";
import { client } from "../client";
import { getPostBySlugQuery } from "../lib/sanity/queries/posts";
import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";

const DebugBlog = () => {
  const [slug, setSlug] = useState("10-famous-entrepreneurs-in-canada-you-should-know");
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testPostFetch = async () => {
    setLoading(true);
    setError(null);
    setTestResult(null);

    try {
      console.log('Testing slug:', slug);
      const query = getPostBySlugQuery(slug);
      console.log('Query:', query);
      
      const result = await client.fetch(query);
      console.log('Raw result:', result);
      
      setTestResult({
        success: true,
        data: result,
        query: query,
        slug: slug
      });
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
      setTestResult({
        success: false,
        error: err.message,
        query: getPostBySlugQuery(slug),
        slug: slug
      });
    } finally {
      setLoading(false);
    }
  };

  const testAllPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const allPostsQuery = `*[_type == "post"]{title, slug, publishedAt}[0...10]`;
      const result = await client.fetch(allPostsQuery);
      console.log('All posts:', result);
      setTestResult({
        success: true,
        data: result,
        query: allPostsQuery,
        type: 'allPosts'
      });
    } catch (err) {
      console.error('Error fetching all posts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderOne />
      
      <div style={{ 
        padding: '2rem', 
        maxWidth: '1200px', 
        margin: '0 auto',
        background: '#f5f5f5',
        minHeight: '100vh'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#333' }}>
          Blog Post Debug Tool
        </h1>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Test Controls */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#333' }}>
              Test Controls
            </h2>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>
                Post Slug:
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
                placeholder="Enter post slug..."
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <button
                onClick={testPostFetch}
                disabled={loading}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? 'Testing...' : 'Test Post'}
              </button>

              <button
                onClick={testAllPosts}
                disabled={loading}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1
                }}
              >
                Test All Posts
              </button>
            </div>

            {error && (
              <div style={{
                color: 'red',
                background: '#ffebee',
                padding: '1rem',
                borderRadius: '4px',
                border: '1px solid #ffcdd2'
              }}>
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>

          {/* Test Results */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#333' }}>
              Test Results
            </h2>
            
            {testResult && (
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Status:</strong> 
                  <span style={{ 
                    color: testResult.success ? 'green' : 'red',
                    marginLeft: '0.5rem'
                  }}>
                    {testResult.success ? 'Success' : 'Failed'}
                  </span>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <strong>Slug:</strong> {testResult.slug}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <strong>Query:</strong>
                  <pre style={{
                    background: '#f8f9fa',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    overflow: 'auto',
                    maxHeight: '150px'
                  }}>
                    {testResult.query}
                  </pre>
                </div>

                {testResult.data && (
                  <div>
                    <strong>Data:</strong>
                    <pre style={{
                      background: '#f8f9fa',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      overflow: 'auto',
                      maxHeight: '300px'
                    }}>
                      {JSON.stringify(testResult.data, null, 2)}
                    </pre>
                  </div>
                )}

                {testResult.error && (
                  <div style={{
                    color: 'red',
                    background: '#ffebee',
                    padding: '0.5rem',
                    borderRadius: '4px'
                  }}>
                    <strong>Error:</strong> {testResult.error}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Environment Info */}
        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#333' }}>
            Environment Info
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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

export default DebugBlog;
