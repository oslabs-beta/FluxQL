import React, { useContext } from 'react';
import URILink from '../components/URILink';
import { dynamicText, staticText } from '../graphs/helperFunctions';

// import Context Objects
import { GeneralContext, URIContext } from '../state/contexts';

export default function URIModal() {
  const { generalDispatch } = useContext(GeneralContext);
  const {
    codeDispatch,
    psqlDispatch,
    mongoDispatch,
    adviceDispatch,
  } = useContext(URIContext);

  return (
    <div className="modal" id="uriModalContainer">
      <a
        id="x"
        href="#"
        onClick={() => {
          // close the URI modal
          generalDispatch({ type: 'CLOSE_URI_MODAL' });
        }}
      >
        x
      </a>
      <p id="uriBanner">
        Get started by entering your database URI or test out DraQLa with our
        sample database!
      </p>
      <button
        className="buttonClass"
        id="sampleBtn"
        onClick={() => {
          // send server the ok for sample data
          fetch('/psql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sample: true,
            }),
          })
            .then((data) => data.json())
            .then((data) => {
              // update Code
              codeDispatch({
                type: 'UPDATE_CODE',
                payload: {
                  schema: data.schema.types,
                  resolver: data.schema.resolvers,
                },
              });

              // update Advice state
              adviceDispatch({
                type: 'UPDATE_ADVICE',
                payload: {
                  advice: data.advice,
                  dynamicText: dynamicText(data.advice),
                  staticText: staticText,
                },
              });

              // update either DB states depending on what server sends back
              if (data.dbName === 'psql') {
                psqlDispatch({
                  type: 'UPDATE_D3TABLES',
                  payload: data.d3Data,
                });
              } else {
                mongoDispatch({
                  type: 'UPDATE_D3TABLES',
                  payload: data.d3Data,
                });
              }
            })
            .catch((e) => console.log('error: ', e));

          // close the URI modal
          generalDispatch({ type: 'CLOSE_URI_MODAL' });
        }}
      >
        <span className="noselect">Sample Database</span>
        <div id="circle"></div>
      </button>

      <div className="URILinks">
        <URILink databaseName={'PSQL'} />
        {/* <URILink databaseName={'Mongo'} /> */}
      </div>
    </div>
  );
}
