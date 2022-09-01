import { useEffect, useState } from 'react';

export const useWindowScrollPositions = () => {
  const [scrollPosition, setPosition] = useState({ scrollX: 0, scrollY: 0 });

  useEffect(() => {
    function updatePosition() {
      setPosition({ scrollX: window.scrollX, scrollY: window.scrollY });
    }

    window.addEventListener('scroll', updatePosition);
    updatePosition();

    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
};

export const useControlNavbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    function controlNavbar() {
      if (typeof window !== 'undefined') {
        if (window.scrollY < 100) {
          setShow(true);
        } else {
          if (window.scrollY > lastScrollY) {
            // if scroll down hide the navbar
            setShow(false);
          } else {
            // if scroll up show the navbar
            setShow(true);
          }
        }
        // remember current page location to use in the next move
        setLastScrollY(window.scrollY);
      }
    }

    window.addEventListener('scroll', controlNavbar);

    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return { lastScrollY, show };
};

export const findObjectByNearestDate = (array, targetDate) => {
  const diffDate = new Date(targetDate);
  const sortedArray = array
    .sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.

      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      const distancea = Math.abs(diffDate - dateA);
      const distanceb = Math.abs(diffDate - dateB);
      return distancea - distanceb; // sort a before b when the distance is smaller
    })
    .filter(function (d) {
      const date = new Date(d.date);
      return date - diffDate >= 0;
    });
  return sortedArray[0];
};
