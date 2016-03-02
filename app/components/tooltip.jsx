'use strict';

import React from 'react';

class Tooltip extends React.Component {

  static propTypes      =     {
    "reference"            :     React.PropTypes.string
  };

  style () {
    const style = {
      position      :   'absolute',
      background    :   '#000',
      color         :   '#fff',
      padding       :   '8px'
    };

    return style;
  }

  render () {
    const { reference } = this.props;

    let tooltipTarget;

    if ( reference ) {
      const ref = this
        ._reactInternalInstance
        ._currentElement
        ._owner
        ._instance
        .refs[reference];

      console.info({ ref });
    }

    return (
      <div { ...this.props } style={ this.style() }>
        { this.props.children }
      </div>
    );
  }
}

export default Tooltip;
