import { Prop, StartTagToken, EndTagToken, TextToken, BlankToken, Token } from './base';
import { sleep } from './util';

class Node {
  name: string;
  type: string;
  props?: Prop[];
  selfClosed?: boolean;
  childrenNodes?: Node[];

  constructor(initProps: any) {
    const { name, type, props, selfClosed, childrenNodes } = initProps;
    this.name = name;
    this.type = type;
    props && (this.props = props);
    selfClosed && (this.selfClosed = selfClosed);
    childrenNodes && (this.childrenNodes = childrenNodes);
  }

  appendChild(node: Node): Node {
    if (node && this.childrenNodes) {
      this.childrenNodes.push(node);
    } else if (!this.childrenNodes && node) {
      this.childrenNodes = [node];
    }
    return node;
  }
}

const documentNode = new Node({
  name: 'Document',
  type: 'document',
  childrenNodes: []
});

class HTMLSyntaticalParser {
  tokens: [];
  stack: Node[];
  node: Node | null;
  _isDestory: boolean;

  constructor(tokens: any) {
    this.tokens = tokens;
    this.stack = [
      documentNode
    ];
    this.node = null;
    this._isDestory = false;
  }

  getTop() {
    return this.stack[this.stack.length - 1];
  }
  
  async asyncParse(cb) {
    cb && cb(documentNode, this.stack);
    for (let i = 0, len = this.tokens.length; i < len; i++) {
      if (this._isDestory) {
        break;
      }
      const v:Token = this.tokens[i];
      if (v instanceof StartTagToken) {
        const node = new Node(v);
        this.stack.push(this.getTop().appendChild(node));
        if (v.selfClosed) {
          this.stack.pop();
        }
      } else if (v instanceof TextToken) {
        if (this.getTop() instanceof TextToken) {
          this.getTop().name = this.getTop().name + v.name;
        }
        else {
          const node = new Node(v);
          this.getTop().appendChild(node)
        }
      } else if (v instanceof EndTagToken) {
        this.stack.pop();
      }
      await sleep(3000);
      cb && cb(v, this.stack);
    }
  }

  parse(cb) {
    this.tokens.forEach((v: Token, i) => {
      if (v instanceof StartTagToken) {
        const node = new Node(v);
        this.stack.push(this.getTop().appendChild(node));
        if (v.selfClosed) {
          this.stack.pop();
        }
      } else if (v instanceof TextToken) {
        if (this.getTop() instanceof TextToken) {
          this.getTop().name = this.getTop().name + v.name;
        }
        else {
          const node = new Node(v);
          this.getTop().appendChild(node)
        }
      } else if (v instanceof EndTagToken) {
        this.stack.pop();
      }
      cb && cb(this);
    });
    return this.stack[0];
  }

  destory() {
    this._isDestory = true;
  }
}

export {
  HTMLSyntaticalParser
}