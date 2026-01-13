import FormGroup from "./FormGroup";
import emailjs from "@emailjs/browser";
import Alert from "react-bootstrap/Alert";
import { useRef, useState } from "react";

const Result = () => {
  return (
    <Alert variant="success" className="success-msg">
      Your Message has been successfully sent.
    </Alert>
  );
};

const ContactForm = () => {
  const form = useRef();

  const [result, showresult] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Email must contain @ symbol";
    } else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Phone validation - exactly 10 digits
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!formData.phone.match(/^\d{10}$/)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'contact-phone') {
      // Only allow digits, max 10 characters
      const cleanedValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, phone: cleanedValue }));
    } else {
      const fieldName = name.replace('contact-', '');
      setFormData(prev => ({ ...prev, [fieldName]: value }));
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    emailjs
      .sendForm(
        "service_8tg2gsa",
        "template_zmxkd45",
        form.current,
        "QYncFYwURx7oPBVab"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    form.current.reset();
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setErrors({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    showresult(true);
  };

  setTimeout(() => {
    showresult(false);
  }, 2000);

  return (
    <div className="axil-contact-form-block m-b-xs-30" style={{ background: '#171717', color: '#fff' }}>
      <div className="section-title d-block" style={{ color: '#fff' }}>
        <h2 className="h3 axil-title m-b-xs-20" style={{ color: '#fff' }}>Send Us a Message</h2>
      </div>
      <div className="axil-contact-form-wrapper p-t-xs-10" style={{ color: '#fff' }}>
        <form
          className="axil-contact-form row no-gutters"
          ref={form}
          onSubmit={sendEmail}
        >
          <FormGroup
            pClass="col-12"
            type="text"
            name="contact-name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
          <FormGroup
            pClass="col-12"
            type="tel"
            name="contact-phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleInputChange}
            error={errors.phone}
            maxLength="10"
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
          <FormGroup
            pClass="col-12"
            type="email"
            name="contact-email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
          <FormGroup
            pClass="col-12"
            type="textarea"
            name="contact-message"
            placeholder="Enter your message here"
            value={formData.message}
            onChange={handleInputChange}
            error={errors.message}
          />
          {errors.message && <div className="error-message">{errors.message}</div>}
          <div className="col-12" style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
            <button 
              className="btn btn-primary m-t-xs-0 m-t-lg-20"
              style={{
                borderRadius: "12px",
                padding: "1.2rem 5rem",
                fontSize: "1.4rem",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "1px",
                width: "100%",
                maxWidth: "400px",
                backgroundColor: "#FF0000",
                border: "none",
                color: "#fff",
              }}
            >
              SUBMIT
            </button>
          </div>
          <div className="col-12 form-group">{result ? <Result /> : null}</div>
        </form>
      </div>
      <style jsx global>{`
        .axil-contact-form input,
        .axil-contact-form textarea,
        .axil-contact-form .form-control {
          background: #171717 !important;
          color: #fff !important;
          border: 1px solid #D4AF37 !important;
          border-radius: 6px;
          padding: 12px 15px;
        }
        
        .axil-contact-form input::placeholder,
        .axil-contact-form textarea::placeholder {
          color: #ccc !important;
          opacity: 1 !important;
        }
        
        .axil-contact-form input:focus,
        .axil-contact-form textarea:focus,
        .axil-contact-form .form-control:focus {
          background: #171717 !important;
          color: #fff !important;
          border-color: #D4AF37 !important;
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
          outline: none;
        }
        
        .axil-contact-form label {
          color: #fff !important;
        }
        
        .axil-contact-form .btn-primary {
          background-color: #FF0000 !important;
          border: none !important;
          color: #fff !important;
        }
        
        .axil-contact-form .btn-primary:hover {
          background-color: #CC0000 !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(255, 0, 0, 0.4);
        }

        .error-message {
          display: block;
          color: #dc3545;
          font-size: 12px;
          margin-top: 4px;
          font-weight: 500;
          margin-bottom: 10px;
        }

        .axil-contact-form input.error,
        .axil-contact-form textarea.error,
        .axil-contact-form .form-control.error {
          border-color: #dc3545 !important;
          box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25) !important;
        }

        .axil-contact-form input:focus.error,
        .axil-contact-form textarea:focus.error,
        .axil-contact-form .form-control:focus.error {
          border-color: #dc3545 !important;
          box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25) !important;
        }
      `}</style>
    </div>
  );
};

export default ContactForm;