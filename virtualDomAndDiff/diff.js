const { TYPE_MAP } = require("./util");
const { INSERT, DELETE, PROPS, TEXT, REORDER } = TYPE_MAP;


class Diff {
  constructor(oldTree, newTree) {
    this.nodeIndex = 0;
    this.patches = {};
    this.propPatchs = [];
    this.oldTree = oldTree;
    this.newTree = newTree;
    // this.oldNode = oldTree;
    // this.newNode = newTree;
    // this.oldList = [];
    // this.newList = [];
  }

  diff() {
    this.dfs(this.oldTree, this.newTree);
    return this.patches;
  }

  dfs(oldNode, newNode) {
    this.patches[this.nodeIndex] = [];
    // this.nodeIndex++;
    if (this.tagNameDiff(oldNode, newNode)) {
      let propDiffRes = this.propsDiff(oldNode, newNode, []);
      if (propDiffRes.length === 0) {
        this.childrenDiff(oldNode.children, newNode.children);
      }
      else {
        // props不同
        this.addPropsPatch(propDiffRes);
      }
    }
    else {
      // tagName不同
      this.addReplacePatch(newNode);
    }
  }

  childrenDiff(oldList, newList) {
    let result = [];
    let nodeIndex = this.nodeIndex
    if (nodeIndex > 0) return; 
    let lastIndex = 0; //初始为0
    newList.forEach((node, newIndex) => {
      console.log('lastIndex', lastIndex)
      this.nodeIndex++;
      this.patches[this.nodeIndex] = [];
      // oldIndex: 旧列表中的位置； newIndex：新列表中的位置
      let oldIndex = this.hasNode(oldList, node);
      if (oldIndex === void 0) {
        // 新节点，直接插入
        result.push({
          type: INSERT,
          node,
          pos: lastIndex,
        });
        lastIndex = lastIndex + 1;
      }
      else if (typeof node === 'string') {
        return
      } else {
        // 老节点

        // 深度遍地子节点树
        this.dfs(oldList[oldIndex], node);
        
        if (oldIndex >= lastIndex) {
          // 在旧列表中的位置 大于等于 旧列表中访问过最大的位置 -> 保持不动；因为旧列表前面的元素之后会移动到后方或者删除
          lastIndex = Math.max(lastIndex, oldIndex);
        }
        else {
          // node在新列表中位置 大于 在旧列表中的位置时 -> 移动； 旧列表中from oldIndex to lastIndex后面； 
          
          result.push({
            type: REORDER,
            from: oldIndex,
            to: lastIndex + 1,
          });

          lastIndex = lastIndex + 1
        }
      }
      
    });

    // 过滤掉删除的元素
    oldList.forEach((node, oldIndex) => {
      let newIndex = this.hasNode(newList, node);
      if (newIndex === void 0) {
        result.push({
          type: DELETE,
          delPos: oldIndex
        });
      }
    })
    this.patches[nodeIndex].push(...result);
  }

  hasNode(list, item) {
    let index = void 0;
    for (let i = 0, len = list.length; i < len; i++) {
      let oldItem = list[i];
      if (typeof item === 'string' || typeof oldItem === 'string') {
        if (item === oldItem) {
          index = i;
          break;
        }
      } else if (oldItem.props.key === item.props.key && oldItem.props.key !== void 0) {
        index = i;
        break;
      }
    }
    return index;
  }


  tagNameDiff(oldNode, newNode) {
    return oldNode.tagName === newNode.tagName;
  }

  propsDiff(oldNode, newNode, propPatchs) {
    for (let key in oldNode.props) {
      let oldProp = oldNode.props[key];
      if (newNode.props[key] !== oldProp) {
        // 情况一：新节点更改了属性值
        // 情况二：新节点没有该属性， 值为undefined, 后续删除值为undefined的attr
        propPatchs.push({
          key: newNode.props[key]
        });
      }
    }

    for (let key in newNode.props) {
      if (oldNode.props[key] === undefined) {
        // 新增属性
        propPatchs.push({
          key: newNode.props[key]
        });
      }
    }

    return propPatchs;
  }

  addPropsPatch(propPatchs) {
    this.patches[this.nodeIndex].push({
      type: PROPS,
      propsPatch: propPatchs
    });
  }

  addReplacePatch(newNode) {
    const deleteOldNodePatch = {
      type: DELETE
    };
    const insertNewNodePatch = {
      type: INSERT,
      node: newNode,
    };
    this.patches[this.nodeIndex].push(deleteOldNodePatch);
    this.patches[this.nodeIndex].push(insertNewNodePatch);
  }
}

module.exports = {
  diff: (oldTree, newTree) => {
    let differ = new Diff(oldTree, newTree);
    return differ.diff();
  }
}