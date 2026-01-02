import React from 'react';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: '#D4AF37' }}>
        404
      </h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>
        Page Not Found
      </h2>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '600px' }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" style={{ 
        background: '#D4AF37', 
        color: '#000', 
        padding: '12px 24px', 
        textDecoration: 'none', 
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '1.1rem'
      }}>
        Go Back Home
      </Link>
    </div>
  );
};

export default Custom404;