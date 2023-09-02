import React from "react";
import imgContact0 from "../assets/img/contact0.webp";
import imgContact1 from "../assets/img/contact1.webp";
import Button from "./Button";
import Input from "./Input";

const Contact = () => {
  return (
    <section className="contact">
      <div className="contact-box container">
        <h2 className="contact-title ">#LIVESONKHANS</h2>
        <div className="contact-group ">
          <div className="contact-lists">
            <div className="contact-item">
              <img src={imgContact0} alt="Contact user" />
              <img src={imgContact1} alt="Contact user" />
            </div>
          </div>
          <form className="contact-form">
            <h4>20% OFF + FREE SHIPPING</h4>
            <span>For All New SonKhan's® Email Subscribers.</span>
            <Input type="text" placeholder="Email" className="contact-input" />
            <p>
              Send me news and offers from the LS&Co. Group of Companies. I can
              <a href="/"> unsubscribe</a> at any time. I have read the LS&Co.
              <a href="/"> Privacy Policy</a>. Offer details, financial
              incentives and exclusions available <a href="/">here</a>.
            </p>
            <Button type="submit" className="contact-submit">
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
