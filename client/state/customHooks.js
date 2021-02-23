import { useEffect, useCallback, useRef} from 'react';

export const useInfiniteScroll = (scrollRef, dispatch, info) => {
  //scrollRef sets up the observer

  const scrollObserver = useCallback(
    node => {
      new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.intersectionRatio > 0){
            dispatch({type: 'LOAD_MORE_DESCRIPTIONS'});
          }
        });
      }).observe(node);
    }, [dispatch]
  );

  useEffect(() => {
    if (scrollRef.current && info.length < 6){
      scrollObserver(scrollRef.current);
    }
  }, [scrollObserver, scrollRef, info]);
}


// lazy load images with intersection observer
export const useLazyLoading = (imgSelector, items) => {
  const imgObserver = useCallback(node => {
    const intObs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.intersectionRatio > 0) {
          const currentImg = en.target;
          const newImgSrc = currentImg.dataset.src;
          // only swap out the image source if the new url exists

          if (!newImgSrc) {
            console.error('Image source is invalid');
          } else {
            currentImg.src = newImgSrc;
          }

          intObs.unobserve(node); // detach the observer when done
        }
      });
    });

    console.log(intObs);
    intObs.observe(node);
  }, []);

  const imagesRef = useRef(null);

  useEffect(() => {
    imagesRef.current = document.querySelectorAll('demoImage');
    if (imagesRef.current) {
      imagesRef.current.forEach(img => imgObserver(img));
    }
  }, [imgObserver, imagesRef, imgSelector, items]);
}