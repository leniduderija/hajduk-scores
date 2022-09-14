import { useEffect, useState } from 'react';

export const useWindowScrollPositions = () => {
  const [scrollPosition, setPosition] = useState({ scrollX: 0, scrollY: 0 });

  useEffect(() => {
    function updatePosition() {
      console.debug('UPDATE POS ', window.scrollX, window.scrollY);
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
  const diffDate: number = new Date(targetDate).getTime();
  const sortedArray =
    array &&
    array
      .sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.

        const dateA: number = new Date(a.date).getTime();
        const dateB: number = new Date(b.date).getTime();
        const distancea: number = Math.abs(diffDate - dateA);
        const distanceb: number = Math.abs(diffDate - dateB);
        return distancea - distanceb; // sort a before b when the distance is smaller
      })
      .filter(function (d) {
        const date = new Date(d?.date).getTime();
        return date - diffDate >= 0;
      });
  return sortedArray && sortedArray[0];
};

export const findClosestRoundByDate = (rounds) => {
  const today = new Date();
  const fixtures = rounds?.map((round) => round.fixture);
  const closestFixtureByDate = findObjectByNearestDate(fixtures, today);
  return rounds?.findIndex(
    (round) => round?.fixture?.id === closestFixtureByDate?.id
  );
};

export const calculateTip = (home, away) => {
  if (home === away) {
    return '0';
  }
  if (home > away) {
    return '1';
  }
  if (home < away) {
    return '2';
  }
};
