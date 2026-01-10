import React from 'react';
import { Routes, Route, useLocation, BrowserRouter, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Footer from './components/Footer';
import SocialIcons from "./components/SocialIcons";
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import WhyZyron from './pages/WhyZyron';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Eng from './content/Eng';
import Community from './pages/Community';
import Resources from './pages/Resources';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/NotFound';

// Admin Imports
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import LoginPage from './pages/LoginPage';
import SetupPage from './pages/SetupPage';
import DashboardOverview from './pages/DashboardOverview';
import UserManagement from './pages/UserManagement';
import SubmissionsPage from './pages/SubmissionsPage';
import SettingsPage from './pages/SettingsPage';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// CMS Imports
import PageContentManagement from './pages/PageContentManagement';
import SocialLinksManagement from './pages/SocialLinksManagement';
import SEOManagement from './pages/SEOManagement';
import NavigationManagement from './pages/NavigationManagement';

const AnimatedRoutes = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin') || location.pathname === '/setup';

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Website Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services/*" element={<Services />} />
            <Route path="/why-zyron" element={<WhyZyron />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/community" element={<Community />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            {/* Admin System Routes */}
            <Route path="/setup" element={<SetupPage />} />
            <Route path="/admin/login" element={<LoginPage />} />

            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardOverview />} />
              <Route path="contacts" element={<SubmissionsPage title="Contact Inbox" endpoint="/api/admin/contacts" columns={[
                { key: 'name', label: 'Name' },
                { key: 'email', label: 'Email' },
                { key: 'created_at', label: 'Date', render: (val) => new Date(val).toLocaleDateString() }
              ]} />} />
              <Route path="careers" element={<SubmissionsPage title="Job Applications Inbox" endpoint="/api/admin/careers" columns={[
                { key: 'name', label: 'Candidate' },
                { key: 'email', label: 'Email' },
                { key: 'position', label: 'Position' },
                { key: 'created_at', label: 'Date', render: (val) => new Date(val).toLocaleDateString() }
              ]} />} />
              <Route path="community" element={<SubmissionsPage title="Community Inbox" endpoint="/api/admin/community" columns={[
                { key: 'name', label: 'Member' },
                { key: 'email', label: 'Email' },
                { key: 'interest', label: 'Interest' },
                { key: 'created_at', label: 'Date', render: (val) => new Date(val).toLocaleDateString() }
              ]} />} />
              <Route path="resources" element={<SubmissionsPage title="Resources Inbox" endpoint="/api/admin/resources" columns={[
                { key: 'name', label: 'Inquirer' },
                { key: 'email', label: 'Email' },
                { key: 'topic', label: 'Topic' },
                { key: 'created_at', label: 'Date', render: (val) => new Date(val).toLocaleDateString() }
              ]} />} />
              <Route path="cms/pages" element={<PageContentManagement />} />
              <Route path="cms/social" element={<SocialLinksManagement />} />
              <Route path="cms/seo" element={<SEOManagement />} />
              <Route path="cms/navigation" element={<NavigationManagement />} />
              <Route path="submissions" element={<SubmissionsPage />} />
              <Route path="users" element={<ProtectedRoute requireSuperAdmin><UserManagement /></ProtectedRoute>} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
        {!isAdminPath && <SocialIcons />}
      </main>
      {!isAdminPath && <Footer data={Eng.Common.footer} />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="text-white font-sans selection:bg-zyron-cyan selection:text-black">
          <AnimatedRoutes />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;