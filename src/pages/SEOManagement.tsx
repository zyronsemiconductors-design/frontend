import React, { useState, useEffect } from 'react';
import { Tag, Save, Check, Search } from 'lucide-react';

const API_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

interface SEOMetadata {
    id?: number;
    page_identifier: string;
    title: string;
    description: string;
    keywords: string;
    og_title?: string;
    og_description?: string;
    og_image?: string;
}

const SEOManagement: React.FC = () => {
    const pages = [
        { id: 'home', label: 'Home Page', icon: '🏠' },
        { id: 'about', label: 'About Page', icon: '📖' },
        { id: 'services', label: 'Services Page', icon: '⚙️' },
        { id: 'why-zyron', label: 'Why Zyron', icon: '⭐' },
        { id: 'contact', label: 'Contact Page', icon: '📧' },
        { id: 'careers', label: 'Careers Page', icon: '💼' },
        { id: 'community', label: 'Community', icon: '👥' },
        { id: 'resources', label: 'Resources', icon: '📚' }
    ];

    const [selectedPage, setSelectedPage] = useState('home');
    const [metadata, setMetadata] = useState<SEOMetadata>({
        page_identifier: 'home',
        title: '',
        description: '',
        keywords: '',
        og_title: '',
        og_description: '',
        og_image: ''
    });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        fetchMetadata();
    }, [selectedPage]);

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 3000);
    };

    const fetchMetadata = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch(`${API_URL}/api/cms/public/seo/${selectedPage}`);
            const data = await response.json();
            if (data.success && data.data) {
                setMetadata(data.data);
            } else {
                setMetadata({
                    page_identifier: selectedPage,
                    title: '',
                    description: '',
                    keywords: '',
                    og_title: '',
                    og_description: '',
                    og_image: ''
                });
            }
        } catch (error) {
            console.error('Error fetching SEO metadata:', error);
            setMetadata({
                page_identifier: selectedPage,
                title: '',
                description: '',
                keywords: '',
                og_title: '',
                og_description: '',
                og_image: ''
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch(`${API_URL}/api/cms/admin/seo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(metadata)
            });
            const data = await response.json();
            if (data.success) {
                showMessage('success', 'SEO metadata saved successfully!');
            } else {
                showMessage('error', 'Failed to save SEO metadata');
            }
        } catch (error) {
            console.error('Error saving SEO metadata:', error);
            showMessage('error', 'Error saving SEO metadata');
        } finally {
            setSaving(false);
        }
    };

    const titleLength = metadata.title.length;
    const descLength = metadata.description.length;

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white flex items-center mb-3">
                    <Tag className="mr-4 text-blue-400" size={40} />
                    SEO Manager
                </h1>
                <p className="text-gray-400 text-lg">
                    Optimize your website for search engines and social media sharing
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
                    Select Page to Optimize
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

            {loading ? (
                <div className="text-center py-20">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
                    <p className="text-gray-400 text-lg">Loading SEO settings...</p>
                </div>
            ) : (
                <>
                    {/* Basic SEO */}
                    <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                            <Search className="mr-3 text-blue-400" size={24} />
                            Search Engine Optimization
                        </h2>

                        <div className="space-y-5">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Page Title
                                    </label>
                                    <span className={`text-xs font-medium ${titleLength > 60 ? 'text-red-400' : titleLength > 50 ? 'text-yellow-400' : 'text-green-400'
                                        }`}>
                                        {titleLength}/60 characters
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    value={metadata.title}
                                    onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
                                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Engaging title for search results"
                                    maxLength={80}
                                />
                                <p className="text-xs text-gray-400 mt-1">This appears as the clickable headline in search results</p>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Meta Description
                                    </label>
                                    <span className={`text-xs font-medium ${descLength > 160 ? 'text-red-400' : descLength > 140 ? 'text-yellow-400' : 'text-green-400'
                                        }`}>
                                        {descLength}/160 characters
                                    </span>
                                </div>
                                <textarea
                                    value={metadata.description}
                                    onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
                                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                    placeholder="Compelling description that encourages clicks"
                                    maxLength={200}
                                />
                                <p className="text-xs text-gray-400 mt-1">This appears below the title in search results</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Keywords (comma separated)
                                </label>
                                <input
                                    type="text"
                                    value={metadata.keywords}
                                    onChange={(e) => setMetadata({ ...metadata, keywords: e.target.value })}
                                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="semiconductors, VLSI, ASIC design, verification"
                                />
                                <p className="text-xs text-gray-400 mt-1">Main topics and terms related to this page</p>
                            </div>
                        </div>
                    </div>

                    {/* Open Graph */}
                    <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
                        <h2 className="text-2xl font-semibold text-white mb-2">
                            🌐 Social Media Sharing
                        </h2>
                        <p className="text-gray-400 mb-6 text-sm">How this page appears when shared on Facebook, LinkedIn, Twitter, etc.</p>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Social Share Title
                                </label>
                                <input
                                    type="text"
                                    value={metadata.og_title || ''}
                                    onChange={(e) => setMetadata({ ...metadata, og_title: e.target.value })}
                                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Leave empty to use Page Title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Social Share Description
                                </label>
                                <textarea
                                    value={metadata.og_description || ''}
                                    onChange={(e) => setMetadata({ ...metadata, og_description: e.target.value })}
                                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={2}
                                    placeholder="Leave empty to use Meta Description"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Social Share Image URL
                                </label>
                                <input
                                    type="url"
                                    value={metadata.og_image || ''}
                                    onChange={(e) => setMetadata({ ...metadata, og_image: e.target.value })}
                                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://example.com/image.jpg"
                                />
                                <p className="text-xs text-gray-400 mt-1">Recommended size: 1200 x 630 pixels</p>
                            </div>

                            {metadata.og_image && (
                                <div className="bg-gray-900 rounded-lg p-4">
                                    <p className="text-xs text-gray-400 mb-2">Image Preview:</p>
                                    <img
                                        src={metadata.og_image}
                                        alt="OG Preview"
                                        className="w-full max-w-md rounded border border-gray-700"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Search Preview */}
                    <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
                        <h2 className="text-xl font-semibold text-white mb-4">
                            🔍 Google Search Preview
                        </h2>
                        <div className="bg-white rounded-lg p-6">
                            <div className="text-sm text-green-700 mb-1">www.zyronsemiconductors.com › {selectedPage === 'home' ? '' : selectedPage}</div>
                            <div className="text-blue-600 hover:underline cursor-pointer text-xl mb-2 font-normal">
                                {metadata.title || 'Your Page Title Here'}
                            </div>
                            <div className="text-gray-600 text-sm leading-relaxed">
                                {metadata.description || 'Your meta description will appear here. Make it compelling to encourage clicks from search results.'}
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center font-medium text-lg disabled:opacity-50"
                        >
                            {saving ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={20} className="mr-3" />
                                    Save SEO Settings
                                </>
                            )}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default SEOManagement;
