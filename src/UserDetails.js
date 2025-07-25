import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css'; // Make sure this path matches your project

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loadingAction, setLoadingAction] = useState(false);
  const [actionError, setActionError] = useState('');

  const fetchUser = () => {
    fetch(`http://127.0.0.1:5000/users/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("User not found");
        }
        return response.json();
      })
      .then((data) => setUser(data))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleDelete = () => {
    setLoadingAction(true);
    setActionError('');
    fetch(`http://127.0.0.1:5000/users/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete user');
        return res.text();
      })
      .then(() => {
        setLoadingAction(false);
        fetchUser();
      })
      .catch((err) => {
        setActionError(err.message);
        setLoadingAction(false);
      });
  };

  const handleActivate = () => {
    setLoadingAction(true);
    setActionError('');
    fetch(`http://127.0.0.1:5000/users/${id}/activate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deleted: 0 }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to activate user');
        return res.text();
      })
      .then(() => {
        setLoadingAction(false);
        fetchUser();
      })
      .catch((err) => {
        setActionError(err.message);
        setLoadingAction(false);
      });
  };

  if (error) return <p className="error">Error: {error}</p>;
  if (!user) return <p className="loading">Loading user...</p>;

  return (
    <div className="user-details">
      <h2>User Details</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>First Name:</strong> {user.first_name}</p>
      <p><strong>Last Name:</strong> {user.last_name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      {user.deleted === 1 ? (
        <button
          className="activate-button"
          onClick={handleActivate}
          disabled={loadingAction}
        >
          {loadingAction ? 'Activating...' : 'Activate User'}
        </button>
      ) : (
        <button
          className="delete-button"
          onClick={handleDelete}
          disabled={loadingAction}
        >
          {loadingAction ? 'Deleting...' : 'Delete User'}
        </button>
      )}

      {actionError && <p className="error">Error: {actionError}</p>}
    </div>
  );
}

export default UserDetails;
