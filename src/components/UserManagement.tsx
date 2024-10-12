import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Edit, Trash2, Upload } from 'lucide-react';

interface UserData {
  id: string;
  candidateName: string;
  candidateAge: number;
  departmentName: string;
  idProofNo: string;
  mobileNumber: string;
  email: string;
  role: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [newUser, setNewUser] = useState<UserData>({
    id: '',
    candidateName: '',
    candidateAge: 0,
    departmentName: '',
    idProofNo: '',
    mobileNumber: '',
    email: '',
    role: ''
  });
  const [editingUser, setEditingUser] = useState<UserData | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await axios.put(`/api/users/${editingUser.id}`, newUser);
      } else {
        await axios.post('/api/users', newUser);
      }
      fetchUsers();
      setNewUser({
        id: '',
        candidateName: '',
        candidateAge: 0,
        departmentName: '',
        idProofNo: '',
        mobileNumber: '',
        email: '',
        role: ''
      });
      setEditingUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleEdit = (user: UserData) => {
    setEditingUser(user);
    setNewUser(user);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">User Management</h2>
      
      <div className="card">
        <h3 className="card-title">{editingUser ? 'Edit User' : 'Add New User'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="candidateName" className="form-label">Candidate Name</label>
            <input
              id="candidateName"
              type="text"
              value={newUser.candidateName}
              onChange={(e) => setNewUser({ ...newUser, candidateName: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="candidateAge" className="form-label">Age</label>
            <input
              id="candidateAge"
              type="number"
              value={newUser.candidateAge}
              onChange={(e) => setNewUser({ ...newUser, candidateAge: parseInt(e.target.value) })}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="departmentName" className="form-label">Department</label>
            <input
              id="departmentName"
              type="text"
              value={newUser.departmentName}
              onChange={(e) => setNewUser({ ...newUser, departmentName: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="idProofNo" className="form-label">ID Proof No</label>
            <input
              id="idProofNo"
              type="text"
              value={newUser.idProofNo}
              onChange={(e) => setNewUser({ ...newUser, idProofNo: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
            <input
              id="mobileNumber"
              type="tel"
              value={newUser.mobileNumber}
              onChange={(e) => setNewUser({ ...newUser, mobileNumber: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="form-label">Role</label>
            <input
              id="role"
              type="text"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            {editingUser ? 'Update User' : 'Add User'}
          </button>
        </form>
      </div>

      <div className="card">
        <h3 className="card-title">User List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="table-header">Candidate Name</th>
                <th scope="col" className="table-header">Age</th>
                <th scope="col" className="table-header">Department</th>
                <th scope="col" className="table-header">ID Proof</th>
                <th scope="col" className="table-header">Mobile</th>
                <th scope="col" className="table-header">Email</th>
                <th scope="col" className="table-header">Role</th>
                <th scope="col" className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="table-cell">{user.candidateName}</td>
                  <td className="table-cell">{user.candidateAge}</td>
                  <td className="table-cell">{user.departmentName}</td>
                  <td className="table-cell">{user.idProofNo}</td>
                  <td className="table-cell">{user.mobileNumber}</td>
                  <td className="table-cell">{user.email}</td>
                  <td className="table-cell">{user.role}</td>
                  <td className="table-cell">
                    <button
                      onClick={() => handleEdit(user)}
                      className="action-button"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
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

export default UserManagement;