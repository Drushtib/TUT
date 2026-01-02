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

  const sendEmail = (e) => {
    e.preventDefault();

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
    showresult(true);
  };

  setTimeout(() => {
    showresult(false);
  }, 2000);

  return (
    <div className="axil-contact-form-block m-b-xs-30" style={{ background: '#000', color: '#fff' }}>
      <div className="section-title d-block" style={{ color: '#fff' }}>
        <h2 className="h3 axil-title m-b-xs-20" style={{ color: '#fff' }}>Send Us a Message</h2>
        <p style={{ color: '#ccc' }}>
          Your email address will not be published. All the fields are required.
        </p>
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
          />
          <FormGroup
            pClass="col-12"
            type="text"
            name="contact-phone"
            placeholder="Enter your phone number"
          />
          <FormGroup
            pClass="col-12"
            type="email"
            name="contact-email"
            placeholder="Enter your email address"
          />
          <FormGroup
            pClass="col-12"
            type="textarea"
            name="contact-message"
            placeholder="Enter your message here"
          />
          <div className="col-12">
            <button className="btn btn-primary m-t-xs-0 m-t-lg-20">
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
          background: #000 !important;
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
          background: #000 !important;
          color: #fff !important;
          border-color: #D4AF37 !important;
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
          outline: none;
        }
        
        .axil-contact-form label {
          color: #fff !important;
        }
      `}</style>
    </div>
  );
};

export default ContactForm;