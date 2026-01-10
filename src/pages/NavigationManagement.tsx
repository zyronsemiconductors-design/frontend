import React, { useState, useEffect } from 'react';
import { Navigation, Plus, Trash2, Edit2, Save, X, Check, GripVertical, ExternalLink } from 'lucide-react';

const API_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

interface NavItem {
    id?: number;
    label: string;
    path: string;
    display_order: number;
    is_active: boolean;
    parent_id?: number | null;
}

const NavigationManagement: React.FC = () => {
    const [navItems, setNavItems] = useState<NavItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [newItem, setNewItem] = useState<NavItem>({
        label: '',
        path: '',
        display_order: 0,
        is_active: true
    });

    useEffect(() => {
        fetchNavItems();
    }, []);

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 3000);
    };

    const fetchNavItems = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch(`${API_URL}/api/cms/admin/navigation`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setNavItems(data.data || []);
            }
        } catch (error) {
            console.error('Error fetching navigation items:', error);
            showMessage('error', 'Failed to load navigation items');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (item: NavItem) => {
        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch(`${API_URL}/api/cms/admin/navigation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(item)
            });
            const data = await response.json();
            if (data.success) {
                await fetchNavItems();
                setEditingId(null);
                setShowAddForm(false);
                setNewItem({ label: '', path: '', display_order: 0, is_active: true });
                showMessage('success', 'Navigation item saved successfully!');
            } else {
                showMessage('error', 'Failed to save navigation item');
            }
        } catch (error) {
            console.error('Error saving navigation item:', error);
            showMessage('error', 'Error saving navigation item');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this navigation item?')) return;

        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch(`${API_URL}/api/cms/admin/navigation/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                await fetchNavItems();
                showMessage('success', 'Navigation item deleted successfully!');
            } else {
                showMessage('error', 'Failed to delete navigation item');
            }
        } catch (error) {
            console.error('Error deleting navigation item:', error);
            showMessage('error', 'Error deleting navigation item');
        }
    };

    const ItemEditor = ({ item, onSave, onCancel }: { item: NavItem; onSave: (item: NavItem) => void; onCancel: () => void }) => {
        const [editedItem, setEditedItem] = useState(item);

        return (
            <div className="bg-gray-800 rounded-lg p-6 border-2 border-blue-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Label
                        </label>
                        <input
                            type="text"
                            value={editedItem.label}
                            onChange={(e) => setEditedItem({ ...editedItem, label: e.target.value })}
                            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Home, About, Services..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Path
                        </label>
                        <input
                            type="text"
                            value={editedItem.path}
                            onChange={(e) => setEditedItem({ ...editedItem, path: e.target.value })}
                            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="/about, /services..."
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <label className="flex items-center text-gray-300 cursor-pointer hover:text-white transition-colors">
                        <input
                            type="checkbox"
                            checked={editedItem.is_active}
                            onChange={(e) => setEditedItem({ ...editedItem, is_active: e.target.checked })}
                            className="mr-3 w-4 h-4"
                        />
                        <span className="text-sm font-medium">
                            {editedItem.is_active ? '✅ Visible in Navigation' : '❌ Hidden from Navigation'}
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
                            onClick={() => onSave(editedItem)}
                            disabled={!editedItem.label || !editedItem.path}
                            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center font-medium disabled:opacity-50"
                        >
                            <Save size={18} className="mr-2" />
                            Save Item
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
                    <Navigation className="mr-4 text-blue-400" size={40} />
                    Navigation Manager
                </h1>
                <p className="text-gray-400 text-lg">
                    Manage your website's navigation menu items
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

            {/* Add New Button */}
            {!showAddForm && (
                <button
                    onClick={() => setShowAddForm(true)}
                    className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center font-medium"
                >
                    <Plus size={20} className="mr-2" />
                    Add Navigation Item
                </button>
            )}

            {/* Add New Item Form */}
            {showAddForm && (
                <div className="mb-6">
                    <ItemEditor
                        item={newItem}
                        onSave={handleSave}
                        onCancel={() => {
                            setShowAddForm(false);
                            setNewItem({ label: '', path: '', display_order: 0, is_active: true });
                        }}
                    />
                </div>
            )}

            {/* Navigation Items */}
            {loading ? (
                <div className="text-center py-20">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
                    <p className="text-gray-400 text-lg">Loading navigation items...</p>
                </div>
            ) : (
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                        <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">
                            {navItems.length}
                        </span>
                        Navigation Items
                    </h2>
                    {navItems.length === 0 ? (
                        <div className="bg-gray-800 rounded-lg p-12 text-center border-2 border-dashed border-gray-600">
                            <Navigation size={48} className="mx-auto text-gray-600 mb-4" />
                            <p className="text-gray-400 text-lg">No navigation items added yet</p>
                            <p className="text-gray-500 text-sm mt-2">Click "Add Navigation Item" to get started</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {navItems.map((item) => (
                                <div key={item.id}>
                                    {editingId === item.id ? (
                                        <ItemEditor
                                            item={item}
                                            onSave={handleSave}
                                            onCancel={() => setEditingId(null)}
                                        />
                                    ) : (
                                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <GripVertical size={20} className="text-gray-600 cursor-move" />
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <h3 className="text-lg font-semibold text-white">
                                                                {item.label}
                                                            </h3>
                                                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${item.is_active
                                                                    ? 'bg-green-600/20 text-green-300 border border-green-600'
                                                                    : 'bg-gray-600/20 text-gray-400 border border-gray-600'
                                                                }`}>
                                                                {item.is_active ? 'Active' : 'Hidden'}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-blue-400">
                                                            <ExternalLink size={14} />
                                                            <span>{item.path}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 ml-4">
                                                    <button
                                                        onClick={() => setEditingId(item.id!)}
                                                        className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                                                        title="Edit Item"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id!)}
                                                        className="p-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
                                                        title="Delete Item"
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

export default NavigationManagement;
