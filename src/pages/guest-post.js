import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faAward, 
  faChartLine, 
  faShareAlt, 
  faArchive, 
  faEnvelope, 
  faSearch, 
  faUsers, 
  faHandshake 
} from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser";
import HeaderOne from "../components/header/HeaderOne";
import FooterTwo from "../components/footer/FooterTwo";

const features = [
  {
    icon: faAward,
    color: "#FFD700",
    description: "We have high Domain Authority and Page Authority.",
  },
  {
    icon: faChartLine,
    color: "#4CAF50",
    description: "We capture the audience organically.",
  },
  {
    icon: faShareAlt,
    color: "#2196F3",
    description:
      "We will post your published content on our social media channels.",
  },
  {
    icon: faArchive,
    color: "#FF9800",
    description: "Your content will remain in our archives for one year.",
  },
  {
    icon: faEnvelope,
    color: "#9C27B0",
    description:
      "If your content is good, we will promote it in our weekly newsletter.",
  },
  {
    icon: faSearch,
    color: "#00BCD4",
    description:
      "We will optimize your content to make it visible on search engines.",
  },
  {
    icon: faUsers,
    color: "#E91E63",
    description:
      "Our team is professionally adept and follows high integrity in all processes.",
  },
  {
    icon: faHandshake,
    color: "#795548",
    description: "We will give discounts for long-term partnerships.",
  },
];
const GuestPostForm = () => {
  const form = useRef();
  const [result, showResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => {
        showResult(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  const sendEmail = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      // Create a message field with organization and country info
      const formData = new FormData(form.current);
      const name = formData.get('contact-name') || '';
      const email = formData.get('contact-email') || '';
      const phone = formData.get('contact-phone') || '';
      const organization = formData.get('contact-organization') || '';
      const country = formData.get('contact-country') || '';
      const message = `Guest Post Request\n\nOrganization: ${organization}\nCountry: ${country}`;
      
      // Add message field to form if it doesn't exist
      let messageField = form.current.querySelector('[name="contact-message"]');
      if (!messageField) {
        messageField = document.createElement('input');
        messageField.type = 'hidden';
        messageField.name = 'contact-message';
        form.current.appendChild(messageField);
      }
      messageField.value = message;

      console.log("Submitting form with data:", {
        name,
        email,
        phone,
        organization,
        country,
        message
      });

      const response = await emailjs.sendForm(
        "service_8tg2gsa",
        "template_zmxkd45",
        form.current,
        "QYncFYwURx7oPBVab"
      );

      console.log("SUCCESS!", response.status, response.text);
      
      // Reset form and show success
      form.current.reset();
      showResult(true);
      setIsSubmitting(false);
      
      // Remove the temporary message field
      if (messageField && messageField.parentNode) {
        messageField.parentNode.removeChild(messageField);
      }
    } catch (error) {
      console.error("FAILED...", error);
      setIsSubmitting(false);
      
      // Remove the temporary message field even on error
      const messageField = form.current.querySelector('[name="contact-message"]');
      if (messageField && messageField.parentNode) {
        messageField.parentNode.removeChild(messageField);
      }
      
      // Show user-friendly error message
      const errorText = error.text || error.message || error.toString() || "Unknown error";
      console.error("Error details:", error);
      
      // Check if it's a Gmail API error
      if (errorText.includes("Gmail_API") || errorText.includes("Invalid grant")) {
        alert(
          "Email service configuration issue detected.\n\n" +
          "Please contact the website administrator. The email service needs to be reconfigured.\n\n" +
          "Error: " + errorText
        );
      } else {
        alert(
          "Failed to submit form. Please try again.\n\n" +
          "If the problem persists, please contact us directly.\n\n" +
          "Error: " + errorText
        );
      }
    }
  };

  return (
    <>
      <HeaderOne />
      <Container
        fluid
        style={{ backgroundColor: "#171717" }}
        className=" text-white py-5"
      >
        <Row className="justify-content-center">
          <Col
            md={6}
            className="d-flex flex-column justify-content-center gap-4"
          >
            <h1 className="mb-4 text-center">Guest Posts on our Website</h1>
            <p
              className="mb-4 mx-auto text-start text-white"
              style={{ maxWidth: "500px" }}
            >
              The primary aim of guest posts is to increase the digital reach of
              brands and their websites. If strategically used, they can help
              websites get juices from various sources and also help to increase
              Domain Authorities and Page Authorities of the websites. We
              understand how important and difficult it can become for brands to
              choose perfect websites to promote their content.
            </p>
          </Col>
          <Col md={4}>
            <div className="p-4 rounded" style={{ background: "#171717", border: "1px solid #fff" }}>
              <h2 className="text-center mb-4" style={{ color: "#fff" }}>Get a Quote</h2>
              <Form className="guest-post-form" ref={form} onSubmit={sendEmail}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Control 
                    type="text" 
                    name="contact-name"
                    placeholder="Name*" 
                    required 
                    style={{ background: "#171717", color: "#fff", border: "1px solid #fff" }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Control 
                    type="email" 
                    name="contact-email"
                    placeholder="Email*" 
                    required 
                    style={{ background: "#171717", color: "#fff", border: "1px solid #fff" }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Control
                    type="number"
                    name="contact-phone"
                    placeholder="Contact Number*"
                    required
                    style={{ background: "#171717", color: "#fff", border: "1px solid #fff" }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formOrganization">
                  <Form.Control
                    type="text"
                    name="contact-organization"
                    placeholder="Organization Name*"
                    required
                    style={{ background: "#171717", color: "#fff", border: "1px solid #fff" }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCountry">
                  <Form.Control 
                    type="text" 
                    name="contact-country"
                    placeholder="Country*" 
                    required 
                    style={{ background: "#171717", color: "#fff", border: "1px solid #fff" }}
                  />
                </Form.Group>
                {result && (
                  <Alert variant="success" className="mb-3" style={{ background: "#28a745", color: "#fff", border: "none", borderRadius: "6px" }}>
                    Form submitted successfully!
                  </Alert>
                )}
                <div className="d-grid">
                  <Button 
                    variant="dark" 
                    type="submit" 
                    disabled={isSubmitting}
                    style={{ 
                      background: isSubmitting ? "#999" : "#FF0000", 
                      color: "#fff", 
                      border: "none",
                      cursor: isSubmitting ? "not-allowed" : "pointer"
                    }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
        <Container className="py-5 mt-5 mb-5" style={{ background: "#171717" }}>
          <h2 className="text-center mb-4" style={{ color: "#fff" }}>Highlighted Features</h2>
          <p className="text-center mb-5" style={{ color: "#fff" }}>
            We have built our platform to help our partners reach their audience
            in the most professional manner. Here are some of the benefits of
            publishing your content on our website.
          </p>
          <Row className="gy-4">
            {features.map((feature, index) => (
              <Col key={index} md={3} sm={6} className="text-center">
                <div
                  className="feature-box guest-post-feature-box p-4 border rounded-3 d-flex flex-column align-items-center justify-content-center"
                  style={{ height: "200px", background: "#171717", border: "1px solid #fff" }}
                >
                  <div
                    className="feature-icon guest-post-feature-icon mb-3"
                    style={{ 
                      fontSize: "3rem",
                      color: feature.color || "#d4af37"
                    }}
                  >
                    <FontAwesomeIcon 
                      icon={feature.icon} 
                      color={feature.color || "#d4af37"}
                      style={{ 
                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
                      }} 
                    />
                  </div>
                  <p className="m-0" style={{ color: "#fff" }}>{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
        <Container className="mt-5 mb-5">
          <Row>
            <p className="text-white mt-5">
              We have built our website for professionals and readers to get
              insightful content. We work dedicatedly to maintain the quality of
              our work. For our loyal readers, we have a few criteria for the
              posts that we accept. Please go through these points before you
              submit your content
            </p>
            <Col md={6}>
              <h3 style={{ color: "#fff" }}>Guidelines for Content Submission</h3>
              <ul style={{ color: "#fff" }}>
                <li>Choose topics related to business or technology.</li>
                <li>Consider trending topics.</li>
                <li>Avoid promotional content.</li>
                <li>Limit external links to 2.</li>
                <li>Refrain from political or controversial content.</li>
                <li>Submit original content (100% unique).</li>
                <li>Maintain a word count between 400 and 1200 words.</li>
                <li>Ensure grammatical accuracy.</li>
                <li>Optimize for SEO.</li>
              </ul>
            </Col>
            <Col md={6}>
              <h3 style={{ color: "#fff" }}>Additional Notes</h3>
              <ul style={{ color: "#fff" }}>
                <li>
                  Provide related images or allow our team to use appropriate
                  ones.
                </li>
                <li>
                  Our editorial team will review your content and provide
                  feedback if necessary.
                </li>
                <li>
                  We seek long-term partnerships focused on providing value to
                  our readers.
                </li>
                <li>
                  For advertising or marketing opportunities, visit
                  https://www.theentrepreneurialchronicle.com/contact.
                </li>
              </ul>
            </Col>
            <p className="text-white mt-5">
              Once you send your content, our editorial team will review it. If
              it does not match our standards, we will have to reject it, but we
              will contact you and tell you the issues so that you can rework on
              it and send back the revised content. We are looking for long-term
              partners, with whom we can work with integrity and provide value
              to our readers through our website.
            </p>
            <p className="text-white">
              We are looking for long-term partners, with whom we can work with
              integrity and provide value to our readers through our website.
            </p>
          </Row>
        </Container>
      </Container>
      <style jsx global>{`
        .guest-post-form input:focus,
        .guest-post-form input:active {
          background: #171717 !important;
          color: #fff !important;
          border-color: #fff !important;
          outline: none !important;
        }
        .guest-post-form input::placeholder {
          color: #ccc !important;
          opacity: 1 !important;
        }
        .guest-post-form button[type="submit"]:hover {
          background: #CC0000 !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(255, 0, 0, 0.4);
        }
        /* Override global color for feature icons with very high specificity */
        .guest-post-feature-box .guest-post-feature-icon,
        .guest-post-feature-box .guest-post-feature-icon svg,
        .guest-post-feature-box .guest-post-feature-icon svg path,
        .guest-post-feature-box .guest-post-feature-icon svg * {
          color: inherit !important;
          fill: currentColor !important;
          stroke: currentColor !important;
        }
        /* Ensure the icon wrapper passes color to SVG */
        .guest-post-feature-box .guest-post-feature-icon svg {
          color: inherit !important;
        }
        .guest-post-feature-box .guest-post-feature-icon svg path {
          fill: currentColor !important;
        }
      `}</style>
      <FooterTwo />
    </>
  );
};

export default GuestPostForm;
