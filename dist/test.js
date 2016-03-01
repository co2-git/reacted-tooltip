'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redtea = require('redtea');

var _redtea2 = _interopRequireDefault(_redtea);

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _css = require('css');

var _css2 = _interopRequireDefault(_css);

var _xmldom = require('xmldom');

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _flex = require('./components/flex');

var _flex2 = _interopRequireDefault(_flex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function test() {
  var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var locals = {};

  function getDOMNode(props) {
    var rendered = _server2.default.renderToString(_react2.default.createFactory(_flex2.default)(props));

    return new _xmldom.DOMParser().parseFromString(rendered, 'text/html');
  }

  function check() {
    var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var rules = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

    return function (it) {
      it('should be a React Component', function () {
        locals.flex = new _flex2.default(props);
        locals.flex.should.be.an.instanceof(_react2.default.Component);
      });

      it('should render', function () {
        locals.rendered = _server2.default.renderToString(_react2.default.createFactory(_flex2.default)(props));
      });

      it('should have style', function () {
        var styleText = undefined;

        locals.rendered.replace(/style="(.+);"/, function (matches, style) {
          styleText = 'flex {' + style + '}';
        });

        locals.style = _css2.default.parse(styleText).stylesheet;

        // console.log(require('util').inspect(locals.style, { depth: null }));
      });

      it('should have ' + rules.length + ' rule(s)', function () {
        return locals.style.should.be.an.Object().and.have.property('rules').which.is.an.Array().and.have.length(rules.length);
      });

      rules.forEach(function (rule, ruleIndex) {
        it('selector', function (it) {
          it('should be ' + rule.selector, function () {
            locals.style.rules[0].should.have.property('selectors').which.is.an.Array();

            locals.style.rules[0].selectors[0].should.be.exactly(rule.selector);
          });
        });

        it('declarations', function (it) {
          it('should be ' + rule.declarations.length, function () {
            return locals.style.rules[0].should.have.property('declarations').which.is.an.Array().and.have.length(rule.declarations.length);
          });

          rule.declarations.forEach(function (declaration, declarationIndex) {
            it(Object.keys(declaration)[0], function (it) {
              it('property', function (it) {
                it('should be "' + Object.keys(declaration)[0] + '"', function () {
                  return locals.style.rules[ruleIndex].declarations[declarationIndex].should.have.property('property').which.is.exactly(Object.keys(declaration)[0]);
                });
              });

              it('value', function (it) {
                it('should be "' + declaration[Object.keys(declaration)[0]] + '"', function () {
                  return locals.style.rules[ruleIndex].declarations[declarationIndex].should.have.property('value').which.is.exactly(declaration[Object.keys(declaration)[0]]);
                });
              });
            });
          });
        });
      });
    };
  }

  return (0, _redtea2.default)('reacted-flex', function (it) {
    it('should be a class', function () {
      return _flex2.default.should.be.a.Function();
    });

    it('<Flex />', _redtea2.default.use(function () {
      return check({}, [{
        selector: 'flex',
        declarations: [{ display: 'flex' }, { 'flex-direction': 'row' }]
      }]);
    }));

    it('<Flex data-some="attribute" />', function (it) {
      it('should have attribute', function () {
        var domNode = getDOMNode({ 'data-some': 'attribute' }).documentElement;
        Object.keys(domNode.attributes).filter(function (i) {
          return domNode.attributes[i].name;
        }).map(function (i) {
          return domNode.attributes[i].name;
        }).indexOf('data-some').should.be.above(-1);
      });
    });
  });
}

exports.default = test;