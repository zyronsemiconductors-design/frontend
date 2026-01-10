import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface ContentFieldEditorProps {
    content: any;
    onChange: (newContent: any) => void;
    path?: string;
}

const ContentFieldEditor: React.FC<ContentFieldEditorProps> = ({ content, onChange, path = '' }) => {
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

    const handleChange = (key: string, value: any) => {
        if (Array.isArray(content)) {
            const newArray = [...content];
            newArray[parseInt(key)] = value;
            onChange(newArray);
        } else {
            onChange({
                ...content,
                [key]: value
            });
        }
    };

    const handleAddArrayItem = () => {
        if (Array.isArray(content)) {
            onChange([...content, {}]);
        }
    };

    const handleRemoveArrayItem = (index: number) => {
        if (Array.isArray(content)) {
            const newArray = content.filter((_, i) => i !== index);
            onChange(newArray);
        }
    };

    const toggleExpanded = (key: string) => {
        setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const renderField = (key: string, value: any) => {
        const fieldPath = path ? `${path}.${key}` : key;
        const isExpanded = expanded[fieldPath] !== false; // Default to true

        if (value === null || value === undefined) {
            return (
                <div key={key} className="mb-3">
                    <label className="block text-sm font-medium text-gray-300 mb-1 capitalize">
                        {key.replace(/_/g, ' ')}
                    </label>
                    <input
                        type="text"
                        value=""
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                    />
                </div>
            );
        }

        if (typeof value === 'object' && !Array.isArray(value)) {
            return (
                <div key={key} className="mb-4 border border-gray-600 rounded-lg p-4 bg-gray-750">
                    <button
                        onClick={() => toggleExpanded(fieldPath)}
                        className="flex items-center text-sm font-medium text-gray-200 mb-3 hover:text-white transition-colors"
                    >
                        {isExpanded ? <ChevronDown size={16} className="mr-1" /> : <ChevronRight size={16} className="mr-1" />}
                        <span className="capitalize">{key.replace(/_/g, ' ')}</span>
                    </button>
                    {isExpanded && (
                        <div className="ml-4 space-y-3">
                            <ContentFieldEditor
                                content={value}
                                onChange={(newValue) => handleChange(key, newValue)}
                                path={fieldPath}
                            />
                        </div>
                    )}
                </div>
            );
        }

        if (Array.isArray(value)) {
            return (
                <div key={key} className="mb-4 border border-gray-600 rounded-lg p-4 bg-gray-750">
                    <div className="flex items-center justify-between mb-3">
                        <button
                            onClick={() => toggleExpanded(fieldPath)}
                            className="flex items-center text-sm font-medium text-gray-200 hover:text-white transition-colors"
                        >
                            {isExpanded ? <ChevronDown size={16} className="mr-1" /> : <ChevronRight size={16} className="mr-1" />}
                            <span className="capitalize">{key.replace(/_/g, ' ')} ({value.length} items)</span>
                        </button>
                        {isExpanded && (
                            <button
                                onClick={handleAddArrayItem}
                                className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded transition-colors"
                            >
                                + Add Item
                            </button>
                        )}
                    </div>
                    {isExpanded && (
                        <div className="space-y-3">
                            {value.map((item, idx) => (
                                <div key={idx} className="border border-gray-600 rounded p-3 bg-gray-800">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-medium text-gray-400">Item {idx + 1}</span>
                                        <button
                                            onClick={() => handleRemoveArrayItem(idx)}
                                            className="text-xs text-red-400 hover:text-red-300 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <ContentFieldEditor
                                        content={item}
                                        onChange={(newValue) => handleChange(idx.toString(), newValue)}
                                        path={`${fieldPath}[${idx}]`}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        // Primitive values
        const isLongText = typeof value === 'string' && value.length > 100;
        const isUrl = typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));

        return (
            <div key={key} className="mb-3">
                <label className="block text-sm font-medium text-gray-300 mb-1 capitalize">
                    {key.replace(/_/g, ' ')}
                </label>
                {isLongText ? (
                    <textarea
                        value={value}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                    />
                ) : (
                    <input
                        type={typeof value === 'number' ? 'number' : isUrl ? 'url' : 'text'}
                        value={value}
                        onChange={(e) => {
                            const newValue = typeof value === 'number' ? Number(e.target.value) : e.target.value;
                            handleChange(key, newValue);
                        }}
                        className="w-full bg-gray-700 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                    />
                )}
            </div>
        );
    };

    if (Array.isArray(content)) {
        return (
            <>
                {content.map((item, idx) => renderField(idx.toString(), item))}
            </>
        );
    }

    return (
        <>
            {Object.entries(content).map(([key, value]) => renderField(key, value))}
        </>
    );
};

export default ContentFieldEditor;
