reacted-tooltip
===

Tooltip/popover with React

# Usage

```js
import React from 'react';
import Tooltip from 'reacted-tooltip';

class Layout extends React.Component {
  render () {
    return (
      <div>
        <a href="#" ref="target">Click me!</a>
        <Tooltip reference="target" event="click">
          Hey! I am a <strong>tooltip</strong>
        </Tooltip>
      </div>
    );
  }
}
```
