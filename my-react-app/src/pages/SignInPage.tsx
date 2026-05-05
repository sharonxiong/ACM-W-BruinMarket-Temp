import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignInPage.css";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <main className="signin-page">
      <div className="signin-card">
        <div className="signin-card__accent" />

        <div className="signin-card__body">
          <div className="signin-eyebrow">UCLA Market</div>
          <h1 className="signin-heading">Welcome back</h1>
          <p className="signin-subtext">Sign in to your UCLA Market account</p>

          <form className="signin-form" onSubmit={handleSubmit} noValidate>
            <div className="signin-field">
              <label className="signin-label" htmlFor="email">Email</label>
              <input
                id="email"
                className="signin-input"
                type="email"
                placeholder="you@ucla.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="signin-field">
              <div className="signin-label-row">
                <label className="signin-label" htmlFor="password">Password</label>
                <a className="signin-forgot" href="#">Forgot password?</a>
              </div>
              <input
                id="password"
                className="signin-input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button className="signin-btn" type="submit">Sign in</button>
          </form>

          <div className="signin-divider">
            <span className="signin-divider__line" />
            <span className="signin-divider__text">or</span>
            <span className="signin-divider__line" />
          </div>

          <p className="signin-signup">
            Don't have an account?{" "}
            <Link className="signin-signup__link" to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
