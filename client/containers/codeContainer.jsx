import React, { useContext } from 'react';
import CodeBox from '../components/codeBox';
import ExportButton from '../components/exportButton';

// import Context Object
import { CodeContext } from '../state/contexts';

const codeContainer = () => {
  const { codeDispatch } = useContext(CodeContext);

  return (
    <div className="CodeContainer">
      <div className="codeButtons">
        <button className="fileTab" onClick={() => codeDispatch({type: 'SHOW_SCHEMA'})}>
          schema.js
        </button>
        <button className="fileTab" onClick={() => codeDispatch({type: 'SHOW_RESOLVER'})}>
          resolver.js
        </button>
      </div>
      <CodeBox/>
      <div className="exportBtnDiv">
        <ExportButton />
      </div>
    </div>
  );
};

export default codeContainer;