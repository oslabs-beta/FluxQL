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
          console.log('data: ', data);

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
        
        // to close out URI Modal
        generalDispatch({type: 'CLOSE_URI_MODAL'})

      }}>Submit</button>
    </div>
  )
};