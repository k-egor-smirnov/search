const { translit } = require("./helpers");

class Search {
  constructor() {
    this.index = {};
  }

  add(key, value) {
    key = translit(key).toLowerCase();

    // Create object with first letter in graph
    if (!this.index[key[0]]) {
      this.index[key[0]] = {};
    }

    let node = this.index[key[0]];

    for (let i = 1; i <= key.length; i++) {
      if (!node[key[i]]) {
        if (key[i]) node[key[i]] = {};
      }

      if (i === key.length) {
        if (!node.items) {
          node.items = [];
        }

        node.items.push(value);
      } else {
        node = node[key[i]];
      }
    }
  }

  find(key) {
    key = translit(key);
    const results = [];
    let node = this.index[key[0]];

    for (let i = 1; i < key.length; i++) {
      if (!node) {
        !results && (results = []);
      } else {
        node = node[key[i]];
      }
    }
    if (!results) {
      results = [];
    }

    results.push(...(node ? this._getChildren(node) : []));

    return results;
  }

  _getChildren(index) {
    const children = [];

    (function get(node) {
      Object.keys(node).forEach(key => {
        if (key === "items") {
          node[key].forEach(person => {
            children.push(person);
          });
        } else {
          get(node[key]);
        }
      });
    })(index);

    return children;
  }
}

module.exports = Search;
