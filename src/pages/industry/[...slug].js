import { useRouter } from "next/router";
import { useEffect } from "react";

const IndustryNestedRedirect = () => {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    // Handle nested routes like /industry/tech-ai/cybersecurity
    if (slug && Array.isArray(slug)) {
      // Extract the last segment as the actual industry slug
      const lastSegment = slug[slug.length - 1];
      router.push(`/industries/${lastSegment}`);
    } else if (slug && typeof slug === 'string') {
      router.push(`/industries/${slug}`);
    }
  }, [router, slug]);

  return (
    <div style={{ 
      padding: '4rem 2rem', 
      textAlign: 'center',
      background: '#000', 
      color: '#fff',
      minHeight: '100vh'
    }}>
      <h2>Redirecting...</h2>
      <p>Taking you to the correct industry page...</p>
    </div>
  );
};

export default IndustryNestedRedirect;
