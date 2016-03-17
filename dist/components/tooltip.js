'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tooltip = function (_React$Component) {
  _inherits(Tooltip, _React$Component);

  function Tooltip() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Tooltip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Tooltip)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.target = null, _this.tooltip = null, _this.rect = null, _this.event = {
      in: 'mouseover',
      out: 'mouseout'
    }, _this.id = Tooltip.id, _this.state = {
      showChildren: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Tooltip, [{
    key: 'componentDidMount',


    /** */

    value: function componentDidMount() {
      this.tooltip = document.querySelector('[data-reacted-id="' + this.id + '"]');

      this.event.in = this.props['event-in'];
      this.event.out = this.props['event-out'];

      var _props = this.props;
      var reference = _props.reference;
      var selector = _props.selector;


      if (reference) {
        var ref = this._reactInternalInstance._currentElement._owner._instance.refs[reference];

        this.target = _reactDom2.default.findDOMNode(ref);
      } else if (selector) {
        this.target = document.querySelector(selector);
      }

      if (!this.target) {
        console.warn('Tooltip could not identify target', this.props);
        return _react2.default.createElement('div', { style: { display: 'none' } });
      }

      this.rect = this.target.getBoundingClientRect();

      this.target.addEventListener(this.event.in, this.triggerHandler.bind(this));

      this.target.addEventListener(this.event.out, this.triggerHandler.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.target.removeEventListener(this.event.in, this.triggerHandler.bind(this));

      this.target.removeEventListener(this.event.out, this.triggerHandler.bind(this));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var style = {};

      if (this.state.showChildren) {
        var adjust = {};

        this.tooltip.style.display = 'block';

        var target = this.target.getBoundingClientRect();

        var tooltipRect = this.tooltip.getBoundingClientRect();

        var targetRect = this.target.getBoundingClientRect();

        var wheight = +window.innerHeight;

        var top = target.bottom;

        var spaceHeight = wheight - tooltipRect.height;

        if (top >= spaceHeight) {
          top = spaceHeight - tooltipRect.height;
        }

        this.tooltip.style.top = top + 'px';

        this.tooltip.style.left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2 + 'px';
      } else {
        this.tooltip.style.display = 'none';
      }
    }
  }, {
    key: 'triggerHandler',
    value: function triggerHandler(e) {
      this.setState({ showChildren: !this.state.showChildren });
      this.componentDidUpdate();
    }
  }, {
    key: 'style',
    value: function style() {
      var style = {
        position: 'absolute',
        background: '#000',
        color: '#fff',
        padding: '8px',
        display: 'none',
        zIndex: 9999999999
      };

      return Object.assign({}, style, this.props.style);
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.state.showChildren ? this.props.children : null;

      var className = this.props.className || 'reacted-tooltip';

      return _react2.default.createElement(
        'div',
        { style: this.style(), ref: 'tooltip', className: className, 'data-reacted-id': this.id },
        children
      );
    }
  }]);

  return Tooltip;
}(_react2.default.Component);

Tooltip.id = 0;
Tooltip.propTypes = {
  "reference": _react2.default.PropTypes.string,
  "selector": _react2.default.PropTypes.string,
  "event-in": _react2.default.PropTypes.string,
  "event-out": _react2.default.PropTypes.string,
  "style": _react2.default.PropTypes.object,
  "className": _react2.default.PropTypes.string
};
exports.default = Tooltip;