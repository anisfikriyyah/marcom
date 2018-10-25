'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PureSingleDatePicker = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactWithStyles = require('react-with-styles');

var _reactPortal = require('react-portal');

var _airbnbPropTypes = require('airbnb-prop-types');

var _consolidatedEvents = require('consolidated-events');

var _isTouchDevice = require('is-touch-device');

var _isTouchDevice2 = _interopRequireDefault(_isTouchDevice);

var _reactOutsideClickHandler = require('react-outside-click-handler');

var _reactOutsideClickHandler2 = _interopRequireDefault(_reactOutsideClickHandler);

var _SingleDatePickerShape = require('../shapes/SingleDatePickerShape');

var _SingleDatePickerShape2 = _interopRequireDefault(_SingleDatePickerShape);

var _defaultPhrases = require('../defaultPhrases');

var _getResponsiveContainerStyles = require('../utils/getResponsiveContainerStyles');

var _getResponsiveContainerStyles2 = _interopRequireDefault(_getResponsiveContainerStyles);

var _getDetachedContainerStyles = require('../utils/getDetachedContainerStyles');

var _getDetachedContainerStyles2 = _interopRequireDefault(_getDetachedContainerStyles);

var _getInputHeight = require('../utils/getInputHeight');

var _getInputHeight2 = _interopRequireDefault(_getInputHeight);

var _isInclusivelyAfterDay = require('../utils/isInclusivelyAfterDay');

var _isInclusivelyAfterDay2 = _interopRequireDefault(_isInclusivelyAfterDay);

var _disableScroll2 = require('../utils/disableScroll');

var _disableScroll3 = _interopRequireDefault(_disableScroll2);

var _baseClass = require('../utils/baseClass');

var _baseClass2 = _interopRequireDefault(_baseClass);

var _SingleDatePickerInputController = require('./SingleDatePickerInputController');

var _SingleDatePickerInputController2 = _interopRequireDefault(_SingleDatePickerInputController);

var _DayPickerSingleDateController = require('./DayPickerSingleDateController');

var _DayPickerSingleDateController2 = _interopRequireDefault(_DayPickerSingleDateController);

var _CloseButton = require('./CloseButton');

var _CloseButton2 = _interopRequireDefault(_CloseButton);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = (0, _airbnbPropTypes.forbidExtraProps)((0, _object2['default'])({}, _reactWithStyles.withStylesPropTypes, _SingleDatePickerShape2['default']));

var defaultProps = {
  // required props for a functional interactive SingleDatePicker
  date: null,
  focused: false,

  // input related props
  id: 'date',
  placeholder: 'Date',
  disabled: false,
  required: false,
  readOnly: false,
  screenReaderInputMessage: '',
  showClearDate: false,
  showDefaultInputIcon: false,
  inputIconPosition: _constants.ICON_BEFORE_POSITION,
  customInputIcon: null,
  customCloseIcon: null,
  noBorder: false,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: _constants.DEFAULT_VERTICAL_SPACING,
  keepFocusOnInput: false,

  // calendar presentation and interaction related props
  orientation: _constants.HORIZONTAL_ORIENTATION,
  anchorDirection: _constants.ANCHOR_LEFT,
  openDirection: _constants.OPEN_DOWN,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  appendToBody: false,
  disableScroll: false,
  initialVisibleMonth: null,
  firstDayOfWeek: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDate: false,
  renderCalendarInfo: null,
  calendarInfoPosition: _constants.INFO_POSITION_BOTTOM,
  hideKeyboardShortcutsPanel: false,
  daySize: _constants.DAY_SIZE,
  isRTL: false,
  verticalHeight: null,
  transitionDuration: undefined,
  horizontalMonthPadding: 13,

  // navigation related props
  navPrev: null,
  navNext: null,

  onPrevMonthClick: function () {
    function onPrevMonthClick() {}

    return onPrevMonthClick;
  }(),
  onNextMonthClick: function () {
    function onNextMonthClick() {}

    return onNextMonthClick;
  }(),
  onClose: function () {
    function onClose() {}

    return onClose;
  }(),


  // month presentation and interaction related props
  renderMonthText: null,

  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  renderMonthElement: null,
  enableOutsideDays: false,
  isDayBlocked: function () {
    function isDayBlocked() {
      return false;
    }

    return isDayBlocked;
  }(),
  isOutsideRange: function () {
    function isOutsideRange(day) {
      return !(0, _isInclusivelyAfterDay2['default'])(day, (0, _moment2['default'])());
    }

    return isOutsideRange;
  }(),
  isDayHighlighted: function () {
    function isDayHighlighted() {}

    return isDayHighlighted;
  }(),

  // internationalization props
  displayFormat: function () {
    function displayFormat() {
      return _moment2['default'].localeData().longDateFormat('L');
    }

    return displayFormat;
  }(),
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: _defaultPhrases.SingleDatePickerPhrases,
  dayAriaLabelFormat: undefined
};

