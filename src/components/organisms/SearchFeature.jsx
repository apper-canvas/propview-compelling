import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import SearchBar from '@/components/molecules/SearchBar';

const SearchFeature = ({ onSearch, initialSearchTerm = '', onFiltersOpen }) => {
    const [localSearchTerm, setLocalSearchTerm] = useState(initialSearchTerm);

    useEffect(() => {
        setLocalSearchTerm(initialSearchTerm);
    }, [initialSearchTerm]);

    const handleSearchChange = (e) => {
        setLocalSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
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
            <SearchBar
                searchTerm={localSearchTerm}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
                onClear={handleClear}
            />

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

export default SearchFeature;