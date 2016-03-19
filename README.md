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

# Identify target

## Using reference

```html
<div>
  <div ref="target" />

  <Tooltip reference="target" />
</div>
```

## Using DOM selector

```html
<div>
  <div id="target" />

  <Tooltip selector="#target" />
</div>
```

## Use pointer as target

```html
<Tooltip pointer />
```
