import {Injectable} from '@angular/core';

@Injectable()
export class TreeService {
  listToTree(data, options) {
    options = options || {};
    const IS_PARENT_OBJ = options.isParentObj || false;
    const ID_KEY = options.idKey || 'id';
    const PARENT_KEY = options.parentKey || 'parent';
    const CHILDREN_KEY = options.childrenKey || 'children';

    const tree = [],
      childrenOf = {};
    let item, id, parentId;

    for (let i = 0; i < data.length; i++) {
      item = data[i];
      id = item[ID_KEY];
      parentId = (IS_PARENT_OBJ ? item[PARENT_KEY] && item[PARENT_KEY][ID_KEY] : item[PARENT_KEY]) || 0;
      childrenOf[id] = childrenOf[id] || [];
      item[CHILDREN_KEY] = childrenOf[id];
      if (parentId !== 0) {
        childrenOf[parentId] = childrenOf[parentId] || [];
        childrenOf[parentId].push(item);
      } else {
        tree.push(item);
      }
    }

    return tree;
  }

  searchTree(element, matchingId: string, options) {
    options = options || {};
    const ID_KEY = options.idKey || 'id';
    const CHILDREN_KEY = options.childrenKey || 'children';

    if (element[ID_KEY] === matchingId) {
      return element;
    } else if (element[CHILDREN_KEY] != null) {
      let i;
      let result = null;
      for (i = 0; result == null && i < element[CHILDREN_KEY].length; i++) {
        result = this.searchTree(element[CHILDREN_KEY][i], matchingId, options);
      }
      return result;
    }
    return null;
  }
}
