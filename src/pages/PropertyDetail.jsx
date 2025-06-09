import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import PropertyGallery from '../components/PropertyGallery';
import PropertyInfo from '../components/PropertyInfo';
import PropertyMap from '../components/PropertyMap';
import SimilarProperties from '../components/SimilarProperties';
import SaveButton from '../components/SaveButton';
import ApperIcon from '../components/ApperIcon';
import { propertyService, savedPropertyService } from '../services';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const loadProperty = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await propertyService.getById(id);
        if (!result) {
          setError('Property not found');
          return;
        }
        setProperty(result);
        
        // Check if property is saved
        const savedProperties = await savedPropertyService.getAll();
        setIsSaved(savedProperties.some(saved => saved.propertyId === id));
      } catch (err) {
        setError(err.message || 'Failed to load property');
        toast.error('Failed to load property');
      } finally {
        setLoading(false);
      }
    };
    loadProperty();
  }, [id]);

  const handleSaveToggle = async () => {
    try {
      if (isSaved) {
        await savedPropertyService.removeByPropertyId(id);
        setIsSaved(false);
        toast.success('Property removed from saved');
      } else {
        await savedPropertyService.create({
          propertyId: id,
          savedDate: new Date().toISOString()
        });
        setIsSaved(true);
        toast.success('Property saved');
      }
    } catch (err) {
      toast.error('Failed to update saved status');
    }
  };

  if (loading) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200"></div>
          <div className="p-6 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Property Not Found</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Back to Browse
          </motion.button>
        </div>
      </div>
    );
  }

  if (!property) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full overflow-y-auto"
    >
      {/* Back Button */}
      <div className="p-4 lg:p-6 border-b border-gray-200">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="flex items-center text-primary hover:text-primary/80 transition-colors"
        >
          <ApperIcon name="ArrowLeft" className="w-5 h-5 mr-2" />
          Back to Properties
        </motion.button>
      </div>

      {/* Property Gallery */}
      <PropertyGallery images={property.images} title={property.title} />

      {/* Property Details */}
      <div className="p-4 lg:p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="font-display text-3xl lg:text-4xl font-semibold text-gray-900 mb-2">
              {property.title}
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              {property.address}, {property.city}, {property.state} {property.zipCode}
            </p>
            <p className="font-display text-2xl lg:text-3xl font-semibold text-primary">
              ${property.price.toLocaleString()}
            </p>
          </div>
          <SaveButton isSaved={isSaved} onToggle={handleSaveToggle} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PropertyInfo property={property} />
          <PropertyMap property={property} />
        </div>

        <SimilarProperties currentPropertyId={property.id} />
      </div>
    </motion.div>
  );
};

export default PropertyDetail;