import { useEffect, useCallback, useRef} from 'react';

export const useInfiniteScroll = (scrollRef, dispatch, info) => {
  //scrollRef sets up the observer

  const scrollObserver = useCallback(node => {

    const observer = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.intersectionRatio > 0 && info.length < 6){
          console.log('hi');

          dispatch({type: 'LOAD_MORE_DESCRIPTIONS'});
        }
      });
    });
      
    observer.observe(node);
    if (info.length === 6) observer.unobserve(node);
    
    }, [dispatch, info]
  );

  useEffect(() => {
    if (scrollRef.current){
      console.log('hiii from UIS UseEffect')
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

          const newImgSrc = currentImg.src;

          intObs.unobserve(node); // detach the observer when done
        }
      });
    });

    intObs.observe(node);
  }, []);

  const imagesRef = useRef(null);

  useEffect(() => {
    imagesRef.current = document.querySelectorAll('.demoImage');
    console.log('hi from LL');
    if (imagesRef.current) {
      imagesRef.current.forEach(img => imgObserver(img));
    }
  }, [imgObserver, imagesRef, imgSelector, items]);
}