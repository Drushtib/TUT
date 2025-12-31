import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const LoadingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <>
      <div className="loading-page">
        <div className="loading-container">
          <div className="loading-logo">
            <Image
              src="/logos/chronicle_logo.png"
              alt="Chronicles Logo"
              width={300}
              height={120}
              style={{ 
                objectFit: "contain",
                width: "100%",
                height: "auto",
                maxWidth: "300px"
              }}
            />
          </div>
          
          <div className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          
          <div className="loading-progress">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
          
          <div className="loading-text">
            <h2>Loading...</h2>
            <p>Welcome to The Entrepreneurial Chronicles</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .loading-page {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          color: #fff;
          --logo-max-width: 300px;
          --progress-width: 200px;
          --heading-size: 1.5rem;
          --text-size: 1rem;
          --dot-size: 12px;
          --container-gap: 2rem;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: var(--container-gap);
        }

        .loading-logo {
          animation: logoFadeIn 1s ease-in-out;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: var(--logo-max-width);
        }

        .loading-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          animation: dotsFadeIn 1.5s ease-in-out;
        }

        .dot {
          width: var(--dot-size);
          height: var(--dot-size);
          background: #D4AF37;
          border-radius: 50%;
          animation: bounce 1.4s ease-in-out infinite both;
        }

        .dot:nth-child(1) {
          animation-delay: -0.32s;
        }

        .dot:nth-child(2) {
          animation-delay: -0.16s;
        }

        .dot:nth-child(3) {
          animation-delay: 0s;
        }

        .loading-progress {
          width: var(--progress-width);
          animation: progressFadeIn 1.8s ease-in-out;
        }

        .progress-bar {
          width: 100%;
          height: 4px;
          background: #333;
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37);
          border-radius: 2px;
          animation: progressFill 2s ease-in-out;
        }

        .loading-text {
          animation: textFadeIn 2s ease-in-out;
        }

        .loading-text h2 {
          color: #D4AF37;
          font-size: var(--heading-size);
          margin: 0 0 0.5rem 0;
          font-weight: 600;
          animation: pulse 2s ease-in-out infinite;
        }

        .loading-text p {
          color: #ccc;
          font-size: var(--text-size);
          margin: 0;
          font-weight: 300;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes logoFadeIn {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dotsFadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes textFadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }


        @keyframes progressFadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progressFill {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        /* Tablet Responsive Design */
        @media (max-width: 1024px) {
          .loading-page {
            --logo-max-width: 280px;
            --progress-width: 180px;
            --heading-size: 1.4rem;
            --text-size: 0.95rem;
            --dot-size: 11px;
            --container-gap: 1.5rem;
          }
          
          .loading-logo img {
            width: 100% !important;
            height: auto !important;
          }
        }

        /* Mobile Responsive Design */
        @media (max-width: 768px) {
          .loading-page {
            --logo-max-width: 220px;
            --progress-width: 160px;
            --heading-size: 1.2rem;
            --text-size: 0.9rem;
            --dot-size: 10px;
            --container-gap: 1.2rem;
          }
          
          .loading-container {
            padding: 20px;
          }
          
          .loading-logo img {
            width: 100% !important;
            height: auto !important;
          }
          
          .loading-dots {
            gap: 6px;
          }
        }

        /* Small Mobile Responsive Design */
        @media (max-width: 480px) {
          .loading-page {
            --logo-max-width: 180px;
            --progress-width: 140px;
            --heading-size: 1rem;
            --text-size: 0.8rem;
            --dot-size: 8px;
            --container-gap: 1rem;
          }
          
          .loading-container {
            padding: 15px;
          }
          
          .loading-logo img {
            width: 100% !important;
            height: auto !important;
          }
          
          .loading-dots {
            gap: 5px;
          }
        }

        /* Extra Small Mobile */
        @media (max-width: 360px) {
          .loading-page {
            --logo-max-width: 150px;
            --progress-width: 120px;
            --heading-size: 0.9rem;
            --text-size: 0.75rem;
            --dot-size: 7px;
            --container-gap: 0.8rem;
          }
          
          .loading-container {
            padding: 10px;
          }
          
          .loading-logo img {
            width: 100% !important;
            height: auto !important;
          }
          
          .loading-dots {
            gap: 4px;
          }
        }
      `}</style>
    </>
  );
};

export default LoadingPage;
