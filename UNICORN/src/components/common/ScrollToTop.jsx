import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Debug: Show button immediately for testing
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      // Lower threshold for mobile devices
      const threshold = window.innerWidth <= 768 ? 200 : 300;
      if (window.pageYOffset > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}

      <style jsx>{`
        .scroll-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          background: #D4AF37;
          color: #000;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: bold;
          box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
          transition: all 0.3s ease;
          z-index: 9999;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.3s ease forwards;
        }

        .scroll-to-top:hover {
          background: #FFD700;
          transform: translateY(-3px);
          box-shadow: 0 6px 25px rgba(212, 175, 55, 0.4);
        }

        .scroll-to-top:active {
          transform: translateY(-1px);
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .scroll-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
            font-size: 16px;
            z-index: 9999;
            display: flex !important;
          }
        }

        @media (max-width: 480px) {
          .scroll-to-top {
            bottom: 15px;
            right: 15px;
            width: 40px;
            height: 40px;
            font-size: 14px;
            z-index: 9999;
            display: flex !important;
          }
        }

        /* Ensure visibility on all devices */
        @media (max-width: 1024px) {
          .scroll-to-top {
            display: flex !important;
            visibility: visible !important;
          }
        }
      `}</style>
    </>
  );
};

export default ScrollToTop;
