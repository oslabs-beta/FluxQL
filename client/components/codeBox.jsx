import React, { useContext } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';

// import context object
import { CodeContext } from '../state/contexts';

export default function codeBox() {
  const { codeState } = useContext(CodeContext);

  let code;
  codeState.showSchema
    ? (code = codeState.schema)
    : (code = codeState.resolver);

  return (
    <>
      <CodeMirror
        value={code}
        options={{
          mode: 'javascript',
          theme: 'dracula',
          lineNumbers: true,
          readOnly: 'nocursor',
          lineWrapping: true,
        }}
      />
    </>
  );
}
