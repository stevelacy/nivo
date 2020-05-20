import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import cloneDeep from 'lodash/cloneDeep';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import withPropsOnChange from 'recompose/withPropsOnChange';
import withProps from 'recompose/withProps';
import pure from 'recompose/pure';
import { partition, hierarchy } from 'd3-hierarchy';
import { arc } from 'd3-shape';
import { withTheme, withDimensions, getAccessorFor, Container, SvgWrapper, ResponsiveWrapper } from '@nivo/core';
import { ordinalColorsPropType, inheritedColorPropType, getOrdinalColorScale, getInheritedColorGenerator } from '@nivo/colors';
import { BasicTooltip } from '@nivo/tooltip';

var SunburstArc = function SunburstArc(_ref) {
  var node = _ref.node,
      path = _ref.path,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor,
      showTooltip = _ref.showTooltip,
      hideTooltip = _ref.hideTooltip;
  return React.createElement("path", {
    d: path,
    fill: node.data.color,
    stroke: borderColor,
    strokeWidth: borderWidth,
    onMouseEnter: showTooltip,
    onMouseMove: showTooltip,
    onMouseLeave: hideTooltip
  });
};
SunburstArc.propTypes = {
  node: PropTypes.shape({
    data: PropTypes.shape({
      color: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  arcGenerator: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  borderWidth: PropTypes.number.isRequired,
  borderColor: PropTypes.string.isRequired,
  showTooltip: PropTypes.func.isRequired,
  hideTooltip: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
};
var enhance = compose(withPropsOnChange(['node', 'arcGenerator'], function (_ref2) {
  var node = _ref2.node,
      arcGenerator = _ref2.arcGenerator;
  return {
    path: arcGenerator(node)
  };
}), withPropsOnChange(['node', 'showTooltip', 'theme'], function (_ref3) {
  var node = _ref3.node,
      _showTooltip = _ref3.showTooltip,
      theme = _ref3.theme;
  return {
    showTooltip: function showTooltip(e) {
      _showTooltip(React.createElement(BasicTooltip, {
        id: node.data.id,
        enableChip: true,
        color: node.data.color,
        value: "".concat(node.data.percentage.toFixed(2), "%"),
        theme: theme
      }), e);
    }
  };
}), pure);
var SunburstArc$1 = enhance(SunburstArc);

var getAncestor = function getAncestor(node) {
  if (node.depth === 1) return node;
  if (node.parent) return getAncestor(node.parent);
  return node;
};
var Sunburst = function Sunburst(_ref) {
  var nodes = _ref.nodes,
      margin = _ref.margin,
      centerX = _ref.centerX,
      centerY = _ref.centerY,
      outerWidth = _ref.outerWidth,
      outerHeight = _ref.outerHeight,
      arcGenerator = _ref.arcGenerator,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor,
      theme = _ref.theme,
      isInteractive = _ref.isInteractive;
  return React.createElement(Container, {
    isInteractive: isInteractive,
    theme: theme,
    animate: false
  }, function (_ref2) {
    var showTooltip = _ref2.showTooltip,
        hideTooltip = _ref2.hideTooltip;
    return React.createElement(SvgWrapper, {
      width: outerWidth,
      height: outerHeight,
      margin: margin,
      theme: theme
    }, React.createElement("g", {
      transform: "translate(".concat(centerX, ", ").concat(centerY, ")")
    }, nodes.filter(function (node) {
      return node.depth > 0;
    }).map(function (node, i) {
      return React.createElement(SunburstArc$1, {
        key: i,
        node: node,
        arcGenerator: arcGenerator,
        borderWidth: borderWidth,
        borderColor: borderColor,
        showTooltip: showTooltip,
        hideTooltip: hideTooltip,
        theme: theme
      });
    })));
  });
};
Sunburst.propTypes = {
  data: PropTypes.object.isRequired,
  identity: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  getIdentity: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  getValue: PropTypes.func.isRequired,
  nodes: PropTypes.array.isRequired,
  partition: PropTypes.func.isRequired,
  cornerRadius: PropTypes.number.isRequired,
  arcGenerator: PropTypes.func.isRequired,
  radius: PropTypes.number.isRequired,
  centerX: PropTypes.number.isRequired,
  centerY: PropTypes.number.isRequired,
  colors: ordinalColorsPropType.isRequired,
  borderWidth: PropTypes.number.isRequired,
  borderColor: PropTypes.string.isRequired,
  childColor: inheritedColorPropType.isRequired,
  isInteractive: PropTypes.bool
};
var SunburstDefaultProps = {
  identity: 'id',
  value: 'value',
  cornerRadius: 0,
  colors: {
    scheme: 'nivo'
  },
  borderWidth: 1,
  borderColor: 'white',
  childColor: {
    from: 'color'
  },
  isInteractive: true
};
var enhance$1 = compose(defaultProps(SunburstDefaultProps), withTheme(), withDimensions(), withPropsOnChange(['colors'], function (_ref3) {
  var colors = _ref3.colors;
  return {
    getColor: getOrdinalColorScale(colors, 'id')
  };
}), withProps(function (_ref4) {
  var width = _ref4.width,
      height = _ref4.height;
  var radius = Math.min(width, height) / 2;
  var partition$1 = partition().size([2 * Math.PI, radius * radius]);
  return {
    radius: radius,
    partition: partition$1,
    centerX: width / 2,
    centerY: height / 2
  };
}), withPropsOnChange(['cornerRadius'], function (_ref5) {
  var cornerRadius = _ref5.cornerRadius;
  return {
    arcGenerator: arc().startAngle(function (d) {
      return d.x0;
    }).endAngle(function (d) {
      return d.x1;
    }).innerRadius(function (d) {
      return Math.sqrt(d.y0);
    }).outerRadius(function (d) {
      return Math.sqrt(d.y1);
    }).cornerRadius(cornerRadius)
  };
}), withPropsOnChange(['identity'], function (_ref6) {
  var identity = _ref6.identity;
  return {
    getIdentity: getAccessorFor(identity)
  };
}), withPropsOnChange(['value'], function (_ref7) {
  var value = _ref7.value;
  return {
    getValue: getAccessorFor(value)
  };
}), withPropsOnChange(['data', 'getValue'], function (_ref8) {
  var data = _ref8.data,
      getValue = _ref8.getValue;
  return {
    data: hierarchy(data).sum(getValue)
  };
}), withPropsOnChange(['childColor', 'theme'], function (_ref9) {
  var childColor = _ref9.childColor,
      theme = _ref9.theme;
  return {
    getChildColor: getInheritedColorGenerator(childColor, theme)
  };
}), withPropsOnChange(['data', 'partition', 'getIdentity', 'getChildColor'], function (_ref10) {
  var data = _ref10.data,
      partition = _ref10.partition,
      getIdentity = _ref10.getIdentity,
      getColor = _ref10.getColor,
      childColor = _ref10.childColor,
      getChildColor = _ref10.getChildColor;
  var total = data.value;
  var nodes = sortBy(partition(cloneDeep(data)).descendants(), 'depth');
  nodes.forEach(function (node) {
    var ancestor = getAncestor(node).data;
    delete node.children;
    delete node.data.children;
    Object.assign(node.data, {
      id: getIdentity(node.data),
      value: node.value,
      percentage: 100 * node.value / total,
      depth: node.depth,
      ancestor: ancestor
    });
    if (node.depth === 1 || childColor === 'noinherit') {
      node.data.color = getColor(node.data);
    } else if (node.depth > 1) {
      node.data.color = getChildColor(node.parent.data);
    }
  });
  return {
    nodes: nodes
  };
}), pure);
var enhancedSunburst = enhance$1(Sunburst);
enhancedSunburst.displayName = 'Sunburst';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var ResponsiveSunburst = function ResponsiveSunburst(props) {
  return React.createElement(ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React.createElement(enhancedSunburst, _extends({
      width: width,
      height: height
    }, props));
  });
};

export { ResponsiveSunburst, enhancedSunburst as Sunburst, SunburstDefaultProps };
