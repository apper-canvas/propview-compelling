import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropertyCard from './PropertyCard';
import ApperIcon from './ApperIcon';
import { propertyService } from '../services';

const SimilarProperties = ({ currentPropertyId }) => {
  const [similarProperties, setSimilarProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSimilarProperties = async () => {
      setLoading(true);
      try {
        const allProperties = await propertyService.getAll();
        // Simple similarity logic - exclude current property and take first 3
        const similar = allProperties
          .filter(property => property.id !== currentPropertyId)
          .slice(0, 3);
        setSimilarProperties(similar);
      } catch (err) {
        console.error('Failed to load similar properties:', err);
      } finally {
        setLoading(false);
      }
    };
    loadSimilarProperties();
  }, [currentPropertyId]);

  if (loading) {
    return (
      <div className="mt-12">
        <h3 className="font-display text-2xl font-semibold text-gray-900 mb-6">
          Similar Properties
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[16/10] bg-gray-200 rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (similarProperties.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-12"
    >
      <div className="flex items-center space-x-2 mb-6">
        <ApperIcon name="Home" className="w-6 h-6 text-primary" />
        <h3 className="font-display text-2xl font-semibold text-gray-900">
          Similar Properties
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarProperties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SimilarProperties;