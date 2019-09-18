import { Prop, StartTagToken, EndTagToken, TextToken, BlankToken, Token } from './base';

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


class HTMLSyntaticalParser {
  tokens: [];
  stack: Node[];
  node: Node | null;

  constructor(tokens: any) {
    this.tokens = tokens;
    this.stack = [
      new Node({
        name: 'Document',
        type: 'document',
        childrenNodes: []
      })
    ];
    this.node = null;
  }

  getTop() {
    return this.stack[this.stack.length - 1];
  }

  parse() {
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
    });
    return this.stack[0];
  }
}

export {
  HTMLSyntaticalParser
}