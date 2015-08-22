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
