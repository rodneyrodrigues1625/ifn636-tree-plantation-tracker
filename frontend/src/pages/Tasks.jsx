import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useAuth } from '../context/AuthContext';

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get('/api/tasks', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks(response.data);
      } catch (error) {
        alert('Failed to fetch tree records.');
      }
    };

    if (user?.token) {
      fetchTasks();
    }
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-green-700">Tree Records</h1>
        <p className="text-gray-600 mt-2">
          Manage and update plantation records for LeafLine.
        </p>
      </div>

      <TaskForm
        tasks={tasks}
        setTasks={setTasks}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />

      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        setEditingTask={setEditingTask}
      />
    </div>
  );
};

export default Tasks;