import React from "react";
import { Link } from "react-router-dom";
import "./landingpage.css";

function LandingPage() {
  return (
    <div className="lp-root">
      <header className="lp-header">
        <div className="lp-logo-icon">🎓</div>
        <span className="lp-logo-text">ClubConnect</span>
      </header>

      <main className="lp-main">
        <section className="lp-hero-text">
          <h1>The ultimate platform for college club management and student engagement</h1>
          <p>
            Connect with clubs, discover events, and build lasting relationships in your
            college community.
          </p>
        </section>

        <section className="lp-cards">
          {/* For Students card */}
          <div className="lp-card">
            <div className="lp-card-icon">👥</div>
            <h2>For Students</h2>
            <p>
              Discover events, join clubs, and stay connected with your college community.
            </p>

            <Link to="/student-login" className="lp-btn lp-btn-primary">
              Student Login
            </Link>

            <Link to="/student-register" className="lp-btn lp-btn-secondary">
              Student Registration
            </Link>
          </div>

          {/* For Clubs card */}
          <div className="lp-card">
            <div className="lp-card-icon">📅</div>
            <h2>For Clubs</h2>
            <p>
              Manage events, track budgets, and grow your club membership effectively.
            </p>

            <Link to="/club-login" className="lp-btn lp-btn-primary">
              Club Admin Login
            </Link>

            <Link to="/club-register" className="lp-btn lp-btn-secondary">
              Register New Club
            </Link>
          </div>
        </section>

        <p className="lp-footer-text">
          Join over 2,500+ students and 50+ clubs already using ClubConnect.
        </p>
      </main>
    </div>
  );
}

export default LandingPage;