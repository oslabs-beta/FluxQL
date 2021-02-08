import React, { useState } from 'react';
import CodeBox from '../components/codeBox';
import ExportButton from '../components/exportButton';

// dummy data for now
import SchemaString from '../sampleData/schemaString';
import ResolverString from '../sampleData/resolverString';
import { Schema } from 'mongoose';
import resolverString from '../sampleData/resolverString';

// import SchemaString from '../codeboxdata/schemaString';

const codeContainer = () => {
  const [schema, setSchema] = useState(SchemaString);
  const [resolver, setResolver] = useState(ResolverString);
  const [showSchema, setShowSchema] = useState(true);

  let code = schema;

  const handleSchema = () => {
    setShowSchema(true);
  };
  const handleResolver = () => {
    setShowSchema(false);
  };

  showSchema ? (code = schema) : (code = resolver);

  return (
    <div className="CodeContainer">
      <div className="codeButtons">
        <button className="fileTab" onClick={handleSchema}>
          schema.js
        </button>
        <button className="fileTab" onClick={handleResolver}>
          resolver.js
        </button>
      </div>
      <CodeBox code={code} />
      <div className="exportBtnDiv">
        <ExportButton />
      </div>
    </div>
  );
};

export default codeContainer;