/** @extends React.Component */

var SingleDatePicker = function (_BaseClass) {
  _inherits(SingleDatePicker, _BaseClass);

  function SingleDatePicker(props) {
    _classCallCheck(this, SingleDatePicker);

    var _this = _possibleConstructorReturn(this, (SingleDatePicker.__proto__ || Object.getPrototypeOf(SingleDatePicker)).call(this, props));

    _this.isTouchDevice = false;

    _this.state = {
      dayPickerContainerStyles: {},
      isDayPickerFocused: false,
      isInputFocused: false,
      showKeyboardShortcuts: false
    };

    _this.onOutsideClick = _this.onOutsideClick.bind(_this);
    _this.onInputFocus = _this.onInputFocus.bind(_this);
    _this.onDayPickerFocus = _this.onDayPickerFocus.bind(_this);
    _this.onDayPickerBlur = _this.onDayPickerBlur.bind(_this);
    _this.showKeyboardShortcutsPanel = _this.showKeyboardShortcutsPanel.bind(_this);

    _this.responsivizePickerPosition = _this.responsivizePickerPosition.bind(_this);
    _this.disableScroll = _this.disableScroll.bind(_this);

    _this.setDayPickerContainerRef = _this.setDayPickerContainerRef.bind(_this);
    _this.setContainerRef = _this.setContainerRef.bind(_this);
    return _this;
  }

  /* istanbul ignore next */


  _createClass(SingleDatePicker, [{
    key: 'componentDidMount',
    value: function () {
      function componentDidMount() {
        this.removeEventListener = (0, _consolidatedEvents.addEventListener)(window, 'resize', this.responsivizePickerPosition, { passive: true });
        this.responsivizePickerPosition();
        this.disableScroll();

        var focused = this.props.focused;


        if (focused) {
          this.setState({
            isInputFocused: true
          });
        }

        this.isTouchDevice = (0, _isTouchDevice2['default'])();
      }

      return componentDidMount;
    }()
  }, {
    key: 'componentDidUpdate',
    value: function () {
      function componentDidUpdate(prevProps) {
        var focused = this.props.focused;

        if (!prevProps.focused && focused) {
          this.responsivizePickerPosition();
          this.disableScroll();
        } else if (prevProps.focused && !focused) {
          if (this.enableScroll) this.enableScroll();
        }
      }

      return componentDidUpdate;
    }()

    /* istanbul ignore next */

  }, {
    key: 'componentWillUnmount',
    value: function () {
      function componentWillUnmount() {
        if (this.removeEventListener) this.removeEventListener();
        if (this.enableScroll) this.enableScroll();
      }

      return componentWillUnmount;
    }()
  }, {
    key: 'onOutsideClick',
    value: function () {
      function onOutsideClick(event) {
        var _props = this.props,
            focused = _props.focused,
            onFocusChange = _props.onFocusChange,
            onClose = _props.onClose,
            startDate = _props.startDate,
            endDate = _props.endDate,
            appendToBody = _props.appendToBody;

        if (!focused) return;
        if (appendToBody && this.dayPickerContainer.contains(event.target)) return;

        this.setState({
          isInputFocused: false,
          isDayPickerFocused: false,
          showKeyboardShortcuts: false
        });

        onFocusChange({ focused: false });
        onClose({ startDate: startDate, endDate: endDate });
      }

      return onOutsideClick;
    }()
  }, {
    key: 'onInputFocus',
    value: function () {
      function onInputFocus(_ref) {
        var focused = _ref.focused;
        var _props2 = this.props,
            onFocusChange = _props2.onFocusChange,
            readOnly = _props2.readOnly,
            withPortal = _props2.withPortal,
            withFullScreenPortal = _props2.withFullScreenPortal,
            keepFocusOnInput = _props2.keepFocusOnInput;


        if (focused) {
          var withAnyPortal = withPortal || withFullScreenPortal;
          var moveFocusToDayPicker = withAnyPortal || readOnly && !keepFocusOnInput || this.isTouchDevice && !keepFocusOnInput;

          if (moveFocusToDayPicker) {
            this.onDayPickerFocus();
          } else {
            this.onDayPickerBlur();
          }
        }

        onFocusChange({ focused: focused });
      }

      return onInputFocus;
    }()
  }, {
    key: 'onDayPickerFocus',
    value: function () {
      function onDayPickerFocus() {
        this.setState({
          isInputFocused: false,
          isDayPickerFocused: true,
          showKeyboardShortcuts: false
        });
      }

      return onDayPickerFocus;
    }()
  }, {
    key: 'onDayPickerBlur',
    value: function () {
      function onDayPickerBlur() {
        this.setState({
          isInputFocused: true,
          isDayPickerFocused: false,
          showKeyboardShortcuts: false
        });
      }

      return onDayPickerBlur;
    }()
  }, {
    key: 'setDayPickerContainerRef',
    value: function () {
      function setDayPickerContainerRef(ref) {
        this.dayPickerContainer = ref;
      }

      return setDayPickerContainerRef;
    }()
  }, {
    key: 'setContainerRef',
    value: function () {
      function setContainerRef(ref) {
        this.container = ref;
      }

      return setContainerRef;
    }()
  }, {
    key: 'disableScroll',
    value: function () {
      function disableScroll() {
        var _props3 = this.props,
            appendToBody = _props3.appendToBody,
            propDisableScroll = _props3.disableScroll,
            focused = _props3.focused;

        if (!appendToBody && !propDisableScroll) return;
        if (!focused) return;

        // Disable scroll for every ancestor of this <SingleDatePicker> up to the
        // document level. This ensures the input and the picker never move. Other
        // sibling elements or the picker itself can scroll.
        this.enableScroll = (0, _disableScroll3['default'])(this.container);
      }

      return disableScroll;
    }()

    /* istanbul ignore next */

  }, {
    key: 'responsivizePickerPosition',
    value: function () {
      function responsivizePickerPosition() {
        // It's possible the portal props have been changed in response to window resizes
        // So let's ensure we reset this back to the base state each time
        this.setState({ dayPickerContainerStyles: {} });

        var _props4 = this.props,
            openDirection = _props4.openDirection,
            anchorDirection = _props4.anchorDirection,
            horizontalMargin = _props4.horizontalMargin,
            withPortal = _props4.withPortal,
            withFullScreenPortal = _props4.withFullScreenPortal,
            appendToBody = _props4.appendToBody,
            focused = _props4.focused;
        var dayPickerContainerStyles = this.state.dayPickerContainerStyles;


        if (!focused) {
          return;
        }

        var isAnchoredLeft = anchorDirection === _constants.ANCHOR_LEFT;

        if (!withPortal && !withFullScreenPortal) {
          var containerRect = this.dayPickerContainer.getBoundingClientRect();
          var currentOffset = dayPickerContainerStyles[anchorDirection] || 0;
          var containerEdge = isAnchoredLeft ? containerRect[_constants.ANCHOR_RIGHT] : containerRect[_constants.ANCHOR_LEFT];

          this.setState({
            dayPickerContainerStyles: (0, _object2['default'])({}, (0, _getResponsiveContainerStyles2['default'])(anchorDirection, currentOffset, containerEdge, horizontalMargin), appendToBody && (0, _getDetachedContainerStyles2['default'])(openDirection, anchorDirection, this.container))
          });
        }
      }

      return responsivizePickerPosition;
    }()
  }, {
    key: 'showKeyboardShortcutsPanel',
    value: function () {
      function showKeyboardShortcutsPanel() {
        this.setState({
          isInputFocused: false,
          isDayPickerFocused: true,
          showKeyboardShortcuts: true
        });
      }

      return showKeyboardShortcutsPanel;
    }()
  }, {
    key: 'maybeRenderDayPickerWithPortal',
    value: function () {
      function maybeRenderDayPickerWithPortal() {
        var _props5 = this.props,
            focused = _props5.focused,
            withPortal = _props5.withPortal,
            withFullScreenPortal = _props5.withFullScreenPortal,
            appendToBody = _props5.appendToBody;


        if (!focused) {
          return null;
        }

        if (withPortal || withFullScreenPortal || appendToBody) {
          return _react2['default'].createElement(
            _reactPortal.Portal,
            null,
            this.renderDayPicker()
          );
        }

        return this.renderDayPicker();
      }

      return maybeRenderDayPickerWithPortal;
    }()
  }, {
    key: 'renderDayPicker',
    value: function () {
      function renderDayPicker() {
        var _props6 = this.props,
            anchorDirection = _props6.anchorDirection,
            openDirection = _props6.openDirection,
            onDateChange = _props6.onDateChange,
            date = _props6.date,
            onFocusChange = _props6.onFocusChange,
            focused = _props6.focused,
            enableOutsideDays = _props6.enableOutsideDays,
            numberOfMonths = _props6.numberOfMonths,
            orientation = _props6.orientation,
            monthFormat = _props6.monthFormat,
            navPrev = _props6.navPrev,
            navNext = _props6.navNext,
            onPrevMonthClick = _props6.onPrevMonthClick,
            onNextMonthClick = _props6.onNextMonthClick,
            onClose = _props6.onClose,
            withPortal = _props6.withPortal,
            withFullScreenPortal = _props6.withFullScreenPortal,
            keepOpenOnDateSelect = _props6.keepOpenOnDateSelect,
            initialVisibleMonth = _props6.initialVisibleMonth,
            renderMonthText = _props6.renderMonthText,
            renderCalendarDay = _props6.renderCalendarDay,
            renderDayContents = _props6.renderDayContents,
            renderCalendarInfo = _props6.renderCalendarInfo,
            renderMonthElement = _props6.renderMonthElement,
            calendarInfoPosition = _props6.calendarInfoPosition,
            hideKeyboardShortcutsPanel = _props6.hideKeyboardShortcutsPanel,
            firstDayOfWeek = _props6.firstDayOfWeek,
            customCloseIcon = _props6.customCloseIcon,
            phrases = _props6.phrases,
            dayAriaLabelFormat = _props6.dayAriaLabelFormat,
            daySize = _props6.daySize,
            isRTL = _props6.isRTL,
            isOutsideRange = _props6.isOutsideRange,
            isDayBlocked = _props6.isDayBlocked,
            isDayHighlighted = _props6.isDayHighlighted,
            weekDayFormat = _props6.weekDayFormat,
            styles = _props6.styles,
            verticalHeight = _props6.verticalHeight,
            transitionDuration = _props6.transitionDuration,
            verticalSpacing = _props6.verticalSpacing,
            horizontalMonthPadding = _props6.horizontalMonthPadding,
            small = _props6.small,
            reactDates = _props6.theme.reactDates;
        var _state = this.state,
            dayPickerContainerStyles = _state.dayPickerContainerStyles,
            isDayPickerFocused = _state.isDayPickerFocused,
            showKeyboardShortcuts = _state.showKeyboardShortcuts;


        var onOutsideClick = !withFullScreenPortal && withPortal ? this.onOutsideClick : undefined;
        var closeIcon = customCloseIcon || _react2['default'].createElement(_CloseButton2['default'], null);

        var inputHeight = (0, _getInputHeight2['default'])(reactDates, small);

        var withAnyPortal = withPortal || withFullScreenPortal;

        return _react2['default'].createElement(
          'div',
          _extends({ // eslint-disable-line jsx-a11y/no-static-element-interactions
            ref: this.setDayPickerContainerRef
          }, (0, _reactWithStyles.css)(styles.SingleDatePicker_picker, anchorDirection === _constants.ANCHOR_LEFT && styles.SingleDatePicker_picker__directionLeft, anchorDirection === _constants.ANCHOR_RIGHT && styles.SingleDatePicker_picker__directionRight, openDirection === _constants.OPEN_DOWN && styles.SingleDatePicker_picker__openDown, openDirection === _constants.OPEN_UP && styles.SingleDatePicker_picker__openUp, !withAnyPortal && openDirection === _constants.OPEN_DOWN && {
            top: inputHeight + verticalSpacing
          }, !withAnyPortal && openDirection === _constants.OPEN_UP && {
            bottom: inputHeight + verticalSpacing
          }, orientation === _constants.HORIZONTAL_ORIENTATION && styles.SingleDatePicker_picker__horizontal, orientation === _constants.VERTICAL_ORIENTATION && styles.SingleDatePicker_picker__vertical, withAnyPortal && styles.SingleDatePicker_picker__portal, withFullScreenPortal && styles.SingleDatePicker_picker__fullScreenPortal, isRTL && styles.SingleDatePicker_picker__rtl, dayPickerContainerStyles), {
            onClick: onOutsideClick
          }),
          _react2['default'].createElement(_DayPickerSingleDateController2['default'], {
            date: date,
            onDateChange: onDateChange,
            onFocusChange: onFocusChange,
            orientation: orientation,
            enableOutsideDays: enableOutsideDays,
            numberOfMonths: numberOfMonths,
            monthFormat: monthFormat,
            withPortal: withAnyPortal,
            focused: focused,
            keepOpenOnDateSelect: keepOpenOnDateSelect,
            hideKeyboardShortcutsPanel: hideKeyboardShortcutsPanel,
            initialVisibleMonth: initialVisibleMonth,
            navPrev: navPrev,
            navNext: navNext,
            onPrevMonthClick: onPrevMonthClick,
            onNextMonthClick: onNextMonthClick,
            onClose: onClose,
            renderMonthText: renderMonthText,
            renderCalendarDay: renderCalendarDay,
            renderDayContents: renderDayContents,
            renderCalendarInfo: renderCalendarInfo,
            renderMonthElement: renderMonthElement,
            calendarInfoPosition: calendarInfoPosition,
            isFocused: isDayPickerFocused,
            showKeyboardShortcuts: showKeyboardShortcuts,
            onBlur: this.onDayPickerBlur,
            phrases: phrases,
            dayAriaLabelFormat: dayAriaLabelFormat,
            daySize: daySize,
            isRTL: isRTL,
            isOutsideRange: isOutsideRange,
            isDayBlocked: isDayBlocked,
            isDayHighlighted: isDayHighlighted,
            firstDayOfWeek: firstDayOfWeek,
            weekDayFormat: weekDayFormat,
            verticalHeight: verticalHeight,
            transitionDuration: transitionDuration,
            horizontalMonthPadding: horizontalMonthPadding
          }),
          withFullScreenPortal && _react2['default'].createElement(
            'button',
            _extends({}, (0, _reactWithStyles.css)(styles.SingleDatePicker_closeButton), {
              'aria-label': phrases.closeDatePicker,
              type: 'button',
              onClick: this.onOutsideClick
            }),
            _react2['default'].createElement(
              'div',
              (0, _reactWithStyles.css)(styles.SingleDatePicker_closeButton_svg),
              closeIcon
            )
          )
        );
      }

      return renderDayPicker;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _props7 = this.props,
            id = _props7.id,
            placeholder = _props7.placeholder,
            disabled = _props7.disabled,
            focused = _props7.focused,
            required = _props7.required,
            readOnly = _props7.readOnly,
            openDirection = _props7.openDirection,
            showClearDate = _props7.showClearDate,
            showDefaultInputIcon = _props7.showDefaultInputIcon,
            inputIconPosition = _props7.inputIconPosition,
            customCloseIcon = _props7.customCloseIcon,
            customInputIcon = _props7.customInputIcon,
            date = _props7.date,
            onDateChange = _props7.onDateChange,
            displayFormat = _props7.displayFormat,
            phrases = _props7.phrases,
            withPortal = _props7.withPortal,
            withFullScreenPortal = _props7.withFullScreenPortal,
            screenReaderInputMessage = _props7.screenReaderInputMessage,
            isRTL = _props7.isRTL,
            noBorder = _props7.noBorder,
            block = _props7.block,
            small = _props7.small,
            regular = _props7.regular,
            verticalSpacing = _props7.verticalSpacing,
            reopenPickerOnClearDate = _props7.reopenPickerOnClearDate,
            keepOpenOnDateSelect = _props7.keepOpenOnDateSelect,
            styles = _props7.styles,
            isOutsideRange = _props7.isOutsideRange;
        var isInputFocused = this.state.isInputFocused;


        var enableOutsideClick = !withPortal && !withFullScreenPortal;

        var hideFang = verticalSpacing < _constants.FANG_HEIGHT_PX;

        var input = _react2['default'].createElement(_SingleDatePickerInputController2['default'], {
          id: id,
          placeholder: placeholder,
          focused: focused,
          isFocused: isInputFocused,
          disabled: disabled,
          required: required,
          readOnly: readOnly,
          openDirection: openDirection,
          showCaret: !withPortal && !withFullScreenPortal && !hideFang,
          showClearDate: showClearDate,
          showDefaultInputIcon: showDefaultInputIcon,
          inputIconPosition: inputIconPosition,
          isOutsideRange: isOutsideRange,
          customCloseIcon: customCloseIcon,
          customInputIcon: customInputIcon,
          date: date,
          onDateChange: onDateChange,
          displayFormat: displayFormat,
          onFocusChange: this.onInputFocus,
          onKeyDownArrowDown: this.onDayPickerFocus,
          onKeyDownQuestionMark: this.showKeyboardShortcutsPanel,
          screenReaderMessage: screenReaderInputMessage,
          phrases: phrases,
          isRTL: isRTL,
          noBorder: noBorder,
          block: block,
          small: small,
          regular: regular,
          verticalSpacing: verticalSpacing,
          reopenPickerOnClearDate: reopenPickerOnClearDate,
          keepOpenOnDateSelect: keepOpenOnDateSelect
        });

        return _react2['default'].createElement(
          'div',
          _extends({
            ref: this.setContainerRef
          }, (0, _reactWithStyles.css)(styles.SingleDatePicker, block && styles.SingleDatePicker__block)),
          enableOutsideClick && _react2['default'].createElement(
            _reactOutsideClickHandler2['default'],
            { onOutsideClick: this.onOutsideClick },
            input,
            this.maybeRenderDayPickerWithPortal()
          ),
          !enableOutsideClick && input,
          !enableOutsideClick && this.maybeRenderDayPickerWithPortal()
        );
      }

      return render;
    }()
  }]);

  return SingleDatePicker;
}(_baseClass2['default']);

