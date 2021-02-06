import React, { useState } from 'react';
import CodeBox from '../components/codeBox';

// import buttons
// import ExportButton from '../components/exportButton'

// dummy data for now
import SchemaString from '../codeboxdata/schemaString';
import ResolverString from '../codeboxdata/resolverString';
import { Schema } from 'mongoose';
import resolverString from '../codeboxdata/resolverString';

// import SchemaString from '../codeboxdata/schemaString';

const codeContainer = () => {
  const [schema, setSchema] = useState(SchemaString);
  const [resolver, setResolver] = useState(ResolverString);
  const [showSchema, setShowSchema] = useState(true);

  let code = schema;

  const handleSchema = () => {
    setShowSchema(true);
    //code = schema;
    console.log('schemabutt');
  };
  const handleResolver = () => {
    setShowSchema(false);
    //code = resolver;
    console.log('resolve my ass');
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
    </div>
  );
};

export default codeContainer;

/* 
! Vanilla React 
class codeContainer extends Component {
  constructor(props: string){
    super(props)
    this.state = {
      schema: SchemaString,
      resolver: ResolverString,
      showSchema: true,
    }
  }

  render(){
    let code: string;

    if (this.state.showSchema){

    }

    return (
      <div className='CodeContainer'>
        <CodeBox code={code}/>
      </div>
    )
  }
}




*/
