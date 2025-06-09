import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApperIcon from './ApperIcon';
import SaveButton from './SaveButton';
import { savedPropertyService } from '../services';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkSavedStatus = async () => {
      try {
        const savedProperties = await savedPropertyService.getAll();
        setIsSaved(savedProperties.some(saved => saved.propertyId === property.id));
      } catch (err) {
        console.error('Failed to check saved status:', err);
      }
    };
    checkSavedStatus();
  }, [property.id]);

  const handleSaveToggle = async (e) => {
    e.stopPropagation();
    try {
      if (isSaved) {
        await savedPropertyService.removeByPropertyId(property.id);
        setIsSaved(false);
        toast.success('Property removed from saved');
      } else {
        await savedPropertyService.create({
          propertyId: property.id,
          savedDate: new Date().toISOString()
        });
        setIsSaved(true);
        toast.success('Property saved');
      }
    } catch (err) {
      toast.error('Failed to update saved status');
    }
  };

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.2 }}
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer group"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Price Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="font-display text-lg font-semibold text-primary">
              ${property.price.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Save Button */}
        <div className="absolute top-4 right-4">
          <SaveButton isSaved={isSaved} onToggle={handleSaveToggle} />
        </div>

        {/* Property Type Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-primary/90 text-white px-2 py-1 rounded text-sm font-medium">
            {property.propertyType}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {property.title}
        </h3>
        
        <p className="text-gray-600 mb-3 flex items-center">
          <ApperIcon name="MapPin" className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="truncate">
            {property.address}, {property.city}, {property.state}
          </span>
        </p>

        {/* Property Details */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <ApperIcon name="Bed" className="w-4 h-4 mr-1" />
              {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}
            </span>
            <span className="flex items-center">
              <ApperIcon name="Bath" className="w-4 h-4 mr-1" />
              {property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}
            </span>
          </div>
          <span className="flex items-center">
            <ApperIcon name="Home" className="w-4 h-4 mr-1" />
            {property.squareFeet.toLocaleString()} sq ft
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;