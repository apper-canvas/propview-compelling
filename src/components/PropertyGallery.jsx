import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from './ApperIcon';

const PropertyGallery = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <>
      <div className="relative">
        {/* Main Image */}
        <div className="relative h-96 lg:h-[500px] overflow-hidden">
          <motion.img
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={images[selectedImage]}
            alt={`${title} - Image ${selectedImage + 1}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={openFullscreen}
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <ApperIcon name="ChevronLeft" className="w-6 h-6 text-gray-700" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <ApperIcon name="ChevronRight" className="w-6 h-6 text-gray-700" />
              </motion.button>
            </>
          )}

          {/* Fullscreen Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={openFullscreen}
            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <ApperIcon name="Maximize" className="w-5 h-5 text-gray-700" />
          </motion.button>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-gray-700">
                {selectedImage + 1} / {images.length}
              </span>
            </div>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="p-4 bg-gray-50">
            <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    index === selectedImage
                      ? 'border-primary'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50"
              onClick={closeFullscreen}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 z-50 flex items-center justify-center"
            >
              <div className="relative max-w-full max-h-full">
                <img
                  src={images[selectedImage]}
                  alt={`${title} - Fullscreen`}
                  className="max-w-full max-h-full object-contain"
                />

                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeFullscreen}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <ApperIcon name="X" className="w-6 h-6 text-gray-700" />
                </motion.button>

                {/* Navigation in Fullscreen */}
                {images.length > 1 && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
                    >
                      <ApperIcon name="ChevronLeft" className="w-8 h-8 text-gray-700" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
                    >
                      <ApperIcon name="ChevronRight" className="w-8 h-8 text-gray-700" />
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default PropertyGallery;