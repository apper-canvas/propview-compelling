import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const MainFeature = ({ onSearch, searchTerm = '', onFiltersOpen }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(localSearchTerm);
    }
  };

  const handleClear = () => {
    setLocalSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <ApperIcon
            name="Search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          />
          <input
            type="text"
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            placeholder="Search by location, property name, or address..."
            className="w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
          />
          
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {localSearchTerm && (
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClear}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ApperIcon name="X" className="w-4 h-4" />
              </motion.button>
            )}
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Search
            </motion.button>
          </div>
        </div>
      </form>

      {/* Mobile Filters Button */}
      {onFiltersOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onFiltersOpen}
          className="mt-3 w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors lg:hidden"
        >
          <ApperIcon name="Filter" className="w-5 h-5" />
          <span>Filters</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default MainFeature;