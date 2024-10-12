import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Edit, Trash2 } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
}

const CandidateManagement: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [newCandidate, setNewCandidate] = useState<Candidate>({
    id: '',
    name: '',
    email: '',
    phone: '',
    department: ''
  });
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get('/api/candidates');
      setCandidates(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      setCandidates([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCandidate) {
        await axios.put(`/api/candidates/${editingCandidate.id}`, newCandidate);
      } else {
        await axios.post('/api/candidates', newCandidate);
      }
      fetchCandidates();
      setNewCandidate({ id: '', name: '', email: '', phone: '', department: '' });
      setEditingCandidate(null);
    } catch (error) {
      console.error('Error saving candidate:', error);
    }
  };

  const handleEdit = (candidate: Candidate) => {
    setEditingCandidate(candidate);
    setNewCandidate(candidate);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/candidates/${id}`);
      fetchCandidates();
    } catch (error) {
      console.error('Error deleting candidate:', error);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Candidate Management</h2>
      
      <div className="card">
        <h3 className="card-title">{editingCandidate ? 'Edit Candidate' : 'Add New Candidate'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              type="text"
              value={newCandidate.name}
              onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
              className="form-input"
              placeholder="Enter candidate name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              value={newCandidate.email}
              onChange={(e) => setNewCandidate({ ...newCandidate, email: e.target.value })}
              className="form-input"
              placeholder="Enter email address"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              id="phone"
              type="tel"
              value={newCandidate.phone}
              onChange={(e) => setNewCandidate({ ...newCandidate, phone: e.target.value })}
              className="form-input"
              placeholder="Enter phone number"
              required
            />
          </div>
          <div>
            <label htmlFor="department" className="form-label">Department</label>
            <input
              id="department"
              type="text"
              value={newCandidate.department}
              onChange={(e) => setNewCandidate({ ...newCandidate, department: e.target.value })}
              className="form-input"
              placeholder="Enter department"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            {editingCandidate ? 'Update Candidate' : 'Add Candidate'}
          </button>
        </form>
      </div>

      <div className="card">
        <h3 className="card-title">Candidate List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="table-header">Name</th>
                <th scope="col" className="table-header">Email</th>
                <th scope="col" className="table-header">Phone</th>
                <th scope="col" className="table-header">Department</th>
                <th scope="col" className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {candidates.map((candidate, index) => (
                <tr key={candidate.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="table-cell">{candidate.name}</td>
                  <td className="table-cell">{candidate.email}</td>
                  <td className="table-cell">{candidate.phone}</td>
                  <td className="table-cell">{candidate.department}</td>
                  <td className="table-cell">
                    <button
                      onClick={() => handleEdit(candidate)}
                      className="action-button"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(candidate.id)}
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

export default CandidateManagement;