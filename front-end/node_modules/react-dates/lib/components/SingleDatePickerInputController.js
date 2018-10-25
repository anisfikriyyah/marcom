'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactMomentProptypes = require('react-moment-proptypes');

var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

var _airbnbPropTypes = require('airbnb-prop-types');

var _OpenDirectionShape = require('../shapes/OpenDirectionShape');

var _OpenDirectionShape2 = _interopRequireDefault(_OpenDirectionShape);

var _defaultPhrases = require('../defaultPhrases');

var _getPhrasePropTypes = require('../utils/getPhrasePropTypes');

var _getPhrasePropTypes2 = _interopRequireDefault(_getPhrasePropTypes);

var _SingleDatePickerInput = require('./SingleDatePickerInput');

var _SingleDatePickerInput2 = _interopRequireDefault(_SingleDatePickerInput);

var _IconPositionShape = require('../shapes/IconPositionShape');

var _IconPositionShape2 = _interopRequireDefault(_IconPositionShape);

var _DisabledShape = require('../shapes/DisabledShape');

var _DisabledShape2 = _interopRequireDefault(_DisabledShape);

var _toMomentObject = require('../utils/toMomentObject');

var _toMomentObject2 = _interopRequireDefault(_toMomentObject);

var _toLocalizedDateString = require('../utils/toLocalizedDateString');

var _toLocalizedDateString2 = _interopRequireDefault(_toLocalizedDateString);

var _isInclusivelyAfterDay = require('../utils/isInclusivelyAfterDay');

var _isInclusivelyAfterDay2 = _interopRequireDefault(_isInclusivelyAfterDay);

var _baseClass = require('../utils/baseClass');

var _baseClass2 = _interopRequireDefault(_baseClass);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = (0, _airbnbPropTypes.forbidExtraProps)({
  date: _reactMomentProptypes2['default'].momentObj,
  onDateChange: _propTypes2['default'].func.isRequired,

  focused: _propTypes2['default'].bool,
  onFocusChange: _propTypes2['default'].func.isRequired,

  id: _propTypes2['default'].string.isRequired,
  placeholder: _propTypes2['default'].string, // also used as label
  screenReaderMessage: _propTypes2['default'].string,
  showClearDate: _propTypes2['default'].bool,
  showCaret: _propTypes2['default'].bool,
  showDefaultInputIcon: _propTypes2['default'].bool,
  inputIconPosition: _IconPositionShape2['default'],
  disabled: _DisabledShape2['default'],
  required: _propTypes2['default'].bool,
  readOnly: _propTypes2['default'].bool,
  openDirection: _OpenDirectionShape2['default'],
  noBorder: _propTypes2['default'].bool,
  block: _propTypes2['default'].bool,
  small: _propTypes2['default'].bool,
  regular: _propTypes2['default'].bool,
  verticalSpacing: _airbnbPropTypes.nonNegativeInteger,

  keepOpenOnDateSelect: _propTypes2['default'].bool,
  reopenPickerOnClearDate: _propTypes2['default'].bool,
  isOutsideRange: _propTypes2['default'].func,
  displayFormat: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].func]),

  onClose: _propTypes2['default'].func,
  onKeyDownArrowDown: _propTypes2['default'].func,
  onKeyDownQuestionMark: _propTypes2['default'].func,

  customInputIcon: _propTypes2['default'].node,
  customCloseIcon: _propTypes2['default'].node,

  // accessibility
  isFocused: _propTypes2['default'].bool,

  // i18n
  phrases: _propTypes2['default'].shape((0, _getPhrasePropTypes2['default'])(_defaultPhrases.SingleDatePickerInputPhrases)),

  isRTL: _propTypes2['default'].bool
});

var defaultProps = {
  date: null,
  focused: false,

  placeholder: '',
  screenReaderMessage: 'Date',
  showClearDate: false,
  showCaret: false,
  showDefaultInputIcon: false,
  inputIconPosition: _constants.ICON_BEFORE_POSITION,
  disabled: false,
  required: false,
  readOnly: false,
  openDirection: _constants.OPEN_DOWN,
  noBorder: false,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: undefined,

  keepOpenOnDateSelect: false,
  reopenPickerOnClearDate: false,
  isOutsideRange: function () {
    function isOutsideRange(day) {
      return !(0, _isInclusivelyAfterDay2['default'])(day, (0, _moment2['default'])());
    }

    return isOutsideRange;
  }(),
  displayFormat: function () {
    function displayFormat() {
      return _moment2['default'].localeData().longDateFormat('L');
    }

    return displayFormat;
  }(),

  onClose: function () {
    function onClose() {}

    return onClose;
  }(),
  onKeyDownArrowDown: function () {
    function onKeyDownArrowDown() {}

    return onKeyDownArrowDown;
  }(),
  onKeyDownQuestionMark: function () {
    function onKeyDownQuestionMark() {}

    return onKeyDownQuestionMark;
  }(),


  customInputIcon: null,
  customCloseIcon: null,

  // accessibility
  isFocused: false,

  // i18n
  phrases: _defaultPhrases.SingleDatePickerInputPhrases,

  isRTL: false
};

/** @extends React.Component */

