import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const navigate = useNavigate();

  // Update username when firstName changes
  useEffect(() => {
    if (firstName) {
      setUsername(firstName.toLowerCase());
    } else {
      setUsername("");
    }
  }, [firstName]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSignUpError("");

    try {
      const res = await fetch("http://127.0.0.1:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          username,
          email,
          password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Sign up failed");
      }

      const data = await res.json();
      const userId = data.id;  // Adjusted as your backend returns id here
      navigate("/success", { state: { userId } });
    } catch (err) {
      setSignUpError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="left-panel">
        <h2>Sign Up</h2>
        <p>Create your account below</p>

        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

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

          {signUpError && <p className="error">{signUpError}</p>}

          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div className="right-panel">
        <div className="overlay-ui">
          <h4>Welcome to Team Review</h4>
          <p>Register now and be part of the conversation.</p>
        </div>
      </div>
    </div>
  );
}
