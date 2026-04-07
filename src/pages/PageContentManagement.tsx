import React, { useState, useEffect, useMemo } from 'react';
import { FileText, Save, Eye, EyeOff, Trash2, Edit2, Check } from 'lucide-react';
import ContentFieldEditor from '../components/ContentFieldEditor';
import Eng from '../content/Eng';
import { CMS_PAGES, getDefaultSectionContent } from '../cms/sectionConfig';

const API_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

const PageContentManagement: React.FC = () => {
    const [selectedPage, setSelectedPage] = useState('home');
    const [pageContent, setPageContent] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingSectionKey, setEditingSectionKey] = useState<string | null>(null);
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
                    content_type: 'json',
                    page_identifier: selectedPage
                })
            });
            const data = await response.json();
            if (data.success) {
                await fetchPageContent();
                setEditingSectionKey(null);
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

    const sectionsByKey = useMemo(() => {
        const map = new Map<string, any>();
        pageContent.forEach((section) => map.set(section.section_key, section));
        return map;
    }, [pageContent]);

    const pageConfig = CMS_PAGES.find(p => p.id === selectedPage);

    const SectionEditor = ({ sectionKey, label, description }: { sectionKey: string; label: string; description?: string }) => {
        const existing = sectionsByKey.get(sectionKey);
        const [editedSection, setEditedSection] = useState(existing || {
            section_key: sectionKey,
            content: getDefaultSectionContent(selectedPage, sectionKey),
            is_published: true
        });

        const updateContent = (newContent: any) => {
            setEditedSection({ ...editedSection, content: newContent });
        };

        const renderArrayTextList = (items: string[], onChange: (next: string[]) => void, labelText = 'Items') => (
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-300">{labelText}</p>
                    <button
                        onClick={() => onChange([...(items || []), ''])}
                        className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
                    >
                        + Add
                    </button>
                </div>
                {(items || []).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                        <textarea
                            value={item}
                            onChange={(e) => {
                                const next = [...items];
                                next[idx] = e.target.value;
                                onChange(next);
                            }}
                            className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={2}
                            placeholder={`Line ${idx + 1}`}
                        />
                        <button
                            onClick={() => onChange(items.filter((_, i) => i !== idx))}
                            className="text-xs text-red-400 hover:text-red-300 mt-2"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        );

        const renderServicesEditor = () => {
            const services = editedSection.content || [];
            return (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-300">Services</p>
                        <button
                            onClick={() => updateContent([...(services || []), { id: '', title: '', content: [''] }])}
                            className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
                        >
                            + Add Service
                        </button>
                    </div>
                    {(services || []).map((service: any, idx: number) => (
                        <div key={idx} className="bg-gray-850 border border-gray-700 rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                <input
                                    value={service.title || ''}
                                    onChange={(e) => {
                                        const next = [...services];
                                        next[idx] = { ...service, title: e.target.value };
                                        updateContent(next);
                                    }}
                                    className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm"
                                    placeholder="Service title"
                                />
                                <input
                                    value={service.id || ''}
                                    onChange={(e) => {
                                        const next = [...services];
                                        next[idx] = { ...service, id: e.target.value };
                                        updateContent(next);
                                    }}
                                    className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm"
                                    placeholder="Service ID (e.g. design)"
                                />
                            </div>
                            {renderArrayTextList(service.content || [], (nextList) => {
                                const next = [...services];
                                next[idx] = { ...service, content: nextList };
                                updateContent(next);
                            }, 'Description paragraphs')}
                            <div className="flex justify-end mt-3">
                                <button
                                    onClick={() => updateContent(services.filter((_: any, i: number) => i !== idx))}
                                    className="text-xs text-red-400 hover:text-red-300"
                                >
                                    Remove Service
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            );
        };

        const renderAdvantagesEditor = () => {
            const items = editedSection.content || [];
            return (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-300">Advantages</p>
                        <button
                            onClick={() => updateContent([...(items || []), { id: '', title: '', content: [''] }])}
                            className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
                        >
                            + Add Item
                        </button>
                    </div>
                    {(items || []).map((item: any, idx: number) => (
                        <div key={idx} className="bg-gray-850 border border-gray-700 rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                <input
                                    value={item.title || ''}
                                    onChange={(e) => {
                                        const next = [...items];
                                        next[idx] = { ...item, title: e.target.value };
                                        updateContent(next);
                                    }}
                                    className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm"
                                    placeholder="Title"
                                />
                                <input
                                    value={item.id || ''}
                                    onChange={(e) => {
                                        const next = [...items];
                                        next[idx] = { ...item, id: e.target.value };
                                        updateContent(next);
                                    }}
                                    className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm"
                                    placeholder="ID"
                                />
                            </div>
                            {renderArrayTextList(item.content || [], (nextList) => {
                                const next = [...items];
                                next[idx] = { ...item, content: nextList };
                                updateContent(next);
                            }, 'Bullet points')}
                            <div className="flex justify-end mt-3">
                                <button
                                    onClick={() => updateContent(items.filter((_: any, i: number) => i !== idx))}
                                    className="text-xs text-red-400 hover:text-red-300"
                                >
                                    Remove Item
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            );
        };

        const renderHeroEditor = () => {
            const slides = editedSection.content || [];
            return (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-300">Hero Slides</p>
                        <button
                            onClick={() => updateContent([...(slides || []), { id: '', title: '', subtitle: '', description: '', ctaText: '', imageUrl: '' }])}
                            className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
                        >
                            + Add Slide
                        </button>
                    </div>
                    {(slides || []).map((slide: any, idx: number) => (
                        <div key={idx} className="bg-gray-850 border border-gray-700 rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                <input
                                    value={slide.title || ''}
                                    onChange={(e) => {
                                        const next = [...slides];
                                        next[idx] = { ...slide, title: e.target.value };
                                        updateContent(next);
                                    }}
                                    className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm"
                                    placeholder="Title"
                                />
                                <input
                                    value={slide.subtitle || ''}
                                    onChange={(e) => {
                                        const next = [...slides];
                                        next[idx] = { ...slide, subtitle: e.target.value };
                                        updateContent(next);
                                    }}
                                    className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm"
                                    placeholder="Subtitle"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                <input
                                    value={slide.ctaText || ''}
                                    onChange={(e) => {
                                        const next = [...slides];
                                        next[idx] = { ...slide, ctaText: e.target.value };
                                        updateContent(next);
                                    }}
                                    className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm"
                                    placeholder="CTA Text"
                                />
                                <input
                                    value={slide.imageUrl || ''}
                                    onChange={(e) => {
                                        const next = [...slides];
                                        next[idx] = { ...slide, imageUrl: e.target.value };
                                        updateContent(next);
                                    }}
                                    className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm"
                                    placeholder="Image URL"
                                />
                            </div>
                            <textarea
                                value={slide.description || ''}
                                onChange={(e) => {
                                    const next = [...slides];
                                    next[idx] = { ...slide, description: e.target.value };
                                    updateContent(next);
                                }}
                                className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm"
                                rows={3}
                                placeholder="Description"
                            />
                            <div className="flex justify-end mt-3">
                                <button
                                    onClick={() => updateContent(slides.filter((_: any, i: number) => i !== idx))}
                                    className="text-xs text-red-400 hover:text-red-300"
                                >
                                    Remove Slide
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            );
        };

        const renderJobsEditor = () => {
            const jobs = editedSection.content || [];
            return (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-300">Job Listings</p>
                        <button
                            onClick={() => updateContent([...(jobs || []), { id: '', title: '', dept: '', location: '', type: '' }])}
                            className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
                        >
                            + Add Job
                        </button>
                    </div>
                    {(jobs || []).map((job: any, idx: number) => (
                        <div key={idx} className="bg-gray-850 border border-gray-700 rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                <input
                                    value={job.title || ''}
                                    onChange={(e) => {
                                        const next = [...jobs];
                                        next[idx] = { ...job, title: e.target.value };
                                        updateContent(next);
                                    }}
                                    className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm"
                                    placeholder="Job Title"
                                />
                                <input
                                    value={job.dept || ''}
                                    onChange={(e) => {
                                        const next = [...jobs];
                                        next[idx] = { ...job, dept: e.target.value };
                                        updateContent(next);
                                    }}
                                    className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm"
                                    placeholder="Department"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                                <input
                                    value={job.location || ''}
                                    onChange={(e) => {
                                        const next = [...jobs];
                                        next[idx] = { ...job, location: e.target.value };
                                        updateContent(next);
                                    }}
                                    className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm"
                                    placeholder="Location"
                                />
                                <input
                                    value={job.type || ''}
                                    onChange={(e) => {
                                        const next = [...jobs];
                                        next[idx] = { ...job, type: e.target.value };
                                        updateContent(next);
                                    }}
                                    className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm"
                                    placeholder="Type"
                                />
                                <input
                                    value={job.id || ''}
                                    onChange={(e) => {
                                        const next = [...jobs];
                                        next[idx] = { ...job, id: e.target.value };
                                        updateContent(next);
                                    }}
                                    className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm"
                                    placeholder="Job ID"
                                />
                            </div>
                            <div className="flex justify-end mt-3">
                                <button
                                    onClick={() => updateContent(jobs.filter((_: any, i: number) => i !== idx))}
                                    className="text-xs text-red-400 hover:text-red-300"
                                >
                                    Remove Job
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            );
        };

        const renderCoursesEditor = () => {
            return (
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm font-medium text-gray-300">Courses Content</p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => updateContent(Eng.courses)}
                                className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded"
                            >
                                Load Default Courses
                            </button>
                        </div>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 max-h-[600px] overflow-y-auto">
                        <ContentFieldEditor
                            content={editedSection.content || {}}
                            onChange={updateContent}
                        />
                    </div>
                </div>
            );
        };

        const renderNavEditor = () => {
            const nav = editedSection.content || { main: [], services: [], why: [] };

            const updateNav = (key: 'main' | 'services' | 'why', nextList: any[]) => {
                updateContent({ ...nav, [key]: nextList });
            };

            const renderNavList = (key: 'main' | 'services' | 'why', label: string) => {
                const items = nav[key] || [];
                return (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-300">{label}</p>
                            <button
                                onClick={() => updateNav(key, [...items, { label: '', to: '' }])}
                                className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
                            >
                                + Add
                            </button>
                        </div>
                        {items.map((item: any, idx: number) => (
                            <div key={idx} className="bg-gray-850 border border-gray-700 rounded-lg p-4 space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        value={item.label || ''}
                                        onChange={(e) => {
                                            const next = [...items];
                                            next[idx] = { ...item, label: e.target.value };
                                            updateNav(key, next);
                                        }}
                                        className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm"
                                        placeholder="Label"
                                    />
                                    <input
                                        value={item.to || ''}
                                        onChange={(e) => {
                                            const next = [...items];
                                            next[idx] = { ...item, to: e.target.value };
                                            updateNav(key, next);
                                        }}
                                        className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm"
                                        placeholder="Link (e.g. /services#courses)"
                                    />
                                </div>

                                {Array.isArray(item.children) && (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-medium text-gray-400">Children</p>
                                            <button
                                                onClick={() => {
                                                    const next = [...items];
                                                    const children = [...(item.children || []), { label: '', to: '' }];
                                                    next[idx] = { ...item, children };
                                                    updateNav(key, next);
                                                }}
                                                className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
                                            >
                                                + Add Child
                                            </button>
                                        </div>
                                        {(item.children || []).map((child: any, cidx: number) => (
                                            <div key={cidx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <input
                                                    value={child.label || ''}
                                                    onChange={(e) => {
                                                        const next = [...items];
                                                        const children = [...(item.children || [])];
                                                        children[cidx] = { ...child, label: e.target.value };
                                                        next[idx] = { ...item, children };
                                                        updateNav(key, next);
                                                    }}
                                                    className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm"
                                                    placeholder="Child label"
                                                />
                                                <input
                                                    value={child.to || ''}
                                                    onChange={(e) => {
                                                        const next = [...items];
                                                        const children = [...(item.children || [])];
                                                        children[cidx] = { ...child, to: e.target.value };
                                                        next[idx] = { ...item, children };
                                                        updateNav(key, next);
                                                    }}
                                                    className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm"
                                                    placeholder="Child link"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex justify-between">
                                    <button
                                        onClick={() => {
                                            const next = [...items];
                                            next[idx] = Array.isArray(item.children)
                                                ? { ...item, children: undefined }
                                                : { ...item, children: [] };
                                            updateNav(key, next);
                                        }}
                                        className="text-xs text-gray-300 hover:text-white"
                                    >
                                        {Array.isArray(item.children) ? 'Hide Children' : 'Enable Children'}
                                    </button>
                                    <button
                                        onClick={() => updateNav(key, items.filter((_: any, i: number) => i !== idx))}
                                        className="text-xs text-red-400 hover:text-red-300"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            };

            return (
                <div className="space-y-6">
                    {renderNavList('main', 'Main')}
                    {renderNavList('services', 'Services')}
                    {renderNavList('why', 'Why')}
                </div>
            );
        };

        const renderContentEditor = () => {
            if (sectionKey === 'services_list') return renderServicesEditor();
            if (sectionKey === 'advantages') return renderAdvantagesEditor();
            if (sectionKey === 'hero') return renderHeroEditor();
            if (sectionKey === 'jobs') return renderJobsEditor();
            if (sectionKey === 'nav') return renderNavEditor();
            if (sectionKey === 'courses_v2') return renderCoursesEditor();
            return (
                <div className="bg-gray-900 rounded-lg p-4 max-h-[600px] overflow-y-auto">
                    <ContentFieldEditor
                        content={editedSection.content || {}}
                        onChange={updateContent}
                    />
                </div>
            );
        };

        return (
            <div className="bg-gray-800 rounded-lg p-6 mb-4 border-2 border-blue-500">
                <div className="mb-4">
                    <h3 className="text-xl font-semibold text-white">{label}</h3>
                    {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                        Content
                    </label>
                    {renderContentEditor()}
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
                            onClick={() => setEditingSectionKey(null)}
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
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white flex items-center mb-3">
                    <FileText className="mr-4 text-blue-400" size={40} />
                    Page Content Manager
                </h1>
                <p className="text-gray-400 text-lg">
                    Edit the content that appears on each page of your website
                </p>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-lg flex items-center ${message.type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500' : 'bg-red-500/20 text-red-300 border border-red-500'
                    }`}>
                    {message.type === 'success' ? <Check size={20} className="mr-3" /> : <span className="mr-3 text-xl">⚠️</span>}
                    <span className="font-medium">{message.text}</span>
                </div>
            )}

            <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
                <label className="block text-sm font-medium text-gray-300 mb-4">
                    Select Page to Edit
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {CMS_PAGES.map((page) => (
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
                    <p className="text-gray-400 text-lg">Loading content...</p>
                </div>
            ) : (
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                        <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">
                            {pageConfig?.sections.length || 0}
                        </span>
                        Sections
                    </h2>
                    {!pageConfig || pageConfig.sections.length === 0 ? (
                        <div className="bg-gray-800 rounded-lg p-12 text-center border-2 border-dashed border-gray-600">
                            <FileText size={48} className="mx-auto text-gray-600 mb-4" />
                            <p className="text-gray-400 text-lg">No content sections configured for this page</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {pageConfig.sections.map((cfg) => {
                                const section = sectionsByKey.get(cfg.key);
                                const isEditing = editingSectionKey === cfg.key;
                                return (
                                    <div key={cfg.key}>
                                        {isEditing ? (
                                            <SectionEditor sectionKey={cfg.key} label={cfg.label} description={cfg.description} />
                                        ) : (
                                            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <h3 className="text-xl font-semibold text-white">{cfg.label}</h3>
                                                            <span className={`text-xs px-3 py-1 rounded-full flex items-center font-medium ${section?.is_published
                                                                ? 'bg-green-600/20 text-green-300 border border-green-600'
                                                                : 'bg-gray-600/20 text-gray-400 border border-gray-600'
                                                                }`}>
                                                                {section?.is_published ? (
                                                                    <><Eye size={12} className="mr-1" /> Published</>
                                                                ) : (
                                                                    <><EyeOff size={12} className="mr-1" /> Draft</>
                                                                )}
                                                            </span>
                                                        </div>
                                                        {cfg.description && <p className="text-sm text-gray-400">{cfg.description}</p>}
                                                        {!section && (
                                                            <p className="text-sm text-yellow-300 mt-2">Section not created yet</p>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-2 ml-4">
                                                        <button
                                                            onClick={() => setEditingSectionKey(cfg.key)}
                                                            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                                                            title={section ? 'Edit Section' : 'Create Section'}
                                                        >
                                                            <Edit2 size={18} />
                                                        </button>
                                                        {section?.id && (
                                                            <button
                                                                onClick={() => handleDeleteSection(section.id)}
                                                                className="p-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
                                                                title="Delete Section"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PageContentManagement;
