import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard: React.FC = () => {
  // Mock data for the dashboard
  const courseCompletionData = [
    { name: 'Course A', completed: 85, ongoing: 15 },
    { name: 'Course B', completed: 70, ongoing: 30 },
    { name: 'Course C', completed: 95, ongoing: 5 },
    { name: 'Course D', completed: 60, ongoing: 40 },
  ];

  const candidatePerformanceData = [
    { name: 'Candidate 1', score: 85 },
    { name: 'Candidate 2', score: 92 },
    { name: 'Candidate 3', score: 78 },
    { name: 'Candidate 4', score: 88 },
    { name: 'Candidate 5', score: 95 },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Course Completion Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseCompletionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" stackId="a" fill="#4CAF50" />
              <Bar dataKey="ongoing" stackId="a" fill="#FFC107" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Candidate Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={candidatePerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
        <ul className="space-y-2">
          <li className="flex items-center justify-between">
            <span>New course "Advanced React" added</span>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Candidate "John Doe" completed "JavaScript Fundamentals"</span>
            <span className="text-sm text-gray-500">5 hours ago</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Expert "Jane Smith" assigned to "Python for Data Science"</span>
            <span className="text-sm text-gray-500">1 day ago</span>
          </li>
          <li className="flex items-center justify-between">
            <span>New location "Tech Hub" added</span>
            <span className="text-sm text-gray-500">2 days ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;