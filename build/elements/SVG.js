'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CircularHandle = exports.SquareSVG = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  width: ', ';\n  height: ', ';\n'], ['\n  width: ', ';\n  height: ', ';\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  cursor: pointer;\n'], ['\n  cursor: pointer;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _polished = require('polished');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SquareSVG = exports.SquareSVG = _styledComponents2.default.svg(_templateObject, function (props) {
  return props.size + 'px';
}, function (props) {
  return props.size + 'px';
});

var ClickableCircle = _styledComponents2.default.circle(_templateObject2);

var PartialFillDef = function PartialFillDef(_ref) {
  var id = _ref.id,
      color = _ref.color,
      proportion = _ref.proportion,
      fuzziness = _ref.fuzziness,
      isPressed = _ref.isPressed;

  var centerColor = isPressed ? (0, _polished.darken)(0.1, color) : color;
  var percent = Math.round(proportion * 100);
  return _react2.default.createElement(
    'defs',
    null,
    _react2.default.createElement(
      'radialGradient',
      { id: id },
      _react2.default.createElement('stop', {
        offset: '0%',
        stopColor: centerColor
      }),
      _react2.default.createElement('stop', {
        offset: percent - fuzziness + '%',
        stopColor: centerColor
      }),
      _react2.default.createElement('stop', {
        offset: percent + fuzziness + '%',
        stopColor: (0, _polished.transparentize)(1, centerColor)
      }),
      _react2.default.createElement('stop', {
        offset: '100%',
        stopColor: (0, _polished.transparentize)(1, centerColor)
      })
    )
  );
};

PartialFillDef.propTypes = {
  color: _propTypes2.default.string.isRequired,
  fuzziness: _propTypes2.default.number.isRequired,
  id: _propTypes2.default.string.isRequired,
  isPressed: _propTypes2.default.bool.isRequired,
  proportion: _propTypes2.default.number.isRequired
};

var CircularHandle = exports.CircularHandle = function CircularHandle(_ref2) {
  var color = _ref2.color,
      fuzziness = _ref2.fuzziness,
      isPressed = _ref2.isPressed,
      trueRadius = _ref2.trueRadius,
      visibleRadius = _ref2.visibleRadius,
      cx = _ref2.cx,
      cy = _ref2.cy,
      onMouseDown = _ref2.onMouseDown,
      onTouchStart = _ref2.onTouchStart;
  return _react2.default.createElement(
    'g',
    null,
    _react2.default.createElement(PartialFillDef, {
      color: color,
      fuzziness: 5,
      id: 'partialRadialFill-' + color,
      isPressed: isPressed,
      proportion: visibleRadius / trueRadius
    }),
    _react2.default.createElement(ClickableCircle, {
      cx: cx,
      cy: cy,
      fill: 'url(#partialRadialFill-' + color + ')',
      onMouseDown: onMouseDown,
      onTouchStart: onTouchStart,
      r: trueRadius
    })
  );
};

CircularHandle.propTypes = {
  color: _propTypes2.default.string.isRequired,
  cx: _propTypes2.default.number.isRequired,
  cy: _propTypes2.default.number.isRequired,
  fuzziness: _propTypes2.default.number.isRequired,
  isPressed: _propTypes2.default.bool.isRequired,
  onMouseDown: _propTypes2.default.func.isRequired,
  onTouchStart: _propTypes2.default.func.isRequired,
  trueRadius: _propTypes2.default.number.isRequired,
  visibleRadius: _propTypes2.default.number.isRequired
};

CircularHandle.defaultProps = {
  color: 'darkseagreen',
  cx: 0,
  cy: 0,
  fuzziness: 5,
  isPressed: false,
  onMouseDown: function onMouseDown() {},
  onTouchStart: function onTouchStart() {},
  trueRadius: 20,
  visibleRadius: 8
};