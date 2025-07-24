

// Import React, { useState } from 'react';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');

//     // Simple validation example
//     if (!email || !password) {
//       setError('Please enter both email and password');
//       return;
//     }

//     // Mock login check
//     if (email === 'admin@example.com' && password === 'password') {
//       alert('Login successful!');
//     } else {
//       setError('Invalid email or password');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'Arial, sans-serif' }}>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: '10px' }}>
//           <label>Email:</label><br />
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={{ width: '100%', padding: '8px' }}
//             required
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label>Password:</label><br />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={{ width: '100%', padding: '8px' }}
//             required
//           />
//         </div>
//         {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
//         <button type="submit" style={{ padding: '10px', width: '100%' }}>Login</button>
//       </form>
//     </div>
//   );
// }
