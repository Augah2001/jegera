import React, { useEffect, useState } from 'react'
import { useSpring } from 'react-spring';
import useHouses from './useHouses';

const useMainView = () => {

    

    const [hasScrolled, setHasScrolled] = useState(false);
    const scrollThreshold = 1
    const springProps = useSpring({
    opacity: hasScrolled ? 0 : 1, // Adjust opacity values for desired fade effect
    from: { opacity: 1 }, // Set initial opacity for smooth transition
    config: { duration: 200 }, // Adjust duration for transition speed (in milliseconds)
  });

 
    
      useEffect(() => {
        const onScroll = () => {
          const scrolled = window.scrollY > scrollThreshold;
          setHasScrolled(scrolled);
        };
    
        window.addEventListener("scroll", onScroll);
    
        return () => window.removeEventListener("scroll", onScroll);
      }, [scrollThreshold]);

  return {hasScrolled, setHasScrolled, springProps}
    
  
}

export default useMainView
