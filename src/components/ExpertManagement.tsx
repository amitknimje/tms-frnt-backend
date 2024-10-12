import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Edit, Trash2 } from 'lucide-react';

interface Expert {
  id: string;
  name: string;
  email: string;
  specialization: string;
}

const ExpertManagement: React.FC = () => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [newExpert, setNewExpert] = useState<Expert>({ id: '', name: '', email: '', specialization: '' });
  const [editingExpert, setEditingExpert] = useState<Expert | null>(null);

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      const response = await axios.get('/api/experts');
      setExperts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching experts:', error);
      setExperts([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingExpert) {
        await axios.put(`/api/experts/${editingExpert.id}`, newExpert);
      } else {
        await axios.post('/api/experts', newExpert);
      }
      fetchExperts();
      setNewExpert({ id: '', name: '', email: '', specialization: '' });
      setEditingExpert(null);
    } catch (error) {
      console.error('Error saving expert:', error);
    }
  };

  const handleEdit = (expert: Expert) => {
    setEditingExpert(expert);
    setNewExpert(expert);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/experts/${id}`);
      fetchExperts();
    } catch (error) {
      console.error('Error deleting expert:', error);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Expert Management</h2>
      
      <div className="card">
        <h3 className="card-title">{editingExpert ? 'Edit Expert' : 'Add New Expert'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter expert name"
              value={newExpert.name}
              onChange={(e) => setNewExpert({ ...newExpert, name: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={newExpert.email}
              onChange={(e) => setNewExpert({ ...newExpert, email: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="specialization" className="form-label">Specialization</label>
            <input
              id="specialization"
              type="text"
              placeholder="Enter specialization"
              value={newExpert.specialization}
              onChange={(e) => setNewExpert({ ...newExpert, specialization: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            {editingExpert ? 'Update Expert' : 'Add Expert'}
          </button>
        </form>
      </div>

      <div className="card">
        <h3 className="card-title">Expert List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="table-header">Name</th>
                <th scope="col" className="table-header">Email</th>
                <th scope="col" className="table-header">Specialization</th>
                <th scope="col" className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {experts.map((expert, index) => (
                <tr key={expert.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="table-cell">{expert.name}</td>
                  <td className="table-cell">{expert.email}</td>
                  <td className="table-cell">{expert.specialization}</td>
                  <td className="table-cell">
                    <button
                      onClick={() => handleEdit(expert)}
                      className="action-button"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(expert.id)}
                      className="action-button text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpertManagement;