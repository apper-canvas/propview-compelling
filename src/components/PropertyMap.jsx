import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const PropertyMap = ({ property }) => {
  const { coordinates, address, city, state, zipCode } = property;

  // In a real app, this would integrate with Google Maps, Mapbox, etc.
  const openInMaps = () => {
    const query = encodeURIComponent(`${address}, ${city}, ${state} ${zipCode}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-4"
    >
      <h3 className="font-display text-xl font-semibold text-gray-900">
        Location
      </h3>

      {/* Map Placeholder */}
      <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
        {/* Simulated map view */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs">
              <div className="flex items-center space-x-2 mb-2">
                <ApperIcon name="MapPin" className="w-5 h-5 text-primary" />
                <span className="font-medium text-gray-900">Property Location</span>
              </div>
              <p className="text-sm text-gray-600 break-words">
                {address}
                <br />
                {city}, {state} {zipCode}
              </p>
            </div>
          </div>
        </div>

        {/* Map overlay controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={openInMaps}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg hover:bg-white transition-colors"
            title="Open in Google Maps"
          >
            <ApperIcon name="ExternalLink" className="w-5 h-5 text-gray-700" />
          </motion.button>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <ApperIcon name="MapPin" className="w-5 h-5 text-secondary mt-0.5" />
          <div>
            <p className="font-medium text-gray-900">{address}</p>
            <p className="text-gray-600">{city}, {state} {zipCode}</p>
            {coordinates && (
              <p className="text-sm text-gray-500 mt-1">
                {coordinates.lat}, {coordinates.lng}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openInMaps}
          className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ApperIcon name="Map" className="w-4 h-4" />
          <span className="text-sm font-medium">View on Map</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ApperIcon name="Navigation" className="w-4 h-4" />
          <span className="text-sm font-medium">Directions</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PropertyMap;