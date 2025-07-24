import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SuccessView() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const location = useLocation();
  const userId = location.state?.userId;

  useEffect(() => {
    if (!userId) return;

    const fetchUser = () => {
      fetch(`http://127.0.0.1:5000/users/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("User not found");
          }
          return response.json();
        })
        .then((data) => setUser(data))
        .catch((err) => setError(err.message));
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="container" style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "40px" }}>
      <h2 style={{ color: "#2ecc71", marginBottom: "30px", textAlign: "center" }}>
        ✅ Login Successful! Welcome to Uranus.
      </h2>

      {userId ? (
        <div className="user-details" style={{ maxWidth: "400px", width: "100%" }}>
          <p><strong>Your User ID:</strong> {userId}</p>
          {error && <p className="error">{error}</p>}
          {user ? (
            <>
              <p><strong>First Name:</strong> {user.first_name}</p>
              <p><strong>Last Name:</strong> {user.last_name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      ) : (
        <p>No user ID found in state.</p>
      )}
    </div>
  );
}
