import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const SaveButton = ({ isSaved, onToggle }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
        isSaved
          ? 'bg-accent/90 text-white'
          : 'bg-white/90 text-gray-600 hover:text-accent'
      }`}
    >
      <motion.div
        animate={isSaved ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <ApperIcon
          name={isSaved ? 'Heart' : 'Heart'}
          className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`}
        />
      </motion.div>
    </motion.button>
  );
};

export default SaveButton;