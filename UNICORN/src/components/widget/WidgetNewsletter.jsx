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
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)',
      border: '1px solid rgba(174, 134, 37, 0.2)',
      borderRadius: '15px',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Enhanced Background with Gradient Overlay */}
      <div
        style={{ 
          background: 'linear-gradient(135deg, rgba(174, 134, 37, 0.1) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(174, 134, 37, 0.05) 100%)',
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
        background: 'radial-gradient(circle, rgba(174, 134, 37, 0.1) 0%, transparent 70%)',
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
        background: 'radial-gradient(circle, rgba(174, 134, 37, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse',
        zIndex: 1
      }}></div>

      <div className="newsletter-content" style={{ position: 'relative', zIndex: 2 }}>
        <div className="newsletter-icon" style={{
          background: 'linear-gradient(45deg, #ae8625, #f4d03f)',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: '0 4px 15px rgba(174, 134, 37, 0.3)',
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          <i className="feather icon-send" style={{ color: '#000', fontSize: '1.5rem' }} />
        </div>
        
        <div className="section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h3 className="axil-title" style={{
            color: '#ffffff',
            fontSize: '1.8rem',
            fontWeight: '700',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            Subscribe To Our Weekly Newsletter
          </h3>
          <p className="mid" style={{
            color: '#cccccc',
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
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(174, 134, 37, 0.3)',
                  borderRadius: '50px',
                  color: '#ffffff',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = '#ae8625';
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(174, 134, 37, 0.3)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              />
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <button 
                className="btn btn-primary" 
                type="submit"
                style={{
                  background: 'linear-gradient(45deg, #ae8625, #f4d03f)',
                  border: 'none',
                  padding: '1rem 2.5rem',
                  borderRadius: '50px',
                  color: '#000',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(174, 134, 37, 0.3)',
                  minWidth: '150px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(174, 134, 37, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(174, 134, 37, 0.3)';
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
