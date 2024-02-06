import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MotionController = ({ children, className }) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.02, // When 2% of the element is in view
  });

  const fadeInAnimation = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeInAnimation}
        style={{
          position: "relative",
        }}
        exit={{ opacity: 0, y: 15 }}
        className={className}
        // transition={{
        //   delay: 0.25,
        // }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default MotionController;
