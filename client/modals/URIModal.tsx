import React, { useContext } from 'react';
import URILink from '../components/URILink';

// import Context Objects
import { GeneralContext, URIContext } from '../state/contexts';

export default function URIModal() {

  const { generalDispatch } = useContext(GeneralContext);
  const { codeDispatch, psqlDispatch, mongoDispatch, adviceDispatch } = useContext(URIContext);

  return (
    <div className='modal' id='uriModalContainer'>
      <p id="uriBanner">Get started by entering your database URI or test out DraQLa with our sample database!</p>
      <button id='sampleDBbtn' onClick={() => {

        // send server the ok for sample data
        fetch('/psql', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          }, 
          body: JSON.stringify({
            sample: true
          })
        })
          .then(data => data.json())
          .then(data => {

          // update Code
          codeDispatch({
            type: 'UPDATE_CODE',
            payload: {
              schema: data.schema.types,
              resolver: data.schema.resolvers,
            }
          })

          // update Advice
          adviceDispatch({
            type: 'UPDATE_ADVICE',
            payload: data.advice
          })

          // update either DB states depending on what server sends back
          if (data.dbName === 'psql') {
            console.log('inside data.dbName on line 59');
            psqlDispatch({
              type: 'UPDATE_D3TABLES',
              payload: data.d3Data
            })
          } else {
            mongoDispatch({
              type: 'UPDATE_D3TABLES',
              payload: data.d3Data
            })
          }
        })
          .catch(e => console.log('error: ', e));

        // close the URI modal
        generalDispatch({type: 'CLOSE_URI_MODAL'});
        
      }}>Sample Database</button>

      <div className='URILinks'>
        <URILink databaseName={'PSQL'}/>
        {/* <URILink databaseName={'Mongo'} /> */}
      </div>
    </div>
  )
}



    /*

            // update Code State with the sample data
        codeDispatch({type: 'USE_SAMPLE'});

        // update PSQL State with the sample data
        psqlDispatch({type: 'USE_SAMPLE'});

        // update Mongo State with the sample data
        mongoDispatch({type: 'USE_SAMPLE'});

        // update Advice State with sample data
        adviceDispatch({type: 'USE_SAMPLE'})

    */


    /*import React, { useContext } from 'react';
import URILink from '../components/URILink';

// import Context Objects
import { GeneralContext, URIContext } from '../state/contexts';

export default function URIModal() {

  const { generalDispatch } = useContext(GeneralContext);
  const { codeDispatch, psqlDispatch, mongoDispatch, adviceDispatch } = useContext(URIContext);

  return (
    <div className='modal' id='uriModalContainer'>

      <p id="uriBanner">Get started by entering your database URI or test out DraQLa with our sample database!</p>
  

      <button id='sampleDBbtn' onClick={() => {

        
        // close the URI modal
        generalDispatch({type: 'CLOSE_URI_MODAL'});

        // update Code State with the sample data
        codeDispatch({type: 'USE_SAMPLE'});

        // update PSQL State with the sample data
        psqlDispatch({type: 'USE_SAMPLE'});

        // update Mongo State with the sample data
        mongoDispatch({type: 'USE_SAMPLE'});

        // update Advice State with sample data
        adviceDispatch({type: 'USE_SAMPLE'})
        
      }}>Sample Database</button>

      <div className='URILinks'>
        <URILink databaseName={'PSQL'}/>
        <URILink databaseName={'Mongo'} />
      </div>
    </div>
  )
}*/