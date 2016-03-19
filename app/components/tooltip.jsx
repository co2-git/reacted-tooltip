'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class Tooltip extends React.Component {

  /** */

  static id = 0;

  /** */

  static propTypes          =     {
    "reference"             :     React.PropTypes.string,
    "selector"              :     React.PropTypes.string,
    "pointer"               :     React.PropTypes.bool,
    "event-in"              :     React.PropTypes.string,
    "event-out"             :     React.PropTypes.string,
    "style"                 :     React.PropTypes.object,
    "className"             :     React.PropTypes.string
  };

  /** */

  method                    =     null;
  target                    =     null;
  tooltip                   =     null;
  rect                      =     null;
  event                     =     {
    in                      :     'mouseover',
    out                     :     'mouseout'
  };
  id                        =     Tooltip.id++;

  /** */

  state = {
    show : false
  };

  /** */

  constructor(props) {
    super(props);

    this.persistTrigger = ::this.triggerHandler;
  }

  /** */

  componentDidMount () {
    this.tooltip = ReactDOM.findDOMNode(this.refs.tooltip);

    const props = this.getProperties();

    this.method = props.method;
    this.target = props.target;
    this.pointer = props.pointer;
    this.event = props.event;

    this.target.addEventListener(this.event.in, this.persistTrigger, false);
    this.target.addEventListener(this.event.out, this.persistTrigger, false);
  }

  /** */

  componentDidUpdate () {
    const info = this.getProperties();

    if ( info.target !== this.target ) {

      this.target.removeEventListener(this.event.in, this.persistTrigger, false);

      this.target.removeEventListener(this.event.out, this.persistTrigger, false);
    }

    this.target = info.target;

    if ( info.event.in !== this.event.in ) {

      this.target.removeEventListener(this.event.in, this.persistTrigger, false);

      this.target.addEventListener(info.event.in, this.persistTrigger, false);
    }

    if ( info.event.out !== this.event.out ) {

      this.target.removeEventListener(this.event.out, this.persistTrigger, false);

      this.target.addEventListener(info.event.out, this.persistTrigger, false);
    }

    this.event = info.event;

    this.method = info.method;
    this.pointer = info.pointer;

    if ( this.triggerEvent ) {

      if ( this.state.show ) {
        this.tooltip.style.display = 'block';

        let top = 0, left = 0;

        if ( this.props.pointer ) {
          top = this.triggerEvent.x;
          left = this.triggerEvent.y;
        }

        else {
          const target = this.target.getBoundingClientRect();

          const tooltipRect = this.tooltip.getBoundingClientRect();

          const targetRect = this.target.getBoundingClientRect();

          const wheight = +(window.innerHeight);

          top = target.bottom;

          let spaceHeight = wheight - tooltipRect.height;

          if ( top >= spaceHeight ) {
            top = (spaceHeight - tooltipRect.height);
          }

          left = (
            targetRect.left
            + (targetRect.width / 2)
            - (tooltipRect.width / 2)
          );

          if ( left < 0 ) {
            left = 0;
          }
        }

        this.tooltip.style.top = `${top}px`;

        this.tooltip.style.left = `${left}px`;
      }
      else {
        this.tooltip.style.display = 'none';
      }

      this.triggerEvent = false;
    }

    return;

    const style = {};

    if ( this.state.show ) {
      const adjust = {};

      this.tooltip.style.display = 'block';

      let top = 0, left = 0;

      if ( this.props.pointer ) {


        top = this.triggerEvent.x;
        left = this.triggerEvent.y;
      }

      else {
        const target = this.target.getBoundingClientRect();

        const tooltipRect = this.tooltip.getBoundingClientRect();

        const targetRect = this.target.getBoundingClientRect();

        const wheight = +(window.innerHeight);

        top = target.bottom;

        let spaceHeight = wheight - tooltipRect.height;

        if ( top >= spaceHeight ) {
          top = (spaceHeight - tooltipRect.height);
        }

        left = (
          targetRect.left
          + (targetRect.width / 2)
          - (tooltipRect.width / 2)
        );
      }

      this.tooltip.style.top = `${top}px`;

      this.tooltip.style.left = `${left}px`;
    }
    else {
      this.tooltip.style.display = 'none';
    }
  }

  /** */

  componentWillUnmount () {
    this.target.removeEventListener(
      this.event.in,
      this.triggerHandler.bind(this),
      false
    );

    this.target.removeEventListener(
      this.event.out,
      this.triggerHandler.bind(this),
      false
    );
  }

  /** */

  getProperties (props) {
    props = props || this.props;

    let method,
      target,
      event = { in : 'mouseover', out : 'mouseout' },
      pointer = false;

    if ( props.reference ) {
      method = 'reference';

      const ref = this
        ._reactInternalInstance
        ._currentElement
        ._owner
        ._instance
        .refs[props.reference];

      target = ReactDOM.findDOMNode(ref);
    }

    else if ( props.selector ) {
      method = 'selector';

      target = document.querySelector(props.selector);
    }

    if ( props.pointer ) {
      pointer = true;

      target = target || document.body;
    }

    event.in = props['event-in'] || 'mouseover';
    event.out = props['event-out'] || 'mouseout';

    return { method, target, event, pointer };
  }

  /** */

  triggerHandler (e) {

    this.triggerEvent = Object.assign({}, e);

    this.setState({ show : ! this.state.show });
  }

  /** */

  style () {
    const style = {
      position      :   'fixed',
      background    :   '#000',
      color         :   '#fff',
      padding       :   8,
      display       :   'none',
      zIndex        :   9999
    };

    return Object.assign({}, style, this.props.style);
  }

  /** */

  render () {
    let children = this.state.show ? this.props.children : null;

    const className = this.props.className || 'reacted-tooltip';

    return (
      <div style={ this.style() } ref="tooltip" className={ className } data-reacted-id={ this.id }>
        { children }
      </div>
    );
  }
}

export default Tooltip;
