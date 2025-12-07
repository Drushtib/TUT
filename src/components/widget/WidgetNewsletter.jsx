import { useState } from "react";

const WidgetNewsletter = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!emailAddress) {
      setSubmitMessage("Please enter a valid email.");
      setTimeout(() => setSubmitMessage(""), 5000);
      return;
    }
    setSubmitMessage("Subscribed");
    setTimeout(() => setSubmitMessage(""), 5000);
  };

  return (
    <div className="newsletter-widget weekly-newsletter m-b-xs-40" style={{
      background: '#ffffff',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '15px',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Enhanced Background with Gradient Overlay */}
      <div
        style={{ 
          background: 'linear-gradient(135deg, rgba(218, 0, 55, 0.05) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(218, 0, 55, 0.05) 100%)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1
        }}
      ></div>
      
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '80px',
        height: '80px',
        background: 'radial-gradient(circle, rgba(218, 0, 55, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
        zIndex: 1
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '5%',
        width: '60px',
        height: '60px',
        background: 'radial-gradient(circle, rgba(218, 0, 55, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse',
        zIndex: 1
      }}></div>

      <div className="newsletter-content" style={{ position: 'relative', zIndex: 2 }}>
        <div className="newsletter-icon" style={{
          background: 'var(--gradient-primary)',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
                  boxShadow: '0 4px 15px rgba(218, 0, 55, 0.3)',
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          <i className="feather icon-send" style={{ color: '#ffffff', fontSize: '1.5rem' }} />
        </div>
        
        <div className="section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h3 className="axil-title" style={{
            color: '#171717',
            fontSize: '1.8rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            Subscribe To Our Weekly Newsletter
          </h3>
          <p className="mid" style={{
            color: '#444444',
            fontSize: '1rem',
            lineHeight: '1.6',
            margin: 0
          }}>
            No spam, notifications only about new magazines, updates.
          </p>
        </div>
        
        {/* Enhanced Form Styling */
        }
        <div className="subscription-form-wrapper">
          <form action="#" className="subscription-form" onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <input
                type="email"
                name="subscription-email-2"
                placeholder="Enter Email Address"
                required
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  background: '#f8f8f8',
                  border: '2px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '50px',
                  color: '#171717',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--primary-color)';
                  e.target.style.background = '#ffffff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(218, 0, 55, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                  e.target.style.background = '#f8f8f8';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <button 
                className="btn btn-primary" 
                type="submit"
                style={{
                  background: 'var(--gradient-primary)',
                  border: 'none',
                  padding: '1rem 2.5rem',
                  borderRadius: '50px',
                  color: 'var(--text-dark)',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(218, 0, 55, 0.3)',
                  minWidth: '150px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(218, 0, 55, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(218, 0, 55, 0.3)';
                }}
              >
                <i className="feather icon-send" style={{ marginRight: '0.5rem' }}></i>
                SUBSCRIBE
              </button>
              {submitMessage && (
                <div
                  role="status"
                  aria-live="polite"
                  style={{
                    marginTop: '0.75rem',
                    color: submitMessage === 'Subscribed' ? '#7CFC00' : '#ff6b6b',
                    fontWeight: 600
                  }}
                >
                  {submitMessage}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .subscription-form input::placeholder {
          color: #999999;
          opacity: 1;
        }
        
        .subscription-form input::-webkit-input-placeholder {
          color: #999999;
        }
        
        .subscription-form input::-moz-placeholder {
          color: #999999;
          opacity: 1;
        }
        
        .subscription-form input:-ms-input-placeholder {
          color: #999999;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .newsletter-widget {
            padding: 1.5rem !important;
            margin: 1rem 0 !important;
          }
          
          .newsletter-icon {
            width: 50px !important;
            height: 50px !important;
          }
          
          .axil-title {
            font-size: 1.5rem !important;
          }
          
          .subscription-form input {
            padding: 0.8rem 1.2rem !important;
            font-size: 0.9rem !important;
          }
          
          .btn {
            padding: 0.8rem 2rem !important;
            font-size: 0.9rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .newsletter-widget {
            padding: 1rem !important;
          }
          
          .axil-title {
            font-size: 1.3rem !important;
          }
          
          .subscription-form input {
            padding: 0.7rem 1rem !important;
            font-size: 0.85rem !important;
          }
          
          .btn {
            padding: 0.7rem 1.5rem !important;
            font-size: 0.85rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default WidgetNewsletter;
