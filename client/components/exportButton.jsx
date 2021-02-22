import React, { useContext } from 'react';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import fileGenerator from '../zipFiles/zipFileHelpers';

// import schema & resolver context from state
import { CodeContext } from '../state/contexts';

export default function exportButton() {
  const { codeState } = useContext(CodeContext);

  const handleExport = () => {
    const zip = new JSZip();

    // creating a new zip folder, called 'DraQLa'
    const draqlaFolder = zip.folder('DraQLa');

    // creating new files called 'schema.js' and generating text to put inside each file using helper functions
    draqlaFolder.file(
      'schema.js',
      fileGenerator.schemaFile(codeState.schema, codeState.resolver)
    );
    draqlaFolder.file('README.md', fileGenerator.readMeFile());

    zip.generateAsync({ type: 'blob' }).then((content) => {
      FileSaver.saveAs(content, 'DraQLa.zip');
    });
  };

  return (
    <div className="exportButton buttonClass" onClick={handleExport}>
      <span className="noselect">Export</span>
      <div id="circle"></div>
    </div>
  );
}
