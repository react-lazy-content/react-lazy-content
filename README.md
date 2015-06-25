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

  getInitialState: function() {
    return {commits: null};
  },

  render: function() {
    var commits = this.state.commits;
    var commitMessage = commits ? commits[0].commit.message : 'loading...';

    return (
      <code data-lazy-loader='commits'>
        {commitMessage}
      </code>
    );
  },

  componentDidMount: function() {
    this.mountLazyLoaders();
  },

  commitsAPI: function(success) {
    jQuery.get(endpoint, success);
  }
});

React.render(<ComponentWithLazy />, document.getElementById('app'));

```

## Demo

See the demo running the code above at https://react-lazy-content.github.io/

[![Build Status](https://travis-ci.org/react-lazy-content/react-lazy-content.svg)](https://travis-ci.org/react-lazy-content/react-lazy-content)
