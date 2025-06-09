import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import PropertyGrid from '@/components/PropertyGrid';
import SearchFilters from '@/components/SearchFilters';
import SearchFeature from '@/components/organisms/SearchFeature';
import { propertyService } from '@/services';

const HomePage = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        propertyType: '',
        minBedrooms: '',
        location: ''
    });

    useEffect(() => {
        const loadProperties = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await propertyService.getAll();
                setProperties(result);
                setFilteredProperties(result);
            } catch (err) {
                setError(err.message || 'Failed to load properties');
                toast.error('Failed to load properties');
            } finally {
                setLoading(false);
            }
        };
        loadProperties();
    }, []);

    useEffect(() => {
        let filtered = [...properties];

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(property =>
                property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.city.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by price range
        if (filters.minPrice) {
            filtered = filtered.filter(property => property.price >= parseInt(filters.minPrice));
        }
        if (filters.maxPrice) {
            filtered = filtered.filter(property => property.price <= parseInt(filters.maxPrice));
        }

        // Filter by property type
        if (filters.propertyType) {
            filtered = filtered.filter(property => property.propertyType === filters.propertyType);
        }

        // Filter by minimum bedrooms
        if (filters.minBedrooms) {
            filtered = filtered.filter(property => property.bedrooms >= parseInt(filters.minBedrooms));
        }

        // Filter by location
        if (filters.location) {
            filtered = filtered.filter(property =>
                property.city.toLowerCase().includes(filters.location.toLowerCase()) ||
                property.state.toLowerCase().includes(filters.location.toLowerCase())
            );
        }

        setFilteredProperties(filtered);
    }, [properties, searchTerm, filters]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({
            minPrice: '',
            maxPrice: '',
            propertyType: '',
            minBedrooms: '',
            location: ''
        });
        setSearchTerm('');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="h-full flex max-w-full overflow-hidden"
        >
            {/* Filters Sidebar */}
            <div className="hidden lg:block w-80 bg-surface border-r border-gray-200 overflow-y-auto flex-shrink-0">
                <SearchFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                    resultCount={filteredProperties.length}
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0 overflow-y-auto">
                <div className="p-4 lg:p-6">
                    {/* Mobile Search */}
                    <div className="lg:hidden mb-6">
                        <SearchFeature
                            onSearch={handleSearch}
                            initialSearchTerm={searchTerm}
                            onFiltersOpen={() => {}}
                        />
                    </div>

                    <PropertyGrid
                        properties={filteredProperties}
                        loading={loading}
                        error={error}
                        onRetry={() => window.location.reload()}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default HomePage;