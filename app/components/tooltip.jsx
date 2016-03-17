'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class Tooltip extends React.Component {

  static id = 0;

  static propTypes          =     {
    "reference"             :     React.PropTypes.string,
    "selector"              :     React.PropTypes.string,
    "event-in"              :     React.PropTypes.string,
    "event-out"             :     React.PropTypes.string,
    "style"                 :     React.PropTypes.object,
    "className"             :     React.PropTypes.string
  };

  target                    =     null;
  tooltip                   =     null;
  rect                      =     null;
  event                     =     {
    in                      :     'mouseover',
    out                     :     'mouseout'
  };
  id                        =     Tooltip.id;

  state = {
    showChildren : false
  };

  /** */

  componentDidMount () {
    this.tooltip = document.querySelector(`[data-reacted-id="${this.id}"]`);

    this.event.in = this.props['event-in'];
    this.event.out = this.props['event-out'];

    const { reference, selector } = this.props;

    if ( reference ) {
      const ref = this
        ._reactInternalInstance
        ._currentElement
        ._owner
        ._instance
        .refs[reference];

      this.target = ReactDOM.findDOMNode(ref);
    }

    else if ( selector ) {
      this.target = document.querySelector(selector);
    }

    if ( ! this.target ) {
      console.warn('Tooltip could not identify target', this.props);
      return ( <div style={{ display : 'none' }}/> );
    }

    this.rect = this.target.getBoundingClientRect();

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

    if ( this.state.showChildren ) {
      const adjust = {};

      this.tooltip.style.display = 'block';

      const target = this.target.getBoundingClientRect();

      const tooltipRect = this.tooltip.getBoundingClientRect();

      const targetRect = this.target.getBoundingClientRect();

      const wheight = +(window.innerHeight);

      let top = target.bottom;

      let spaceHeight = wheight - tooltipRect.height;

      if ( top >= spaceHeight ) {
        top = (spaceHeight - tooltipRect.height);
      }

      this.tooltip.style.top = `${top}px`;

      this.tooltip.style.left = `${targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2)}px`;
    }
    else {
      this.tooltip.style.display = 'none';
    }
  }

  triggerHandler (e) {
    this.setState({ showChildren : ! this.state.showChildren });
    this.componentDidUpdate();
  }

  style () {
    const style = {
      position      :   'absolute',
      background    :   '#000',
      color         :   '#fff',
      padding       :   '8px',
      display       :   'none',
      zIndex: 9999999999
    };

    return Object.assign({}, style, this.props.style);
  }

  render () {
    let children = this.state.showChildren ? this.props.children : null;

    const className = this.props.className || 'reacted-tooltip';

    return (
      <div style={ this.style() } ref="tooltip" className={ className } data-reacted-id={ this.id }>
        { children }
      </div>
    );
  }
}

export default Tooltip;
