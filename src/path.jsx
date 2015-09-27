'use strict';
import React from 'react';
import R from 'ramda';
import fgeo from 'fgeo';

export const SegmentTypes = {
  LINEAR: 'linear',
  ARC: 'arc',
  Q_BEZIER: 'q-bezier'
};

export class Path extends React.Component {
  render () {
    return (<path
      d={_getDrawCommands(
        this.props.geometry,
        this.props.segmentType,
        this.props.arcRadius)}
      className={this.props.className}/>);
  }
};

function _getDrawCommands(geometry, segmentType, arcRadius) {
  var startFn;
  var drawFn;

  switch(segmentType) {
    case SegmentTypes.LINEAR:
      startFn = _toSVGMoveCommand;
      drawFn = _toSVGLineCommand;
      break;

    case SegmentTypes.ARC:
      startFn = _toSVGMoveCommand;
      drawFn = R.curry(_toSVGArcCommand)(arcRadius);
      break;

    case SegmentTypes.Q_BEZIER:
      var medians = fgeo.path.computeMedians(geometry);
      startFn = function () {
        return _toSVGMoveCommand(medians[0]);
      };
      drawFn = function (vertex, i) {
        return _toSVGQuadCommand(vertex, medians[i]);
      };
  }

  return _getDrawCommandsForCell(
    geometry,
    startFn,
    drawFn);
}

function _getDrawCommandsForCell(geometry, startFn, drawFn) {
  let i = 0;

  var drawCommands = R.reduce(
    function (acc, v) {
      let result = acc + (acc ? drawFn(v, i) : startFn(v));
      i++;
      return result;
    },
    '',
    geometry.vertices);
  drawCommands += drawFn(geometry.vertices[0], 0) + 'Z';
  return drawCommands;
}

function _toSVGMoveCommand(point) {
  return 'M ' + point.x + ' ' + point.y + ' ';
}

function _toSVGLineCommand(point) {
  return 'L ' + point.x + ' ' + point.y + ' ';
}

function _toSVGArcCommand(radius, point) {
  return 'A ' + radius + ' ' + radius + ' 0 0 ' + point.arcSweep +
    ' ' + point.x + ' ' + point.y + ' ';
}

function _toSVGQuadCommand(p1, p2) {
  return 'Q ' + p1.x + ' ' + p1.y + ' ' + p2.x + ' ' + p2.y + ' ';
}
