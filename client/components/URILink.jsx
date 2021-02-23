import React, { useContext } from 'react';
import { dynamicText, staticText } from '../graphs/helperFunctions';
import { secret } from '../../server/controllers/testPSQL.js';
import CryptoJS from 'crypto-js';

// import the Context Objects
import { GeneralContext, URIContext } from '../state/contexts';

export default function URILink({ databaseName }) {
  const { generalDispatch } = useContext(GeneralContext);

  const {
    codeDispatch,
    psqlDispatch,
    mongoDispatch,
    adviceDispatch,
  } = useContext(URIContext);

  return (
    <div className="URILinkBox">
      <p>{databaseName} Link</p>
      <input
        type="text"
        className="linkInput"
        id={`${databaseName}Input`}
        placeholder="paste your database link"
      ></input>

      <button
        className="buttonClass"
        id="submitbtn"
        onClick={() => {
          // place holder for the element
          const target = document.getElementById(`${databaseName}Input`);
          // if the uri input is incorrect
          if (target.value.length === 0 || target.value.length < 20) {
            alert('Invalid URI Input');
          }
          // encrypting URI
          const url = CryptoJS.AES.encrypt(target.value, secret).toString();
          // send inputted URL to server
          fetch(`/${databaseName.toLowerCase()}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'Application/JSON',
            },
            body: JSON.stringify({
              [`${databaseName.toLowerCase()}URI`]: url,
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

              // update Advice state - clear state first then pass in values
              adviceDispatch({
                type: 'UPDATE_ADVICE',
                payload: {
                  advice: [],
                  dynamicText: dynamicText([]),
                  staticText: '',
                },
              });

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

          // to close out URI Modal
          generalDispatch({ type: 'CLOSE_URI_MODAL' });
        }}
      >
        <span className="noselect">Submit</span>
        <div id="circle"></div>
      </button>
    </div>
  );
}
