import React, { Component } from 'react';
import { HTMLLexicalParser } from './common/lexer';
import TokenRender from './components/tokenRender';
import ASTRender from './components/ASTRender';
import "./App.less"

const htmlString = `<html maaa=a >
  <head x>
      <title>cool</title>
  </head>
  <body>
      <img src=b />
  </body>
</html>`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      htmlString,
      tokens: []
    }
  }

  componentDidMount() {
    const { htmlString } = this.state;
    const lexer = new HTMLLexicalParser(htmlString);
    const tokens = lexer.tokenize();
    this.setState({
      tokens,
    })
  }

  render() {
    const { tokens, htmlString } = this.state;
    return (
      <div className="react-container">
        <div className="source-content">
          <pre>
            {htmlString}
          </pre>
        </div>
        <div className="result-content">
          <TokenRender tokens={tokens} />
          <ASTRender tokens={tokens} />
        </div>
      </div>
    )
  }
}

export default App;