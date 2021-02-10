import React, { useContext } from 'react';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import fileGenerator from '../zipFiles/zipFileHelpers';

// import schema & resolver context from state
import { codeContext } from '../state/contexts';

export default function exportButton() {
  // ! need to pass down state for finalized schema & resolvers
  const { codeState } = useContext(codeContext);

  const handleExport = () => {
    console.log('export clicked');
    console.log(codeState);
    const zip = new JSZip();

    // creating a new zip folder, called 'DraQLa'
    const draqlaFolder = zip.folder('DraQLa');


    // creating new files called 'schema.js' and generating text to put inside each file using helper functions
    draqlaFolder.file('schema.js', fileGenerator.schemaFile('types', 'resolvers'));
    draqlaFolder.file('README.md', fileGenerator.readMeFile());

    zip.generateAsync({ type: 'blob' })
      .then(content => {
        FileSaver.saveAs(content, 'DraQLa.zip');
      });
  };

  return (
    <button id='exportButton' onClick={handleExport}>Export</button>
  )
};
