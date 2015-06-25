var $ = require('jquery');

var METHOD_SUFIX = 'API';
var DEFAULT_ATTR = 'data-lazy-loader';
var DEFAULT_SELECTOR = '[' + DEFAULT_ATTR + ']';
var DEFAULT_THRESHOLD = 200;

var LazyContent = {
  componentWillUnmount: function() {
    this.lazyLoadersDisable();
  },

  mountLazyLoaders: function(apiMethod) {
    this.lazyApiMethod = apiMethod;

    $(DEFAULT_SELECTOR).lazyContent({
      threshold: DEFAULT_THRESHOLD,
      load: this.lazyLoad
    });
  },

  lazyLoadersDisable: function() {
    $(DEFAULT_SELECTOR).lazyContent('destroy');
  },

  lazyLoad: function(element) {
    var name = element.attr(DEFAULT_ATTR);
    var apiMethod = this.lazyApiMethod || this[name + METHOD_SUFIX];
    var onSuccess = function(data) {
      if (!this.isMounted()) return;

      var state = {};
      state[name] = data;
      this.setState(state);
    }.bind(this);

    apiMethod(onSuccess, name);
  }
};

module.exports = LazyContent;
