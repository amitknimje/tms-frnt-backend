import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Download, Printer } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface Certificate {
  id: string;
  candidateName: string;
  course: string;
  courseType: string;
  issueDate: string;
  status: string;
}

const CertificateSearch: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query') || '';

  useEffect(() => {
    if (searchQuery) {
      fetchCertificates();
    }
  }, [searchQuery]);

  const fetchCertificates = async () => {
    try {
      const response = await axios.get(`/api/certificates?search=${searchQuery}`);
      setCertificates(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      setCertificates([]);
    }
  };

  const handleDownload = (id: string) => {
    // Implement download logic here
    console.log('Downloading certificate:', id);
  };

  const handlePrint = (id: string) => {
    // Implement print logic here
    console.log('Printing certificate:', id);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Certificate Search Results</h2>
      
      <div className="card">
        <h3 className="card-title">Certificates for "{searchQuery}"</h3>
        {certificates.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="table-header">Candidate Name</th>
                  <th scope="col" className="table-header">Course</th>
                  <th scope="col" className="table-header">Course Type</th>
                  <th scope="col" className="table-header">Issue Date</th>
                  <th scope="col" className="table-header">Status</th>
                  <th scope="col" className="table-header">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {certificates.map((certificate, index) => (
                  <tr key={certificate.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="table-cell">{certificate.candidateName}</td>
                    <td className="table-cell">{certificate.course}</td>
                    <td className="table-cell">{certificate.courseType}</td>
                    <td className="table-cell">{certificate.issueDate}</td>
                    <td className="table-cell">{certificate.status}</td>
                    <td className="table-cell">
                      <button
                        onClick={() => handleDownload(certificate.id)}
                        className="action-button"
                      >
                        <Download size={16} />
                      </button>
                      <button
                        onClick={() => handlePrint(certificate.id)}
                        className="action-button"
                      >
                        <Printer size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No certificates found for the given search query.</p>
        )}
      </div>
    </div>
  );
};

export default CertificateSearch;