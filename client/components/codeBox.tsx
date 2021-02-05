import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import '../../node_modules/codemirror/lib/codemirror.css';
import '../../node_modules/codemirror/theme/dracula.css';
import '../../node_modules/codemirror/addon/scroll/annotatescrollbar.js'
import '../../node_modules/codemirror/addon/scroll/simplescrollbars.js'

import SchemaString from '../codeboxdata/schemaString';
// import ResolverObject from '../codeboxdata/resolverData';

export default function codeBox() {
  // ! ask backend what executableSchema() returns
  // const object = { 
  //   team: 'DraQLa',
  //   members: 5,
  //   awesome: true
  // }

  return (
    <>
      <CodeMirror 
        value={SchemaString}
        options={{
          mode: 'javascript',
          theme: 'dracula',
          lineNumbers: 'true',
          readOnly: 'nocursor',
          lineWrapping: 'true',
          //scrollbarStyle: 'native'
        }}
      />
    </>
  )
}
