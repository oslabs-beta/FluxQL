import React, { useContext } from 'react';
import HelpButton from '../components/helpButton';
import UndoButton from '../components/undoButton';
import PSQLGraph from '../graphs/psqlGraph';

// import Context Obj
import { PSQLContext, MongoContext } from '../state/contexts'

export default function graphContainer() {
  const { psqlState } = useContext(PSQLContext);
  // const { mongoState } = useContext(MongoContext);

  // ! to toggle between the different graphs
  let graph;

  if (psqlState.d3Tables.name) {
    graph = <PSQLGraph />
  } else {
    console.log(' *** WE STILL NEED TO CREATE A MONGO GRAPH ***')
    //graph = <mongoGraph />
  }

  return (
    <div className='GraphContainer'>
    {psqlState.d3Tables.name &&     
      <div className="graphBtns">
        <UndoButton />
        <HelpButton />
      </div>
      }
      {graph}
    </div>
  )
};
