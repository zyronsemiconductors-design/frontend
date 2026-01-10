import React, { useState, useEffect } from 'react';
import { FileText, Save, Eye, EyeOff, Trash2, Edit2, Check } from 'lucide-react';
import ContentFieldEditor from '../components/ContentFieldEditor';

const API_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

const PageContentManagement: React.FC = () => {
    const pages = [
        { id: 'home', label: 'Home Page', icon: '🏠' },
        { id: 'about', label: 'About Page', icon: '📖' },
        { id: 'services', label: 'Services Page', icon: '⚙️' },
        { id: 'why-zyron', label: 'Why Zyron Page', icon: '⭐' },
        { id: 'contact', label: 'Contact Page', icon: '📧' },
        { id: 'careers', label: 'Careers Page', icon: '💼' },
        { id: 'community', label: 'Community Page', icon: '👥' },
        { id: 'resources', label: 'Resources Page', icon: '📚' }
    ];

    const [selectedPage, setSelectedPage] = useState('home');
    const [pageContent, setPageContent] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingSectionId, setEditingSectionId] = useState<number | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        fetchPageContent();
    }, [selectedPage]);

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 3000);
    };

    const fetchPageContent = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch(`${API_URL}/api/cms/admin/pages?page=${selectedPage}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setPageContent(data.data || []);
            } else {
                showMessage('error', 'Failed to load content');
            }
        } catch (error) {
            console.error('Error fetching page content:', error);
            showMessage('error', 'Error loading content');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveSection = async (section: any) => {
        setSaving(true);
        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch(`${API_URL}/api/cms/admin/pages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...section,
                    page_identifier: selectedPage
                })
            });
            const data = await response.json();
            if (data.success) {
                await fetchPageContent();
                setEditingSectionId(null);
                showMessage('success', 'Content saved successfully!');
            } else {
                showMessage('error', 'Failed to save content');
            }
        } catch (error) {
            console.error('Error saving section:', error);
            showMessage('error', 'Error saving content');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteSection = async (sectionId: number) => {
        if (!confirm('Are you sure you want to delete this section?')) return;

        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch(`${API_URL}/api/cms/admin/pages/${sectionId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                await fetchPageContent();
                showMessage('success', 'Section deleted successfully!');
            } else {
                showMessage('error', 'Failed to delete section');
            }
        } catch (error) {
            console.error('Error deleting section:', error);
            showMessage('error', 'Error deleting section');
        }
    };

    const SectionEditor = ({ section }: { section: any }) => {
        const [editedSection, setEditedSection] = useState(section);

        return (
            <div className="bg-gray-800 rounded-lg p-6 mb-4 border-2 border-blue-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Section Identifier
                        </label>
                        <input
                            type="text"
                            value={editedSection.section_key}
                            onChange={(e) => setEditedSection({ ...editedSection, section_key: e.target.value })}
                            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., hero, features, testimonials"
                            disabled={!!section.id}
                        />
                        <p className="text-xs text-gray-400 mt-1">Used to identify this section in code</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Content Type
                        </label>
                        <select
                            value={editedSection.content_type}
                            onChange={(e) => setEditedSection({ ...editedSection, content_type: e.target.value })}
                            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="json">📝 Form Fields (Easy to Edit)</option>
                            <option value="html">🌐 HTML Code</option>
                            <option value="text">📄 Plain Text</option>
                        </select>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                        Content
                    </label>
                    {editedSection.content_type === 'json' ? (
                        <div className="bg-gray-900 rounded-lg p-4 max-h-[600px] overflow-y-auto">
                            <ContentFieldEditor
                                content={editedSection.content || {}}
                                onChange={(newContent) => setEditedSection({ ...editedSection, content: newContent })}
                            />
                        </div>
                    ) : (
                        <textarea
                            value={typeof editedSection.content === 'string' ? editedSection.content : JSON.stringify(editedSection.content, null, 2)}
                            onChange={(e) => setEditedSection({ ...editedSection, content: e.target.value })}
                            className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                            rows={12}
                            placeholder={editedSection.content_type === 'html' ? '<div>Enter HTML here...</div>' : 'Enter plain text here...'}
                        />
                    )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <label className="flex items-center text-gray-300 cursor-pointer hover:text-white transition-colors">
                        <input
                            type="checkbox"
                            checked={editedSection.is_published}
                            onChange={(e) => setEditedSection({ ...editedSection, is_published: e.target.checked })}
                            className="mr-3 w-4 h-4"
                        />
                        <span className="flex items-center text-sm font-medium">
                            {editedSection.is_published ? (
                                <><Eye size={18} className="mr-2 text-green-400" /> Published (Visible on website)</>
                            ) : (
                                <><EyeOff size={18} className="mr-2 text-gray-400" /> Draft (Hidden from website)</>
                            )}
                        </span>
                    </label>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setEditingSectionId(null)}
                            className="px-5 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => handleSaveSection(editedSection)}
                            disabled={saving}
                            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center font-medium disabled:opacity-50"
                        >
                            {saving ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={18} className="mr-2" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white flex items-center mb-3">
                    <FileText className="mr-4 text-blue-400" size={40} />
                    Page Content Manager
                </h1>
                <p className="text-gray-400 text-lg">
                    Edit the content that appears on each page of your website
                </p>
            </div>

            {/* Success/Error Message */}
            {message && (
                <div className={`mb-6 p-4 rounded-lg flex items-center ${message.type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500' : 'bg-red-500/20 text-red-300 border border-red-500'
                    }`}>
                    {message.type === 'success' ? <Check size={20} className="mr-3" /> : <span className="mr-3 text-xl">⚠️</span>}
                    <span className="font-medium">{message.text}</span>
                </div>
            )}

            {/* Page Selector */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
                <label className="block text-sm font-medium text-gray-300 mb-4">
                    Select Page to Edit
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {pages.map((page) => (
                        <button
                            key={page.id}
                            onClick={() => setSelectedPage(page.id)}
                            className={`p-4 rounded-lg transition-all ${selectedPage === page.id
                                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                        >
                            <div className="text-2xl mb-1">{page.icon}</div>
                            <div className="text-sm font-medium">{page.label}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Sections */}
            {loading ? (
                <div className="text-center py-20">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
                    <p className="text-gray-400 text-lg">Loading content...</p>
                </div>
            ) : (
                <>
                    {/* Existing Sections */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                            <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">
                                {pageContent.length}
                            </span>
                            Existing Sections
                        </h2>
                        {pageContent.length === 0 ? (
                            <div className="bg-gray-800 rounded-lg p-12 text-center border-2 border-dashed border-gray-600">
                                <FileText size={48} className="mx-auto text-gray-600 mb-4" />
                                <p className="text-gray-400 text-lg">No content sections yet for this page</p>
                                <p className="text-gray-500 text-sm mt-2">Add a new section below to get started</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {pageContent.map((section) => (
                                    <div key={section.id}>
                                        {editingSectionId === section.id ? (
                                            <SectionEditor section={section} />
                                        ) : (
                                            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-3">
                                                            <h3 className="text-xl font-semibold text-white">
                                                                {section.section_key}
                                                            </h3>
                                                            <span className="text-xs bg-gray-700 px-3 py-1 rounded-full text-gray-300 font-medium">
                                                                {section.content_type.toUpperCase()}
                                                            </span>
                                                            <span className={`text-xs px-3 py-1 rounded-full flex items-center font-medium ${section.is_published
                                                                    ? 'bg-green-600/20 text-green-300 border border-green-600'
                                                                    : 'bg-gray-600/20 text-gray-400 border border-gray-600'
                                                                }`}>
                                                                {section.is_published ? (
                                                                    <><Eye size={12} className="mr-1" /> Published</>
                                                                ) : (
                                                                    <><EyeOff size={12} className="mr-1" /> Draft</>
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto max-h-48">
                                                            <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-words">
                                                                {typeof section.content === 'string'
                                                                    ? section.content.substring(0, 300) + (section.content.length > 300 ? '...' : '')
                                                                    : JSON.stringify(section.content, null, 2).substring(0, 300) + '...'}
                                                            </pre>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 ml-4">
                                                        <button
                                                            onClick={() => setEditingSectionId(section.id)}
                                                            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                                                            title="Edit Section"
                                                        >
                                                            <Edit2 size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteSection(section.id)}
                                                            className="p-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
                                                            title="Delete Section"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default PageContentManagement;
