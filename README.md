# Angular Tree Service

Service allow create tree structure and search sub tree

## Example 1

```
this.navs = [
  {
    navGuid: 'nav1',
    parentNav: {
      navGuid: 'nav0',
    }
  }, {
    navGuid: 'nav2',
    parentNav: {
      navGuid: 'nav0',
    }
  }, {
    navGuid: 'nav12',
    parentNav: {
      navGuid: 'nav1',
    }
  }, {
    navGuid: 'nav0',
    parentNav: null
  }
];

this.tree = this._treeService.listToTree(this.navs, {
  idKey: 'navGuid',        // default: id
  isParentObj: true,       // default: false
  parentKey: 'parentNav',  // default: parent
  childrenKey: 'children', // default: children
});
```

Result
```
[
  {
    navGuid: 'nav0',
    parentNav: null,
    children: [
      {
        navGuid: 'nav1',
        parentNav: {navGuid: 'nav0'},
        children:[
          {
            navGuid: 'nav12',
            parentNav: {navGuid: 'nav1'},
            children: []
          }
        ]
      }, {
        navGuid: 'nav2',
        parentNav: {navGuid: 'nav0'},
        children: []
      }
    ]
  }
]
```

## Example 2

```
this.navs = [
  {
    navGuid: 'nav1',
    parentNav: 'nav0',
  }, {
    navGuid: 'nav2',
    parentNav: 'nav0',
  }, {
    navGuid: 'nav12',
    parentNav: 'nav1',
  }, {
    navGuid: 'nav0',
    parentNav: null
  }
];

this.tree = this._treeService.listToTree(this.navs, {
  idKey: 'navGuid',        // default: id
  isParentObj: false,      // default: false
  parentKey: 'parentNav',  // default: parent
  childrenKey: 'children', // default: children
});
```

Result
```
[
  {
    navGuid: 'nav0',
    parentNav: null,
    children: [
      {
        navGuid: 'nav1',
        parentNav: 'nav0',
        children: [
          {
            navGuid: 'nav12',
            parentNav: 'nav1',
            children: []
          }
        ]
      }, {
        navGuid: 'nav2',
        parentNav: 'nav0',
        children: []
      }
    ]
  }
]
```

## Example 3 (based on example 2)

```
this.searchedTree = this._treeService.searchTree(this.tree[0], 'nav1', {
  idKey: 'navGuid',        // default: id
  childrenKey: 'children'  // default: children
});
```

Result
```
{
  navGuid: 'nav1',
  parentNav: 'nav0',
  children: [
    {
      navGuid: 'nav12',
      parentNav: 'nav1',
      children: []
    }
  ]
}
```
