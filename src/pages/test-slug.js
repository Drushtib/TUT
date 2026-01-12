import { useState } from "react";
import { client } from "../client";
import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";

const TestSlug = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const testSlugExistence = async () => {
    setLoading(true);
    
    try {
      // Test the exact problematic slug
      const testSlug = 'artificial-intelligence-in-everyday-life';
      
      console.log('Testing slug existence:', testSlug);
      
      // 1. Check if any posts exist
      const allPostsQuery = '*[_type == "post"]{title, slug: slug.current}';
      const allPosts = await client.fetch(allPostsQuery);
      console.log('Total posts:', allPosts.length);
      
      // 2. Find exact match
      const exactMatch = allPosts.find(post => post.slug === testSlug);
      console.log('Exact match found:', exactMatch ? 'YES' : 'NO');
      
      // 3. Find partial matches
      const partialMatches = allPosts.filter(post => 
        post.slug.includes('artificial') || post.slug.includes('intelligence')
      );
      console.log('Partial matches:', partialMatches.length);
      
      // 4. Try direct query
      const directQuery = `*[_type == "post" && slug.current == "${testSlug}"]{title, slug: slug.current}[0]`;
      const directResult = await client.fetch(directQuery);
      console.log('Direct query result:', directResult);
      
      setResults({
        totalPosts: allPosts.length,
        exactMatch: !!exactMatch,
        exactMatchPost: exactMatch,
        partialMatches: partialMatches,
        directResult: directResult,
        testSlug
      });
      
    } catch (error) {
      console.error('Test error:', error);
      setResults({ error: error.message });
    } finally {
      setLoading(false);
    }
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
          Slug Existence Test
        </h1>

        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={testSlugExistence}
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
            {loading ? 'Testing...' : 'Test Slug Existence'}
          </button>
        </div>

        {results.error && (
          <div style={{
            color: 'red',
            background: '#ffebee',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            <strong>Error:</strong> {results.error}
          </div>
        )}

        {results.totalPosts && (
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Results</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              <div>
                <strong>Total Posts:</strong> {results.totalPosts}
              </div>
              <div>
                <strong>Test Slug:</strong> {results.testSlug}
              </div>
              <div>
                <strong>Exact Match Found:</strong> {results.exactMatch ? '✅ YES' : '❌ NO'}
              </div>
              <div>
                <strong>Direct Query Result:</strong> {results.directResult ? '✅ SUCCESS' : '❌ FAILED'}
              </div>
              <div>
                <strong>Partial Matches:</strong> {results.partialMatches?.length || 0}
              </div>
            </div>

            {results.exactMatchPost && (
              <div style={{ marginTop: '1rem' }}>
                <strong>Exact Match Post:</strong>
                <div style={{
                  background: '#e8f5e8',
                  padding: '1rem',
                  borderRadius: '4px',
                  marginTop: '0.5rem'
                }}>
                  <div><strong>Title:</strong> {results.exactMatchPost.title}</div>
                  <div><strong>Slug:</strong> {results.exactMatchPost.slug}</div>
                </div>
              </div>
            )}

            {results.directResult && (
              <div style={{ marginTop: '1rem' }}>
                <strong>Direct Query Result:</strong>
                <div style={{
                  background: '#e8f5e8',
                  padding: '1rem',
                  borderRadius: '4px',
                  marginTop: '0.5rem'
                }}>
                  <div><strong>Title:</strong> {results.directResult.title}</div>
                  <div><strong>Slug:</strong> {results.directResult.slug}</div>
                </div>
              </div>
            )}

            {results.partialMatches && results.partialMatches.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <strong>Partial Matches:</strong>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                  {results.partialMatches.map(post => (
                    <li key={post.slug} style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      {post.slug}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <FooterTwo />
    </>
  );
};

export default TestSlug;
