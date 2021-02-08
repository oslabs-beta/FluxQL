import React, { useContext } from 'react';
import URILink from '../components/URILink';

// import Context Objects
import { GeneralContext, URIContext } from '../state/contexts';

export default function URIModal() {

  const { generalDispatch } = useContext(GeneralContext);
  const { codeDispatch, psqlDispatch, mongoDispatch } = useContext(URIContext);

  return (
    <div className='modal' id='uriModalContainer'>

      <p id="uriBanner">Get started by entering your database URI or test out DraQLa with our sample database!</p>
  

      <button id='sampleDBbtn' onClick={() => {

        // const fullAppPage = document.getElementById('AppPage');
        // fullAppPage.style.filter = 'none';
        
        // close the URI modal
        generalDispatch({type: 'CLOSE_URI_MODAL'});
        // update Code State with the sample data
        codeDispatch({type: 'USE_SAMPLE'});
        // update PSQL State with the sample data
        psqlDispatch({type: 'USE_SAMPLE'});
        // update Mongo State with the sample data
        mongoDispatch({type: 'USE_SAMPLE'});
        // update Advice State with sample data
        // adviceDispatch({type: 'USE_SAMPLE'})
      }}>Sample Database</button>

      <div className='URILinks'>
        <URILink databaseName={'PSQL'}/>
        <URILink databaseName={'Mongo'} />
      </div>
    </div>
  )
}
