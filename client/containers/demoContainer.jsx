import React from 'react';
import DemoRow from '../components/demoRow';
import { useHomeContext } from '../state/contexts';

export default function DemoContainer() {

  const { info } = useHomeContext().homeState;


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
        </div>
        {rows}
      </div>
    </>
  );
}
