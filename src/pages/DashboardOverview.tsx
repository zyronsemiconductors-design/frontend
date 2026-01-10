import React, { useState, useEffect } from 'react';
import {
  TrendingUp, TrendingDown, Mail, Briefcase, Users, BookOpen,
  Activity, Clock, CheckCircle, AlertCircle, BarChart3, LineChart,
  Calendar, Eye
} from 'lucide-react';

const API_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

interface Stats {
  contacts: number;
  careers: number;
  community: number;
  resources: number;
}

interface Log {
  id: string;
  type: string;
  title: string;
  time: string;
}

const DashboardOverview: React.FC = () => {
  const [stats, setStats] = useState<Stats>({ contacts: 0, careers: 0, community: 0, resources: 0 });
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_URL}/api/admin/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setStats(data.stats || { contacts: 0, careers: 0, community: 0, resources: 0 });
      setLogs(data.logs || []);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const metricCards = [
    {
      title: 'Contact Forms',
      value: stats.contacts,
      icon: Mail,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
      trend: '+12%',
      trendUp: true
    },
    {
      title: 'Job Applications',
      value: stats.careers,
      icon: Briefcase,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-400',
      trend: '+8%',
      trendUp: true
    },
    {
      title: 'Community Requests',
      value: stats.community,
      icon: Users,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      iconColor: 'text-green-400',
      trend: '+5%',
      trendUp: true
    },
    {
      title: 'Resource Enquiries',
      value: stats.resources,
      icon: BookOpen,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      iconColor: 'text-orange-400',
      trend: '-3%',
      trendUp: false
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'contact': return <Mail size={16} className="text-blue-400" />;
      case 'career': return <Briefcase size={16} className="text-purple-400" />;
      case 'community': return <Users size={16} className="text-green-400" />;
      case 'resource': return <BookOpen size={16} className="text-orange-400" />;
      default: return <Activity size={16} className="text-gray-400" />;
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h1>
        <p className="text-blue-100">Here's what's happening with your website today</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((card, index) => {
          const Icon = card.icon;
          const TrendIcon = card.trendUp ? TrendingUp : TrendingDown;
          return (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all hover:scale-105 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <Icon className={card.iconColor} size={24} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${card.trendUp ? 'text-green-400' : 'text-red-400'}`}>
                  <TrendIcon size={16} />
                  <span className="font-medium">{card.trend}</span>
                </div>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-white">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="text-blue-400" size={24} />
              Recent Activity
            </h2>
            <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
              <Eye size={16} />
              View All
            </button>
          </div>
          <div className="space-y-3">
            {logs.slice(0, 8).map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-750 transition-colors">
                <div className="mt-1">{getTypeIcon(log.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">{log.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock size={12} className="text-gray-500" />
                    <span className="text-xs text-gray-400">{getTimeAgo(log.time)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          {/* System Status */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="text-green-400" size={20} />
              System Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Database</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-sm text-green-400 font-medium">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">API</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-sm text-green-400 font-medium">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Email Service</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-sm text-green-400 font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <LineChart className="text-purple-400" size={20} />
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm text-white flex items-center gap-3">
                <CheckCircle size={16} className="text-green-400" />
                Review New Submissions
              </button>
              <button className="w-full text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm text-white flex items-center gap-3">
                <Calendar size={16} className="text-blue-400" />
                Manage Content
              </button>
              <button className="w-full text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm text-white flex items-center gap-3">
                <AlertCircle size={16} className="text-orange-400" />
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;