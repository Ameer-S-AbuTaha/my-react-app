import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://starlit-scone-2eb360.netlify.app//users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading users...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (users.length === 0) return <p>No users found.</p>;

  return (
    <div>
    <h2 className="centered-title">User Management</h2>
    <ul style={{ maxWidth: "600px", margin: "40px auto", padding: 0 }}>
      {users.map((user) => (
        <li key={user.id} style={{ marginBottom: "14px" }}>
          <Link
            to={`/users/${user.id}`}
            style={{
              color: user.deleted === 1 ? "#e74c3c" : "#2c3e50",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            {user.first_name} {user.last_name} ({user.email})
            {user.deleted === 1 && (
              <span
                style={{
                  color: "#e74c3c",
                  marginLeft: "8px",
                  fontWeight: "normal",
                }}
              >
                [deleted]
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
    </div>
  );
}
