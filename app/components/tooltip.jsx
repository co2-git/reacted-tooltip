'use strict';

import React from 'react';

class Tooltip extends React.Component {

  static propTypes      =     {
    "target"            :     React.PropTypes.string
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
    return (
      <div { ...this.props } style={ this.style() }>
        { this.props.children }
      </div>
    );
  }
}

export default Tooltip;
