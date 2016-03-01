'use strict';

import React from 'react';

class Tooltip extends React.Component {

  static propTypes      =     {
    "target"            :     React.PropTypes.string
  };

  render () {
    return (
      <div { ...this.props }>
        { this.children }
      </div>
    );
  }
}

export default Tooltip;
