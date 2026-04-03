import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/login', formData);
      login(response.data);
      navigate('/tree-records');
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <h1 className="text-3xl font-bold mb-2 text-center text-green-700">LeafLine</h1>
        <p className="text-center text-gray-600 mb-4">Sign in to your account</p>

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />

        <button type="submit" className="w-full bg-green-700 text-white p-2 rounded hover:bg-green-800">
          Sign In
        </button>

        <p className="text-center mt-4 text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-green-700 font-semibold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;