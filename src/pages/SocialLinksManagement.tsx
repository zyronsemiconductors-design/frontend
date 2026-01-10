import React, { useState, useEffect } from 'react';
import { Share2, Plus, Trash2, Edit2, Save, X, Check, ExternalLink } from 'lucide-react';
import { Linkedin, Twitter, Facebook, Instagram, Youtube, Github } from 'lucide-react';

const API_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

interface SocialLink {
    id?: number;
    platform: string;
    url: string;
    icon?: string;
    display_order: number;
    is_active: boolean;
}

const platformIcons: { [key: string]: any } = {
    linkedin: Linkedin,
    twitter: Twitter,
    facebook: Facebook,
    instagram: Instagram,
    youtube: Youtube,
    github: Github
};

const platformOptions = [
    { value: 'linkedin', label: 'LinkedIn', color: '#0A66C2' },
    { value: 'twitter', label: 'Twitter / X', color: '#1DA1F2' },
    { value: 'facebook', label: 'Facebook', color: '#1877F2' },
    { value: 'instagram', label: 'Instagram', color: '#E4405F' },
    { value: 'youtube', label: 'YouTube', color: '#FF0000' },
    { value: 'github', label: 'GitHub', color: '#181717' }
];

const SocialLinksManagement: React.FC = () => {
    const [links, setLinks] = useState<SocialLink[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [newLink, setNewLink] = useState<SocialLink>({
        platform: 'linkedin',
        url: '',
        display_order: 0,
        is_active: true
    });

    useEffect(() => {
        fetchLinks();
    }, []);

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 3000);
    };

    const fetchLinks = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch(`${API_URL}/api/cms/admin/social`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setLinks(data.data || []);
            }
        } catch (error) {
            console.error('Error fetching social links:', error);
            showMessage('error', 'Failed to load social links');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (link: SocialLink) => {
        setSaving(true);
        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch(`${API_URL}/api/cms/admin/social`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...link,
                    icon: link.platform.toLowerCase()
                })
            });
            const data = await response.json();
            if (data.success) {
                await fetchLinks();
                setEditingId(null);
                setShowAddForm(false);
                setNewLink({ platform: 'linkedin', url: '', display_order: 0, is_active: true });
                showMessage('success', 'Social link saved successfully!');
            } else {
                showMessage('error', 'Failed to save social link');
            }
        } catch (error) {
            console.error('Error saving social link:', error);
            showMessage('error', 'Error saving social link');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this social link?')) return;

        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch(`${API_URL}/api/cms/admin/social/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                await fetchLinks();
                showMessage('success', 'Social link deleted successfully!');
            } else {
                showMessage('error', 'Failed to delete social link');
            }
        } catch (error) {
            console.error('Error deleting social link:', error);
            showMessage('error', 'Error deleting social link');
        }
    };

    const LinkEditor = ({ link, onSave, onCancel }: { link: SocialLink; onSave: (link: SocialLink) => void; onCancel: () => void }) => {
        const [editedLink, setEditedLink] = useState(link);
        const Icon = platformIcons[editedLink.platform.toLowerCase()];
        const platformColor = platformOptions.find(p => p.value === editedLink.platform.toLowerCase())?.color || '#6B7280';

        return (
            <div className="bg-gray-800 rounded-lg p-6 border-2 border-blue-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Platform
                        </label>
                        <select
                            value={editedLink.platform}
                            onChange={(e) => setEditedLink({ ...editedLink, platform: e.target.value })}
                            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {platformOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Profile URL
                        </label>
                        <input
                            type="url"
                            value={editedLink.url}
                            onChange={(e) => setEditedLink({ ...editedLink, url: e.target.value })}
                            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://..."
                        />
                    </div>
                </div>

                {/* Preview */}
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                    <p className="text-sm text-gray-400 mb-3">Preview:</p>
                    <div className="flex items-center gap-4">
                        {Icon && (
                            <div
                                className="p-3 rounded-lg transition-colors"
                                style={{ backgroundColor: platformColor + '20', color: platformColor }}
                            >
                                <Icon size={28} />
                            </div>
                        )}
                        <div>
                            <p className="text-white font-medium capitalize">{editedLink.platform}</p>
                            <p className="text-sm text-gray-400 truncate max-w-md">{editedLink.url || 'No URL set'}</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <label className="flex items-center text-gray-300 cursor-pointer hover:text-white transition-colors">
                        <input
                            type="checkbox"
                            checked={editedLink.is_active}
                            onChange={(e) => setEditedLink({ ...editedLink, is_active: e.target.checked })}
                            className="mr-3 w-4 h-4"
                        />
                        <span className="text-sm font-medium">
                            {editedLink.is_active ? '✅ Visible on Website' : '❌ Hidden from Website'}
                        </span>
                    </label>

                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            className="px-5 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium flex items-center"
                        >
                            <X size={18} className="mr-2" />
                            Cancel
                        </button>
                        <button
                            onClick={() => onSave(editedLink)}
                            disabled={saving || !editedLink.url}
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
                                    Save Link
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white flex items-center mb-3">
                    <Share2 className="mr-4 text-blue-400" size={40} />
                    Social Links Manager
                </h1>
                <p className="text-gray-400 text-lg">
                    Manage your social media profiles that appear in the website footer
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

            {/* Add New Link Button */}
            {!showAddForm && (
                <button
                    onClick={() => setShowAddForm(true)}
                    className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center font-medium"
                >
                    <Plus size={20} className="mr-2" />
                    Add New Social Link
                </button>
            )}

            {/* Add New Link Form */}
            {showAddForm && (
                <div className="mb-6">
                    <LinkEditor
                        link={newLink}
                        onSave={handleSave}
                        onCancel={() => {
                            setShowAddForm(false);
                            setNewLink({ platform: 'linkedin', url: '', display_order: 0, is_active: true });
                        }}
                    />
                </div>
            )}

            {/* Existing Links */}
            {loading ? (
                <div className="text-center py-20">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
                    <p className="text-gray-400 text-lg">Loading social links...</p>
                </div>
            ) : (
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                        <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">
                            {links.length}
                        </span>
                        Your Social Links
                    </h2>
                    {links.length === 0 ? (
                        <div className="bg-gray-800 rounded-lg p-12 text-center border-2 border-dashed border-gray-600">
                            <Share2 size={48} className="mx-auto text-gray-600 mb-4" />
                            <p className="text-gray-400 text-lg">No social links added yet</p>
                            <p className="text-gray-500 text-sm mt-2">Click "Add New Social Link" to get started</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {links.map((link) => (
                                <div key={link.id}>
                                    {editingId === link.id ? (
                                        <LinkEditor
                                            link={link}
                                            onSave={handleSave}
                                            onCancel={() => setEditingId(null)}
                                        />
                                    ) : (
                                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 flex-1">
                                                    {(() => {
                                                        const Icon = platformIcons[link.platform.toLowerCase()];
                                                        const platformColor = platformOptions.find(p => p.value === link.platform.toLowerCase())?.color || '#6B7280';
                                                        return Icon ? (
                                                            <div
                                                                className="p-3 rounded-lg"
                                                                style={{ backgroundColor: platformColor + '20', color: platformColor }}
                                                            >
                                                                <Icon size={28} />
                                                            </div>
                                                        ) : null;
                                                    })()}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <h3 className="text-lg font-semibold text-white capitalize">
                                                                {link.platform}
                                                            </h3>
                                                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${link.is_active
                                                                    ? 'bg-green-600/20 text-green-300 border border-green-600'
                                                                    : 'bg-gray-600/20 text-gray-400 border border-gray-600'
                                                                }`}>
                                                                {link.is_active ? 'Active' : 'Inactive'}
                                                            </span>
                                                        </div>
                                                        <a
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 truncate"
                                                        >
                                                            {link.url}
                                                            <ExternalLink size={14} />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 ml-4">
                                                    <button
                                                        onClick={() => setEditingId(link.id!)}
                                                        className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                                                        title="Edit Link"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(link.id!)}
                                                        className="p-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
                                                        title="Delete Link"
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
            )}
        </div>
    );
};

export default SocialLinksManagement;
