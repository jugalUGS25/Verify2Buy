const ReactTestRenderer = require('react-test-renderer');

function findByText(root, text) {
  const results = root.findAll(node => {
    const children = node.props && node.props.children;
    if (typeof children === 'string') {
      return children.trim() === text;
    }
    if (Array.isArray(children)) {
      return children.some(child => typeof child === 'string' && child.trim() === text);
    }
    return false;
  });
  if (results.length === 0) {
    throw new Error(`Unable to find an element with text: ${text}`);
  }
  return results[0];
}

function render(element) {
  let instance;
  ReactTestRenderer.act(() => {
    instance = ReactTestRenderer.create(element);
  });
  return {
    getByText: text => findByText(instance.root, text),
  };
}

module.exports = { render };

