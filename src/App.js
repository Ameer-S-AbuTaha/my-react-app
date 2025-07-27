import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage"; // ✅ Import the SignUpPage
import SuccessView from "./SuccessView";
import UsersList from "./UsersList";
import UserDetails from "./UserDetails";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} /> {/* ✅ New route */}
        <Route path="/success" element={<SuccessView />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}