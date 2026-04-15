import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import HeaderOne from '../components/header/HeaderOne';
import FooterTwo from '../components/footer/FooterTwo';

const MediaKit = () => {
  const mediaKitPages = [
    '/images/mediakitpage1.webp',
    '/images/mediakitpage2.webp',
    '/images/mediakitpage3.webp',
    '/images/mediakitpage4.webp',
    '/images/mediakitpage5.webp',
    '/images/mediakitpage6.webp',
    '/images/mediakitpage7.webp',
    '/images/mediakitpage8.webp',
    '/images/mediakitpage9.webp',
    '/images/mediakitpage10.webp'
  ];

  return (
    <>
      <Head>
        <title>Media Kit - Magazine</title>
        <meta name="description" content="Download our media kit for partnership and advertising opportunities" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <HeaderOne />

      <main className="media-kit-page">
        <div className="container-fluid p-0">
         
          <div className="media-kit-content">
            {mediaKitPages.map((page, index) => (
              <div key={index} className="media-kit-page-section">
                <div className="full-width-image-container">
                  <Image
                    src={page}
                    alt={`Media Kit Page ${index + 1}`}
                    width={1920}
                    height={1080}
                    className="full-width-image"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <FooterTwo />

      <style jsx>{`
        .media-kit-page {
          background-color: #ffffff;
          min-height: 100vh;
        }

        .media-kit-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          margin-bottom: 0;
        }

        .media-kit-header h1 {
          color: white;
          font-weight: 700;
        }

        .media-kit-header p {
          color: rgba(255, 255, 255, 0.9);
          max-width: 600px;
          margin: 0 auto;
        }

        .media-kit-content {
          background-color: #ffffff;
        }

        .full-width-image-container {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .full-width-image {
          transition: transform 0.3s ease;
        }

        .full-width-image:hover {
          transform: scale(1.02);
        }

        .media-kit-page-section {
          border-bottom: 1px solid #f0f0f0;
        }

        .media-kit-page-section:last-child {
          border-bottom: none;
        }

        @media (max-width: 768px) {
          .media-kit-header {
            padding: 3rem 1rem !important;
          }

          .media-kit-header h1 {
            font-size: 2rem;
          }

          .media-kit-header p {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default MediaKit;
