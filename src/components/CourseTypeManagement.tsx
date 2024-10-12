import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, Edit, Trash2 } from 'lucide-react';

interface CourseType {
  id: string;
  name: string;
  description: string;
}

const CourseTypeManagement: React.FC = () => {
  const [courseTypes, setCourseTypes] = useState<CourseType[]>([]);
  const [newCourseType, setNewCourseType] = useState<CourseType>({
    id: '',
    name: '',
    description: ''
  });
  const [editingCourseType, setEditingCourseType] = useState<CourseType | null>(null);

  useEffect(() => {
    fetchCourseTypes();
  }, []);

  const fetchCourseTypes = async () => {
    try {
      const response = await axios.get('/api/course-types');
      setCourseTypes(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching course types:', error);
      setCourseTypes([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCourseType) {
        await axios.put(`/api/course-types/${editingCourseType.id}`, newCourseType);
      } else {
        await axios.post('/api/course-types', newCourseType);
      }
      fetchCourseTypes();
      setNewCourseType({ id: '', name: '', description: '' });
      setEditingCourseType(null);
    } catch (error) {
      console.error('Error saving course type:', error);
    }
  };

  const handleEdit = (courseType: CourseType) => {
    setEditingCourseType(courseType);
    setNewCourseType(courseType);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/course-types/${id}`);
      fetchCourseTypes();
    } catch (error) {
      console.error('Error deleting course type:', error);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Course Type Management</h2>
      
      <div className="card">
        <h3 className="card-title">{editingCourseType ? 'Edit Course Type' : 'Add New Course Type'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              type="text"
              value={newCourseType.name}
              onChange={(e) => setNewCourseType({ ...newCourseType, name: e.target.value })}
              className="form-input"
              placeholder="Enter course type name"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              value={newCourseType.description}
              onChange={(e) => setNewCourseType({ ...newCourseType, description: e.target.value })}
              className="form-textarea"
              placeholder="Enter course type description"
              rows={3}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn-primary">
            {editingCourseType ? 'Update Course Type' : 'Add Course Type'}
          </button>
        </form>
      </div>

      <div className="card">
        <h3 className="card-title">Course Type List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="table-header">Name</th>
                <th scope="col" className="table-header">Description</th>
                <th scope="col" className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courseTypes.map((courseType, index) => (
                <tr key={courseType.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="table-cell">{courseType.name}</td>
                  <td className="table-cell">{courseType.description}</td>
                  <td className="table-cell">
                    <button
                      onClick={() => handleEdit(courseType)}
                      className="action-button"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(courseType.id)}
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

export default CourseTypeManagement;