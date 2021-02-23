import React, { useContext } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import { AdviceContext } from '../state/contexts';

export default function adviceCodeBlock() {
  const { adviceState } = useContext(AdviceContext);

  let copyButton;

  if (
    adviceState.displayExample.includes('type') ||
    adviceState.displayExample.includes('values')
  ) {
    copyButton = null;
  } else {
    copyButton = (
      <button
        className="buttonClass"
        id="testMeOutBtn"
        onClick={() => {
          navigator.clipboard.writeText(adviceState.displayExample);
        }}
      >
        Test Me Out
      </button>
    );
  }

  return (
    <div className="adviceCodeContainer">
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
  );
}
