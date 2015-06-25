var rewire = require('rewire');
var LazyContent = rewire('../react-lazy-content');

describe('LazyContent', function() {
  describe('#componentWillUnmount', function() {
    beforeEach(function() {
      spyOn(LazyContent, 'lazyLoadersDisable');
      LazyContent.componentWillUnmount();
    });

    it('calls loaders disable', function() {
      expect(LazyContent.lazyLoadersDisable).toHaveBeenCalled();
    });
  });

  describe('#mountLazyLoaders', function() {
    beforeEach(function() {
      this.lazyContent = jasmine.createSpy('lazyContent');
      this.$ = jasmine.createSpy('$').and.returnValue({
        lazyContent: this.lazyContent
      });
      LazyContent.__set__('$', this.$);

      LazyContent.mountLazyLoaders();
    });

    it('saves api method', function() {
      var someMethod = {};
      expect(LazyContent.lazyApiMethod).toBe(undefined);
      LazyContent.mountLazyLoaders(someMethod);
      expect(LazyContent.lazyApiMethod).toBe(someMethod);
    });

    it('uses data-lazy-loader selector', function() {
      expect(this.$).toHaveBeenCalledWith('[data-lazy-loader]');
    });

    it('boots jQuery.lazyContent', function() {
      expect(this.lazyContent).toHaveBeenCalledWith({
        threshold: 200,
        load: LazyContent.lazyLoad
      });
    });
  });

  describe('#lazyLoadersDisable', function() {
    beforeEach(function() {
      this.lazyContent = jasmine.createSpy('lazyContent');
      this.$ = jasmine.createSpy('$').and.returnValue({
        lazyContent: this.lazyContent
      });
      LazyContent.__set__('$', this.$);

      LazyContent.lazyLoadersDisable();
    });

    it('uses data-lazy-loader selector', function() {
      expect(this.$).toHaveBeenCalledWith('[data-lazy-loader]');
    });

    it('destroys jQuery.lazyContent', function() {
      expect(this.lazyContent).toHaveBeenCalledWith('destroy');
    });
  });

  describe('#lazyLoad', function() {
    beforeEach(function() {
      this.spyAndLoad = function(lazyApiMethod) {
        LazyContent.isMounted = function() { return true; };
        LazyContent.setState = jasmine.createSpy('setState');
        LazyContent.lazyApiMethod = lazyApiMethod;
        LazyContent.someServiceAPI = jasmine.createSpy('lazyContent');
        this.attrSpy = jasmine.createSpy('attrSpy').and.returnValue('someService');
        this.element = {attr: this.attrSpy};

        LazyContent.lazyLoad(this.element);
      };
    });

    it('calls api method based on name when not configured', function() {
      this.spyAndLoad();
      expect(LazyContent.someServiceAPI).
        toHaveBeenCalledWith(jasmine.any(Function), 'someService');
    });

    it('calls api method configured at setup', function() {
      var specifiedApiMethod = jasmine.createSpy('specifiedApiMethod');
      this.spyAndLoad(specifiedApiMethod);
      expect(specifiedApiMethod).
        toHaveBeenCalledWith(jasmine.any(Function), 'someService');
    });

    describe('when onSuccess is called back', function() {
      it('is updates state with data', function() {
        var someData = {some: 'data'};
        this.spyAndLoad(function(onSuccess, name) {
          onSuccess(someData);
        });
        expect(LazyContent.setState).
          toHaveBeenCalledWith({someService: someData});
      });
    });
  });
});
