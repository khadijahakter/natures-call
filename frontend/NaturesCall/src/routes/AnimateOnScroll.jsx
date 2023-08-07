import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';

const useElementOnScreen = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const makeAppearRepeating = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(makeAppearRepeating, options);
    if (containerRef.current)
      observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};

const AnimateOnScroll = ({ children, reappear, threshold }) => {
  const [containerRef, isVisible] = useElementOnScreen({
    threshold: threshold || 0.1, // Default threshold set to 0.1
    rootMargin: '0px 0px -50% 0px', // Adjust this to control when the callback is triggered
  });

  return (
    <div ref={containerRef} className={`transition-all duration-500 ease-in-out transform ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"} `}>
      {children}
    </div>
  );
};

AnimateOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
  reappear: PropTypes.bool,
  threshold: PropTypes.number,
};

export default AnimateOnScroll;