var SingleDatePickerInputController = function (_BaseClass) {
  _inherits(SingleDatePickerInputController, _BaseClass);

  function SingleDatePickerInputController(props) {
    _classCallCheck(this, SingleDatePickerInputController);

    var _this = _possibleConstructorReturn(this, (SingleDatePickerInputController.__proto__ || Object.getPrototypeOf(SingleDatePickerInputController)).call(this, props));

    _this.onChange = _this.onChange.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    _this.onClearFocus = _this.onClearFocus.bind(_this);
    _this.clearDate = _this.clearDate.bind(_this);
    return _this;
  }

  _createClass(SingleDatePickerInputController, [{
    key: 'onChange',
    value: function () {
      function onChange(dateString) {
        var _props = this.props,
            isOutsideRange = _props.isOutsideRange,
            keepOpenOnDateSelect = _props.keepOpenOnDateSelect,
            onDateChange = _props.onDateChange,
            onFocusChange = _props.onFocusChange,
            onClose = _props.onClose;

        var newDate = (0, _toMomentObject2['default'])(dateString, this.getDisplayFormat());

        var isValid = newDate && !isOutsideRange(newDate);
        if (isValid) {
          onDateChange(newDate);
          if (!keepOpenOnDateSelect) {
            onFocusChange({ focused: false });
            onClose({ date: newDate });
          }
        } else {
          onDateChange(null);
        }
      }

      return onChange;
    }()
  }, {
    key: 'onFocus',
    value: function () {
      function onFocus() {
        var _props2 = this.props,
            onFocusChange = _props2.onFocusChange,
            disabled = _props2.disabled;


        if (!disabled) {
          onFocusChange({ focused: true });
        }
      }

      return onFocus;
    }()
  }, {
    key: 'onClearFocus',
    value: function () {
      function onClearFocus() {
        var _props3 = this.props,
            focused = _props3.focused,
            onFocusChange = _props3.onFocusChange,
            onClose = _props3.onClose,
            date = _props3.date;

        if (!focused) return;

        onFocusChange({ focused: false });
        onClose({ date: date });
      }

      return onClearFocus;
    }()
  }, {
    key: 'getDisplayFormat',
    value: function () {
      function getDisplayFormat() {
        var displayFormat = this.props.displayFormat;

        return typeof displayFormat === 'string' ? displayFormat : displayFormat();
      }

      return getDisplayFormat;
    }()
  }, {
    key: 'getDateString',
    value: function () {
      function getDateString(date) {
        var displayFormat = this.getDisplayFormat();
        if (date && displayFormat) {
          return date && date.format(displayFormat);
        }
        return (0, _toLocalizedDateString2['default'])(date);
      }

      return getDateString;
    }()
  }, {
    key: 'clearDate',
    value: function () {
      function clearDate() {
        var _props4 = this.props,
            onDateChange = _props4.onDateChange,
            reopenPickerOnClearDate = _props4.reopenPickerOnClearDate,
            onFocusChange = _props4.onFocusChange;

        onDateChange(null);
        if (reopenPickerOnClearDate) {
          onFocusChange({ focused: true });
        }
      }

      return clearDate;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _props5 = this.props,
            id = _props5.id,
            placeholder = _props5.placeholder,
            disabled = _props5.disabled,
            focused = _props5.focused,
            isFocused = _props5.isFocused,
            required = _props5.required,
            readOnly = _props5.readOnly,
            openDirection = _props5.openDirection,
            showClearDate = _props5.showClearDate,
            showCaret = _props5.showCaret,
            showDefaultInputIcon = _props5.showDefaultInputIcon,
            inputIconPosition = _props5.inputIconPosition,
            customCloseIcon = _props5.customCloseIcon,
            customInputIcon = _props5.customInputIcon,
            date = _props5.date,
            phrases = _props5.phrases,
            onKeyDownArrowDown = _props5.onKeyDownArrowDown,
            onKeyDownQuestionMark = _props5.onKeyDownQuestionMark,
            screenReaderMessage = _props5.screenReaderMessage,
            isRTL = _props5.isRTL,
            noBorder = _props5.noBorder,
            block = _props5.block,
            small = _props5.small,
            regular = _props5.regular,
            verticalSpacing = _props5.verticalSpacing;


        var displayValue = this.getDateString(date);

        return _react2['default'].createElement(_SingleDatePickerInput2['default'], {
          id: id,
          placeholder: placeholder,
          focused: focused,
          isFocused: isFocused,
          disabled: disabled,
          required: required,
          readOnly: readOnly,
          openDirection: openDirection,
          showCaret: showCaret,
          onClearDate: this.clearDate,
          showClearDate: showClearDate,
          showDefaultInputIcon: showDefaultInputIcon,
          inputIconPosition: inputIconPosition,
          customCloseIcon: customCloseIcon,
          customInputIcon: customInputIcon,
          displayValue: displayValue,
          onChange: this.onChange,
          onFocus: this.onFocus,
          onKeyDownShiftTab: this.onClearFocus,
          onKeyDownTab: this.onClearFocus,
          onKeyDownArrowDown: onKeyDownArrowDown,
          onKeyDownQuestionMark: onKeyDownQuestionMark,
          screenReaderMessage: screenReaderMessage,
          phrases: phrases,
          isRTL: isRTL,
          noBorder: noBorder,
          block: block,
          small: small,
          regular: regular,
          verticalSpacing: verticalSpacing
        });
      }

      return render;
    }()
  }]);

  return SingleDatePickerInputController;
}(_baseClass2['default']);

exports['default'] = SingleDatePickerInputController;


SingleDatePickerInputController.propTypes = propTypes;
SingleDatePickerInputController.defaultProps = defaultProps;