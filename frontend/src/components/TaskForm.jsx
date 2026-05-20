import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TaskForm = ({ tasks, setTasks, editingTask, setEditingTask }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    treeType: 'General',
    status: 'Planned',
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || '',
        deadline: editingTask.deadline
          ? new Date(editingTask.deadline).toISOString().split('T')[0]
          : '',
        treeType: editingTask.treeType || 'General',
        status: editingTask.status || 'Planned',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        deadline: '',
        treeType: 'General',
        status: 'Planned',
      });
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTask) {
        const response = await axiosInstance.put(`/api/tasks/${editingTask._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setTasks(tasks.map((task) => (task._id === response.data._id ? response.data : task)));
      } else {
        const response = await axiosInstance.post('/api/tasks', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setTasks([response.data, ...tasks]);
      }

      setEditingTask(null);
      setFormData({
        title: '',
        description: '',
        deadline: '',
        treeType: 'General',
        status: 'Planned',
      });
    } catch (error) {
      alert('Failed to save tree record.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-2 text-green-700">
        {editingTask ? 'Edit Tree Record' : 'Create Tree Record'}
      </h1>

      <p className="text-sm text-gray-600 mb-4">
        Add plantation details, tree type, and health progress for LeafLine.
      </p>

      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Tree Name
      </label>
      <input
        type="text"
        placeholder="Example: Mango Tree, Eucalyptus, Native Plant"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Plantation Location / Notes
      </label>
      <input
        type="text"
        placeholder="Example: Backyard edge, school garden, park area"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Date Planted / Target Date
      </label>
      <input
        type="date"
        value={formData.deadline}
        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Tree Type
      </label>
      <input
        type="text"
        placeholder="Example: Native, Fruit, Shade, Flowering"
        value={formData.treeType}
        onChange={(e) => setFormData({ ...formData, treeType: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Health / Progress Status
      </label>
      <select
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="Planned">Planned</option>
        <option value="Planted">Planted</option>
        <option value="Healthy">Healthy</option>
        <option value="Needs Water">Needs Water</option>
        <option value="At Risk">At Risk</option>
        <option value="Completed">Completed</option>
      </select>

      <button
        type="submit"
        className="w-full bg-green-700 text-white p-2 rounded hover:bg-green-800"
      >
        {editingTask ? 'Update Tree Record' : 'Create Tree Record'}
      </button>

      {editingTask && (
        <button
          type="button"
          onClick={() => setEditingTask(null)}
          className="w-full mt-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
        >
          Cancel Edit
        </button>
      )}
    </form>
  );
};

export default TaskForm;