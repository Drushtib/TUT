import { useRouter } from "next/router";
import { useEffect } from "react";

const IndustryRedirect = () => {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    // Redirect from /industry/[slug] to /industries/[slug] (with 's')
    if (slug) {
      router.replace(`/industries/${slug}`);
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

export default IndustryRedirect;
