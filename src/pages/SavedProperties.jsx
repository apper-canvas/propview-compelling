import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import PropertyGrid from '../components/PropertyGrid';
import ApperIcon from '../components/ApperIcon';
import { savedPropertyService, propertyService } from '../services';

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSavedProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const saved = await savedPropertyService.getAll();
        const propertyPromises = saved.map(item => propertyService.getById(item.propertyId));
        const properties = await Promise.all(propertyPromises);
        setSavedProperties(properties.filter(Boolean));
      } catch (err) {
        setError(err.message || 'Failed to load saved properties');
        toast.error('Failed to load saved properties');
      } finally {
        setLoading(false);
      }
    };
    loadSavedProperties();
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading || error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="h-full overflow-y-auto p-4 lg:p-6"
      >
        <h1 className="font-display text-3xl font-semibold text-gray-900 mb-8">
          Saved Properties
        </h1>
        <PropertyGrid
          properties={[]}
          loading={loading}
          error={error}
          onRetry={handleRetry}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full overflow-y-auto p-4 lg:p-6"
    >
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-gray-900 mb-2">
          Saved Properties
        </h1>
        <p className="text-gray-600">
          {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'} saved
        </p>
      </div>

      {savedProperties.length === 0 ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-16"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <ApperIcon name="Heart" className="w-16 h-16 text-gray-300 mx-auto" />
          </motion.div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No saved properties yet</h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            Start browsing properties and save the ones you like to see them here
          </p>
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            <ApperIcon name="Search" className="w-5 h-5 mr-2" />
            Browse Properties
          </motion.a>
        </motion.div>
      ) : (
        <PropertyGrid
          properties={savedProperties}
          loading={false}
          error={null}
          onRetry={handleRetry}
        />
      )}
    </motion.div>
  );
};

export default SavedProperties;