import React, { useState, useEffect } from 'react';
import HeadMeta from '../components/elements/HeadMeta';
import HeaderOne from '../components/header/HeaderOne';
import FooterTwo from '../components/footer/FooterTwo';
import { client } from '../client';
import Loader from '../components/common/Loader';
import Image from 'next/image';

const MediaKit = () => {
  const [mediaKit, setMediaKit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMediaKit = async () => {
      try {
        const query = `*[_type == "mediaKit"][0]{
          title,
          description,
          pdfFile{
            asset->{
              _id,
              url,
              originalFilename
            }
          },
          sections[]{
            title,
            content,
            image{
              asset->{
                url
              }
            }
          }
        }`;
        
        const data = await client.fetch(query);
        setMediaKit(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching media kit:', err);
        setError('Failed to load media kit');
        setLoading(false);
      }
    };

    fetchMediaKit();
  }, []);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      // Download the dummy PDF from public folder
      const link = document.createElement('a');
      link.href = '/media-kit.pdf';
      link.download = 'media-kit.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Navigate to specific page in PDF
    const iframe = document.querySelector('iframe[title="Media Kit PDF"]');
    if (iframe) {
      // Force reload with new page parameter
      const newSrc = `/media-kit.pdf#page=${pageNumber}&view=FitH&toolbar=0`;
      iframe.src = newSrc;
      // Force iframe to reload
      iframe.onload = function() {
        // Scroll to top of iframe after loading
        iframe.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
    }
  };

  if (loading) {
    return (
      <>
        <HeadMeta metaTitle="Media Kit - The Unicorn Times" metaDesc="Download our media kit for press and media inquiries" />
        <HeaderOne />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh',
          background: '#f5f5f5'
        }}>
          <Loader />
        </div>
        <FooterTwo />
      </>
    );
  }

  if (error) {
    return (
      <>
        <HeadMeta metaTitle="Media Kit - The Unicorn Times" metaDesc="Download our media kit for press and media inquiries" />
        <HeaderOne />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh',
          background: '#f5f5f5'
        }}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2 style={{ color: '#171717', marginBottom: '1rem' }}>Error Loading Media Kit</h2>
            <p style={{ color: '#666', marginBottom: '1rem' }}>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              style={{
                background: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
          </div>
        </div>
        <FooterTwo />
      </>
    );
  }

  return (
    <>
      <HeadMeta 
        metaTitle="Media Kit - The Unicorn Times" 
        metaDesc="Download our media kit for press and media inquiries" 
      />
      <HeaderOne />
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .download-btn {
          color: #ffffff !important;
        }
      `}</style>
      
      <div style={{ 
        background: '#f5f5f5', 
        minHeight: 'calc(100vh - 200px)',
        padding: '2rem 0'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 2rem'
        }}>
          {/* Two Column Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '300px 1fr',
            gap: '2rem',
            minHeight: '800px'
          }}>
            
            {/* Left Sidebar - PDF Pages Navigation */}
            <div style={{
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              padding: '1.5rem',
              height: 'fit-content',
              maxHeight: '800px',
              overflowY: 'auto'
            }}>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: '#171717',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Pages
              </h3>
              
              {/* PDF Page Thumbnails */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((pageNum) => (
                  <div
                    key={pageNum}
                    onClick={() => handlePageClick(pageNum)}
                    style={{
                      background: currentPage === pageNum ? '#e9ecef' : '#f8f9fa',
                      borderRadius: '6px',
                      padding: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      border: currentPage === pageNum ? '2px solid var(--primary-color)' : '2px solid transparent',
                      opacity: currentPage === pageNum ? 1 : 0.8
                    }}
                    onMouseEnter={(e) => {
                      if (currentPage !== pageNum) {
                        e.target.style.background = '#e9ecef';
                        e.target.style.borderColor = 'var(--primary-color)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentPage !== pageNum) {
                        e.target.style.background = '#f8f9fa';
                        e.target.style.borderColor = 'transparent';
                      }
                    }}
                  >
                    {/* Actual PDF Thumbnail */}
                    <div style={{
                      background: '#ffffff',
                      borderRadius: '4px',
                      height: '150px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.5rem',
                      border: '1px solid #dee2e6',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <iframe
                        src={`/media-kit.pdf#page=${pageNum}&view=FitB&zoom=0.3&toolbar=0&navpanes=0&scrollbar=0`}
                        style={{
                          width: '100%',
                          height: '100%',
                          border: 'none',
                          display: 'block',
                          pointerEvents: 'none'
                        }}
                        title={`Page ${pageNum} thumbnail`}
                        frameBorder="0"
                        scrolling="no"
                      />
                    </div>
                    {/* Page Number Only */}
                    <div style={{
                      textAlign: 'center',
                      fontSize: '0.8rem',
                      color: currentPage === pageNum ? 'var(--primary-color)' : '#6c757d',
                      fontWeight: currentPage === pageNum ? '500' : '400'
                    }}>
                      {pageNum}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Main Content - PDF Viewer */}
            <div style={{
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              {/* Custom Download Button */}
              <div style={{
                background: '#f8f9fa',
                padding: '1rem 1.5rem',
                borderBottom: '1px solid #e9ecef',
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <button
                  className="download-btn"
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF}
                  style={{
                    background: isGeneratingPDF ? '#6c757d' : '#990000',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.5rem 1rem',
                    cursor: isGeneratingPDF ? 'not-allowed' : 'pointer',
                    fontSize: '1.2rem',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textShadow: '0 0 1px rgba(255,255,255,0.5)'
                  }}
                >
                  {isGeneratingPDF ? (
                    <>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        border: '2px solid white',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                      Generating...
                    </>
                  ) : (
                    'Download PDF'
                  )}
                </button>
              </div>
              
              {/* PDF Viewer - Full Screen */}
              <div style={{
                width: '100%',
                height: '800px',
                background: '#ffffff'
              }}>
                <iframe
                  key={`pdf-page-${currentPage}`}
                  src={`/media-kit.pdf#page=${currentPage}&view=FitH&toolbar=0`}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: 'block',
                    backgroundColor: '#ffffff'
                  }}
                  title="Media Kit PDF"
                  frameBorder="0"
                  scrolling="auto"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterTwo />
    </>
  );
};

export default MediaKit;

