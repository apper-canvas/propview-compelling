import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const SearchFilters = ({ filters, onFilterChange, onClearFilters, resultCount }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const propertyTypes = ['House', 'Apartment', 'Condo', 'Townhouse'];
  const bedroomOptions = [1, 2, 3, 4, 5];

  const handleFilterUpdate = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClear = () => {
    setLocalFilters({
      minPrice: '',
      maxPrice: '',
      propertyType: '',
      minBedrooms: '',
      location: ''
    });
    onClearFilters();
  };

  const hasActiveFilters = Object.values(localFilters).some(value => value !== '');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-gray-900">
          Filters
        </h2>
        {hasActiveFilters && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClear}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Clear all
          </motion.button>
        )}
      </div>

      {/* Results Count */}
      <div className="bg-gray-50 p-3 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-900">{resultCount}</span>{' '}
          {resultCount === 1 ? 'property' : 'properties'} found
        </p>
      </div>

      {/* Location Filter */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <div className="relative">
          <ApperIcon
            name="MapPin"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
          />
          <input
            type="text"
            value={localFilters.location}
            onChange={(e) => handleFilterUpdate('location', e.target.value)}
            placeholder="City or State"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          />
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Price Range
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              $
            </span>
            <input
              type="number"
              value={localFilters.minPrice}
              onChange={(e) => handleFilterUpdate('minPrice', e.target.value)}
              placeholder="Min"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              $
            </span>
            <input
              type="number"
              value={localFilters.maxPrice}
              onChange={(e) => handleFilterUpdate('maxPrice', e.target.value)}
              placeholder="Max"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
        </div>
      </div>

      {/* Property Type */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Property Type
        </label>
        <select
          value={localFilters.propertyType}
          onChange={(e) => handleFilterUpdate('propertyType', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none"
        >
          <option value="">All Types</option>
          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Bedrooms */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Minimum Bedrooms
        </label>
        <div className="grid grid-cols-3 gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleFilterUpdate('minBedrooms', '')}
            className={`px-3 py-2 text-sm rounded-md border transition-colors ${
              localFilters.minBedrooms === ''
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
            }`}
          >
            Any
          </motion.button>
          {bedroomOptions.map((num) => (
            <motion.button
              key={num}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFilterUpdate('minBedrooms', num.toString())}
              className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                localFilters.minBedrooms === num.toString()
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
              }`}
            >
              {num}+
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;