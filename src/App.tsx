import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Home, MapPin, Users, BookOpen, Layers, UserCircle, FileText, Calendar, Search } from 'lucide-react';
import Dashboard from './components/Dashboard';
import LocationManagement from './components/LocationManagement';
import CandidateManagement from './components/CandidateManagement';
import CourseTypeManagement from './components/CourseTypeManagement';
import CourseManagement from './components/CourseManagement';
import UserManagement from './components/UserManagement';
import ExpertManagement from './components/ExpertManagement';
import EvaluationManagement from './components/EvaluationManagement';
import AllotmentManagement from './components/AllotmentManagement';
import TranscriptionGeneration from './components/TranscriptionGeneration';
import CertificateSearch from './components/CertificateSearch';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center mb-6">
      <input
        type="text"
        placeholder="Search for certificates..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="form-input w-full mr-2"
      />
      <button type="submit" className="btn-primary flex items-center">
        <Search size={20} className="mr-2" />
        Search
      </button>
    </form>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <nav className="bg-blue-600 text-white w-64 space-y-6 py-7 px-2 flex-shrink-0">
          <div className="text-xl font-semibold text-center mb-6">TMS</div>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/locations" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
                <MapPin size={20} />
                <span>Locations</span>
              </Link>
            </li>
            <li>
              <Link to="/candidates" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
                <Users size={20} />
                <span>Candidates</span>
              </Link>
            </li>
            <li>
              <Link to="/course-types" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
                <BookOpen size={20} />
                <span>Course Types</span>
              </Link>
            </li>
            <li>
              <Link to="/courses" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
                <Layers size={20} />
                <span>Courses</span>
              </Link>
            </li>
            <li>
              <Link to="/users" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
                <UserCircle size={20} />
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link to="/experts" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
                <Users size={20} />
                <span>Experts</span>
              </Link>
            </li>
            <li>
              <Link to="/evaluations" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
                <FileText size={20} />
                <span>Evaluations</span>
              </Link>
            </li>
            <li>
              <Link to="/allotments" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
                <Calendar size={20} />
                <span>Allotments</span>
              </Link>
            </li>
            <li>
              <Link to="/transcriptions" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
                <FileText size={20} />
                <span>Transcriptions</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main content */}
        <main className="flex-1 p-10 overflow-y-auto">
          <SearchBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/locations" element={<LocationManagement />} />
            <Route path="/candidates" element={<CandidateManagement />} />
            <Route path="/course-types" element={<CourseTypeManagement />} />
            <Route path="/courses" element={<CourseManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/experts" element={<ExpertManagement />} />
            <Route path="/evaluations" element={<EvaluationManagement />} />
            <Route path="/allotments" element={<AllotmentManagement />} />
            <Route path="/transcriptions" element={<TranscriptionGeneration />} />
            <Route path="/search" element={<CertificateSearch />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;