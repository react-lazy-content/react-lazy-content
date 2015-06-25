# React Lazy Content

React wrapper around [jQuery.LazyContent](https://github.com/tulios/jquery.lazy_content) - Lazy load of any content made easy.

With this mixin you can choose to load content at your React component only after it is both mounted and the component is about to become visible on the browser.

## Example

```jsx
import React from 'react';
import LazyContent from 'react-lazy-content';
import jQuery from 'jquery';

var endpoint = 'https://api.github.com/repos/facebook/react/commits';

var ComponentWithLazy = React.createClass({
  mixins: [LazyContent],

  getInitialState: function getInitialState() {
    return {content: 'loading...'};
  },

  render: function render() {
    return (
      <code data-lazy-loader='someService'>
        {this.state.content}
      </code>
    );
  },

  componentDidMount: function() {
    this.mountLazyLoaders();
  },

  someServiceAPI: function someServiceAPI() {
    jQuery.get(endpoint, this.updateContent);
  },

  updateContent: function updateContent(data) {
    this.setState({content: data[0].commit.message});
  }
});

React.render(<ComponentWithLazy />, document.getElementById('app'));

```

## Demo

See the demo running the code above at https://react-lazy-content.github.io/

[![Build Status](https://travis-ci.org/react-lazy-content/react-lazy-content.svg)](https://travis-ci.org/react-lazy-content/react-lazy-content)
