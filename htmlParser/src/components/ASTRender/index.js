import React, { useState, useEffect } from 'react';
import { HTMLSyntaticalParser } from '../../common/parser';

import './index.less';

export default function ASTRender({ tokens = [] }) {
  if (!tokens || tokens.length < 1) {
    return null;
  }
  const [ASTTree, setASTTree] = useState({});
  const [asyncTokens, setAsyncTokens] = useState([]);

  useEffect(() => {
    // let HTMLParser = new HTMLSyntaticalParser(tokens);
    // HTMLParser.asyncParse( (token, stack) => {
    //   console.log('xxxxx', token, stack);
    //   setAsyncTokens(token);
    //   setASTTree(stack[0])
    // });
    // return HTMLParser.destory.bind(HTMLParser);
    let HTMLParser = new HTMLSyntaticalParser(tokens);
    setASTTree(HTMLParser.parse());
  }, [asyncTokens, ASTTree]);

  console.log('asyncTokens', asyncTokens)

  return (
    <div className="ast-tree-container">
      <pre>
        {JSON.stringify(ASTTree)}
      </pre>
    </div>
  );
}