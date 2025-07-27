import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"; // Reuse your existing styles

export default function SignUpPage() {
  const [form, setForm] = useState({
    first_name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://127.0.0.1:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess("Sign up successful!");
        setTimeout(() => navigate("/"), 1000); // Redirect to login
      } else {
        const errData = await response.json();
        setError(errData.message || "Sign up failed");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={form.first
