import React, { useContext } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
// import '../../node_modules/codemirror/lib/codemirror.css';
// import '../../node_modules/codemirror/theme/dracula.css';
// import '../../node_modules/codemirror/theme/material.css';
// import '../../node_modules/codemirror/theme/material-palenight.css';

// import Context Obj
import { AdviceContext } from '../state/contexts';

export default function adviceCodeBlock() {
  const { adviceState } = useContext(AdviceContext);

  let copyButton;

  if (adviceState.displayExample.includes('type') || adviceState.displayExample.includes('values')) {
    copyButton = null;
  } else {
    copyButton =
    // <div className="buttonClass" id="testMeOutBtn" onClick={() => { 
    //   navigator.clipboard.writeText(adviceState.displayExample) 
    //   alert('Text Copied!')
    //   }}> 
    //     <span className="noselect">Test Me Out</span>
    //     <div id="circle"></div>
    // </div>;

    <button className="buttonClass" id="testMeOutBtn" onClick={() => { 
      navigator.clipboard.writeText(adviceState.displayExample) 
      //alert('Text Copied!')
      }}> 
        Test Me Out
    </button>;
  }

  return (
    <div className='adviceCodeContainer'>
      <CodeMirror
        value={adviceState.displayExample}
        options={{
          mode: 'javascript',
          theme: 'material-palenight',
          lineNumbers: false,
          readOnly: 'nocursor',
          lineWrapping: true,
        }}
      />
      {copyButton}
    </div>
  )
}