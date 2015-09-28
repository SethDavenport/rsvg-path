# rsvg-path

A simple React component for SVG paths.

Use it like this:

```javascript
const RSVG = import('rsvg-path');

const path = {
  vertices: [
    { x: 40, y: 10 },
    { x: 40, y: 30 },
    { x: 40, y: 40 },
    { x: 50, y: 10 },
    { x: 50, y: 30 },
    { x: 50, y: 40 },
    { x: 60, y: 10 },
    { x: 60, y: 30 },
    { x: 60, y: 40 }]
};

  React.render(
    <RSVG.Path
      geometry={path}
      segmentType={RSVG.SegmentTypes.Q_BEZIER}/>,
    document.getElementById('stage'));
});
```

With this:

```svg
<svg id="stage"
  viewBox="0 0 100 100"
  preserveAspectRatio="xMidYMid slice"/>
```

To get this:

http://codepen.io/SethDavenport/full/dYGVjZ/

Also has support for paths with arc or linear segments (docs TODO).
