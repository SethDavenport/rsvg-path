# rsvg-path

A simple React component for SVG paths.

Use it like this:

```javascript
import * as RSVG from 'rsvg-path';

class MyPath extends React.Component {
  render() {
    const path = {
      vertices: [
        { x: 0, y: 0},
        { x: 0, y: 10},
        { x: 10, y: 10}
      ]
    }

    return <RSVG.Path geometry={path}
      segmentType={RSVG.SegmentTypes.LINEAR}/>;
  }
};
```

To get this SVG:

```svg
<path d="M 0 0 L 0 10 L 10 10 L 0 0"/>
```

Also has support for paths with arc or quadratic bezier segments (docs TODO).
