import React, { useState, useEffect } from 'react';
import { Settings, Save, Check, Shield, Mail, Globe, Database, Code } from 'lucide-react';

const API_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

interface SiteSettings {
  general: {
    site_name: string;
    contact_email: string;
    maintenance_mode: boolean;
  };
  social: {
    linkedin: string;
    twitter: string;
    facebook: string;
  };
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    fetchSettings();
  }, []);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_URL}/api/admin/settings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
      showMessage('error', 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (section: keyof SiteSettings, key: string, value: any) => {
    if (settings) {
      setSettings({
        ...settings,
        [section]: {
          ...settings[section],
          [key]: value
        }
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('admin_token');

      // Update general settings
      await fetch(`${API_URL}/api/admin/settings/general`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ value: settings.general })
      });

      // Update social settings
      await fetch(`${API_URL}/api/admin/settings/social`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ value: settings.social })
      });

      showMessage('success', 'Settings updated successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      showMessage('error', 'Error updating settings');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'social', label: 'Social Media', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'advanced', label: 'Advanced', icon: Code }
  ];

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
        <p className="text-gray-400 text-lg">Loading settings...</p>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="bg-red-500/20 text-red-300 p-4 rounded-lg border border-red-500">
        Failed to load settings
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white flex items-center gap-3 mb-3">
              <Settings className="text-blue-400" size={40} />
              Site Settings
            </h1>
            <p className="text-gray-400 text-lg">Configure your website preferences and behavior</p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all flex items-center gap-2 font-medium shadow-lg disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={20} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center ${message.type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500' : 'bg-red-500/20 text-red-300 border border-red-500'
          }`}>
          {message.type === 'success' ? <Check size={20} className="mr-3" /> : <span className="mr-3 text-xl">⚠️</span>}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all whitespace-nowrap ${activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
            >
              <Icon size={18} />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Settings Content */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Settings className="text-blue-400" size={24} />
                General Settings
              </h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Site Name
              </label>
              <input
                type="text"
                value={settings.general.site_name}
                onChange={(e) => handleChange('general', 'site_name', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Zyron Semiconductors"
              />
              <p className="text-xs text-gray-400 mt-1">This appears in browser tabs and SEO</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contact Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={settings.general.contact_email}
                  onChange={(e) => handleChange('general', 'contact_email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="contact@example.com"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Receives all form submissions</p>
            </div>

            <div className="p-4 bg-yellow-500/10 border border-yellow-500 rounded-lg">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.general.maintenance_mode}
                  onChange={(e) => handleChange('general', 'maintenance_mode', e.target.checked)}
                  className="w-4 h-4 text-yellow-600 focus:ring-yellow-500 border-gray-600 rounded bg-gray-700 mr-3"
                />
                <div>
                  <span className="block text-sm font-medium text-yellow-300">
                    Maintenance Mode
                  </span>
                  <span className="text-xs text-yellow-400">
                    Enable to show a maintenance page to visitors
                  </span>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Social Media Settings */}
        {activeTab === 'social' && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                <Globe className="text-blue-400" size={24} />
                Social Media Links
              </h2>
              <p className="text-gray-400 text-sm">These links appear in your website footer</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                LinkedIn Company URL
              </label>
              <input
                type="url"
                value={settings.social.linkedin}
                onChange={(e) => handleChange('social', 'linkedin', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://linkedin.com/company/your-company"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Twitter / X Profile URL
              </label>
              <input
                type="url"
                value={settings.social.twitter}
                onChange={(e) => handleChange('social', 'twitter', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://twitter.com/yourcompany"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Facebook Page URL
              </label>
              <input
                type="url"
                value={settings.social.facebook}
                onChange={(e) => handleChange('social', 'facebook', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://facebook.com/yourcompany"
              />
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                <Shield className="text-green-400" size={24} />
                Security Settings
              </h2>
              <p className="text-gray-400 text-sm">Manage security and access controls</p>
            </div>

            <div className="p-4 bg-green-500/10 border border-green-500 rounded-lg">
              <div className="flex items-start gap-3">
                <Check className="text-green-400 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-medium text-green-300">SSL/HTTPS Enabled</p>
                  <p className="text-xs text-green-400 mt-1">Your site is secured with HTTPS encryption</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500 rounded-lg">
              <div className="flex items-start gap-3">
                <Database className="text-blue-400 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-medium text-blue-300">Database Backups</p>
                  <p className="text-xs text-blue-400 mt-1">Automatic backups run daily via Supabase</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Settings */}
        {activeTab === 'advanced' && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                <Code className="text-purple-400" size={24} />
                Advanced Settings
              </h2>
              <p className="text-gray-400 text-sm">Developer and advanced configuration options</p>
            </div>

            <div className="p-4 bg-purple-500/10 border border-purple-500 rounded-lg">
              <p className="text-sm font-medium text-purple-300 mb-2">API Information</p>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Backend URL:</span>
                  <code className="text-purple-300 bg-gray-900 px-2 py-1 rounded">{API_URL}</code>
                </div>
                <div className="flex justify-between">
                  <span>Environment:</span>
                  <code className="text-purple-300 bg-gray-900 px-2 py-1 rounded">
                    {import.meta.env.MODE}
                  </code>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-700 rounded-lg">
              <p className="text-sm font-medium text-gray-300 mb-2">Cache Management</p>
              <button
                type="button"
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors text-sm"
              >
                Clear Application Cache
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SettingsPage;