import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"; // Make sure App.css is in the same folder or adjust path

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      const userId = data.user.id;
      navigate("/success", { state: { userId } });
    } catch (err) {
      setLoginError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="left-panel">
        <h2>Login to Your Account</h2>
        <p>Welcome back! Please enter your details below.</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {loginError && <p className="error">{loginError}</p>}

          <button type="submit">Login</button>

          <div className="social-login">
            <button type="button">Google</button>
            <button type="button">Apple</b
