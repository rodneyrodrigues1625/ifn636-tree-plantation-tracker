import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const [summary, setSummary] = useState({
    totalTasks: 0,
    planned: 0,
    planted: 0,
    healthy: 0,
    needsWater: 0,
    atRisk: 0,
    completed: 0,
    totalLocations: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axiosInstance.get('/api/dashboard/summary', {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setSummary(response.data);
      } catch (error) {
        // Keep dashboard usable even if summary cannot load
        console.log('Failed to fetch dashboard summary');
      }
    };

    if (user?.token) {
      fetchSummary();
    }
  }, [user]);

  const cards = [
    { label: 'Total Tree Records', value: summary.totalTasks },
    { label: 'Planned', value: summary.planned },
    { label: 'Planted', value: summary.planted },
    { label: 'Healthy', value: summary.healthy },
    { label: 'Needs Water', value: summary.needsWater },
    { label: 'At Risk', value: summary.atRisk },
    { label: 'Completed', value: summary.completed },
    { label: 'Saved Locations', value: summary.totalLocations },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-green-700 mb-2">
          LeafLine Dashboard
        </h1>
        <p className="text-gray-600">
          Monitor tree plantation progress, health status, and recorded plantation sites.
        </p>
      </div>

      {user ? (
        <>
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            {cards.map((card) => (
              <div key={card.label} className="bg-white p-5 rounded shadow border">
                <p className="text-sm text-gray-500">{card.label}</p>
                <h2 className="text-3xl font-bold text-green-700 mt-2">
                  {card.value}
                </h2>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-white p-6 rounded shadow border">
              <h2 className="text-xl font-semibold mb-2">Tree Records</h2>
              <p className="text-gray-600 mb-4">
                Add, update, and manage plantation records with health status.
              </p>
              <Link
                to="/tree-records"
                className="inline-block bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
              >
                View Tree Records
              </Link>
            </div>

            <div className="bg-white p-6 rounded shadow border">
              <h2 className="text-xl font-semibold mb-2">Plantation Locations</h2>
              <p className="text-gray-600 mb-4">
                Record plantation locations with suburb, coordinates, and notes.
              </p>
              <Link
                to="/locations"
                className="inline-block bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
              >
                View Locations
              </Link>
            </div>

            <div className="bg-white p-6 rounded shadow border">
              <h2 className="text-xl font-semibold mb-2">Profile</h2>
              <p className="text-gray-600 mb-4">
                Review your account details and user information.
              </p>
              <Link
                to="/profile"
                className="inline-block bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
              >
                View Profile
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-xl font-semibold mb-2">Welcome to LeafLine</h2>
          <p className="text-gray-600 mb-4">
            Please log in or register to manage tree plantation records.
          </p>
          <Link
            to="/login"
            className="inline-block bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 mr-2"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;