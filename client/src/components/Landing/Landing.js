import React from "react";
import "./Landing.css";
import slack from "../../assets/slack.png";

const Landing = () => {
  return (
    <section className="landing-page-container">
      <div className="landing-page">
        <img src={slack} className="landing-page-image" alt="Slack Logo" />

        <div className="sign-in">
          <h1 className="landing-page-heading">Sign in to Slack</h1>
          <p>
            We suggest using the <strong>email address you use at work</strong>
          </p>

          <div>
            <button className="google-sign-in">Sign In With Google!</button>
          </div>

          <div className="landing-page-or">------------ OR ------------</div>

          <form className="email-sign-in">
            <input
              className="email-input"
              type="email"
              placeholder="name@work-email.com"
            />
            <div>
              <button className="email-button">Sign In With Email!</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Landing;
