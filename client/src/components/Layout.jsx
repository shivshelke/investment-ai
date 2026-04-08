import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  Home, User, TrendingUp, Target, DollarSign, 
  Sparkles, Receipt, AlertTriangle, Moon, Sun, Menu, X 
} from 'lucide-react';

const Layout = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'User Profile', path: '/profile', icon: User },
    { name: 'SIP Calculator', path: '/sip-calculator', icon: TrendingUp },
    { name: 'Corpus Calculator', path: '/corpus-calculator', icon: Target },
    { name: 'Investments', path: '/investments', icon: DollarSign },
    { name: 'AI Allocation', path: '/ai-allocation', icon: Sparkles },
    { name: 'Tax Guide', path: '/tax-guide', icon: Receipt },
    { name: 'Stress Test', path: '/stress-test', icon: AlertTriangle },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`min-h-screen ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 dark:bg-black/20 border-b border-white/20">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            💰 Investment Planner
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20"
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 backdrop-blur-xl bg-white/10 dark:bg-black/20
        border-r border-white/20 z-40 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800 dark:text-white">
                Smart Investment
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Planner</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${active
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Theme Toggle - Desktop */}
        <div className="absolute bottom-6 left-6 right-6 hidden lg:block">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl
                     bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20
                     text-gray-800 dark:text-white transition-all duration-300"
          >
            {isDark ? (
              <>
                <Sun className="w-5 h-5 text-yellow-400" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-5 h-5 text-gray-700" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="lg:ml-64 py-6 text-center text-gray-600 dark:text-gray-400 text-sm">
        <p>Built with ❤️ using React, Tailwind CSS & Recharts</p>
        <p className="mt-1">Smart Investment Planner © 2026</p>
      </footer>
    </div>
  );
};

export default Layout;
