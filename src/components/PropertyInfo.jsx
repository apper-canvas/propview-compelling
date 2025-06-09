import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const PropertyInfo = ({ property }) => {
  const details = [
    { label: 'Bedrooms', value: property.bedrooms, icon: 'Bed' },
    { label: 'Bathrooms', value: property.bathrooms, icon: 'Bath' },
    { label: 'Square Feet', value: property.squareFeet.toLocaleString(), icon: 'Home' },
    { label: 'Year Built', value: property.yearBuilt, icon: 'Calendar' },
    { label: 'Property Type', value: property.propertyType, icon: 'Building' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      {/* Description */}
      <div>
        <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
          About This Property
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {property.description}
        </p>
      </div>

      {/* Property Details */}
      <div>
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
          Property Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {details.map((detail, index) => (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <ApperIcon name={detail.icon} className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-sm text-gray-600">{detail.label}</p>
                <p className="font-medium text-gray-900">{detail.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      {property.amenities && property.amenities.length > 0 && (
        <div>
          <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
            Amenities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {property.amenities.map((amenity, index) => (
              <motion.div
                key={amenity}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="flex items-center space-x-2"
              >
                <ApperIcon name="Check" className="w-4 h-4 text-success" />
                <span className="text-gray-700">{amenity}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Listing Information */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Listed on {new Date(property.listingDate).toLocaleDateString()}</span>
          <span>ID: {property.id}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyInfo;