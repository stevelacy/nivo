(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-spring'), require('@nivo/core')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-spring', '@nivo/core'], factory) :
  (global = global || self, factory(global.nivo = global.nivo || {}, global.React, global['react-spring'], global.nivo));
}(this, (function (exports, React, reactSpring, core) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  var TOOLTIP_OFFSET = 14;
  var tooltipStyle = {
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0
  };

  var translate = function translate(x, y) {
    return "translate(".concat(x, "px, ").concat(y, "px)");
  };

  var TooltipWrapper = React.memo(function (_ref) {
    var _animatedProps$transf;

    var position = _ref.position,
        anchor = _ref.anchor,
        children = _ref.children;
    var theme = core.useTheme();

    var _useMotionConfig = core.useMotionConfig(),
        animate = _useMotionConfig.animate,
        springConfig = _useMotionConfig.config;

    var _useMeasure = core.useMeasure(),
        _useMeasure2 = _slicedToArray(_useMeasure, 2),
        measureRef = _useMeasure2[0],
        bounds = _useMeasure2[1];

    var previousPosition = React.useRef(false);
    var to = undefined;
    var immediate = false;
    var hasDimension = bounds.width > 0 && bounds.height > 0;
    var x = Math.round(position[0]);
    var y = Math.round(position[1]);

    if (hasDimension) {
      if (anchor === 'top') {
        x -= bounds.width / 2;
        y -= bounds.height + TOOLTIP_OFFSET;
      } else if (anchor === 'right') {
        x += TOOLTIP_OFFSET;
        y -= bounds.height / 2;
      } else if (anchor === 'bottom') {
        x -= bounds.width / 2;
        y += TOOLTIP_OFFSET;
      } else if (anchor === 'left') {
        x -= bounds.width + TOOLTIP_OFFSET;
        y -= bounds.height / 2;
      } else if (anchor === 'center') {
        x -= bounds.width / 2;
        y -= bounds.height / 2;
      }

      to = {
        transform: translate(x, y)
      };

      if (!previousPosition.current) {
        immediate = true;
      }

      previousPosition.current = [x, y];
    }

    var animatedProps = reactSpring.useSpring({
      to: to,
      config: springConfig,
      immediate: !animate || immediate
    });

    var style = _objectSpread2(_objectSpread2(_objectSpread2({}, tooltipStyle), theme.tooltip), {}, {
      transform: (_animatedProps$transf = animatedProps.transform) !== null && _animatedProps$transf !== void 0 ? _animatedProps$transf : translate(x, y)
    });

    return React__default.createElement(reactSpring.animated.div, {
      ref: measureRef,
      style: style
    }, children);
  });
  TooltipWrapper.displayName = 'TooltipWrapper';

  var Chip = React.memo(function (_ref) {
    var _ref$size = _ref.size,
        size = _ref$size === void 0 ? 12 : _ref$size,
        color = _ref.color,
        _ref$style = _ref.style,
        style = _ref$style === void 0 ? {} : _ref$style;
    return React__default.createElement("span", {
      style: _objectSpread2({
        display: 'block',
        width: size,
        height: size,
        background: color
      }, style)
    });
  });

  var BasicTooltip = React.memo(function (_ref) {
    var id = _ref.id,
        _value = _ref.value,
        format = _ref.format,
        _ref$enableChip = _ref.enableChip,
        enableChip = _ref$enableChip === void 0 ? false : _ref$enableChip,
        color = _ref.color,
        renderContent = _ref.renderContent;
    var theme = core.useTheme();
    var formatValue = core.useValueFormatter(format);
    var content;

    if (typeof renderContent === 'function') {
      content = renderContent();
    } else {
      var value = _value;

      if (formatValue !== undefined && value !== undefined) {
        value = formatValue(value);
      }

      content = React__default.createElement("div", {
        style: theme.tooltip.basic
      }, enableChip && React__default.createElement(Chip, {
        color: color,
        style: theme.tooltip.chip
      }), value !== undefined ? React__default.createElement("span", null, id, ": ", React__default.createElement("strong", null, "".concat(value))) : id);
    }

    return React__default.createElement("div", {
      style: theme.tooltip.container
    }, content);
  });

  var tableStyle = {
    width: '100%',
    borderCollapse: 'collapse'
  };
  var TableTooltip = React.memo(function (_ref) {
    var title = _ref.title,
        _ref$rows = _ref.rows,
        rows = _ref$rows === void 0 ? [] : _ref$rows,
        renderContent = _ref.renderContent;
    var theme = core.useTheme();
    if (!rows.length) return null;
    var content;

    if (typeof renderContent === 'function') {
      content = renderContent();
    } else {
      content = React__default.createElement("div", null, title && title, React__default.createElement("table", {
        style: _objectSpread2(_objectSpread2({}, tableStyle), theme.tooltip.table)
      }, React__default.createElement("tbody", null, rows.map(function (row, i) {
        return React__default.createElement("tr", {
          key: i
        }, row.map(function (column, j) {
          return React__default.createElement("td", {
            key: j,
            style: theme.tooltip.tableCell
          }, column);
        }));
      }))));
    }

    return React__default.createElement("div", {
      style: theme.tooltip.container
    }, content);
  });
  TableTooltip.displayName = 'TableTooltip';

  var CrosshairLine = React.memo(function (_ref) {
    var x0 = _ref.x0,
        x1 = _ref.x1,
        y0 = _ref.y0,
        y1 = _ref.y1;
    var theme = core.useTheme();

    var _useMotionConfig = core.useMotionConfig(),
        animate = _useMotionConfig.animate,
        springConfig = _useMotionConfig.config;

    var style = React.useMemo(function () {
      return _objectSpread2(_objectSpread2({}, theme.crosshair.line), {}, {
        pointerEvents: 'none'
      });
    }, [theme.crosshair.line]);
    var animatedProps = reactSpring.useSpring({
      x1: x0,
      x2: x1,
      y1: y0,
      y2: y1,
      config: springConfig,
      immediate: !animate
    });
    return React__default.createElement(reactSpring.animated.line, Object.assign({}, animatedProps, {
      fill: "none",
      style: style
    }));
  });
  CrosshairLine.displayName = 'CrosshairLine';

  var Crosshair = React.memo(function (_ref) {
    var width = _ref.width,
        height = _ref.height,
        type = _ref.type,
        x = _ref.x,
        y = _ref.y;
    var xLine;
    var yLine;

    if (type === 'cross') {
      xLine = {
        x0: x,
        x1: x,
        y0: 0,
        y1: height
      };
      yLine = {
        x0: 0,
        x1: width,
        y0: y,
        y1: y
      };
    } else if (type === 'top-left') {
      xLine = {
        x0: x,
        x1: x,
        y0: 0,
        y1: y
      };
      yLine = {
        x0: 0,
        x1: x,
        y0: y,
        y1: y
      };
    } else if (type === 'top') {
      xLine = {
        x0: x,
        x1: x,
        y0: 0,
        y1: y
      };
    } else if (type === 'top-right') {
      xLine = {
        x0: x,
        x1: x,
        y0: 0,
        y1: y
      };
      yLine = {
        x0: x,
        x1: width,
        y0: y,
        y1: y
      };
    } else if (type === 'right') {
      yLine = {
        x0: x,
        x1: width,
        y0: y,
        y1: y
      };
    } else if (type === 'bottom-right') {
      xLine = {
        x0: x,
        x1: x,
        y0: y,
        y1: height
      };
      yLine = {
        x0: x,
        x1: width,
        y0: y,
        y1: y
      };
    } else if (type === 'bottom') {
      xLine = {
        x0: x,
        x1: x,
        y0: y,
        y1: height
      };
    } else if (type === 'bottom-left') {
      xLine = {
        x0: x,
        x1: x,
        y0: y,
        y1: height
      };
      yLine = {
        x0: 0,
        x1: x,
        y0: y,
        y1: y
      };
    } else if (type === 'left') {
      yLine = {
        x0: 0,
        x1: x,
        y0: y,
        y1: y
      };
    } else if (type === 'x') {
      xLine = {
        x0: x,
        x1: x,
        y0: 0,
        y1: height
      };
    } else if (type === 'y') {
      yLine = {
        x0: 0,
        x1: width,
        y0: y,
        y1: y
      };
    }

    return React__default.createElement(React__default.Fragment, null, xLine && React__default.createElement(CrosshairLine, {
      x0: xLine.x0,
      x1: xLine.x1,
      y0: xLine.y0,
      y1: xLine.y1
    }), yLine && React__default.createElement(CrosshairLine, {
      x0: yLine.x0,
      x1: yLine.x1,
      y0: yLine.y0,
      y1: yLine.y1
    }));
  });
  Crosshair.displayName = 'Crosshair';

  var defaultActions = {
    showTooltipAt: function showTooltipAt() {},
    showTooltipFromEvent: function showTooltipFromEvent() {},
    hideTooltip: function hideTooltip() {}
  };
  var TooltipActionsContext = React.createContext(defaultActions);
  var hiddenTooltipState = {
    isVisible: false,
    position: [null, null],
    content: null,
    anchor: null
  };
  var TooltipStateContext = React.createContext(hiddenTooltipState);

  var useTooltipHandlers = function useTooltipHandlers(container) {
    var _useState = React.useState(hiddenTooltipState),
        _useState2 = _slicedToArray(_useState, 2),
        state = _useState2[0],
        setState = _useState2[1];

    var showTooltipAt = React.useCallback(function (content, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          x = _ref2[0],
          y = _ref2[1];

      var anchor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'top';
      setState({
        isVisible: true,
        position: [x, y],
        anchor: anchor,
        content: content
      });
    }, [setState]);
    var showTooltipFromEvent = React.useCallback(function (content, event) {
      var anchor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'top';
      var bounds = container.current.getBoundingClientRect();
      var x = event.clientX - bounds.left;
      var y = event.clientY - bounds.top;

      if (anchor === 'left' || anchor === 'right') {
        if (x < bounds.width / 2) anchor = 'right';else anchor = 'left';
      }

      setState({
        isVisible: true,
        position: [x, y],
        anchor: anchor,
        content: content
      });
    }, [container, setState]);
    var hideTooltip = React.useCallback(function () {
      setState(hiddenTooltipState);
    }, [setState]);
    var actions = React.useMemo(function () {
      return {
        showTooltipAt: showTooltipAt,
        showTooltipFromEvent: showTooltipFromEvent,
        hideTooltip: hideTooltip
      };
    }, [showTooltipAt, showTooltipFromEvent, hideTooltip]);
    return {
      actions: actions,
      state: state
    };
  };
  var useTooltip = function useTooltip() {
    var context = React.useContext(TooltipActionsContext);

    if (context === undefined) {
      throw new Error('useTooltip must be used within a TooltipProvider');
    }

    return context;
  };
  var useTooltipState = function useTooltipState() {
    var context = React.useContext(TooltipStateContext);

    if (context === undefined) {
      throw new Error('useTooltipState must be used within a TooltipProvider');
    }

    return context;
  };

  var isVisibleTooltipState = function isVisibleTooltipState(state) {
    return state.isVisible === true;
  };
  var Tooltip = function Tooltip() {
    var state = useTooltipState();

    if (!isVisibleTooltipState(state)) {
      return null;
    }

    return React__default.createElement(TooltipWrapper, {
      position: state.position,
      anchor: state.anchor
    }, state.content);
  };

  var TooltipProvider = function TooltipProvider(_ref) {
    var container = _ref.container,
        children = _ref.children;

    var _useTooltipHandlers = useTooltipHandlers(container),
        actions = _useTooltipHandlers.actions,
        state = _useTooltipHandlers.state;

    return React__default.createElement(TooltipActionsContext.Provider, {
      value: actions
    }, React__default.createElement(TooltipStateContext.Provider, {
      value: state
    }, children));
  };

  exports.BasicTooltip = BasicTooltip;
  exports.Chip = Chip;
  exports.Crosshair = Crosshair;
  exports.TableTooltip = TableTooltip;
  exports.Tooltip = Tooltip;
  exports.TooltipActionsContext = TooltipActionsContext;
  exports.TooltipProvider = TooltipProvider;
  exports.TooltipStateContext = TooltipStateContext;
  exports.TooltipWrapper = TooltipWrapper;
  exports.hiddenTooltipState = hiddenTooltipState;
  exports.isVisibleTooltipState = isVisibleTooltipState;
  exports.useTooltip = useTooltip;
  exports.useTooltipHandlers = useTooltipHandlers;
  exports.useTooltipState = useTooltipState;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=nivo-tooltip.umd.js.map
