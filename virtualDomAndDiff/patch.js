const { TYPE_MAP } = require("./util");
const { INSERT, DELETE, PROPS, TEXT, REORDER } = TYPE_MAP;

class Patch {
  constructor(node, patches) {
    this.node = node;
    this.patches = patches;
    this.nodeIndex = 0;
  }

  dfs(node) {
    var len = node.childNodes ? node.childNodes.length : 0;
    let currentPatch = this.patches[this.nodeIndex];
    if (currentPatch && currentPatch.length > 0) {
      this.updatePatchs(node, currentPatch);
    }
    for (let i = 0; i < len; i++) {
      this.nodeIndex++;
      this.dfs(node.childNodes[i]);
    }
  }

  updatePatchs(node, currentPatch) {
    currentPatch.forEach((patchItem, index) => {
      const { type, node, from, to, delPos } = patchItem;
      switch(true) {
        case type === INSERT:
            this.insertNode(node, patchItem); 
            break;
        case type === DELETE: 
          this.delelteNode(node, patchItem); 
          break;
        case type === PROPS: 
          break;
        case type === REORDER: 
          this.reorderNode(node, patchItem)
          break;
      }
    })
  }

  insertNode(activeNode, { type, node }) {
    activeNode.appendChild(node);
  }

  delelteNode(activeNode, { delPos }) {
    activeNode.removeChild(activeNode.childNodes[delPos]);
  }

  reorderNode(activeNode, { from, to }) {
    let len = activeNode.childNodes;
    let moveNode = activeNode.childNodes[from];
    if (to + 1 >= len) {
      // 如果插入到尾部 则调用appendChild
      activeNode.appendChild(moveNode);
    }
    else {
      // 如果插入到中间 则调用插入到to+1个节点前方
      activeNode.insertBefore(activeNode.childNodes[to + 1], moveNode);
    }

    // 该节点已移动到后方， 删除原节点
    activeNode.removeChild(moveNode);
  }

  update() {
    this.dfs(this.node)
  }
}

const patch = (dom, patches) => {
  let patcher = new Patch(dom, patches);
  patcher.update();
};


module.exports = {
  patch
};