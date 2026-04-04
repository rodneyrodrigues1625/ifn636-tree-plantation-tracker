import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-2">LeafLine Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome to your tree plantation tracker.</p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-xl font-semibold mb-2">Tree Records</h2>
          <p className="text-gray-600 mb-4">
            Add, update, and manage plantation records.
          </p>
          <Link
            to="/tree-records"
            className="inline-block bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            View Tree Records
          </Link>
        </div>

        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <p className="text-gray-600 mb-4">
            Review and update your account details.
          </p>
          <Link
            to="/profile"
            className="inline-block bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;