import React, { useState, useEffect, useRef } from 'react';

const CountingSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    stories: 0,
    leaders: 0,
    industries: 0,
    readers: 0
  });
  const sectionRef = useRef(null);

  const targetCounts = {
    stories: 27,
    leaders: 30,
    industries: 25,
    readers: 40000
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // 2 seconds for animation
      const steps = 60;
      const increment = {
        stories: targetCounts.stories / steps,
        leaders: targetCounts.leaders / steps,
        industries: targetCounts.industries / steps,
        readers: targetCounts.readers / steps
      };

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        
        setCounts({
          stories: Math.min(Math.floor(increment.stories * currentStep), targetCounts.stories),
          leaders: Math.min(Math.floor(increment.leaders * currentStep), targetCounts.leaders),
          industries: Math.min(Math.floor(increment.industries * currentStep), targetCounts.industries),
          readers: Math.min(Math.floor(increment.readers * currentStep), targetCounts.readers)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K+';
    }
    return num + '+';
  };

  return (
    <>
      <style jsx>{`
        .counting-section {
          background: #f5f5f5;
          padding: 4rem 0;
          margin: 0;
        }

        .counting-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .counting-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          text-align: center;
        }

        .count-card {
          background: #ffffffff;
          padding: 2rem 1.5rem;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-left: 4px solid #990000;
        }

        .count-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(153, 0, 0, 0.2);
          border-left-color: #cc0000;
        }

        .count-number {
          font-size: 3.5rem;
          font-weight: 700;
          color: #990000;
          margin-bottom: 1rem;
          line-height: 1;
        }

        .count-label {
          font-size: 1.2rem;
          font-weight: 500;
          color: #333333;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @media (max-width: 1024px) {
          .counting-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .count-number {
            font-size: 3rem;
          }
        }

        @media (max-width: 768px) {
          .counting-section {
            padding: 3rem 0;
          }

          .counting-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .count-card {
            padding: 1.5rem 1rem;
          }

          .count-number {
            font-size: 2.5rem;
          }

          .count-label {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .counting-container {
            padding: 0 1rem;
          }

          .count-number {
            font-size: 2rem;
          }
        }
      `}</style>

      <div ref={sectionRef} className="counting-section">
        <div className="counting-container">
          <div className="counting-grid">
            <div className="count-card">
              <div className="count-number">
                {formatNumber(counts.stories)}
              </div>
              <div className="count-label">Featured Stories</div>
            </div>

            <div className="count-card">
              <div className="count-number">
                {formatNumber(counts.leaders)}
              </div>
              <div className="count-label">Global Leaders</div>
            </div>

            <div className="count-card">
              <div className="count-number">
                {formatNumber(counts.industries)}
              </div>
              <div className="count-label">Industries Covered</div>
            </div>

            <div className="count-card">
              <div className="count-number">
                {formatNumber(counts.readers)}
              </div>
              <div className="count-label">Monthly Readers</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountingSection;
