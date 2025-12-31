
import React from 'react';

const FAQSection = () => {
  const faqData = [
    {
      id: 1,
      question: "How can I read the magazine?",
      answer: `Dive into our latest digital issues—each one is packed with stunning graphics and animations. Just tap a cover to start exploring. No sign-up needed; everyone&apos;s invited.`
    },
    {
      id: 2,
      question: "Who do you feature in each issue?",
      answer: `We highlight innovators, creators, and leaders from every background—people who are shaping the future. Every edition brings you fresh voices and bold ideas.`
    },
    {
      id: 3,
      question: "Can I share my story or idea?",
      answer: `Yes! We welcome your vision. If you have a story, insight, or creative spark, connect with us through our contact page. Let&apos;s inspire the world together.`
    },
    {
      id: 4,
      question: "What sets your content apart?",
      answer: `Our stories blend immersive visuals, gold accents, and powerful narratives. Each piece is crafted to ignite curiosity, celebrate vision, and connect dreamers everywhere.`
    }
  ];

  return (
    <>
      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-container">
          <h1 className="faq-title">Visionaries, stories, and how to join</h1>
          <p className="faq-subtitle">
            Wondering how to explore our animated magazine, discover inspiring leaders, or share your own story? 
            Find all the details you need below—let&apos;s make your journey unforgettable.
          </p>

          <div className="faq-list">
            {faqData.map((item) => (
              <div key={item.id} className="faq-item">
                <h3 className="faq-question">{item.question}</h3>
                <p className="faq-answer">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inbuilt CSS */}
      <style jsx>{`
        .faq-section {
          background-color: #000000; /* Completely black background */
          color: white;
          font-family: var(--primary-font);
          line-height: 1.6;
          padding: 6rem 2rem;
          position: relative;
          overflow: hidden;
          width: 100%;
          clear: both;
        }

        .faq-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: none;
          pointer-events: none;
        }

        .faq-container {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .faq-title {
          font-size: 2.8rem;
          color: #d4af37;
          text-align: center;
          margin-bottom: 1rem;
          font-weight: 800;
          text-shadow: 0 2px 10px rgba(212, 175, 55, 0.4);
          position: relative;
        }

        .faq-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, #d4af37, #f4e4bc, #d4af37);
          border-radius: 2px;
        }

        .faq-subtitle {
          text-align: center;
          color: #ccc;
          font-size: 1.6rem;
          margin-bottom: 3rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.8;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .faq-item {
          border-bottom: 1px solid rgba(212, 175, 55, 0.3);
          padding: 2rem 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .faq-item:last-child {
          border: none;
        }

        .faq-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .faq-item:hover::before {
          left: 100%;
        }

        .faq-question {
          font-size: 1.9rem;
          color: white;
          margin-bottom: 1.2rem;
          transition: all 0.3s ease;
          font-weight: 700;
          position: relative;
          z-index: 1;
          line-height: 1.4;
        }

        .faq-answer {
          color: #e0e0e0;
          font-size: 1.6rem;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
          line-height: 1.8;
          font-weight: 400;
        }

        .faq-item:hover .faq-question {
          color: #d4af37;
          text-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
          background: linear-gradient(45deg, #d4af37, #f4e4bc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .faq-item:hover {
          transform: translateX(10px);
          border-color: #d4af37;
          background: rgba(212, 175, 55, 0.03);
          box-shadow: 0 5px 20px rgba(212, 175, 55, 0.15);
        }

        @media (max-width: 1024px) {
          .faq-section { padding: 4rem 2rem; }
        }

        @media (max-width: 768px) {
          .faq-section { padding: 3rem 1.5rem; }
          .faq-title { font-size: 2rem; }
          .faq-subtitle { font-size: 1.1rem; margin-bottom: 2rem; }
          .faq-question { font-size: 1.4rem; }
          .faq-answer { font-size: 1.2rem; }
          .faq-item { padding: 1.5rem 0; }
        }

        @media (max-width: 480px) {
          .faq-section { padding: 2rem 1rem; }
          .faq-title { font-size: 1.8rem; }
          .faq-subtitle { font-size: 1rem; }
          .faq-question { font-size: 1.3rem; }
          .faq-answer { font-size: 1.1rem; }
          .faq-item { padding: 1.25rem 0; }
          .faq-item:hover { transform: translateX(5px); }
        }

        .faq-item {
          animation: fadeInUp 0.6s ease-out;
        }

        .faq-item:nth-child(1) { animation-delay: 0.1s; }
        .faq-item:nth-child(2) { animation-delay: 0.2s; }
        .faq-item:nth-child(3) { animation-delay: 0.3s; }
        .faq-item:nth-child(4) { animation-delay: 0.4s; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .faq-item:focus-within {
          outline: 2px solid #ffd700;
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
};

export default FAQSection;