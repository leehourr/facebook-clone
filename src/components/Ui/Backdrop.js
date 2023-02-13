import { AnimatePresence, motion } from "framer-motion";

export const Backdrop = ({ isOpen, onClick }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <div
            className="fixed top-0 left-0 w-full h-full z-10 bg-white/75"
            onClick={onClick}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
