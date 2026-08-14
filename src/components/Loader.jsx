import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      className="site-loader"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        duration: 0.8,
        delay: 1.6,
      }}
    >
      <motion.div
        className="loader-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        
        

        <strong>REDDY</strong>
        <span>PHOTOGRAPHY</span>

        <div className="loader-line">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 1.3,
            }}
          />
        </div>

        <small>
          PHOTOGRAPHY & FILMS
        </small>
      </motion.div>
    </motion.div>
  );
}