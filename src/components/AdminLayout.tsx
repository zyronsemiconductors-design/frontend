import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Users, Inbox, Settings, LogOut,
  Menu, X, ChevronRight, Activity, Bell
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { path: '/admin/submissions', label: 'Submissions', icon: Inbox, badge: '4' },
    {
      path: '/admin/cms',
      label: 'Content',
      icon: FileText,
      submenu: [
        { path: '/admin/cms/pages', label: 'Page Content' },
        { path: '/admin/cms/social', label: 'Social Links' },
        { path: '/admin/cms/seo', label: 'SEO Settings' }
      ]
    },
    { path: '/admin/users', label: 'Users', icon: Users },
    { path: '/admin/settings', label: 'Settings', icon: Settings }
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Top Header */}
      <header className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {sidebarOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">Z</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Zyron Admin</h1>
                <p className="text-xs text-gray-400">Content Management System</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-gray-700 transition-colors">
              <Bell size={20} className="text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="relative p-2 rounded-lg hover:bg-gray-700 transition-colors">
              <Activity size={20} className="text-gray-400" />
            </button>
            <div className="hidden md:flex items-center gap-3 pl-4 border-l border-gray-700">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">A</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-white">Admin</p>
                <p className="text-xs text-gray-400">Super Admin</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
                    fixed lg:sticky top-0 left-0 z-30 h-screen
                    bg-gray-800/50 backdrop-blur-md border-r border-gray-700/50
                    transition-all duration-300 ease-in-out
                    ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'}
                `}>
          <div className="flex flex-col h-full">
            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path, item.exact);
                const hasSubmenu = item.submenu && item.submenu.length > 0;

                return (
                  <div key={item.path}>
                    <Link
                      to={item.path}
                      className={`
                                                flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                                                ${active
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                        }
                                                ${!sidebarOpen && 'lg:justify-center'}
                                            `}
                    >
                      <Icon size={20} />
                      {sidebarOpen && (
                        <>
                          <span className="flex-1 font-medium">{item.label}</span>
                          {item.badge && (
                            <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                              {item.badge}
                            </span>
                          )}
                          {hasSubmenu && <ChevronRight size={16} />}
                        </>
                      )}
                    </Link>

                    {hasSubmenu && sidebarOpen && isActive(item.path) && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`
                                                            flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all
                                                            ${location.pathname === subItem.path
                                ? 'bg-gray-700 text-white'
                                : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                              }
                                                        `}
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Logout Button */}
            <div className="p-3 border-t border-gray-700/50">
              <button
                onClick={handleLogout}
                className={`
                                    w-full flex items-center gap-3 px-4 py-3 rounded-lg
                                    text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all
                                    ${!sidebarOpen && 'lg:justify-center'}
                                `}
              >
                <LogOut size={20} />
                {sidebarOpen && <span className="font-medium">Logout</span>}
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;