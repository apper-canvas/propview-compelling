import React from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const SearchBar = ({ searchTerm, onSearchChange, onSearchSubmit, onClear }) => {
    return (
        <form onSubmit={onSearchSubmit} className="relative">
            <div className="relative">
                <ApperIcon
                    name="Search"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                />
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={onSearchChange}
                    placeholder="Search by location, property name, or address..."
                    className="w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                />

                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    {searchTerm && (
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClear}
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
    );
};

export default SearchBar;