import React from 'react';
import URILink from '../components/URILink';
import treeData from '../sampleData/treeData';
import schemaString from '../sampleData/schemaString';
import resolverString from '../sampleData/resolverString';

export default function URIModal({ handleURIModal }) {
  return (
    <div className='modal' id='uriModalContainer'>

      <p id="uriBanner">Get started by entering your database URI or test out DraQLa with our sample database!</p>
  

      <button id='sampleDBbtn' onClick={() => {
        console.log('NEED TO ADD HOOK TO TOGGLE STATE')

        // const fullAppPage = document.getElementById('AppPage');
        // fullAppPage.style.filter = 'none';

        handleURIModal()
      }}>Sample Database</button>

      <div className='URILinks'>
        <URILink 
          databaseName={'PSQL'}
          handleURIModal={handleURIModal}/>
        <URILink 
          databaseName={'Mongo'} 
          handleURIModal={handleURIModal}/>
      </div>
    </div>
  )
}