SingleDatePicker.propTypes = propTypes;
SingleDatePicker.defaultProps = defaultProps;

exports.PureSingleDatePicker = SingleDatePicker;
exports['default'] = (0, _reactWithStyles.withStyles)(function (_ref2) {
  var _ref2$reactDates = _ref2.reactDates,
      color = _ref2$reactDates.color,
      zIndex = _ref2$reactDates.zIndex;
  return {
    SingleDatePicker: {
      position: 'relative',
      display: 'inline-block'
    },

    SingleDatePicker__block: {
      display: 'block'
    },

    SingleDatePicker_picker: {
      zIndex: zIndex + 1,
      backgroundColor: color.background,
      position: 'absolute'
    },

    SingleDatePicker_picker__rtl: {
      direction: 'rtl'
    },

    SingleDatePicker_picker__directionLeft: {
      left: 0
    },

    SingleDatePicker_picker__directionRight: {
      right: 0
    },

    SingleDatePicker_picker__portal: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%'
    },

    SingleDatePicker_picker__fullScreenPortal: {
      backgroundColor: color.background
    },

    SingleDatePicker_closeButton: {
      background: 'none',
      border: 0,
      color: 'inherit',
      font: 'inherit',
      lineHeight: 'normal',
      overflow: 'visible',
      cursor: 'pointer',

      position: 'absolute',
      top: 0,
      right: 0,
      padding: 15,
      zIndex: zIndex + 2,

      ':hover': {
        color: 'darken(' + String(color.core.grayLighter) + ', 10%)',
        textDecoration: 'none'
      },

      ':focus': {
        color: 'darken(' + String(color.core.grayLighter) + ', 10%)',
        textDecoration: 'none'
      }
    },

    SingleDatePicker_closeButton_svg: {
      height: 15,
      width: 15,
      fill: color.core.grayLighter
    }
  };
}, { pureComponent: _baseClass.pureComponentAvailable })(SingleDatePicker);