(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jszip')) :
  typeof define === 'function' && define.amd ? define(['jszip'], factory) :
  (global.xlsx = factory(global.JSZip));
}(this, (function (Zip) { 'use strict';

Zip = 'default' in Zip ? Zip['default'] : Zip;

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

function attrEscape(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/\t/g, '&#x9;').replace(/\n/g, '&#xA;').replace(/\r/g, '&#xD;');
}
function escape(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r/g, '&#xD;');
}

var HEAD = Symbol('head');

function props() {
  for (var _len = arguments.length, attrs = Array(_len), _key = 0; _key < _len; _key++) {
    attrs[_key] = arguments[_key];
  }

  return function (clazz) {
    var target = clazz.prototype || clazz;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var name = _step.value;

        Object.defineProperty(target, name, {
          get: function get() {
            if (this.attributes) {
              return this.attributes[name];
            }
          },
          set: function set(value) {
            if (this.attributes === undefined) {
              this.attributes = {};
            }
            this.attributes[name] = value;
          },

          configurable: true,
          enumerable: true
        });
      };

      for (var _iterator = attrs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return clazz;
  };
}

var Node = function () {
  function Node() {
    var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var xmlName = arguments[2];
    classCallCheck(this, Node);
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = Object.keys(attributes)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var key = _step2.value;

        this[key] = attributes[key];
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    this.children = children;
    this._xmlName = xmlName || this.constructor.name.substring(1);
  }

  createClass(Node, [{
    key: 'render',
    value: function render() {
      function walk(tree) {
        var name = tree._xmlName;
        var attributes = tree.attributes,
            children = tree.children;

        var tokens = [];

        if (tree[HEAD]) {
          tokens.push(tree[HEAD]);
        }
        tokens.push('<' + name);

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = Object.keys(attributes || {})[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var key = _step3.value;

            var v = attributes[key];
            if (v === undefined) continue;
            if (typeof v === 'string') {
              v = attrEscape(v);
            }
            if (typeof v === 'boolean') {
              v = v ? 1 : 0;
            }
            tokens.push(' ' + key + '="' + v + '"');
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        if (!children.length) {
          tokens.push('/>');
          return tokens;
        }
        tokens.push('>');
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var child = _step4.value;

            if (child instanceof Node) {
              tokens.push(child.render());
            } else if (typeof child === 'string') {
              tokens.push(escape(child));
            } else {
              tokens.push(child.toString());
            }
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        tokens.push('</' + name + '>');
        return tokens;
      }
      return walk(this).join('');
    }
  }]);
  return Node;
}();

var NumFmtsCount = 163;
var NumFmt = {
  0: 'general',
  1: '0',
  2: '0.00',
  3: '#,##0',
  4: '#,##0.00',
  9: '0%',
  10: '0.00%',
  11: '0.00e+00',
  12: '# ?/?',
  13: '# ??/??',
  14: 'mm-dd-yy',
  15: 'd-mmm-yy',
  16: 'd-mmm',
  17: 'mmm-yy',
  18: 'h:mm am/pm',
  19: 'h:mm:ss am/pm',
  20: 'h:mm',
  21: 'h:mm:ss',
  22: 'm/d/yy h:mm',
  37: '#,##0 ;(#,##0)',
  38: '#,##0 ;[red](#,##0)',
  39: '#,##0.00;(#,##0.00)',
  40: '#,##0.00;[red](#,##0.00)',
  41: '_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)',
  42: '_("$"* #,##0_);_("$* (#,##0);_("$"* "-"_);_(@_)',
  43: '_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)',
  44: '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)',
  45: 'mm:ss',
  46: '[h]:mm:ss',
  47: 'mmss.0',
  48: '##0.0e+0',
  49: '@'
};

var NumFmtInv = {};
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = Object.keys(NumFmt)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var k = _step.value;

    NumFmtInv[NumFmt[k]] = k;
  }
  // AA => 26
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

function col2num(colstr) {
  var d = 0;
  for (var i = 0; i !== colstr.length; ++i) {
    d = 26 * d + colstr.charCodeAt(i) - 64;
  }
  return d - 1;
}
// 26 => AA
function num2col(col) {
  var s = '';
  for (++col; col; col = Math.floor((col - 1) / 26)) {
    s = String.fromCharCode((col - 1) % 26 + 65) + s;
  }
  return s;
}
// B3 => {x: 1, y: 2}
function cid2coord(cid) {
  var temp = cid.match(/([A-Z]+)(\d+)/);
  return {
    x: col2num(temp[1]),
    y: parseInt(temp[2], 10) - 1
  };
}

function handleStyle(style, numFmtId, styles) {
  var _style$makeXStyleElem = style.makeXStyleElements(),
      xFont = _style$makeXStyleElem.xFont,
      xFill = _style$makeXStyleElem.xFill,
      xBorder = _style$makeXStyleElem.xBorder,
      xXf = _style$makeXStyleElem.xXf;

  var fontId = styles.addFont(xFont);
  var fillId = styles.addFill(xFill);

  // HACK - adding light grey fill, as in OO and Google
  var greyfill = new Xfill({
    patternFill: new XpatternFill({ patternType: 'lightGray' })
  });
  styles.addFill(greyfill);

  var borderId = styles.addBorder(xBorder);
  xXf.fontId = fontId;
  xXf.fillId = fillId;
  xXf.borderId = borderId;
  xXf.numFmtId = numFmtId;
  // apply the numFmtId when it is not the default cellxf
  if (xXf.numFmtId > 0) {
    xXf.applyNumberFormat = true;
  }

  xXf.alignment.horizontal = style.align.h;
  xXf.alignment.indent = style.align.indent;
  xXf.alignment.shrinkToFit = style.align.shrinkToFit;
  xXf.alignment.textRotation = style.align.textRotation;
  xXf.alignment.vertical = style.align.v;
  xXf.alignment.wrapText = style.align.wrapText;

  return styles.addCellXf(xXf);
}

function handleNumFmtId(numFmtId, styles) {
  var xf = new Xxf({ numFmtId: numFmtId });
  if (numFmtId > 0) {
    xf.applyNumberFormat = true;
  }
  return styles.addCellXf(xf);
}

function toExcelTime(d) {
  var unix = d.getTime() / 1000;
  return unix / 86400.0 + 25569.0;
}



var lib = Object.freeze({
	NumFmt: NumFmt,
	NumFmtInv: NumFmtInv,
	NumFmtsCount: NumFmtsCount,
	col2num: col2num,
	num2col: num2col,
	cid2coord: cid2coord,
	handleStyle: handleStyle,
	handleNumFmtId: handleNumFmtId,
	toExcelTime: toExcelTime
});

var _dec;
var _class;
var _dec2;
var _class3;
var _dec3;
var _class4;
var _dec4;
var _class5;
var _dec5;
var _class6;
var _dec6;
var _class7;
var _dec7;
var _class8;
var _dec8;
var _class9;
var _dec9;
var _class10;
var _dec10;
var _class11;
var _dec11;
var _class12;
var _dec12;
var _class13;
var _dec13;
var _class14;
var _dec14;
var _class15;
var _dec15;
var _class16;
var _dec16;
var _class17;

var XstyleSheet = (_dec = props('xmlns'), _dec(_class = function (_Node) {
  inherits(XstyleSheet, _Node);

  function XstyleSheet(_ref, children) {
    var _ref$xmlns = _ref.xmlns,
        xmlns = _ref$xmlns === undefined ? 'http://schemas.openxmlformats.org/spreadsheetml/2006/main' : _ref$xmlns;
    classCallCheck(this, XstyleSheet);

    var _this = possibleConstructorReturn(this, (XstyleSheet.__proto__ || Object.getPrototypeOf(XstyleSheet)).call(this, { xmlns: xmlns }, children));

    _this.fonts = null;
    _this.fills = null;
    _this.borders = null;
    _this.cellStyles = null;
    _this.cellStyleXfs = null;
    _this.cellXfs = null;
    _this.numFmts = null;
    _this.numFmtRefTable = {};

    _this[HEAD] = '<?xml version="1.0" encoding="UTF-8"?>';
    return _this;
  }

  createClass(XstyleSheet, [{
    key: 'render',
    value: function render() {
      this.children = [];
      if (this.numFmts) this.children.push(this.numFmts);
      if (this.fonts) this.children.push(this.fonts);
      if (this.fills) this.children.push(this.fills);
      if (this.borders) this.children.push(this.borders);
      if (this.cellStyleXfs) this.children.push(this.cellStyleXfs);
      if (this.cellXfs) this.children.push(this.cellXfs);
      if (this.cellStyles) this.children.push(this.cellStyles);
      return get(XstyleSheet.prototype.__proto__ || Object.getPrototypeOf(XstyleSheet.prototype), 'render', this).call(this);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.children = [];
      this.fonts = new Xfonts();
      this.fills = new Xfills();
      this.borders = new Xborders();
      this.cellXfs = new XcellXfs({ count: 1 }, [new Xxf()]);
      this.numFmts = new XnumFmts();
      this.addBorder(new Xborder({
        left: { style: 'none' },
        right: { style: 'none' },
        top: { style: 'none' },
        bottom: { style: 'none' }
      }));
    }
  }, {
    key: 'addFont',
    value: function addFont(xFont) {
      if (!xFont.name) return 0;
      var list = this.fonts.children;
      var len = list.length;
      for (var i = 0; i < list.length; i++) {
        if (xFont.equals(list[i])) return i;
      }
      list.push(xFont);
      this.fonts.count = list.length;
      return len;
    }
  }, {
    key: 'addFill',
    value: function addFill(xFill) {
      var list = this.fills.children;
      var len = list.length;
      for (var i = 0; i < list.length; i++) {
        if (xFill.equals(list[i])) return i;
      }
      list.push(xFill);
      this.fills.count = list.length;
      return len;
    }
  }, {
    key: 'addBorder',
    value: function addBorder(xBorder) {
      var list = this.borders.children;
      var len = list.length;
      for (var i = 0; i < list.length; i++) {
        if (xBorder.equals(list[i])) return i;
      }
      list.push(xBorder);
      this.borders.count = list.length;
      return len;
    }
  }, {
    key: 'addCellXf',
    value: function addCellXf(xXf) {
      var list = this.cellXfs.children;
      var len = list.length;
      for (var i = 0; i < list.length; i++) {
        if (xXf.equals(list[i])) return i;
      }
      list.push(xXf);
      this.cellXfs.count = list.length;
      return len;
    }
  }, {
    key: 'addNumFmt',
    value: function addNumFmt(xNumFmt) {
      if (xNumFmt.numFmtId <= NumFmtsCount) return;
      if (this.numFmtRefTable[xNumFmt.numFmtId] === undefined) {
        this.numFmts.children.push(xNumFmt);
        this.numFmts.count = this.numFmts.children.length;
        this.numFmtRefTable[xNumFmt.numFmtId] = xNumFmt;
      }
    }
  }, {
    key: 'newNumFmt',
    value: function newNumFmt(formatCode) {
      if (!formatCode) return new XnumFmt({ numFmtId: 0, formatCode: 'general' });
      var numFmtId = NumFmtInv[formatCode];
      if (numFmtId !== undefined) {
        return new XnumFmt({ numFmtId: numFmtId, formatCode: formatCode });
      }
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.numFmts.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var numFmt = _step.value;

          if (formatCode === numFmt.formatCode) return numFmt;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      numFmtId = NumFmtsCount + 1;
      do {
        if (this.numFmtRefTable[numFmtId]) {
          numFmtId++;
        } else {
          this.addNumFmt(new XnumFmt({ numFmtId: numFmtId, formatCode: formatCode }));
          break;
        }
      } while (1);
      return new XnumFmt({ numFmtId: numFmtId, formatCode: formatCode });
    }
  }]);
  return XstyleSheet;
}(Node)) || _class);

var XnumFmts = (_dec2 = props('count'), _dec2(_class3 = function (_Node2) {
  inherits(XnumFmts, _Node2);

  function XnumFmts() {
    classCallCheck(this, XnumFmts);
    return possibleConstructorReturn(this, (XnumFmts.__proto__ || Object.getPrototypeOf(XnumFmts)).apply(this, arguments));
  }

  createClass(XnumFmts, [{
    key: 'render',
    value: function render() {
      if (this.count) return get(XnumFmts.prototype.__proto__ || Object.getPrototypeOf(XnumFmts.prototype), 'render', this).call(this);
      return '';
    }
  }]);
  return XnumFmts;
}(Node)) || _class3);

var XnumFmt = (_dec3 = props('numFmtId', 'formatCode'), _dec3(_class4 = function (_Node3) {
  inherits(XnumFmt, _Node3);

  function XnumFmt() {
    classCallCheck(this, XnumFmt);
    return possibleConstructorReturn(this, (XnumFmt.__proto__ || Object.getPrototypeOf(XnumFmt)).apply(this, arguments));
  }

  return XnumFmt;
}(Node)) || _class4);

var Xfonts = (_dec4 = props('count'), _dec4(_class5 = function (_Node4) {
  inherits(Xfonts, _Node4);

  function Xfonts() {
    classCallCheck(this, Xfonts);
    return possibleConstructorReturn(this, (Xfonts.__proto__ || Object.getPrototypeOf(Xfonts)).apply(this, arguments));
  }

  createClass(Xfonts, [{
    key: 'render',
    value: function render() {
      if (this.count) return get(Xfonts.prototype.__proto__ || Object.getPrototypeOf(Xfonts.prototype), 'render', this).call(this);
      return '';
    }
  }]);
  return Xfonts;
}(Node)) || _class5);

var Xfont = (_dec5 = props('sz', 'name', 'family', 'charset', 'color', 'b', 'i', 'u'), _dec5(_class6 = function (_Node5) {
  inherits(Xfont, _Node5);

  function Xfont() {
    classCallCheck(this, Xfont);
    return possibleConstructorReturn(this, (Xfont.__proto__ || Object.getPrototypeOf(Xfont)).apply(this, arguments));
  }

  createClass(Xfont, [{
    key: 'render',
    value: function render() {
      var str = '<font>';
      if (this.sz) str += '<sz val="' + this.sz + '"/>';
      if (this.name) str += '<name val="' + this.name + '"/>';
      if (this.family) str += '<family val="' + this.family + '"/>';
      if (this.charset) str += '<charset val="' + this.charset + '"/>';
      if (this.color) str += '<color rgb="' + this.color + '"/>';
      if (this.b) str += '<b/>';
      if (this.i) str += '<i/>';
      if (this.u) str += '<u/>';
      return str + '</font>';
    }
  }, {
    key: 'equals',
    value: function equals(o) {
      return this.sz === o.sz && this.name === o.name && this.family === o.family && this.charset === o.charset && this.color === o.color && this.b === o.b && this.i === o.i && this.u === o.u;
    }
  }]);
  return Xfont;
}(Node)) || _class6);

var Xfills = (_dec6 = props('count'), _dec6(_class7 = function (_Node6) {
  inherits(Xfills, _Node6);

  function Xfills() {
    classCallCheck(this, Xfills);
    return possibleConstructorReturn(this, (Xfills.__proto__ || Object.getPrototypeOf(Xfills)).apply(this, arguments));
  }

  createClass(Xfills, [{
    key: 'render',
    value: function render() {
      if (this.count) return get(Xfills.prototype.__proto__ || Object.getPrototypeOf(Xfills.prototype), 'render', this).call(this);
      return '';
    }
  }]);
  return Xfills;
}(Node)) || _class7);

var Xfill = (_dec7 = props('patternFill'), _dec7(_class8 = function (_Node7) {
  inherits(Xfill, _Node7);

  function Xfill() {
    classCallCheck(this, Xfill);
    return possibleConstructorReturn(this, (Xfill.__proto__ || Object.getPrototypeOf(Xfill)).apply(this, arguments));
  }

  createClass(Xfill, [{
    key: 'render',
    value: function render() {
      return '<fill>' + this.patternFill.render() + '</fill>';
    }
  }, {
    key: 'equals',
    value: function equals(o) {
      var pf1 = this.patternFill;
      var pf2 = o.patternFill;
      if (pf1 && pf2) {
        return pf1.patternType === pf2.patternType && pf1.fgColor === pf2.fgColor && pf1.bgColor === pf2.bgColor;
      }
      return !pf1 && !pf2;
    }
  }]);
  return Xfill;
}(Node)) || _class8);

var XpatternFill = (_dec8 = props('patternType', 'fgColor', 'bgColor'), _dec8(_class9 = function (_Node8) {
  inherits(XpatternFill, _Node8);

  function XpatternFill() {
    classCallCheck(this, XpatternFill);
    return possibleConstructorReturn(this, (XpatternFill.__proto__ || Object.getPrototypeOf(XpatternFill)).apply(this, arguments));
  }

  createClass(XpatternFill, [{
    key: 'render',
    value: function render() {
      var str = '<patternFill patternType="' + this.patternType + '">';
      if (this.fgColor) str += '<fgColor rgb="' + this.fgColor + '"/>';
      if (this.bgColor) str += '<bgColor rgb="' + this.bgColor + '"/>';
      return str + '</patternFill>';
    }
  }]);
  return XpatternFill;
}(Node)) || _class9);

var Xborders = (_dec9 = props('count'), _dec9(_class10 = function (_Node9) {
  inherits(Xborders, _Node9);

  function Xborders() {
    classCallCheck(this, Xborders);
    return possibleConstructorReturn(this, (Xborders.__proto__ || Object.getPrototypeOf(Xborders)).apply(this, arguments));
  }

  createClass(Xborders, [{
    key: 'render',
    value: function render() {
      if (this.count) return get(Xborders.prototype.__proto__ || Object.getPrototypeOf(Xborders.prototype), 'render', this).call(this);
      return '';
    }
  }]);
  return Xborders;
}(Node)) || _class10);

var Xborder = (_dec10 = props('left', 'right', 'top', 'bottom'), _dec10(_class11 = function (_Node10) {
  inherits(Xborder, _Node10);

  function Xborder() {
    classCallCheck(this, Xborder);
    return possibleConstructorReturn(this, (Xborder.__proto__ || Object.getPrototypeOf(Xborder)).apply(this, arguments));
  }

  createClass(Xborder, [{
    key: '_renderLine',
    value: function _renderLine(pos) {
      var posVal = this[pos];
      if (!posVal) return '';

      var str = '<' + pos + ' style="' + posVal.style + '">';
      if (posVal.color) str += '<color rgb="' + posVal.color + '"/>';
      return str + ('</' + pos + '>');
    }
  }, {
    key: 'render',
    value: function render() {
      var str = '<border>';
      str += this._renderLine('left');
      str += this._renderLine('right');
      str += this._renderLine('top');
      str += this._renderLine('bottom');
      return str + '</border>';
    }
  }, {
    key: 'equals',
    value: function equals(o) {
      var check = function check(a, b) {
        if (a && b) {
          return a.style === b.style && a.color === b.color;
        }
        return !a && !b;
      };
      return check(this.left, o.left) && check(this.right, o.right) && check(this.top, o.top) && check(this.bottom, o.bottom);
    }
  }]);
  return Xborder;
}(Node)) || _class11);

var XcellStyles = (_dec11 = props('count'), _dec11(_class12 = function (_Node11) {
  inherits(XcellStyles, _Node11);

  function XcellStyles() {
    classCallCheck(this, XcellStyles);
    return possibleConstructorReturn(this, (XcellStyles.__proto__ || Object.getPrototypeOf(XcellStyles)).apply(this, arguments));
  }

  createClass(XcellStyles, [{
    key: 'render',
    value: function render() {
      if (this.count) return get(XcellStyles.prototype.__proto__ || Object.getPrototypeOf(XcellStyles.prototype), 'render', this).call(this);
      return '';
    }
  }]);
  return XcellStyles;
}(Node)) || _class12);

var XcellStyle = (_dec12 = props('builtInId', 'customBuiltIn', 'hidden', 'iLevel', 'name', 'xfId'), _dec12(_class13 = function (_Node12) {
  inherits(XcellStyle, _Node12);

  function XcellStyle() {
    classCallCheck(this, XcellStyle);
    return possibleConstructorReturn(this, (XcellStyle.__proto__ || Object.getPrototypeOf(XcellStyle)).apply(this, arguments));
  }

  return XcellStyle;
}(Node)) || _class13);

var XcellStyleXfs = (_dec13 = props('count'), _dec13(_class14 = function (_Node13) {
  inherits(XcellStyleXfs, _Node13);

  function XcellStyleXfs() {
    classCallCheck(this, XcellStyleXfs);
    return possibleConstructorReturn(this, (XcellStyleXfs.__proto__ || Object.getPrototypeOf(XcellStyleXfs)).apply(this, arguments));
  }

  createClass(XcellStyleXfs, [{
    key: 'render',
    value: function render() {
      if (this.count) return get(XcellStyleXfs.prototype.__proto__ || Object.getPrototypeOf(XcellStyleXfs.prototype), 'render', this).call(this);
      return '';
    }
  }]);
  return XcellStyleXfs;
}(Node)) || _class14);

var XcellXfs = (_dec14 = props('count'), _dec14(_class15 = function (_Node14) {
  inherits(XcellXfs, _Node14);

  function XcellXfs() {
    classCallCheck(this, XcellXfs);
    return possibleConstructorReturn(this, (XcellXfs.__proto__ || Object.getPrototypeOf(XcellXfs)).apply(this, arguments));
  }

  createClass(XcellXfs, [{
    key: 'render',
    value: function render() {
      if (this.count) return get(XcellXfs.prototype.__proto__ || Object.getPrototypeOf(XcellXfs.prototype), 'render', this).call(this);
      return '';
    }
  }]);
  return XcellXfs;
}(Node)) || _class15);

var Xxf = (_dec15 = props('applyAlignment', 'applyBorder', 'applyFont', 'applyFill', 'applyNumberFormat', 'applyProtection', 'borderId', 'fillId', 'fontId', 'numFmtId', 'xfId'), _dec15(_class16 = function (_Node15) {
  inherits(Xxf, _Node15);

  function Xxf(attrs, children) {
    classCallCheck(this, Xxf);

    var defaults$$1 = {
      applyAlignment: false,
      applyBorder: false,
      applyFont: false,
      applyFill: false,
      applyNumberFormat: false,
      applyProtection: false,
      borderId: 0,
      fillId: 0,
      fontId: 0,
      numFmtId: 0
    };

    var _this15 = possibleConstructorReturn(this, (Xxf.__proto__ || Object.getPrototypeOf(Xxf)).call(this, _extends({}, defaults$$1, attrs), children));

    _this15.alignment = new Xalignment();
    return _this15;
  }

  createClass(Xxf, [{
    key: 'render',
    value: function render() {
      if (this.alignment) {
        this.children = [this.alignment];
      }
      return get(Xxf.prototype.__proto__ || Object.getPrototypeOf(Xxf.prototype), 'render', this).call(this);
    }
  }, {
    key: 'equals',
    value: function equals(o) {
      return this.applyAlignment === o.applyAlignment && this.applyBorder === o.applyBorder && this.applyFont === o.applyFont && this.applyFill === o.applyFill && this.applyProtection === o.applyProtection && this.borderId === o.borderId && this.fillId === o.fillId && this.fontId === o.fontId && this.numFmtId === o.numFmtId && this.xfId === o.xfId && this.alignment.equals(o.alignment);
    }
  }]);
  return Xxf;
}(Node)) || _class16);

var Xalignment = (_dec16 = props('horizontal', 'indent', 'shrinkToFit', 'textRotation', 'vertical', 'wrapText'), _dec16(_class17 = function (_Node16) {
  inherits(Xalignment, _Node16);

  function Xalignment(attrs) {
    var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    classCallCheck(this, Xalignment);

    var defaults$$1 = {
      horizontal: 'general',
      indent: 0,
      shrinkToFit: false,
      textRotation: 0,
      vertical: 'bottom',
      wrapText: false
    };
    return possibleConstructorReturn(this, (Xalignment.__proto__ || Object.getPrototypeOf(Xalignment)).call(this, _extends({}, defaults$$1, attrs), children));
  }

  createClass(Xalignment, [{
    key: 'equals',
    value: function equals(o) {
      return this.horizontal === o.horizontal && this.indent === o.indent && this.shrinkToFit === o.shrinkToFit && this.textRotation === o.textRotation && this.vertical === o.vertical && this.wrapText === o.wrapText;
    }
  }]);
  return Xalignment;
}(Node)) || _class17);

var Style = function () {
  function Style() {
    classCallCheck(this, Style);
    this.applyBorder = false;
    this.applyFill = false;
    this.applyFont = false;
    this.applyAlignment = false;
    this.namedStyleIndex = null;

    this.border = new Border({});
    this.fill = new Fill({});
    this.font = new Font({});
    this.align = new Alignment({});
  }

  createClass(Style, [{
    key: 'makeXStyleElements',
    value: function makeXStyleElements() {
      var xFont = new Xfont({
        sz: this.font.size,
        name: this.font.name,
        family: this.font.family,
        charset: this.font.charset,
        color: this.font.color,
        b: this.font.bold,
        i: this.font.italic,
        u: this.font.underline
      });
      var xFill = new Xfill({
        patternFill: new XpatternFill({
          patternType: this.fill.patternType,
          fgColor: this.fill.fgColor,
          bgColor: this.fill.bgColor
        })
      });
      var xBorder = new Xborder({
        left: { style: this.border.left, color: this.border.leftColor },
        right: { style: this.border.right, color: this.border.rightColor },
        top: { style: this.border.top, color: this.border.topColor },
        bottom: { style: this.border.bottom, color: this.border.bottomColor }
      });
      var xXf = new Xxf({
        numFmtId: 0,
        applyBorder: this.applyBorder,
        applyFill: this.applyFill,
        applyFont: this.applyFont,
        applyAlignment: this.applyAlignment
      });

      xXf.alignment = new Xalignment({
        horizontal: this.align.h,
        indent: this.align.indent,
        shrinkToFit: this.align.shrinkToFit,
        textRotation: this.align.textRotation,
        vertical: this.align.v,
        wrapText: this.align.wrapText
      });

      if (this.namedStyleIndex !== null) {
        xXf.xfId = this.namedStyleIndex;
      }

      return { xFont: xFont, xFill: xFill, xBorder: xBorder, xXf: xXf };
    }
  }]);
  return Style;
}();

var Border = function Border(_ref) {
  var _ref$left = _ref.left,
      left = _ref$left === undefined ? 'none' : _ref$left,
      _ref$right = _ref.right,
      right = _ref$right === undefined ? 'none' : _ref$right,
      _ref$top = _ref.top,
      top = _ref$top === undefined ? 'none' : _ref$top,
      _ref$bottom = _ref.bottom,
      bottom = _ref$bottom === undefined ? 'none' : _ref$bottom;
  classCallCheck(this, Border);
  this.leftColor = undefined;
  this.rightColor = undefined;
  this.topColor = undefined;
  this.bottomColor = undefined;

  this.left = left;
  this.right = right;
  this.top = top;
  this.bottom = bottom;
};

var Fill = function Fill(_ref2) {
  var _ref2$patternType = _ref2.patternType,
      patternType = _ref2$patternType === undefined ? 'none' : _ref2$patternType,
      _ref2$fgColor = _ref2.fgColor,
      fgColor = _ref2$fgColor === undefined ? 'FFFFFFFF' : _ref2$fgColor,
      _ref2$bgColor = _ref2.bgColor,
      bgColor = _ref2$bgColor === undefined ? '00000000' : _ref2$bgColor;
  classCallCheck(this, Fill);

  this.patternType = patternType;
  this.fgColor = fgColor;
  this.bgColor = bgColor;
};

var Font = function Font(_ref3) {
  var _ref3$size = _ref3.size,
      size = _ref3$size === undefined ? 12 : _ref3$size,
      _ref3$name = _ref3.name,
      name = _ref3$name === undefined ? 'Verdana' : _ref3$name;
  classCallCheck(this, Font);
  this.family = 0;
  this.charset = 0;
  this.color = undefined;
  this.bold = false;
  this.italic = false;
  this.underline = false;

  this.size = size;
  this.name = name;
};

var Alignment = function Alignment(_ref4) {
  var _ref4$h = _ref4.h,
      h = _ref4$h === undefined ? 'general' : _ref4$h,
      _ref4$v = _ref4.v,
      v = _ref4$v === undefined ? 'bottom' : _ref4$v;
  classCallCheck(this, Alignment);
  this.indent = 0;
  this.shrinkToFit = false;
  this.textRotation = 0;
  this.wrapText = false;

  this.h = h;
  this.v = v;
};



var style = Object.freeze({
	Style: Style,
	Border: Border,
	Fill: Fill,
	Font: Font,
	Alignment: Alignment
});

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
var index$2 = function (obj) {
  return obj != null && (isBuffer$1(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
};

function isBuffer$1 (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer$1(obj.slice(0, 0))
}

var isBuffer = index$2;
var toString = Object.prototype.toString;

/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

var index$1 = function kindOf(val) {
  // primitivies
  if (typeof val === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (typeof val === 'string' || val instanceof String) {
    return 'string';
  }
  if (typeof val === 'number' || val instanceof Number) {
    return 'number';
  }

  // functions
  if (typeof val === 'function' || val instanceof Function) {
    return 'function';
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  // other objects
  var type = toString.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }
  if (type === '[object Error]') {
    return 'error';
  }

  // buffer
  if (typeof Buffer !== 'undefined' && isBuffer(val)) {
    return 'buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }

  // typed arrays
  if (type === '[object Int8Array]') {
    return 'int8array';
  }
  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }
  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }
  if (type === '[object Int16Array]') {
    return 'int16array';
  }
  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }
  if (type === '[object Int32Array]') {
    return 'int32array';
  }
  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }
  if (type === '[object Float32Array]') {
    return 'float32array';
  }
  if (type === '[object Float64Array]') {
    return 'float64array';
  }

  // must be a plain object
  return 'object';
};

var CellType = {
  TypeString: 49,
  TypeFormula: 0,
  TypeNumeric: 1,
  TypeBool: 0,
  TypeInline: 0,
  TypeError: 0,
  TypeDate: 14,
  TypeGeneral: 0
};

var Cell = function () {
  function Cell(_ref) {
    var row = _ref.row;
    classCallCheck(this, Cell);
    this._value = '';
    this._style = null;
    this.formula = '';
    this.numFmt = '';
    this.date1904 = false;
    this.hidden = false;
    this.hMerge = 0;
    this.vMerge = 0;
    this.cellType = 'TypeString';

    this.row = row;
  }

  createClass(Cell, [{
    key: 'setString',
    value: function setString(v) {
      this._value = v;
      this.formula = '';
      this.cellType = 'TypeString';
    }
  }, {
    key: 'setDate',
    value: function setDate(v) {
      this._value = parseInt(toExcelTime(v));
      this.formula = '';
      this.numFmt = NumFmt[14];
      this.cellType = 'TypeDate';
    }
  }, {
    key: 'setDateTime',
    value: function setDateTime(v) {
      this._value = toExcelTime(v);
      this.formula = '';
      this.numFmt = NumFmt[22];
      this.cellType = 'TypeDate';
    }
  }, {
    key: 'setNumber',
    value: function setNumber(v) {
      this._value = v;
      this.formula = '';
      this.numFmt = NumFmt[0];
      this.cellType = 'TypeNumeric';
    }
  }, {
    key: 'setBool',
    value: function setBool(v) {
      this._value = v ? 1 : 0;
      this.cellType = 'TypeBool';
    }
  }, {
    key: 'setFormula',
    value: function setFormula(f) {
      this.formula = f;
      this.cellType = 'TypeFormula';
    }
  }, {
    key: 'style',
    get: function get() {
      if (this._style === null) {
        this._style = new Style();
      }
      return this._style;
    },
    set: function set(s) {
      this._style = s;
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    },
    set: function set(v) {
      var t = index$1(v);
      if (t === 'null' || t === 'undefined') {
        return this.setString('');
      }
      if (t === 'date') {
        return this.setDateTime(v);
      }
      if (t === 'number') {
        return this.setNumber(v);
      }
      if (t === 'string') {
        return this.setString(v);
      }
      if (t === 'boolean') {
        return this.setBool(v);
      }
      return this.setString(v.toString());
    }
  }]);
  return Cell;
}();



var cell = Object.freeze({
	CellType: CellType,
	Cell: Cell
});

var Col = function () {
  function Col(_ref) {
    var min = _ref.min,
        max = _ref.max,
        _ref$hidden = _ref.hidden,
        hidden = _ref$hidden === undefined ? false : _ref$hidden,
        _ref$collapsed = _ref.collapsed,
        collapsed = _ref$collapsed === undefined ? false : _ref$collapsed,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? 0 : _ref$width;
    classCallCheck(this, Col);
    this.outlineLevel = 0;
    this.numFmt = '';

    this.min = min;
    this.max = max;
    this.hidden = hidden;
    this.collapsed = collapsed;
    this.width = width;
    this.style = new Style();
  }

  createClass(Col, [{
    key: 'setType',
    value: function setType(cellType) {
      this.numFmt = NumFmt[cellType];
    }
  }]);
  return Col;
}();



var col = Object.freeze({
	Col: Col
});

var Row = function () {
  function Row(_ref) {
    var sheet = _ref.sheet;
    classCallCheck(this, Row);
    this.cells = [];
    this.hidden = false;
    this.height = 0;
    this.outlineLevel = 0;
    this.isCustom = false;

    this.sheet = sheet;
  }

  createClass(Row, [{
    key: 'setHeightCM',
    value: function setHeightCM(ht) {
      this.height = ht * 28.3464567;
      this.isCustom = true;
    }
  }, {
    key: 'addCell',
    value: function addCell() {
      var cell = new Cell({ row: this });
      this.cells.push(cell);
      this.sheet.maybeAddCol(this.cells.length);
      return cell;
    }
  }]);
  return Row;
}();



var row = Object.freeze({
	Row: Row
});

var _dec$1;
var _class$1;
var _dec2$1;
var _class3$1;
var _dec3$1;
var _class4$1;
var _dec4$1;
var _class5$1;
var _dec5$1;
var _class6$1;
var _dec6$1;
var _class7$1;
var _dec7$1;
var _class8$1;
var _dec8$1;
var _class9$1;
var _dec9$1;
var _class10$1;
var _dec10$1;
var _class11$1;
var _dec11$1;
var _class12$1;
var _dec12$1;
var _class13$1;
var _dec13$1;
var _class14$1;
var _dec14$1;
var _class15$1;
var _dec15$1;
var _class16$1;
var _dec16$1;
var _class17$1;
var _dec17;
var _class18;
var _dec18;
var _class19;

var Xworksheet = (_dec$1 = props('xmlns', 'xmlns:r'), _dec$1(_class$1 = function (_Node) {
  inherits(Xworksheet, _Node);

  function Xworksheet() {
    var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var children = arguments[1];
    classCallCheck(this, Xworksheet);

    attrs['xmlns'] = attrs['xmlns'] || 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
    attrs['xmlns:r'] = attrs['xmlns:r'] || 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';

    var _this = possibleConstructorReturn(this, (Xworksheet.__proto__ || Object.getPrototypeOf(Xworksheet)).call(this, attrs, children));

    _this.sheetPr = null;
    _this.sheetViews = null;
    _this.sheetFormatPr = null;
    _this.printOptions = null;
    _this.pageMargins = null;
    _this.pageSetup = null;
    _this.headerFooter = null;
    _this.mergeCells = null;
    _this.dimension = null;
    _this.cols = null;
    _this.sheetData = null;

    _this[HEAD] = '<?xml version="1.0" encoding="UTF-8"?>';
    return _this;
  }

  createClass(Xworksheet, [{
    key: 'render',
    value: function render() {
      this.children = [];
      if (this.sheetPr) this.children.push(this.sheetPr);
      if (this.dimension) this.children.push(this.dimension);
      if (this.sheetViews) this.children.push(this.sheetViews);
      if (this.sheetFormatPr) this.children.push(this.sheetFormatPr);
      if (this.cols) this.children.push(this.cols);
      if (this.sheetData) this.children.push(this.sheetData);
      if (this.mergeCells) this.children.push(this.mergeCells);
      if (this.printOptions) this.children.push(this.printOptions);
      if (this.pageMargins) this.children.push(this.pageMargins);
      if (this.pageSetup) this.children.push(this.pageSetup);
      if (this.headerFooter) this.children.push(this.headerFooter);
      return get(Xworksheet.prototype.__proto__ || Object.getPrototypeOf(Xworksheet.prototype), 'render', this).call(this);
    }
  }]);
  return Xworksheet;
}(Node)) || _class$1);

var XsheetPr = (_dec2$1 = props('filterMode'), _dec2$1(_class3$1 = function (_Node2) {
  inherits(XsheetPr, _Node2);

  function XsheetPr() {
    classCallCheck(this, XsheetPr);
    return possibleConstructorReturn(this, (XsheetPr.__proto__ || Object.getPrototypeOf(XsheetPr)).apply(this, arguments));
  }

  return XsheetPr;
}(Node)) || _class3$1);

var XpageSetUpPr = (_dec3$1 = props('fitToPage'), _dec3$1(_class4$1 = function (_Node3) {
  inherits(XpageSetUpPr, _Node3);

  function XpageSetUpPr() {
    classCallCheck(this, XpageSetUpPr);
    return possibleConstructorReturn(this, (XpageSetUpPr.__proto__ || Object.getPrototypeOf(XpageSetUpPr)).apply(this, arguments));
  }

  return XpageSetUpPr;
}(Node)) || _class4$1);

var Xdimension = (_dec4$1 = props('ref'), _dec4$1(_class5$1 = function (_Node4) {
  inherits(Xdimension, _Node4);

  function Xdimension() {
    classCallCheck(this, Xdimension);
    return possibleConstructorReturn(this, (Xdimension.__proto__ || Object.getPrototypeOf(Xdimension)).apply(this, arguments));
  }

  return Xdimension;
}(Node)) || _class5$1);

var XsheetViews = function (_Node5) {
  inherits(XsheetViews, _Node5);

  function XsheetViews() {
    classCallCheck(this, XsheetViews);
    return possibleConstructorReturn(this, (XsheetViews.__proto__ || Object.getPrototypeOf(XsheetViews)).apply(this, arguments));
  }

  return XsheetViews;
}(Node);

var XsheetView = (_dec5$1 = props('windowProtection', 'showFormulas', 'showGridLines', 'showRowColHeaders', 'showZeros', 'rightToLeft', 'tabSelected', 'showOutlineSymbols', 'defaultGridColor', 'view', 'topLeftCell', 'colorId', 'zoomScale', 'zoomScaleNormal', 'zoomScalePageLayoutView', 'workbookViewId'), _dec5$1(_class6$1 = function (_Node6) {
  inherits(XsheetView, _Node6);

  function XsheetView() {
    classCallCheck(this, XsheetView);
    return possibleConstructorReturn(this, (XsheetView.__proto__ || Object.getPrototypeOf(XsheetView)).apply(this, arguments));
  }

  return XsheetView;
}(Node)) || _class6$1);

var Xselection = (_dec6$1 = props('pane', 'activeCell', 'activeCellId', 'sqref'), _dec6$1(_class7$1 = function (_Node7) {
  inherits(Xselection, _Node7);

  function Xselection() {
    classCallCheck(this, Xselection);
    return possibleConstructorReturn(this, (Xselection.__proto__ || Object.getPrototypeOf(Xselection)).apply(this, arguments));
  }

  return Xselection;
}(Node)) || _class7$1);

var Xpane = (_dec7$1 = props('xSplit', 'ySplit', 'topLeftCell', 'activePane', 'state'), _dec7$1(_class8$1 = function (_Node8) {
  inherits(Xpane, _Node8);

  function Xpane() {
    classCallCheck(this, Xpane);
    return possibleConstructorReturn(this, (Xpane.__proto__ || Object.getPrototypeOf(Xpane)).apply(this, arguments));
  }

  return Xpane;
}(Node)) || _class8$1);

var XsheetFormatPr = (_dec8$1 = props('defaultColWidth', 'defaultRowHeight', 'outlineLevelCol', 'outlineLevelRow'), _dec8$1(_class9$1 = function (_Node9) {
  inherits(XsheetFormatPr, _Node9);

  function XsheetFormatPr() {
    classCallCheck(this, XsheetFormatPr);
    return possibleConstructorReturn(this, (XsheetFormatPr.__proto__ || Object.getPrototypeOf(XsheetFormatPr)).apply(this, arguments));
  }

  return XsheetFormatPr;
}(Node)) || _class9$1);

var Xcols = function (_Node10) {
  inherits(Xcols, _Node10);

  function Xcols() {
    classCallCheck(this, Xcols);
    return possibleConstructorReturn(this, (Xcols.__proto__ || Object.getPrototypeOf(Xcols)).apply(this, arguments));
  }

  return Xcols;
}(Node);

var Xcol = (_dec9$1 = props('collapsed', 'hidden', 'max', 'min', 'style', 'width', 'customWidth', 'outlineLevel'), _dec9$1(_class10$1 = function (_Node11) {
  inherits(Xcol, _Node11);

  function Xcol() {
    classCallCheck(this, Xcol);
    return possibleConstructorReturn(this, (Xcol.__proto__ || Object.getPrototypeOf(Xcol)).apply(this, arguments));
  }

  return Xcol;
}(Node)) || _class10$1);

var XsheetData = function (_Node12) {
  inherits(XsheetData, _Node12);

  function XsheetData() {
    classCallCheck(this, XsheetData);
    return possibleConstructorReturn(this, (XsheetData.__proto__ || Object.getPrototypeOf(XsheetData)).apply(this, arguments));
  }

  return XsheetData;
}(Node);

var Xrow = (_dec10$1 = props('r', 'spans', 'hidden', 'ht', 'customHeight', 'outlineLevel'), _dec10$1(_class11$1 = function (_Node13) {
  inherits(Xrow, _Node13);

  function Xrow() {
    classCallCheck(this, Xrow);
    return possibleConstructorReturn(this, (Xrow.__proto__ || Object.getPrototypeOf(Xrow)).apply(this, arguments));
  }

  return Xrow;
}(Node)) || _class11$1);

var Xc = (_dec11$1 = props('r', 's', 't'), _dec11$1(_class12$1 = function (_Node14) {
  inherits(Xc, _Node14);

  function Xc(attrs, children) {
    classCallCheck(this, Xc);

    var _this14 = possibleConstructorReturn(this, (Xc.__proto__ || Object.getPrototypeOf(Xc)).call(this, attrs, children));

    _this14.f = null;
    _this14.v = null;
    return _this14;
  }

  createClass(Xc, [{
    key: 'render',
    value: function render() {
      if (this.f !== null) this.children.push(this.f);
      if (this.v !== null) this.children.push(new Node({}, [this.v], 'v'));
      return get(Xc.prototype.__proto__ || Object.getPrototypeOf(Xc.prototype), 'render', this).call(this);
    }
  }]);
  return Xc;
}(Node)) || _class12$1);

var Xf = (_dec12$1 = props('t', 'ref', 'si'), _dec12$1(_class13$1 = function (_Node15) {
  inherits(Xf, _Node15);

  function Xf() {
    classCallCheck(this, Xf);
    return possibleConstructorReturn(this, (Xf.__proto__ || Object.getPrototypeOf(Xf)).apply(this, arguments));
  }

  return Xf;
}(Node)) || _class13$1);

var XmergeCells = (_dec13$1 = props('count'), _dec13$1(_class14$1 = function (_Node16) {
  inherits(XmergeCells, _Node16);

  function XmergeCells() {
    classCallCheck(this, XmergeCells);
    return possibleConstructorReturn(this, (XmergeCells.__proto__ || Object.getPrototypeOf(XmergeCells)).apply(this, arguments));
  }

  return XmergeCells;
}(Node)) || _class14$1);

var XmergeCell = (_dec14$1 = props('ref'), _dec14$1(_class15$1 = function (_Node17) {
  inherits(XmergeCell, _Node17);

  function XmergeCell() {
    classCallCheck(this, XmergeCell);
    return possibleConstructorReturn(this, (XmergeCell.__proto__ || Object.getPrototypeOf(XmergeCell)).apply(this, arguments));
  }

  return XmergeCell;
}(Node)) || _class15$1);

var XprintOptions = (_dec15$1 = props('headings', 'gridLines', 'gridLinesSet', 'horizontalCentered', 'verticalCentered'), _dec15$1(_class16$1 = function (_Node18) {
  inherits(XprintOptions, _Node18);

  function XprintOptions() {
    classCallCheck(this, XprintOptions);
    return possibleConstructorReturn(this, (XprintOptions.__proto__ || Object.getPrototypeOf(XprintOptions)).apply(this, arguments));
  }

  return XprintOptions;
}(Node)) || _class16$1);

var XpageMargins = (_dec16$1 = props('left', 'right', 'top', 'bottom', 'header', 'footer'), _dec16$1(_class17$1 = function (_Node19) {
  inherits(XpageMargins, _Node19);

  function XpageMargins() {
    classCallCheck(this, XpageMargins);
    return possibleConstructorReturn(this, (XpageMargins.__proto__ || Object.getPrototypeOf(XpageMargins)).apply(this, arguments));
  }

  return XpageMargins;
}(Node)) || _class17$1);

var XpageSetup = (_dec17 = props('paperSize', 'scale', 'firstPageNumber', 'fitToWidth', 'fitToHeight', 'pageOrder', 'orientation', 'usePrinterDefaults', 'blackAndWhite', 'draft', 'cellComments', 'useFirstPageNumber', 'horizontalDpi', 'verticalDpi', 'copies'), _dec17(_class18 = function (_Node20) {
  inherits(XpageSetup, _Node20);

  function XpageSetup() {
    classCallCheck(this, XpageSetup);
    return possibleConstructorReturn(this, (XpageSetup.__proto__ || Object.getPrototypeOf(XpageSetup)).apply(this, arguments));
  }

  return XpageSetup;
}(Node)) || _class18);

var XheaderFooter = (_dec18 = props('differentFirst', 'differentOddEven'), _dec18(_class19 = function (_Node21) {
  inherits(XheaderFooter, _Node21);

  function XheaderFooter(attrs, children) {
    classCallCheck(this, XheaderFooter);

    var _this21 = possibleConstructorReturn(this, (XheaderFooter.__proto__ || Object.getPrototypeOf(XheaderFooter)).call(this, attrs, children));

    _this21.oddHeader = null;
    _this21.oddFooter = null;
    return _this21;
  }

  createClass(XheaderFooter, [{
    key: 'render',
    value: function render() {
      if (this.oddHeader !== null) this.children.push(new Node({}, [this.oddHeader], 'oddHeader'));
      if (this.oddFooter !== null) this.children.push(new Node({}, [this.oddFooter], 'oddFooter'));
      return get(XheaderFooter.prototype.__proto__ || Object.getPrototypeOf(XheaderFooter.prototype), 'render', this).call(this);
    }
  }]);
  return XheaderFooter;
}(Node)) || _class19);

function makeXworksheet() {
  var sheet = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Xworksheet();

  sheet.sheetPr = new XsheetPr({ filterMode: false }, [new XpageSetUpPr({ fitToPage: false })]);
  sheet.sheetViews = new XsheetViews({}, [new XsheetView({
    colorId: 64,
    defaultGridColor: true,
    rightToLeft: false,
    showFormulas: false,
    showGridLines: true,
    showOutlineSymbols: true,
    showRowColHeaders: true,
    showZeros: true,
    tabSelected: false,
    topLeftCell: 'A1',
    view: 'normal',
    windowProtection: false,
    workbookViewId: 0,
    zoomScale: 100,
    zoomScaleNormal: 100,
    zoomScalePageLayoutView: 100
  }, [new Xselection({
    activeCell: 'A1',
    activeCellId: 0,
    pane: 'topLeft',
    sqref: 'A1'
  })])]);
  sheet.sheetFormatPr = new XsheetFormatPr({ defaultRowHeight: '12.85' });
  sheet.printOptions = new XprintOptions({
    gridLines: false,
    gridLinesSet: true,
    headings: false,
    horizontalCentered: false,
    verticalCentered: false
  });
  sheet.pageMargins = new XpageMargins({
    left: 0.7875,
    right: 0.7875,
    top: 1.05277777777778,
    bottom: 1.05277777777778,
    header: 0.7875,
    footer: 0.7875
  });
  sheet.pageSetup = new XpageSetup({
    blackAndWhite: false,
    cellComments: 'none',
    copies: 1,
    draft: false,
    firstPageNumber: 1,
    fitToHeight: 1,
    fitToWidth: 1,
    horizontalDpi: 300,
    orientation: 'portrait',
    pageOrder: 'downThenOver',
    paperSize: 9,
    scale: 100,
    useFirstPageNumber: true,
    usePrinterDefaults: false,
    verticalDpi: 300
  });
  var headerFooter = new XheaderFooter();
  headerFooter.oddHeader = '&C&"Times New Roman,Regular"&12&A';
  headerFooter.oddFooter = '&C&"Times New Roman,Regular"&12Page &P';

  sheet.headerFooter = headerFooter;
  return sheet;
}

var Sheet = function () {
  function Sheet(_ref) {
    var name = _ref.name,
        file = _ref.file,
        selected = _ref.selected;
    classCallCheck(this, Sheet);
    this.rows = [];
    this.cols = [];
    this.maxRow = 0;
    this.maxCol = 0;
    this.hidden = false;
    this.sheetViews = [];
    this.sheetFormat = {
      defaultColWidth: 0,
      defaultRowHeight: 0,
      outlineLevelCol: 0,
      outlineLevelRow: 0
    };

    this.name = name;
    this.file = file;
    this.selected = selected;
  }

  createClass(Sheet, [{
    key: 'addRow',
    value: function addRow() {
      var row = new Row({ sheet: this });
      this.rows.push(row);
      if (this.rows.length > this.maxRow) {
        this.maxRow = this.rows.length;
      }
      return row;
    }
  }, {
    key: 'maybeAddCol',
    value: function maybeAddCol(cellCount) {
      if (cellCount > this.maxCol) {
        var col = new Col({
          min: cellCount,
          max: cellCount,
          hidden: false,
          collapsed: false
        });
        this.cols.push(col);
        this.maxCol = cellCount;
      }
    }
  }, {
    key: 'col',
    value: function col(idx) {
      this.maybeAddCol(idx + 1);
      return this.cols[idx];
    }
  }, {
    key: 'row',
    value: function row(idx) {
      for (var len = this.rows.length; len <= idx; len++) {
        this.addRow();
      }
      return this.rows[idx];
    }
  }, {
    key: 'cell',
    value: function cell(row, col) {
      for (var len = this.rows.length; len <= row; len++) {
        this.addRow();
      }
      var r = this.rows[row];
      for (var _len = r.cells.length; _len <= col; _len++) {
        r.addCell();
      }
      return r.cells[col];
    }
  }, {
    key: 'setColWidth',
    value: function setColWidth(startcol, endcol, width) {
      if (startcol > endcol) {
        throw new Error('Could not set width for range ' + startcol + '-' + endcol + ': startcol must be less than endcol.');
      }
      var col = new Col({
        min: startcol + 1,
        max: endcol + 1,
        hidden: false,
        collapsed: false,
        width: width
      });
      this.cols.push(col);
      if (endcol + 1 > this.maxCol) {
        this.maxCol = endcol + 1;
      }
    }
  }, {
    key: 'handleMerged',
    value: function handleMerged() {
      var merged = [];
      for (var r = 0; r < this.rows.length; r++) {
        var row = this.rows[r];
        for (var c = 0; c < row.cells.length; c++) {
          var cell = row.cells[c];
          if (cell.hMerge > 0 || cell.vMerge > 0) {
            merged.push({ r: r, c: c, cell: cell });
          }
        }
      }
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = merged[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref3 = _step.value;
          var _r = _ref3.r,
              _c = _ref3.c,
              _cell = _ref3.cell;

          var left = _cell.style.border.left;
          var right = _cell.style.border.right;
          var top = _cell.style.border.top;
          var bottom = _cell.style.border.bottom;

          _cell.style.border.left = 'none';
          _cell.style.border.right = 'none';
          _cell.style.border.top = 'none';
          _cell.style.border.bottom = 'none';

          for (var rownum = 0; rownum <= _cell.vMerge; rownum++) {
            for (var colnum = 0; colnum <= _cell.hMerge; colnum++) {
              var tmpcell = this.cell(_r + rownum, _c + colnum);
              tmpcell.style.applyBorder = true;
              if (rownum === 0) {
                tmpcell.style.border.top = top;
              }
              if (rownum === _cell.vMerge) {
                tmpcell.style.border.bottom = bottom;
              }
              if (colnum === 0) {
                tmpcell.style.border.left = left;
              }
              if (colnum === _cell.hMerge) {
                tmpcell.style.border.right = right;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'makeXSheet',
    value: function makeXSheet(refTable, styles) {
      var sheet = makeXworksheet();
      var xSheet = new XsheetData();
      var maxRow = 0;
      var maxCell = 0;
      var maxLevelCol = void 0;
      var maxLevelRow = void 0;

      this.handleMerged();

      for (var i = 0; i < this.sheetViews.length; i++) {
        var view = this.sheetViews[i];
        if (view && view.pane) {
          sheet.sheetViews.children[i].children.push(new Xpane({
            xSplit: view.pane.xSplit,
            ySplit: view.pane.ySplit,
            topLeftCell: view.pane.topLeftCell,
            activePane: view.pane.activePane,
            state: view.pane.state
          }));
        }
      }
      if (this.selected) {
        sheet.sheetViews.children[0].tabSelected = true;
      }
      if (this.sheetFormat.defaultRowHeight !== 0) {
        sheet.sheetFormatPr.defaultRowHeight = this.sheetFormat.defaultRowHeight;
      }
      if (this.sheetFormat.defaultColWidth !== 0) {
        sheet.sheetFormatPr.defaultColWidth = this.sheetFormat.defaultColWidth;
      }

      var fIdList = [];
      sheet.cols = new Xcols();
      for (var c = 0; c < this.cols.length; c++) {
        var col = this.cols[c];
        col.min = col.min || 1;
        col.max = col.max || 1;
        var xNumFmt = styles.newNumFmt(col.numFmt);
        var fId = handleStyle(col.style, xNumFmt.numFmtId, styles);

        fIdList.push(fId);

        var customWidth = 0;
        if (col.width === 0) {
          col.width = 9.5;
        } else {
          customWidth = 1;
        }
        sheet.cols.children.push(new Xcol({
          min: col.min,
          max: col.max,
          hidden: col.hidden,
          width: col.width,
          customWidth: customWidth,
          collapsed: col.collapsed,
          outlineLevel: col.outlineLevel,
          style: fId
        }));

        if (col.outlineLevel > maxLevelCol) {
          maxLevelCol = col.outlineLevel;
        }
      }
      for (var r = 0; r < this.rows.length; r++) {
        var row = this.rows[r];
        if (r > maxRow) maxRow = r;
        var xRow = new Xrow({ r: r + 1 });
        if (row.isCustom) {
          xRow.customHeight = true;
          xRow.ht = row.height;
        }
        xRow.outlineLevel = row.outlineLevel;
        if (row.outlineLevel > maxLevelRow) {
          maxLevelRow = row.outlineLevel;
        }
        for (var _c2 = 0; _c2 < row.cells.length; _c2++) {
          var _fId = fIdList[_c2];
          var cell = row.cells[_c2];
          var _xNumFmt = styles.newNumFmt(cell.numFmt);
          var style = cell.style;
          if (style !== null) {
            _fId = handleStyle(style, _xNumFmt.numFmtId, styles);
          } else if (cell.numFmt && this.cols[_c2].numFmt !== cell.numFmt) {
            _fId = handleNumFmtId(_xNumFmt.NumFmtId, styles);
          }

          if (_c2 > maxCell) maxCell = _c2;

          var xC = new Xc({ r: '' + num2col(_c2) + (r + 1) });
          switch (cell.cellType) {
            case 'TypeString':
              if (cell.value) {
                xC.v = refTable.addString(cell.value);
              }
              xC.t = 's';
              xC.s = _fId;
              break;
            case 'TypeBool':
              xC.v = cell.value;
              xC.t = 'b';
              xC.s = _fId;
              break;
            case 'TypeNumeric':
              xC.v = cell.value;
              xC.s = _fId;
              break;
            case 'TypeDate':
              xC.v = cell.value;
              xC.s = _fId;
              break;
            case 'TypeFormula':
              xC.v = cell.value;
              xC.f = new Xf({}, [cell.formula]);
              xC.s = _fId;
              break;
            case 'TypeError':
              xC.v = cell.value;
              xC.f = new Xf({}, [cell.formula]);
              xC.t = 'e';
              xC.s = _fId;
              break;
            case 'TypeGeneral':
              xC.v = cell.value;
              xC.s = _fId;
              break;
          }
          xRow.children.push(xC);
          if (cell.hMerge > 0 || cell.vMerge > 0) {
            // r == rownum, c == colnum
            var start = '' + num2col(_c2) + (r + 1);
            var endcol = _c2 + cell.hMerge;
            var endrow = r + cell.vMerge + 1;
            var end = '' + num2col(endcol) + endrow;
            var mc = new XmergeCell({ ref: start + ':' + end });
            if (sheet.mergeCells === null) {
              sheet.mergeCells = new XmergeCells();
            }
            sheet.mergeCells.children.push(mc);
          }
        }
        xSheet.children.push(xRow);
      }
      // Update sheet format with the freshly determined max levels
      this.sheetFormat.outlineLevelCol = maxLevelCol;
      this.sheetFormat.outlineLevelRow = maxLevelRow;
      // .. and then also apply this to the xml worksheet
      sheet.sheetFormatPr.outlineLevelCol = this.sheetFormat.outlineLevelCol;
      sheet.sheetFormatPr.outlineLevelRow = this.sheetFormat.outlineLevelRow;

      if (sheet.mergeCells !== null) {
        sheet.mergeCells.count = sheet.mergeCells.children.length;
      }

      sheet.sheetData = xSheet;

      var dimension = new Xdimension({
        ref: 'A1:' + num2col(maxCell) + (maxRow + 1)
      });
      if (dimension.ref === 'A1:A1') {
        dimension.ref = 'A1';
      }
      sheet.dimension = dimension;
      return sheet;
    }
  }]);
  return Sheet;
}();



var sheet = Object.freeze({
	Sheet: Sheet
});

var DOT_RELS = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\">\n  <Relationship Id=\"rId1\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument\" Target=\"xl/workbook.xml\"/>\n  <Relationship Id=\"rId2\" Type=\"http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties\" Target=\"docProps/core.xml\"/>\n  <Relationship Id=\"rId3\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties\" Target=\"docProps/app.xml\"/>\n</Relationships>";

var DOCPROPS_APP = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<Properties xmlns=\"http://schemas.openxmlformats.org/officeDocument/2006/extended-properties\" xmlns:vt=\"http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes\">\n  <TotalTime>0</TotalTime>\n  <Application>JS XLSX</Application>\n</Properties>";

var DOCPROPS_CORE = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<cp:coreProperties xmlns:cp=\"http://schemas.openxmlformats.org/package/2006/metadata/core-properties\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:dcmitype=\"http://purl.org/dc/dcmitype/\" xmlns:dcterms=\"http://purl.org/dc/terms/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"></cp:coreProperties>";

var XL_THEME_THEME = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<a:theme xmlns:a=\"http://schemas.openxmlformats.org/drawingml/2006/main\" name=\"Office-Design\">\n  <a:themeElements>\n    <a:clrScheme name=\"Office\">\n      <a:dk1>\n        <a:sysClr val=\"windowText\" lastClr=\"000000\"/>\n      </a:dk1>\n      <a:lt1>\n        <a:sysClr val=\"window\" lastClr=\"FFFFFF\"/>\n      </a:lt1>\n      <a:dk2>\n        <a:srgbClr val=\"1F497D\"/>\n      </a:dk2>\n      <a:lt2>\n        <a:srgbClr val=\"EEECE1\"/>\n      </a:lt2>\n      <a:accent1>\n        <a:srgbClr val=\"4F81BD\"/>\n      </a:accent1>\n      <a:accent2>\n        <a:srgbClr val=\"C0504D\"/>\n      </a:accent2>\n      <a:accent3>\n        <a:srgbClr val=\"9BBB59\"/>\n      </a:accent3>\n      <a:accent4>\n        <a:srgbClr val=\"8064A2\"/>\n      </a:accent4>\n      <a:accent5>\n        <a:srgbClr val=\"4BACC6\"/>\n      </a:accent5>\n      <a:accent6>\n        <a:srgbClr val=\"F79646\"/>\n      </a:accent6>\n      <a:hlink>\n        <a:srgbClr val=\"0000FF\"/>\n      </a:hlink>\n      <a:folHlink>\n        <a:srgbClr val=\"800080\"/>\n      </a:folHlink>\n    </a:clrScheme>\n    <a:fontScheme name=\"Office\">\n      <a:majorFont>\n        <a:latin typeface=\"Cambria\"/>\n        <a:ea typeface=\"\"/>\n        <a:cs typeface=\"\"/>\n        <a:font script=\"Jpan\" typeface=\"\uFF2D\uFF33 \uFF30\u30B4\u30B7\u30C3\u30AF\"/>\n        <a:font script=\"Hang\" typeface=\"\uB9D1\uC740 \uACE0\uB515\"/>\n        <a:font script=\"Hans\" typeface=\"\u5B8B\u4F53\"/>\n        <a:font script=\"Hant\" typeface=\"\u65B0\u7D30\u660E\u9AD4\"/>\n        <a:font script=\"Arab\" typeface=\"Times New Roman\"/>\n        <a:font script=\"Hebr\" typeface=\"Times New Roman\"/>\n        <a:font script=\"Thai\" typeface=\"Tahoma\"/>\n        <a:font script=\"Ethi\" typeface=\"Nyala\"/>\n        <a:font script=\"Beng\" typeface=\"Vrinda\"/>\n        <a:font script=\"Gujr\" typeface=\"Shruti\"/>\n        <a:font script=\"Khmr\" typeface=\"MoolBoran\"/>\n        <a:font script=\"Knda\" typeface=\"Tunga\"/>\n        <a:font script=\"Guru\" typeface=\"Raavi\"/>\n        <a:font script=\"Cans\" typeface=\"Euphemia\"/>\n        <a:font script=\"Cher\" typeface=\"Plantagenet Cherokee\"/>\n        <a:font script=\"Yiii\" typeface=\"Microsoft Yi Baiti\"/>\n        <a:font script=\"Tibt\" typeface=\"Microsoft Himalaya\"/>\n        <a:font script=\"Thaa\" typeface=\"MV Boli\"/>\n        <a:font script=\"Deva\" typeface=\"Mangal\"/>\n        <a:font script=\"Telu\" typeface=\"Gautami\"/>\n        <a:font script=\"Taml\" typeface=\"Latha\"/>\n        <a:font script=\"Syrc\" typeface=\"Estrangelo Edessa\"/>\n        <a:font script=\"Orya\" typeface=\"Kalinga\"/>\n        <a:font script=\"Mlym\" typeface=\"Kartika\"/>\n        <a:font script=\"Laoo\" typeface=\"DokChampa\"/>\n        <a:font script=\"Sinh\" typeface=\"Iskoola Pota\"/>\n        <a:font script=\"Mong\" typeface=\"Mongolian Baiti\"/>\n        <a:font script=\"Viet\" typeface=\"Times New Roman\"/>\n        <a:font script=\"Uigh\" typeface=\"Microsoft Uighur\"/>\n        <a:font script=\"Geor\" typeface=\"Sylfaen\"/>\n      </a:majorFont>\n      <a:minorFont>\n        <a:latin typeface=\"Calibri\"/>\n        <a:ea typeface=\"\"/>\n        <a:cs typeface=\"\"/>\n        <a:font script=\"Jpan\" typeface=\"\uFF2D\uFF33 \uFF30\u30B4\u30B7\u30C3\u30AF\"/>\n        <a:font script=\"Hang\" typeface=\"\uB9D1\uC740 \uACE0\uB515\"/>\n        <a:font script=\"Hans\" typeface=\"\u5B8B\u4F53\"/>\n        <a:font script=\"Hant\" typeface=\"\u65B0\u7D30\u660E\u9AD4\"/>\n        <a:font script=\"Arab\" typeface=\"Arial\"/>\n        <a:font script=\"Hebr\" typeface=\"Arial\"/>\n        <a:font script=\"Thai\" typeface=\"Tahoma\"/>\n        <a:font script=\"Ethi\" typeface=\"Nyala\"/>\n        <a:font script=\"Beng\" typeface=\"Vrinda\"/>\n        <a:font script=\"Gujr\" typeface=\"Shruti\"/>\n        <a:font script=\"Khmr\" typeface=\"DaunPenh\"/>\n        <a:font script=\"Knda\" typeface=\"Tunga\"/>\n        <a:font script=\"Guru\" typeface=\"Raavi\"/>\n        <a:font script=\"Cans\" typeface=\"Euphemia\"/>\n        <a:font script=\"Cher\" typeface=\"Plantagenet Cherokee\"/>\n        <a:font script=\"Yiii\" typeface=\"Microsoft Yi Baiti\"/>\n        <a:font script=\"Tibt\" typeface=\"Microsoft Himalaya\"/>\n        <a:font script=\"Thaa\" typeface=\"MV Boli\"/>\n        <a:font script=\"Deva\" typeface=\"Mangal\"/>\n        <a:font script=\"Telu\" typeface=\"Gautami\"/>\n        <a:font script=\"Taml\" typeface=\"Latha\"/>\n        <a:font script=\"Syrc\" typeface=\"Estrangelo Edessa\"/>\n        <a:font script=\"Orya\" typeface=\"Kalinga\"/>\n        <a:font script=\"Mlym\" typeface=\"Kartika\"/>\n        <a:font script=\"Laoo\" typeface=\"DokChampa\"/>\n        <a:font script=\"Sinh\" typeface=\"Iskoola Pota\"/>\n        <a:font script=\"Mong\" typeface=\"Mongolian Baiti\"/>\n        <a:font script=\"Viet\" typeface=\"Arial\"/>\n        <a:font script=\"Uigh\" typeface=\"Microsoft Uighur\"/>\n        <a:font script=\"Geor\" typeface=\"Sylfaen\"/>\n      </a:minorFont>\n    </a:fontScheme>\n    <a:fmtScheme name=\"Office\">\n      <a:fillStyleLst>\n        <a:solidFill>\n          <a:schemeClr val=\"phClr\"/>\n        </a:solidFill>\n        <a:gradFill rotWithShape=\"1\">\n          <a:gsLst>\n            <a:gs pos=\"0\">\n              <a:schemeClr val=\"phClr\">\n                <a:tint val=\"50000\"/>\n                <a:satMod val=\"300000\"/>\n              </a:schemeClr>\n            </a:gs>\n            <a:gs pos=\"35000\">\n              <a:schemeClr val=\"phClr\">\n                <a:tint val=\"37000\"/>\n                <a:satMod val=\"300000\"/>\n              </a:schemeClr>\n            </a:gs>\n            <a:gs pos=\"100000\">\n              <a:schemeClr val=\"phClr\">\n                <a:tint val=\"15000\"/>\n                <a:satMod val=\"350000\"/>\n              </a:schemeClr>\n            </a:gs>\n          </a:gsLst>\n          <a:lin ang=\"16200000\" scaled=\"1\"/>\n        </a:gradFill>\n        <a:gradFill rotWithShape=\"1\">\n          <a:gsLst>\n            <a:gs pos=\"0\">\n              <a:schemeClr val=\"phClr\">\n                <a:tint val=\"100000\"/>\n                <a:shade val=\"100000\"/>\n                <a:satMod val=\"130000\"/>\n              </a:schemeClr>\n            </a:gs>\n            <a:gs pos=\"100000\">\n              <a:schemeClr val=\"phClr\">\n                <a:tint val=\"50000\"/>\n                <a:shade val=\"100000\"/>\n                <a:satMod val=\"350000\"/>\n              </a:schemeClr>\n            </a:gs>\n          </a:gsLst>\n          <a:lin ang=\"16200000\" scaled=\"0\"/>\n        </a:gradFill>\n      </a:fillStyleLst>\n      <a:lnStyleLst>\n        <a:ln w=\"9525\" cap=\"flat\" cmpd=\"sng\" algn=\"ctr\">\n          <a:solidFill>\n            <a:schemeClr val=\"phClr\">\n              <a:shade val=\"95000\"/>\n              <a:satMod val=\"105000\"/>\n            </a:schemeClr>\n          </a:solidFill>\n          <a:prstDash val=\"solid\"/>\n        </a:ln>\n        <a:ln w=\"25400\" cap=\"flat\" cmpd=\"sng\" algn=\"ctr\">\n          <a:solidFill>\n            <a:schemeClr val=\"phClr\"/>\n          </a:solidFill>\n          <a:prstDash val=\"solid\"/>\n        </a:ln>\n        <a:ln w=\"38100\" cap=\"flat\" cmpd=\"sng\" algn=\"ctr\">\n          <a:solidFill>\n            <a:schemeClr val=\"phClr\"/>\n          </a:solidFill>\n          <a:prstDash val=\"solid\"/>\n        </a:ln>\n      </a:lnStyleLst>\n      <a:effectStyleLst>\n        <a:effectStyle>\n          <a:effectLst>\n            <a:outerShdw blurRad=\"40000\" dist=\"20000\" dir=\"5400000\" rotWithShape=\"0\">\n              <a:srgbClr val=\"000000\">\n                <a:alpha val=\"38000\"/>\n              </a:srgbClr>\n            </a:outerShdw>\n          </a:effectLst>\n        </a:effectStyle>\n        <a:effectStyle>\n          <a:effectLst>\n            <a:outerShdw blurRad=\"40000\" dist=\"23000\" dir=\"5400000\" rotWithShape=\"0\">\n              <a:srgbClr val=\"000000\">\n                <a:alpha val=\"35000\"/>\n              </a:srgbClr>\n            </a:outerShdw>\n          </a:effectLst>\n        </a:effectStyle>\n        <a:effectStyle>\n          <a:effectLst>\n            <a:outerShdw blurRad=\"40000\" dist=\"23000\" dir=\"5400000\" rotWithShape=\"0\">\n              <a:srgbClr val=\"000000\">\n                <a:alpha val=\"35000\"/>\n              </a:srgbClr>\n            </a:outerShdw>\n          </a:effectLst>\n          <a:scene3d>\n            <a:camera prst=\"orthographicFront\">\n              <a:rot lat=\"0\" lon=\"0\" rev=\"0\"/>\n            </a:camera>\n            <a:lightRig rig=\"threePt\" dir=\"t\">\n              <a:rot lat=\"0\" lon=\"0\" rev=\"1200000\"/>\n            </a:lightRig>\n          </a:scene3d>\n          <a:sp3d>\n            <a:bevelT w=\"63500\" h=\"25400\"/>\n          </a:sp3d>\n        </a:effectStyle>\n      </a:effectStyleLst>\n      <a:bgFillStyleLst>\n        <a:solidFill>\n          <a:schemeClr val=\"phClr\"/>\n        </a:solidFill>\n        <a:gradFill rotWithShape=\"1\">\n          <a:gsLst>\n            <a:gs pos=\"0\">\n              <a:schemeClr val=\"phClr\">\n                <a:tint val=\"40000\"/>\n                <a:satMod val=\"350000\"/>\n              </a:schemeClr>\n            </a:gs>\n            <a:gs pos=\"40000\">\n              <a:schemeClr val=\"phClr\">\n                <a:tint val=\"45000\"/>\n                <a:shade val=\"99000\"/>\n                <a:satMod val=\"350000\"/>\n              </a:schemeClr>\n            </a:gs>\n            <a:gs pos=\"100000\">\n              <a:schemeClr val=\"phClr\">\n                <a:shade val=\"20000\"/>\n                <a:satMod val=\"255000\"/>\n              </a:schemeClr>\n            </a:gs>\n          </a:gsLst>\n          <a:path path=\"circle\">\n            <a:fillToRect l=\"50000\" t=\"-80000\" r=\"50000\" b=\"180000\"/>\n          </a:path>\n        </a:gradFill>\n        <a:gradFill rotWithShape=\"1\">\n          <a:gsLst>\n            <a:gs pos=\"0\">\n              <a:schemeClr val=\"phClr\">\n                <a:tint val=\"80000\"/>\n                <a:satMod val=\"300000\"/>\n              </a:schemeClr>\n            </a:gs>\n            <a:gs pos=\"100000\">\n              <a:schemeClr val=\"phClr\">\n                <a:shade val=\"30000\"/>\n                <a:satMod val=\"200000\"/>\n              </a:schemeClr>\n            </a:gs>\n          </a:gsLst>\n          <a:path path=\"circle\">\n            <a:fillToRect l=\"50000\" t=\"50000\" r=\"50000\" b=\"50000\"/>\n          </a:path>\n        </a:gradFill>\n      </a:bgFillStyleLst>\n    </a:fmtScheme>\n  </a:themeElements>\n  <a:objectDefaults>\n    <a:spDef>\n      <a:spPr/>\n      <a:bodyPr/>\n      <a:lstStyle/>\n      <a:style>\n        <a:lnRef idx=\"1\">\n          <a:schemeClr val=\"accent1\"/>\n        </a:lnRef>\n        <a:fillRef idx=\"3\">\n          <a:schemeClr val=\"accent1\"/>\n        </a:fillRef>\n        <a:effectRef idx=\"2\">\n          <a:schemeClr val=\"accent1\"/>\n        </a:effectRef>\n        <a:fontRef idx=\"minor\">\n          <a:schemeClr val=\"lt1\"/>\n        </a:fontRef>\n      </a:style>\n    </a:spDef>\n    <a:lnDef>\n      <a:spPr/>\n      <a:bodyPr/>\n      <a:lstStyle/>\n      <a:style>\n        <a:lnRef idx=\"2\">\n          <a:schemeClr val=\"accent1\"/>\n        </a:lnRef>\n        <a:fillRef idx=\"0\">\n          <a:schemeClr val=\"accent1\"/>\n        </a:fillRef>\n        <a:effectRef idx=\"1\">\n          <a:schemeClr val=\"accent1\"/>\n        </a:effectRef>\n        <a:fontRef idx=\"minor\">\n          <a:schemeClr val=\"tx1\"/>\n        </a:fontRef>\n      </a:style>\n    </a:lnDef>\n  </a:objectDefaults>\n  <a:extraClrSchemeLst/>\n</a:theme>";

var _dec$2;
var _class$2;
var _dec2$2;
var _class2;

var Xsst = (_dec$2 = props('xmlns', 'count', 'uniqueCount'), _dec$2(_class$2 = function (_Node) {
  inherits(Xsst, _Node);

  function Xsst(_ref, children) {
    var _ref$xmlns = _ref.xmlns,
        xmlns = _ref$xmlns === undefined ? 'http://schemas.openxmlformats.org/spreadsheetml/2006/main' : _ref$xmlns;
    classCallCheck(this, Xsst);

    var _this = possibleConstructorReturn(this, (Xsst.__proto__ || Object.getPrototypeOf(Xsst)).call(this, { xmlns: xmlns }, children));

    _this[HEAD] = '<?xml version="1.0" encoding="UTF-8"?>';
    return _this;
  }

  return Xsst;
}(Node)) || _class$2);

var Xsi = function (_Node2) {
  inherits(Xsi, _Node2);

  function Xsi() {
    classCallCheck(this, Xsi);
    return possibleConstructorReturn(this, (Xsi.__proto__ || Object.getPrototypeOf(Xsi)).apply(this, arguments));
  }

  return Xsi;
}(Node);

var Xt = (_dec2$2 = props('xml:space'), _dec2$2(_class2 = function (_Node3) {
  inherits(Xt, _Node3);

  function Xt() {
    classCallCheck(this, Xt);
    return possibleConstructorReturn(this, (Xt.__proto__ || Object.getPrototypeOf(Xt)).apply(this, arguments));
  }

  return Xt;
}(Node)) || _class2);

var Xr = function (_Node4) {
  inherits(Xr, _Node4);

  function Xr() {
    classCallCheck(this, Xr);
    return possibleConstructorReturn(this, (Xr.__proto__ || Object.getPrototypeOf(Xr)).apply(this, arguments));
  }

  return Xr;
}(Node);

var RefTable = function () {
  function RefTable() {
    classCallCheck(this, RefTable);

    this.strings = [];
    this.known = {};
  }

  createClass(RefTable, [{
    key: 'makeXsst',
    value: function makeXsst() {
      var len = this.strings.length;
      var sst = new Xsst({
        count: len,
        uniqueCount: len
      });
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.strings[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var str = _step.value;

          var si = new Xsi({}, [new Xt({}, [str])]);
          sst.children.push(si);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return sst;
    }
  }, {
    key: 'addString',
    value: function addString(str) {
      if (this.known[str] === undefined) {
        var index = this.strings.length;
        this.strings.push(str);
        this.known[str] = index;
        return index;
      }
      return this.known[str];
    }
  }, {
    key: 'getString',
    value: function getString(index) {
      return this.strings[index];
    }
  }, {
    key: 'length',
    value: function length() {
      return this.strings.length;
    }
  }]);
  return RefTable;
}();

var _dec$3;
var _class$3;
var _dec2$3;
var _class2$1;
var _dec3$2;
var _class3$2;
var _dec4$2;
var _class5$2;
var _dec5$2;
var _class6$2;
var _dec6$2;
var _class7$2;
var _dec7$2;
var _class8$2;
var _dec8$2;
var _class9$2;

var XRelationships = (_dec$3 = props('xmlns'), _dec$3(_class$3 = function (_Node) {
  inherits(XRelationships, _Node);

  function XRelationships(_ref, children) {
    var _ref$xmlns = _ref.xmlns,
        xmlns = _ref$xmlns === undefined ? 'http://schemas.openxmlformats.org/package/2006/relationships' : _ref$xmlns;
    classCallCheck(this, XRelationships);

    var _this = possibleConstructorReturn(this, (XRelationships.__proto__ || Object.getPrototypeOf(XRelationships)).call(this, { xmlns: xmlns }, children));

    _this[HEAD] = '<?xml version="1.0" encoding="UTF-8"?>';
    return _this;
  }

  return XRelationships;
}(Node)) || _class$3);

var XRelationship = (_dec2$3 = props('Id', 'Target', 'Type'), _dec2$3(_class2$1 = function (_Node2) {
  inherits(XRelationship, _Node2);

  function XRelationship() {
    classCallCheck(this, XRelationship);
    return possibleConstructorReturn(this, (XRelationship.__proto__ || Object.getPrototypeOf(XRelationship)).apply(this, arguments));
  }

  return XRelationship;
}(Node)) || _class2$1);

var Xworkbook = (_dec3$2 = props('xmlns', 'xmlns:r'), _dec3$2(_class3$2 = function (_Node3) {
  inherits(Xworkbook, _Node3);

  function Xworkbook() {
    var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var children = arguments[1];
    classCallCheck(this, Xworkbook);

    attrs['xmlns'] = attrs['xmlns'] || 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
    attrs['xmlns:r'] = attrs['xmlns:r'] || 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';

    var _this3 = possibleConstructorReturn(this, (Xworkbook.__proto__ || Object.getPrototypeOf(Xworkbook)).call(this, attrs, children));

    _this3.fileVersion = null;
    _this3.workbookPr = null;
    _this3.bookViews = null;
    _this3.sheets = null;
    _this3.calcPr = null;

    _this3[HEAD] = '<?xml version="1.0" encoding="UTF-8"?>';
    return _this3;
  }

  createClass(Xworkbook, [{
    key: 'render',
    value: function render() {
      this.children = [];
      if (this.fileVersion) this.children.push(this.fileVersion);
      if (this.workbookPr) this.children.push(this.workbookPr);
      if (this.bookViews) this.children.push(this.bookViews);
      if (this.sheets) this.children.push(this.sheets);
      if (this.calcPr) this.children.push(this.calcPr);
      return get(Xworkbook.prototype.__proto__ || Object.getPrototypeOf(Xworkbook.prototype), 'render', this).call(this);
    }
  }]);
  return Xworkbook;
}(Node)) || _class3$2);

var XfileVersion = (_dec4$2 = props('appName', 'lastEdited', 'lowestEdited', 'rupBuild'), _dec4$2(_class5$2 = function (_Node4) {
  inherits(XfileVersion, _Node4);

  function XfileVersion() {
    classCallCheck(this, XfileVersion);
    return possibleConstructorReturn(this, (XfileVersion.__proto__ || Object.getPrototypeOf(XfileVersion)).apply(this, arguments));
  }

  return XfileVersion;
}(Node)) || _class5$2);

var XworkbookPr = (_dec5$2 = props('defaultThemeVersion', 'backupFile', 'showObjects', 'date1904'), _dec5$2(_class6$2 = function (_Node5) {
  inherits(XworkbookPr, _Node5);

  function XworkbookPr() {
    classCallCheck(this, XworkbookPr);
    return possibleConstructorReturn(this, (XworkbookPr.__proto__ || Object.getPrototypeOf(XworkbookPr)).apply(this, arguments));
  }

  return XworkbookPr;
}(Node)) || _class6$2);

var XworkbookProtection = function (_Node6) {
  inherits(XworkbookProtection, _Node6);

  function XworkbookProtection() {
    classCallCheck(this, XworkbookProtection);
    return possibleConstructorReturn(this, (XworkbookProtection.__proto__ || Object.getPrototypeOf(XworkbookProtection)).apply(this, arguments));
  }

  return XworkbookProtection;
}(Node);

var XbookViews = function (_Node7) {
  inherits(XbookViews, _Node7);

  function XbookViews() {
    classCallCheck(this, XbookViews);
    return possibleConstructorReturn(this, (XbookViews.__proto__ || Object.getPrototypeOf(XbookViews)).apply(this, arguments));
  }

  return XbookViews;
}(Node);

var XworkbookView = (_dec6$2 = props('activeTab', 'firstSheet', 'showHorizontalScroll', 'showVerticalScroll', 'showSheetTabs', 'tabRatio', 'windowHeight', 'windowWidth', 'xWindow', 'yWindow'), _dec6$2(_class7$2 = function (_Node8) {
  inherits(XworkbookView, _Node8);

  function XworkbookView() {
    classCallCheck(this, XworkbookView);
    return possibleConstructorReturn(this, (XworkbookView.__proto__ || Object.getPrototypeOf(XworkbookView)).apply(this, arguments));
  }

  return XworkbookView;
}(Node)) || _class7$2);

var Xsheets = function (_Node9) {
  inherits(Xsheets, _Node9);

  function Xsheets() {
    classCallCheck(this, Xsheets);
    return possibleConstructorReturn(this, (Xsheets.__proto__ || Object.getPrototypeOf(Xsheets)).apply(this, arguments));
  }

  return Xsheets;
}(Node);

var Xsheet = (_dec7$2 = props('name', 'sheetId', 'r:id', 'state'), _dec7$2(_class8$2 = function (_Node10) {
  inherits(Xsheet, _Node10);

  function Xsheet() {
    classCallCheck(this, Xsheet);
    return possibleConstructorReturn(this, (Xsheet.__proto__ || Object.getPrototypeOf(Xsheet)).apply(this, arguments));
  }

  return Xsheet;
}(Node)) || _class8$2);

var XcalcPr = (_dec8$2 = props('calcId', 'iterateCount', 'refMode', 'iterate', 'iterateDelta'), _dec8$2(_class9$2 = function (_Node11) {
  inherits(XcalcPr, _Node11);

  function XcalcPr() {
    classCallCheck(this, XcalcPr);
    return possibleConstructorReturn(this, (XcalcPr.__proto__ || Object.getPrototypeOf(XcalcPr)).apply(this, arguments));
  }

  return XcalcPr;
}(Node)) || _class9$2);

function makeWorkbookRels(sheetCount) {
  var rels = new XRelationships({});
  for (var i = 1; i <= sheetCount; i++) {
    rels.children.push(new XRelationship({
      Id: 'rId' + i,
      Target: 'worksheets/sheet' + i + '.xml',
      Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet'
    }));
  }
  rels.children.push(new XRelationship({
    Id: 'rId' + (sheetCount + 1),
    Target: 'sharedStrings.xml',
    Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings'
  }));
  rels.children.push(new XRelationship({
    Id: 'rId' + (sheetCount + 2),
    Target: 'theme/theme1.xml',
    Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme'
  }));
  rels.children.push(new XRelationship({
    Id: 'rId' + (sheetCount + 3),
    Target: 'styles.xml',
    Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles'
  }));
  return rels;
}

function makeXworkbook() {
  var workbook = new Xworkbook();
  workbook.fileVersion = new XfileVersion({ appName: 'JS XLSX' });
  workbook.workbookPr = new XworkbookPr({ showObjects: 'all' });
  workbook.bookViews = new XbookViews({}, [new XworkbookView({
    showHorizontalScroll: true,
    showSheetTabs: true,
    showVerticalScroll: true,
    tabRatio: 204,
    windowHeight: 8192,
    windowWidth: 16384,
    xWindow: 0,
    yWindow: 0
  })]);
  workbook.calcPr = new XcalcPr({
    iterateCount: 100,
    iterate: false,
    iterateDelta: 0.001,
    refMode: 'A1'
  });

  return workbook;
}

var _dec$4;
var _class$4;
var _dec2$4;
var _class2$2;
var _dec3$3;
var _class3$3;

var XTypes = (_dec$4 = props('xmlns'), _dec$4(_class$4 = function (_Node) {
  inherits(XTypes, _Node);

  function XTypes(_ref, children) {
    var _ref$xmlns = _ref.xmlns,
        xmlns = _ref$xmlns === undefined ? 'http://schemas.openxmlformats.org/package/2006/content-types' : _ref$xmlns;
    classCallCheck(this, XTypes);

    var _this = possibleConstructorReturn(this, (XTypes.__proto__ || Object.getPrototypeOf(XTypes)).call(this, { xmlns: xmlns }, children));

    _this[HEAD] = '<?xml version="1.0" encoding="UTF-8"?>';
    return _this;
  }

  return XTypes;
}(Node)) || _class$4);

var XDefault = (_dec2$4 = props('Extension', 'ContentType'), _dec2$4(_class2$2 = function (_Node2) {
  inherits(XDefault, _Node2);

  function XDefault() {
    classCallCheck(this, XDefault);
    return possibleConstructorReturn(this, (XDefault.__proto__ || Object.getPrototypeOf(XDefault)).apply(this, arguments));
  }

  return XDefault;
}(Node)) || _class2$2);

var XOverride = (_dec3$3 = props('PartName', 'ContentType'), _dec3$3(_class3$3 = function (_Node3) {
  inherits(XOverride, _Node3);

  function XOverride() {
    classCallCheck(this, XOverride);
    return possibleConstructorReturn(this, (XOverride.__proto__ || Object.getPrototypeOf(XOverride)).apply(this, arguments));
  }

  return XOverride;
}(Node)) || _class3$3);

function makeXTypes() {
  var types = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new XTypes({});

  var defaults$$1 = [{
    Extension: 'rels',
    ContentType: 'application/vnd.openxmlformats-package.relationships+xml'
  }, {
    Extension: 'xml',
    ContentType: 'application/xml'
  }];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = defaults$$1[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      types.children.push(new XDefault(item));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var overrides = [{
    PartName: '/_rels/.rels',
    ContentType: 'application/vnd.openxmlformats-package.relationships+xml'
  }, {
    PartName: '/docProps/app.xml',
    ContentType: 'application/vnd.openxmlformats-officedocument.extended-properties+xml'
  }, {
    PartName: '/docProps/core.xml',
    ContentType: 'application/vnd.openxmlformats-package.core-properties+xml'
  }, {
    PartName: '/xl/_rels/workbook.xml.rels',
    ContentType: 'application/vnd.openxmlformats-package.relationships+xml'
  }, {
    PartName: '/xl/sharedStrings.xml',
    ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml'
  }, {
    PartName: '/xl/styles.xml',
    ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml'
  }, {
    PartName: '/xl/workbook.xml',
    ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml'
  }, {
    PartName: '/xl/theme/theme1.xml',
    ContentType: 'application/vnd.openxmlformats-officedocument.theme+xml'
  }];

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = overrides[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var override = _step2.value;

      types.children.push(new XOverride(override));
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return types;
}

var File = function () {
  function File() {
    classCallCheck(this, File);
    this.sheet = {};
    this.sheets = [];
    this.definedNames = [];

    this.styles = new XstyleSheet({});
  }

  createClass(File, [{
    key: 'addSheet',
    value: function addSheet(name) {
      if (this.sheet[name]) {
        throw new Error('duplicate sheet name ' + name + '.');
      }
      var sheet = new Sheet({
        name: name,
        file: this,
        selected: this.sheets.length === 0
      });
      this.sheet[name] = sheet;
      this.sheets.push(sheet);
      return sheet;
    }
  }, {
    key: 'saveAs',
    value: function saveAs() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'nodebuffer';

      var parts = this.makeParts();
      var zip = new Zip();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(parts)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          zip.file(key, parts[key]);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (type === 'blob' || type === 'base64') {
        return zip.generateAsync({ type: type });
      } else {
        return zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true });
      }
    }
  }, {
    key: 'makeParts',
    value: function makeParts() {
      var parts = {};
      var refTable = new RefTable();
      var types = makeXTypes();
      var workbook = makeXworkbook();

      this.styles.reset();

      var i = 1;
      var sheets = new Xsheets();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.sheets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var sheet = _step2.value;

          var xSheet = sheet.makeXSheet(refTable, this.styles);
          types.children.push(new XOverride({
            PartName: '/xl/worksheets/sheet' + i + '.xml',
            ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml'
          }));
          sheets.children.push(new Xsheet({
            name: sheet.name,
            sheetId: i,
            'r:id': 'rId' + i,
            state: 'visible'
          }));
          parts['xl/worksheets/sheet' + i + '.xml'] = xSheet.render();
          i++;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      workbook.sheets = sheets;

      parts['xl/workbook.xml'] = workbook.render();
      parts['_rels/.rels'] = DOT_RELS;
      parts['docProps/app.xml'] = DOCPROPS_APP;
      parts['docProps/core.xml'] = DOCPROPS_CORE;
      parts['xl/theme/theme1.xml'] = XL_THEME_THEME;

      parts['xl/sharedStrings.xml'] = refTable.makeXsst().render();
      parts['xl/_rels/workbook.xml.rels'] = makeWorkbookRels(this.sheets.length).render();
      parts['[Content_Types].xml'] = types.render();
      parts['xl/styles.xml'] = this.styles.render();

      return parts;
    }
  }]);
  return File;
}();



var file = Object.freeze({
	File: File
});

var index = _extends({}, cell, col, file, lib, row, sheet, style, { Zip: Zip });

return index;

})));