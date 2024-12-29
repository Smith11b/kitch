import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideTransitionProps {
  children: ReactNode;
  direction: 'left' | 'right';
  isVisible: boolean;
}

const SlideTransition: React.FC<SlideTransitionProps> = ({ children, direction, isVisible }) => {
    const variants = {
      hidden: { x: direction === 'left' ? -100 : 100, opacity: 0 },
      visible: { x: 0, opacity: 1 },
      exit: { x: direction === 'right' ? -500 : -100, opacity: 0 },
    };

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  export default SlideTransition;
