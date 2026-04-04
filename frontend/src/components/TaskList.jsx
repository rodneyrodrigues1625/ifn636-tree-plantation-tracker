import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TaskList = ({ tasks, setTasks, setEditingTask }) => {
  const { user } = useAuth();

  const handleDelete = async (taskId) => {
    try {
      await axiosInstance.delete(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      alert('Failed to delete tree record.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-700 mb-4">Recorded Trees</h2>

      {tasks.length === 0 ? (
        <div className="bg-gray-50 p-4 rounded shadow text-gray-600">
          No tree records found yet.
        </div>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="bg-gray-50 p-4 mb-4 rounded shadow border">
            <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
            <p className="text-gray-700 mt-1">
              <span className="font-semibold">Location / Notes:</span> {task.description}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-semibold">Date Planted:</span>{' '}
              {new Date(task.deadline).toLocaleDateString()}
            </p>

            <div className="mt-3">
              <button
                onClick={() => setEditingTask(task)}
                className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Edit Record
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete Record
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;