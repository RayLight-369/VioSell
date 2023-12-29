import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MotionController = ( { children, className } ) => {

  const [ ref, inView ] = useInView( {
    triggerOnce: false, // Trigger animation only once
    threshold: 0.25, // When 40% of the element is in view
  } );

  const fadeInAnimation = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={ ref }
        initial="hidden"
        animate={ inView ? "visible" : "hidden" }
        variants={ fadeInAnimation }
        style={ {
          position: "relative",
        } }
        exit={ { opacity: 0, y: 15 } }
        className={ className }
        transition={ { delay: 0.25 } }
      >
        { children }
      </motion.div>
    </AnimatePresence>
  );
};

export default MotionController;