class Element {
  constructor(tagName, props, children) {
    this.tagName = tagName;
    this.props = props || {};
    // this.key = props ? props.key : void 0;
    this.children = children || [];
  }

  render() {
    let oNode = document.createElement(this.tagName);
    if (this.props && typeof(this.props) === 'object') {
      for (const propType in this.props) {
        oNode.setAttribute(propType, this.props[propType]);
      }
    }

    this.children.forEach((v, i) => {
      let childNode = null;
      if (v instanceof Element) {
        childNode = v.render();
      }
      else {
        // 是文本节点
        childNode = document.createTextNode(v);
      }
      oNode.appendChild(childNode);
    });

    return oNode;
  }
}

module.exports = Element;