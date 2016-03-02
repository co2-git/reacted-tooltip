'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class Tooltip extends React.Component {

  static propTypes          =     {
    "reference"             :     React.PropTypes.string,
    "event-in"              :     React.PropTypes.string,
    "event-out"             :     React.PropTypes.string
  };

  target = null;
  tooltip = null;
  rect = null;
  event = {
    in : 'mouseover',
    out : 'mouseout'
  };

  state = {
    show : false
  };

  componentDidMount () {
    this.tooltip = ReactDOM.findDOMNode(this.refs.tooltip);

    this.event.in = this.props['event-in'];
    this.event.out = this.props['event-out'];

    const { reference } = this.props;

    if ( reference ) {
      const ref = this
        ._reactInternalInstance
        ._currentElement
        ._owner
        ._instance
        .refs[reference];

      this.target = ReactDOM.findDOMNode(ref);
    }

    if ( ! this.target ) {
      console.warn('Tooltip could not identify target');
      return ( <div style={{ display : 'none' }}/> );
    }

    this.rect = this.target.getBoundingClientRect();

    console.info(this.rect);

    this.target
      .addEventListener(this.event.in, this.triggerHandler.bind(this));

    this.target
      .addEventListener(this.event.out, this.triggerHandler.bind(this));
  }

  componentWillUnmount () {
    this.target
      .removeEventListener(this.event.in, this.triggerHandler.bind(this));

    this.target
      .removeEventListener(this.event.out, this.triggerHandler.bind(this));
  }

  componentDidUpdate () {
    const style = {};

    if ( this.state.show ) {
      this.tooltip.style.display = 'block';

      const rect = this.tooltip.getBoundingClientRect();

      Object.assign(style, {
        display         :   'block',
        top             :   this.rect.bottom + 'px',
        left            :   (this.rect.left + (this.rect.width / 2) - (rect.width / 2)) + 'px'
      });

      for ( const property in style ) {
        this.tooltip.style[property] = style[property];
      }
    }
    else {
      this.tooltip.style.display = 'none';
    }
  }

  triggerHandler (e) {
    this.setState({ show : ! this.state.show });
  }

  style () {
    const style = {
      position      :   'absolute',
      background    :   '#000',
      color         :   '#fff',
      padding       :   '8px',
      display       :   'none'
    };

    return style;
  }

  render () {
    let children = this.state.show ? this.props.children : null;

    return (
      <div style={ this.style() } ref="tooltip">
        { children }
      </div>
    );
  }
}

export default Tooltip;
