import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UsersList from "./UsersList";
import UserDetails from "./UserDetails";

function App() {
  return (
    <Router>
      <div>
        <h1>User Management</h1>
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
