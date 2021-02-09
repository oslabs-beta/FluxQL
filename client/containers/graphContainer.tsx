import React, { useContext } from 'react';
import HelpButton from '../components/helpButton';
import UndoButton from '../components/undoButton';
import PSQLGraph from '../graphs/psqlGraph';

// import Context Obj
import {  PSQLContext, MongoContext } from '../state/contexts'

export default function graphContainer() {
  const { psqlState } = useContext(PSQLContext);
 // const { mongoState } = useContext(MongoContext);

  // ! to toggle between the different graphs
  let graph;

  if (Object.keys(psqlState.d3Tables)) {
    graph = <PSQLGraph />
  } else {
    console.log(' *** WE STILL NEED TO CREATE A MONGO GRAPH ***')
    //graph = <mongoGraph />
  }

  return (
    <div className='GraphContainer'>
      {graph}
      <div className="graphBtns">
        <UndoButton/>
        <HelpButton />
      </div>

      
    </div>
  )
};
