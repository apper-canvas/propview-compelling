import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from './ApperIcon';
import MainFeature from './MainFeature';
import { routeArray } from '../config/routes';

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isHomePage = location.pathname === '/';

  return (
    <div className="h-screen flex flex-col overflow-hidden max-w-full">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`flex-shrink-0 transition-all duration-300 z-40 ${
          scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
        } border-b border-gray-200`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2"
              >
                <ApperIcon name="Home" className="w-8 h-8 text-primary" />
                <span className="font-display text-xl font-semibold text-gray-900">
                  PropView
                </span>
              </motion.div>
            </NavLink>

            {/* Desktop Search - Only on home page */}
            {isHomePage && (
              <div className="hidden lg:block flex-1 max-w-2xl mx-8">
                <MainFeature />
              </div>
            )}

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {routeArray.map((route) => (
                <NavLink
                  key={route.id}
                  to={route.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                    }`
                  }
                >
                  <ApperIcon name={route.icon} className="w-4 h-4" />
                  <span>{route.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-50"
            >
              <ApperIcon
                name={mobileMenuOpen ? 'X' : 'Menu'}
                className="w-6 h-6"
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed right-0 top-0 h-full w-64 bg-white shadow-xl z-50 md:hidden"
              >
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg font-semibold text-gray-900">
                      Menu
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-50"
                    >
                      <ApperIcon name="X" className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
                <nav className="p-4 space-y-2">
                  {routeArray.map((route, index) => (
                    <motion.div
                      key={route.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <NavLink
                        to={route.path}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors ${
                            isActive
                              ? 'text-primary bg-primary/10'
                              : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                          }`
                        }
                      >
                        <ApperIcon name={route.icon} className="w-5 h-5" />
                        <span>{route.label}</span>
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;