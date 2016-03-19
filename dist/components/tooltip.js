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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var hack = undefined;

function foo(e) {
  var event = {};

  for (var i in e) {
    if (i !== 'webkitMovementX' && i !== 'webkitMovementY') {
      Object.assign(event, _defineProperty({}, i, e[i]));
    }
  }

  return hack.triggerHandler(event);
}

var Tooltip = function (_React$Component) {
  _inherits(Tooltip, _React$Component);

  /** */

  /** */

  function Tooltip(props) {
    _classCallCheck(this, Tooltip);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tooltip).call(this, props));

    _this.method = null;
    _this.target = null;
    _this.tooltip = null;
    _this.rect = null;
    _this.event = {
      in: 'mouseover',
      out: 'mouseout'
    };
    _this.id = Tooltip.id;
    _this.state = {
      show: false
    };


    hack = _this;
    return _this;
  }

  /** */

  /** */

  /** */

  /** */

  _createClass(Tooltip, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.tooltip = _reactDom2.default.findDOMNode(this.refs.tooltip);

      var props = this.getProperties();

      this.method = props.method;
      this.target = props.target;
      this.pointer = props.pointer;
      this.event = props.event;

      this.target.addEventListener(this.event.in, foo, false);
      this.target.addEventListener(this.event.out, foo, false);
    }

    /** */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var info = this.getProperties();

      if (info.target !== this.target) {

        this.target.removeEventListener(this.event.in, foo, false);

        this.target.removeEventListener(this.event.out, foo, false);
      }

      this.target = info.target;

      if (info.event.in !== this.event.in) {

        this.target.removeEventListener(this.event.in, foo, false);

        this.target.addEventListener(info.event.in, foo, false);
      }

      if (info.event.out !== this.event.out) {

        this.target.removeEventListener(this.event.out, foo, false);

        this.target.addEventListener(info.event.out, foo, false);
      }

      this.event = info.event;

      this.method = info.method;
      this.pointer = info.pointer;

      if (this.triggerEvent) {

        if (this.state.show) {
          this.tooltip.style.display = 'block';

          var top = 0,
              left = 0;

          if (this.props.pointer) {
            top = this.triggerEvent.x;
            left = this.triggerEvent.y;
          } else {
            var target = this.target.getBoundingClientRect();

            var tooltipRect = this.tooltip.getBoundingClientRect();

            var targetRect = this.target.getBoundingClientRect();

            var wheight = +window.innerHeight;

            top = target.bottom;

            var spaceHeight = wheight - tooltipRect.height;

            if (top >= spaceHeight) {
              top = spaceHeight - tooltipRect.height;
            }

            left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;

            if (left < 0) {
              left = 0;
            }
          }

          this.tooltip.style.top = top + 'px';

          this.tooltip.style.left = left + 'px';
        } else {
          this.tooltip.style.display = 'none';
        }

        this.triggerEvent = false;
      }

      return;

      var style = {};

      if (this.state.show) {
        var adjust = {};

        this.tooltip.style.display = 'block';

        var top = 0,
            left = 0;

        if (this.props.pointer) {

          top = this.triggerEvent.x;
          left = this.triggerEvent.y;
        } else {
          var target = this.target.getBoundingClientRect();

          var tooltipRect = this.tooltip.getBoundingClientRect();

          var targetRect = this.target.getBoundingClientRect();

          var wheight = +window.innerHeight;

          top = target.bottom;

          var spaceHeight = wheight - tooltipRect.height;

          if (top >= spaceHeight) {
            top = spaceHeight - tooltipRect.height;
          }

          left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
        }

        this.tooltip.style.top = top + 'px';

        this.tooltip.style.left = left + 'px';
      } else {
        this.tooltip.style.display = 'none';
      }
    }

    /** */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.target.removeEventListener(this.event.in, this.triggerHandler.bind(this), false);

      this.target.removeEventListener(this.event.out, this.triggerHandler.bind(this), false);
    }

    /** */

  }, {
    key: 'getProperties',
    value: function getProperties(props) {
      props = props || this.props;

      var method = undefined,
          target = undefined,
          event = { in: 'mouseover', out: 'mouseout' },
          pointer = false;

      if (props.reference) {
        method = 'reference';

        var ref = this._reactInternalInstance._currentElement._owner._instance.refs[props.reference];

        target = _reactDom2.default.findDOMNode(ref);
      } else if (props.selector) {
        method = 'selector';

        target = document.querySelector(props.selector);
      }

      if (props.pointer) {
        pointer = true;

        target = target || document.body;
      }

      event.in = props['event-in'] || 'mouseover';
      event.out = props['event-out'] || 'mouseout';

      return { method: method, target: target, event: event, pointer: pointer };
    }

    /** */

  }, {
    key: 'triggerHandler',
    value: function triggerHandler(e) {

      this.triggerEvent = Object.assign({}, e);

      this.setState({ show: !this.state.show });
    }

    /** */

  }, {
    key: 'style',
    value: function style() {
      var style = {
        position: 'fixed',
        background: '#000',
        color: '#fff',
        padding: 8,
        display: 'none',
        zIndex: 9999
      };

      return Object.assign({}, style, this.props.style);
    }

    /** */

  }, {
    key: 'render',
    value: function render() {
      var children = this.state.show ? this.props.children : null;

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
  "pointer": _react2.default.PropTypes.bool,
  "event-in": _react2.default.PropTypes.string,
  "event-out": _react2.default.PropTypes.string,
  "style": _react2.default.PropTypes.object,
  "className": _react2.default.PropTypes.string
};
exports.default = Tooltip;