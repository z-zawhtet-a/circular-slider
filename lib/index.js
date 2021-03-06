import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { polarToCartesian, circularArc, calcAngleDiff } from './helpers/geometryHelpers';
import { SquareSVG } from './elements/SVG';
import { Dragger } from './components/Dragger';


export class CircularSlider extends Component {
  padding = 20
  center = {
    x: this.props.r + this.padding,
    y: this.props.r + this.padding,
  }
  size = 2*(this.props.r + this.padding)
  absoluteContainerPosition = () => {
    if (!this.containerNode) { return null; };
    const { left: x, top: y } = this.containerNode.getBoundingClientRect();
    return { x, y };
  }
  handleDrag = ({ x, y }) => {
    const { x: fiducialX, y: fiducialY } = polarToCartesian(0, 0, this.props.r, this.props.angle);
    const deltaTheta = calcAngleDiff(x, y, fiducialX, -fiducialY);
    const newAngle = this.props.angle + deltaTheta;
    this.props.onMove(newAngle);
  }
  handleDragStop = ({ x, y }) => {
    const { x: fiducialX, y: fiducialY } = polarToCartesian(0, 0, this.props.r, this.props.angle);
    const deltaTheta = calcAngleDiff(x, y, fiducialX, -fiducialY);
    const newAngle = this.props.angle + deltaTheta;
    this.props.onDragStop(newAngle);
  }
  render() {
    const { color, arcStart, arcEnd, r, angle } = this.props;
    const relCenterPos = this.center;
    const relPosition = polarToCartesian(relCenterPos.x, relCenterPos.y, r, angle);
    const radialPosition = polarToCartesian(0, 0, r, angle);
    return (
      <SquareSVG
        innerRef={x => { this.containerNode = x; }}
        size={this.size}
      >
        {this.props.showNeedle ? (
          <line
            stroke={color}
            strokeWidth="1"
            x1={relCenterPos.x}
            x2={relPosition.x}
            y1={relCenterPos.y}
            y2={relPosition.y}
          />
        ) : null}

        {this.props.showArc ? (
          <path
            d={circularArc(relCenterPos.x, relCenterPos.y, arcStart, arcEnd, r)}
            fill="transparent"
            stroke={color}
          />
        ) : null}

        <Dragger
          absoluteContainerFunc={this.absoluteContainerPosition}
          color={color}
          onMove={this.handleDrag}
          onDragStop={this.handleDragStop}
          radialPosition={radialPosition}
          relCenterPos={relCenterPos}
          trueRadius={this.padding}
          visibleRadius={8}
        />
      </SquareSVG>
    );
  }
}

CircularSlider.propTypes = {
  angle: PropTypes.number,
  arcEnd: PropTypes.number,
  arcStart: PropTypes.number,
  color: PropTypes.string,
  onMove: PropTypes.func,
  onDragStop: PropTypes.func,
  r: PropTypes.number,
  showArc: PropTypes.bool,
  showNeedle: PropTypes.bool,
};

CircularSlider.defaultProps = {
  angle: 200,
  arcEnd: 360,
  arcStart: 180,
  color: "darkseagreen",
  onMove: () => {},
  onDragStop: () => {},
  r: 100,
  showArc: false,
  showNeedle: true,
};
