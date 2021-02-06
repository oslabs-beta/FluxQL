import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import '../../node_modules/codemirror/lib/codemirror.css';
import '../../node_modules/codemirror/theme/dracula.css';
import 'codemirror/addon/scroll/annotatescrollbar';
import 'codemirror/addon/scroll/simplescrollbars';

// import ResolverObject from '../codeboxdata/resolverData';

export default function codeBox({ code }) {
  // ! ask backend what executableSchema() returns
  // const object = {
  //   team: 'DraQLa',
  //   members: 5,
  //   awesome: true
  // }

  return (
    <>
      <CodeMirror
        value={code}
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
  );
}
