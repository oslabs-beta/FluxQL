import React, {useRef} from 'react';
import DemoRow from '../components/demoRow';
import { useHomeContext } from '../state/contexts';
import { useInfiniteScroll, useLazyLoading } from '../state/customHooks';

export default function DemoContainer() {

  const { homeDispatch } = useHomeContext();
  const { overview, info } = useHomeContext().homeState;

  const bottomBoundaryRef = useRef(null);
  // useLazyLoading('.demoImage', info);
  // useInfiniteScroll(bottomBoundaryRef, homeDispatch, info);


  const rows = info.map((pair, i) => {
    return (
      <DemoRow
        key={i}
        index={i}
        text={pair[0]}
        gif={pair[1]}
        header={pair[2]}
      />
    );
  });

  return (
    <>
      <div className="demoContainer">
        <div className="demoOverview">
          <h1 id="overviewText">{overview}</h1>
        </div>
        {rows}
      </div>
      <div id='page-bottom-boundary' style={{ border: '1px solid red' }} ref={bottomBoundaryRef}></div>
    </>
  );
}
