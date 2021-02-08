import React, { useContext } from 'react';

// import the Context Objects 
import {GeneralContext, URIContext } from '../state/contexts';


export default function URILink ({ databaseName }){
  const { generalDispatch } = useContext(GeneralContext);
  // make sure to extract adviceDispatch below v
  const { codeDispatch, psqlDispatch, mongoDispatch, adviceDispatch } = useContext(URIContext);

  return (
    <div className='URILinkBox'>
      <p>{databaseName} Link</p>
      <input 
      type="text" 
      className="linkInput" 
      id={`${databaseName}Input`}
      placeholder="paste your database link"></input>

      <button onClick={() => {
        // to change remove the blur affect
        // const fullAppPage = document.getElementById('AppPage');
        // fullAppPage.style.filter = 'none';
        
        // send POST request to server
        const url = document.getElementById(`${databaseName}Input`).value;
        console.log('url', url);
        
        fetch(`/${databaseName.toLowerCase()}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/JSON',
          },
          body: JSON.stringify({
            [`${databaseName.toLowerCase()}URI`]: url,
          }),
        })
        .then(data => data.json())
        .then((data) => {
          console.log('successfully sent to server');
          //console.log(data);

          // update all Context Objects accordingly

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
            payload: {
              queryTypeCount: data.advice.queryTypeCount, 
              mutationTypeCount: data.advice.mutationTypeCount,
              queryExample: data.advice.queryExample,
              mutationExample: data.advice.mutationExample,
            }
          })

          // update either DB states depending on what server sends back
          if (data.dbName === 'psql') {
            psqlDispatch({
              type: 'UPDATE_D3TABLES',
              payload: data.d3tables
            })
          } else {
            mongoDispatch({
              type: 'UPDATE_D3TABLES',
              payload: data.d3tables
            })
          }

        })
        .catch(e => console.log('error: ', e));
        
        // to close out URI Modal
        generalDispatch({type: 'CLOSE_URI_MODAL'})

      }}>Submit</button>
    </div>
  )
};