import React, { useState, useEffect } from 'react';
import { Mail, Briefcase, Users, BookOpen, Edit2, Trash2, Save, X, Check, Filter } from 'lucide-react';

const API_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

interface Submission {
  id: string;
  name: string;
  email: string;
  created_at: string;
  status?: string;
  [key: string]: any;
}

interface ColumnConfig {
  key: string;
  label: string;
  render?: (value: any) => string;
}

interface SubmissionsPageProps {
  title?: string;
  endpoint?: string;
  columns?: ColumnConfig[];
}

const SubmissionsPage: React.FC<SubmissionsPageProps> = ({ title = "Submissions Manager", endpoint = "contacts", columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'created_at', label: 'Date', render: (val) => new Date(val).toLocaleDateString() }
] }) => {
  // Extract the endpoint from the API path if it's a full path
  const isFullApiPath = endpoint?.includes('/api/admin/');
  const extractedEndpoint = isFullApiPath ? endpoint.split('/api/admin/')[1] : endpoint;
  
  // Determine if the provided endpoint is one of our known tabs
  const isKnownTab = extractedEndpoint && ['contacts', 'careers', 'community', 'resources'].includes(extractedEndpoint);
  
  const [activeTab, setActiveTab] = useState(isKnownTab ? extractedEndpoint : 'contacts');
  
  // For UI purposes (status options, etc.), use the extracted endpoint
  const uiEndpoint = extractedEndpoint || 'contacts';
  
  // For API calls, we'll determine the path separately
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [statusFilter, setStatusFilter] = useState('all');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const tabs = [
    { id: 'contacts', label: 'Contact Forms', icon: Mail, endpoint: 'contacts' },
    { id: 'careers', label: 'Job Applications', icon: Briefcase, endpoint: 'careers' },
    { id: 'community', label: 'Community Requests', icon: Users, endpoint: 'community' },
    { id: 'resources', label: 'Resource Enquiries', icon: BookOpen, endpoint: 'resources' }
  ];

  const statusOptions = {
    contacts: ['new', 'read', 'responded', 'archived'],
    careers: ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'],
    community: ['pending', 'approved', 'active', 'declined', 'inactive'],
    resources: ['pending', 'responded', 'fulfilled', 'closed']
  };

  const statusColors: { [key: string]: string } = {
    new: 'bg-blue-600', pending: 'bg-blue-600',
    read: 'bg-yellow-600', reviewed: 'bg-yellow-600',
    responded: 'bg-green-600', approved: 'bg-green-600', active: 'bg-green-600', fulfilled: 'bg-green-600',
    archived: 'bg-gray-600', closed: 'bg-gray-600',
    shortlisted: 'bg-purple-600',
    rejected: 'bg-red-600', declined: 'bg-red-600', inactive: 'bg-red-600',
    hired: 'bg-emerald-600'
  };

  useEffect(() => {
    fetchSubmissions();
  }, [activeTab, uiEndpoint]);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      
      // Determine the endpoint to use
      const apiEndpoint = uiEndpoint;
      
      // Check if the endpoint is already a full path
      const isFullApiPath = endpoint?.includes('/api/admin/');
      const apiUrl = isFullApiPath ? `${API_URL}${endpoint}` : `${API_URL}/api/admin/${apiEndpoint}`;
      
      const response = await fetch(apiUrl, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setSubmissions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching submissions', error);
      showMessage('error', 'Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      
      // Check if the endpoint is already a full path
      const isFullApiPath = endpoint?.includes('/api/admin/');
      const apiUrl = isFullApiPath ? `${API_URL}${endpoint}/${id}` : `${API_URL}/api/admin/${uiEndpoint}/${id}`;
      
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editData)
      });
      const result = await response.json();
      if (result.success) {
        await fetchSubmissions();
        setEditingId(null);
        setEditData({});
        showMessage('success', 'Updated successfully!');
      } else {
        showMessage('error', 'Update failed');
      }
    } catch (error) {
      console.error('Error updating submission:', error);
      showMessage('error', 'Error updating submission');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      
      // Check if the endpoint is already a full path
      const isFullApiPath = endpoint?.includes('/api/admin/');
      const apiUrl = isFullApiPath ? `${API_URL}${endpoint}/${id}` : `${API_URL}/api/admin/${uiEndpoint}/${id}`;
      
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      if (result.success) {
        await fetchSubmissions();
        showMessage('success', 'Deleted successfully!');
      } else {
        showMessage('error', 'Delete failed');
      }
    } catch (error) {
      console.error('Error deleting submission:', error);
      showMessage('error', 'Error deleting submission');
    }
  };

  const startEdit = (submission: Submission) => {
    setEditingId(submission.id);
    // Determine which status options to use based on the current context
    const currentStatusOptions = uiEndpoint && statusOptions[uiEndpoint as keyof typeof statusOptions] 
      ? statusOptions[uiEndpoint as keyof typeof statusOptions]
      : statusOptions[activeTab as keyof typeof statusOptions];
    
    setEditData({
      status: submission.status || (currentStatusOptions && currentStatusOptions[0]) || 'pending',
      admin_notes: submission.admin_notes || submission.reviewer_notes || submission.response_notes || ''
    });
  };

  const filteredSubmissions = statusFilter === 'all'
    ? submissions
    : submissions.filter(s => s.status === statusFilter);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-3 flex items-center">
          <Mail className="mr-4 text-blue-400" size={40} />
          {title}
        </h1>
        <p className="text-gray-400 text-lg">Manage {endpoint}s and submissions</p>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center ${message.type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500' : 'bg-red-500/20 text-red-300 border border-red-500'
          }`}>
          {message.type === 'success' ? <Check size={20} className="mr-3" /> : <span className="mr-3 text-xl">⚠️</span>}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {/* Tabs - only show if no specific endpoint was provided */}
      {!uiEndpoint || ['contacts', 'careers', 'community', 'resources'].includes(uiEndpoint) ? (
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const count = activeTab === tab.id ? submissions.length : 0;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setStatusFilter('all'); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all whitespace-nowrap ${activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
              >
                <Icon size={20} />
                <span className="font-medium">{tab.label}</span>
                {activeTab === tab.id && count > 0 && (
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{count}</span>
                )}
              </button>
            );
          })}
        </div>
      ) : null}

      {/* Status Filter */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6 flex items-center gap-4">
        <Filter size={20} className="text-gray-400" />
        <span className="text-gray-300 font-medium">Filter by Status:</span>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Statuses</option>
          {(uiEndpoint && statusOptions[uiEndpoint as keyof typeof statusOptions] 
            ? statusOptions[uiEndpoint as keyof typeof statusOptions]
            : statusOptions[activeTab as keyof typeof statusOptions]).map(status => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
        <span className="text-gray-400 text-sm ml-auto">
          Showing {filteredSubmissions.length} of {submissions.length}
        </span>
      </div>

      {/* Submissions Table */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
          <p className="text-gray-400 text-lg">Loading submissions...</p>
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center border-2 border-dashed border-gray-600">
          <Mail size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400 text-lg">No submissions found</p>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900">
                <tr>
                  {columns.map((col, index) => (
                    <th key={index} className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      {col.label}
                    </th>
                  ))}
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredSubmissions.map((submission) => (
                  <React.Fragment key={submission.id}>
                    <tr className="hover:bg-gray-750 transition-colors">
                      {columns.map((col, index) => (
                        <td key={index} className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">
                            {col.render ? col.render(submission[col.key]) : submission[col.key]}
                          </div>
                        </td>
                      ))}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${statusColors[submission.status || 'new']
                          }`}>
                          {submission.status || 'new'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => startEdit(submission)}
                          className="text-blue-400 hover:text-blue-300 mr-3"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(submission.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                    {editingId === submission.id && (
                      <tr className="bg-gray-900">
                        <td colSpan={columns.length + 3} className="px-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                              <select
                                value={editData.status}
                                onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                {(uiEndpoint && statusOptions[uiEndpoint as keyof typeof statusOptions] 
                                  ? statusOptions[uiEndpoint as keyof typeof statusOptions]
                                  : statusOptions[activeTab as keyof typeof statusOptions]).map(status => (
                                  <option key={status} value={status}>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
                              <input
                                type="text"
                                value={editData.admin_notes || ''}
                                onChange={(e) => setEditData({ ...editData, admin_notes: e.target.value })}
                                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Add internal notes..."
                              />
                            </div>
                          </div>
                          <div className="flex gap-3 mt-4">
                            <button
                              onClick={() => handleUpdate(submission.id)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center"
                            >
                              <Save size={16} className="mr-2" />
                              Save Changes
                            </button>
                            <button
                              onClick={() => { setEditingId(null); setEditData({}); }}
                              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors flex items-center"
                            >
                              <X size={16} className="mr-2" />
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionsPage;