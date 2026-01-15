import { useState, useEffect } from 'react';

const NewsletterPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if popup has been dismissed before (using localStorage)
    const popupDismissed = localStorage.getItem('newsletterPopupDismissed');
    const dismissedDate = localStorage.getItem('newsletterPopupDismissedDate');
    
    // Show popup if it hasn't been dismissed, or if it was dismissed more than 24 hours ago
    if (!popupDismissed) {
      // Delay showing popup by 1 second after page load for better UX
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (dismissedDate) {
      const hoursSinceDismissed = (Date.now() - parseInt(dismissedDate)) / (1000 * 60 * 60);
      if (hoursSinceDismissed >= 24) {
        const timer = setTimeout(() => {
          setShowPopup(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem('newsletterPopupDismissed', 'true');
    localStorage.setItem('newsletterPopupDismissedDate', Date.now().toString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setSubmitMessage('Please enter a valid email address.');
      setTimeout(() => setSubmitMessage(''), 3000);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitMessage('Thank you for subscribing!');
      setIsSubmitting(false);
      setEmail('');
      
      // Close popup after successful subscription
      setTimeout(() => {
        handleClose();
      }, 2000);
    }, 1000);
  };

  if (!showPopup) return null;

  return (
    <>
      <div 
        className={`newsletter-popup-overlay ${showPopup ? 'show-popup' : ''}`}
        onClick={handleClose}
      />
      <div className={`newsletter-popup ${showPopup ? 'show-popup' : ''}`}>
        <div className="newsletter-popup-inner">
          <button 
            className="newsletter-popup-close" 
            onClick={handleClose}
            aria-label="Close newsletter popup"
          >
            ×
          </button>
          
          <div className="newsletter-popup-content">
            <div className="newsletter-popup-header">
              <h2 className="newsletter-popup-title" style={{ fontWeight: '700' }}>JOIN OUR NEWSLETTER</h2>
              <p className="newsletter-popup-subtitle" style={{ fontWeight: '600' }}>Stay Informed with our exclusive updates</p>
            </div>

            <div className="newsletter-popup-body">
              <p className="newsletter-popup-description">
                Get the latest insights, exclusive content, and special offers delivered directly to your inbox. 
                Join thousands of readers who stay ahead with our curated newsletter.
              </p>

              <form className="newsletter-popup-form" onSubmit={handleSubmit}>
                <div className="newsletter-form-group">
                  <input
                    type="email"
                    name="newsletter-email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="newsletter-email-input"
                    disabled={isSubmitting}
                  />
                </div>

                <button 
                  type="submit" 
                  className="newsletter-subscribe-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" style={{ animation: 'spin 1s linear infinite', color: '#ffffff !important' }}>⟳</span>
                      <span style={{ color: '#ffffff !important' }}>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span style={{ color: '#ffffff !important', fontWeight: '700' }}>SUBSCRIBE</span>
                    </>
                  )}
                </button>

                {submitMessage && (
                  <div className={`newsletter-message ${submitMessage.includes('Thank you') ? 'success' : 'error'}`}>
                    {submitMessage}
                  </div>
                )}
              </form>

             
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .newsletter-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(5px);
          z-index: 999998;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.4s ease, visibility 0.4s ease;
        }

        .newsletter-popup-overlay.show-popup {
          opacity: 1;
          visibility: visible;
        }

        .newsletter-popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999999;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.4s ease, visibility 0.4s ease;
          pointer-events: none;
        }

        .newsletter-popup.show-popup {
          opacity: 1;
          visibility: visible;
          pointer-events: all;
        }

        .newsletter-popup-inner {
          position: relative;
          background: #ffffff;
          border: 3px solid #111111;
          border-radius: 20px;
          max-width: 560px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5),
                      0 0 0 1px rgba(17, 17, 17, 0.2),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transform: scale(0.9) translateY(20px);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: popupSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes popupSlideIn {
          from {
            transform: scale(0.9) translateY(20px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        .newsletter-popup.show-popup .newsletter-popup-inner {
          transform: scale(1) translateY(0);
        }

        .newsletter-popup-close {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 40px;
          height: 40px;
          background: transparent;
          border: 2px solid #bb0505;
          border-radius: 50%;
          color: #bb0505 !important;
          font-size: 28px;
          font-weight: 400;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
          padding: 0;
        }

        .newsletter-popup-close:hover {
          background: #bb0505;
          color: #ffffff !important;
          transform: rotate(90deg);
          border-color: #bb0505;
        }

        .newsletter-popup-content {
          padding: 35px 30px 30px;
          color: #111111 !important;
          -webkit-text-fill-color: #111111 !important;
        }

        .newsletter-popup-header {
          text-align: center;
          margin-bottom: 25px;
        }

        .newsletter-popup-title {
          font-size: 26px !important;
          font-weight: 700 !important;
          color: #111111 !important;
          margin: 0 0 10px 0 !important;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          line-height: 1.2;
        }

        .newsletter-popup-title,
        h2.newsletter-popup-title {
          color: #111111 !important;
        }

        .newsletter-popup-subtitle {
          font-size: 15px !important;
          color: #111111 !important;
          margin: 0 !important;
          font-weight: 600 !important;
          letter-spacing: 0.5px;
        }

        .newsletter-popup-subtitle,
        p.newsletter-popup-subtitle {
          color: #111111 !important;
        }

        .newsletter-popup-body {
          text-align: center;
        }

        .newsletter-popup-description {
          font-size: 14px;
          color: #111111;
          line-height: 1.6;
          margin: 0 0 25px 0;
        }

        .newsletter-popup-form {
          margin-bottom: 18px;
        }

        .newsletter-form-group {
          margin-bottom: 18px;
        }

        .newsletter-email-input {
          width: 100%;
          padding: 14px 18px;
          font-size: 15px;
          border: 2px solid #111111;
          border-radius: 50px;
          background: #fafafa;
          color: #111111;
          caret-color: #111111;
          outline: none;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .newsletter-email-input:focus {
          border-color: #bb0505;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(187, 5, 5, 0.15);
        }

        .newsletter-email-input::placeholder {
          color: #999;
        }

        .newsletter-email-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .newsletter-subscribe-btn {
          width: 100%;
          padding: 14px 25px;
          font-size: 15px;
          font-weight: 700;
          color: #ffffff !important;
          background: #bb0505;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 4px 15px rgba(187, 5, 5, 0.35);
        }

        .newsletter-subscribe-btn,
        .newsletter-subscribe-btn *,
        .newsletter-subscribe-btn span,
        .newsletter-subscribe-btn .spinner,
        .newsletter-subscribe-btn:hover,
        .newsletter-subscribe-btn:focus,
        .newsletter-subscribe-btn:active,
        .newsletter-subscribe-btn:hover *,
        .newsletter-subscribe-btn:focus *,
        .newsletter-subscribe-btn:active * {
          color: #ffffff !important;
          text-shadow: none !important;
        }

        .newsletter-subscribe-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(187, 5, 5, 0.45);
          background: #8f0404;
          color: #ffffff !important;
        }

        .newsletter-subscribe-btn:active:not(:disabled) {
          transform: translateY(0);
          color: #ffffff !important;
        }

        .newsletter-subscribe-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          color: #ffffff !important;
        }

        .newsletter-message {
          margin-top: 15px;
          padding: 12px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
        }

        .newsletter-message.success {
          background: #d4edda;
          color: #111111;
          border: 1px solid #c3e6cb;
        }

        .newsletter-message.error {
          background: #f8d7da;
          color: #111111;
          border: 1px solid #f5c6cb;
        }

        .newsletter-privacy-note {
          font-size: 11px;
          color: #111111;
          margin: 18px 0 0 0;
          font-style: italic;
        }

        .spinner {
          display: inline-block;
          font-size: 18px;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .newsletter-popup-inner {
            max-width: 95%;
            border-radius: 15px;
          }

          .newsletter-popup-content {
            padding: 30px 20px 25px;
          }

          .newsletter-popup-title {
            font-size: 22px;
            letter-spacing: 1px;
          }

          .newsletter-popup-subtitle {
            font-size: 14px !important;
            color: #333333 !important;
          }

          .newsletter-popup-description {
            font-size: 13px;
          }

          .newsletter-email-input {
            padding: 12px 16px;
            font-size: 14px;
          }

          .newsletter-subscribe-btn {
            padding: 12px 20px;
            font-size: 13px;
          }

          .newsletter-popup-close {
            top: 10px;
            right: 10px;
            width: 35px;
            height: 35px;
            font-size: 24px;
          }
        }

        @media (max-width: 480px) {
          .newsletter-popup-content {
            padding: 35px 20px 25px;
          }

          .newsletter-popup-title {
            font-size: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default NewsletterPopup;

