(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Color = (function () {
  _createClass(Color, null, [{
    key: "createRandomColors",

    /**
     * ランダムな色を生成
     * @param integer
     * @return array
     */
    value: function createRandomColors() {
      var length = arguments.length <= 0 || arguments[0] === undefined ? 50 : arguments[0];

      var colors = [];
      for (var i = 0; i < length; i++) {
        colors.push("#" + ("00000" + Math.floor(Math.random() * 0x1000000).toString(16)).substr(-6));
      }
      return colors;
    }

    /**
     * RGBをHSVへ変換
     * http://stackoverflow.com/questions/8022885/rgb-to-hsv-color-in-javascript
     * @param integer
     * @param integer
     * @param integer
     * @return object
     */
  }, {
    key: "RGBtoHSV",
    value: function RGBtoHSV(r, g, b) {
      var rr,
          gg,
          bb,
          r = arguments[0] / 255,
          g = arguments[1] / 255,
          b = arguments[2] / 255,
          h,
          s,
          v = Math.max(r, g, b),
          diff = v - Math.min(r, g, b),
          diffc = function diffc(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };

      if (diff === 0) {
        h = s = 0;
      } else {
        s = diff / v;
        rr = diffc(r);
        gg = diffc(g);
        bb = diffc(b);

        if (r === v) {
          h = bb - gg;
        } else if (g === v) {
          h = 1 / 3 + rr - bb;
        } else if (b === v) {
          h = 2 / 3 + gg - rr;
        }
        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }
      }

      return {
        h: Math.round(h * 360),
        s: Math.round(h * 100),
        v: Math.round(h * 100)
      };
    }

    /**
     * HEXをRGBへ変換
     * http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
     * @param integer
     * @param integer
     * @param integer
     * @return object
     */
  }, {
    key: "HEXtoRGB",
    value: function HEXtoRGB(hex) {
      hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (m, r, g, b) {
        return r + r + g + g + b + b;
      });

      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    /**
     * RGBをHEXへ変換
     * @param integer
     * @param integer
     * @param integer
     * @return object
     */
  }, {
    key: "RGBtoHEX",
    value: function RGBtoHEX(r, g, b) {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    /**
     * コンストラクタ
     * @param string | integer
     * @param integer
     * @param integer
     */
  }]);

  function Color(r) {
    var g = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var b = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

    _classCallCheck(this, Color);

    if (g == null && b == null) {
      var rgb = this.constructor.HEXtoRGB(r);
      r = rgb.r;
      g = rgb.g;
      b = rgb.b;
    }
    this.r = r;
    this.g = g;
    this.b = b;

    var hsv = this.constructor.RGBtoHSV(r, g, b);
    this.h = hsv.h;
    this.s = hsv.s;
    this.v = hsv.v;
  }

  /**
   * HEX値を返す
   * @return string
   */

  _createClass(Color, [{
    key: "toHEXString",
    value: function toHEXString() {
      return this.constructor.RGBtoHEX(this.r, this.g, this.b);
    }

    /**
     * 指定されたColorインスタンスとの色空間上の距離を算出
     * @param Color
     * @return number
     */
  }, {
    key: "getDistance",
    value: function getDistance(color) {
      return Math.sqrt(Math.pow(this.r - color.r, 2) + Math.pow(this.g - color.g, 2) + Math.pow(this.b - color.b, 2));
    }
  }]);

  return Color;
})();

exports["default"] = Color;
module.exports = exports["default"];

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ColorSort = (function () {
  function ColorSort() {
    var colors = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    _classCallCheck(this, ColorSort);

    this.colors = [].concat(_toConsumableArray(colors));
  }

  _createClass(ColorSort, [{
    key: "exec",
    value: function exec() {
      return [];
    }
  }]);

  return ColorSort;
})();

exports["default"] = ColorSort;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Color = require("./Color");

var _Color2 = _interopRequireDefault(_Color);

var _ColorSort2 = require("./ColorSort");

var _ColorSort3 = _interopRequireDefault(_ColorSort2);

var DistanceColorSort = (function (_ColorSort) {
  _inherits(DistanceColorSort, _ColorSort);

  function DistanceColorSort() {
    _classCallCheck(this, DistanceColorSort);

    _get(Object.getPrototypeOf(DistanceColorSort.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(DistanceColorSort, [{
    key: "exec",

    /**
     * 並び替えを実行し配列を返す
     * @return array
     */
    value: function exec() {
      var baseColors = this.constructor.baseColors,
          results = [];

      // もっとも近い基準色へグループ分け
      this.colors.forEach(function (hex1, i) {
        var color1 = new _Color2["default"](hex1),
            color2 = undefined,
            ranking = [];

        baseColors.forEach(function (hex2, n) {
          color2 = new _Color2["default"](hex2);
          ranking.push({
            color: color1,
            group: n,
            distance: color1.getDistance(color2)
          });
        });

        ranking.sort(function (a, b) {
          if (a.distance < b.distance) return -1;
          if (a.distance > b.distance) return 1;
        });

        results.push(ranking[0]);
      });

      // グループと距離を元に並び替え
      results.sort(function (a, b) {
        if (a.group < b.group) return -1;
        if (a.group > b.group) return 1;
        if (a.distance < b.distance) return -1;
        if (a.distance > b.distance) return 1;
      });

      return results.map(function (obj) {
        return obj.color.toHEXString();
      });
    }
  }], [{
    key: "baseColors",

    /**
     * 基準色
     */
    get: function get() {
      return ["#ff0000", "#ff3333", "#ff6666", "#ff7a7a", "#ff007f", "#ff3399", "#ff66b2", "#ff7abc", "#ff00ff", "#ff33ff", "#ff66ff", "#ff7aff", "#7f00ff", "#9933ff", "#b266ff", "#bc7aff", "#0000ff", "#3333ff", "#6666ff", "#7a7aff", "#007fff", "#3399ff", "#66b2ff", "#7abcff", "#00ffff", "#33ffff", "#66ffff", "#7affff", "#00ff7f", "#33ff99", "#66ffb2", "#7affbc", "#00ff00", "#33ff33", "#66ff66", "#7aff7a", "#7fff00", "#99ff33", "#b2ff66", "#bcff7a", "#ffff00", "#ffff33", "#ffff66", "#ffff7a", "#ff7f00", "#ff9933", "#ffb266", "#ffbc7a"];
    }
  }]);

  return DistanceColorSort;
})(_ColorSort3["default"]);

exports["default"] = DistanceColorSort;
module.exports = exports["default"];

},{"./Color":1,"./ColorSort":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Color = require("./Color");

var _Color2 = _interopRequireDefault(_Color);

var _ColorSort2 = require("./ColorSort");

var _ColorSort3 = _interopRequireDefault(_ColorSort2);

var HSVColorSort = (function (_ColorSort) {
  _inherits(HSVColorSort, _ColorSort);

  function HSVColorSort() {
    _classCallCheck(this, HSVColorSort);

    _get(Object.getPrototypeOf(HSVColorSort.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(HSVColorSort, [{
    key: "exec",

    /**
     * 並び替えを実行し配列を返す
     * @return array
     */
    value: function exec() {
      var results = [];

      this.colors.forEach(function (hex, i) {
        var color = new _Color2["default"](hex);
        results.push(color);
      });

      results.sort(function (a, b) {
        if (a.h < b.h) return 1;
        if (a.h > b.h) return -1;
        if (a.s < b.s) return 1;
        if (a.s > b.s) return -1;
      });

      return results.map(function (color) {
        return color.toHEXString();
      });
    }
  }]);

  return HSVColorSort;
})(_ColorSort3["default"]);

exports["default"] = HSVColorSort;
module.exports = exports["default"];

},{"./Color":1,"./ColorSort":2}],5:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _Color = require("./Color");

var _Color2 = _interopRequireDefault(_Color);

var _HSVColorSort = require("./HSVColorSort");

var _HSVColorSort2 = _interopRequireDefault(_HSVColorSort);

var _DistanceColorSort = require("./DistanceColorSort");

var _DistanceColorSort2 = _interopRequireDefault(_DistanceColorSort);

// 色の一覧を描画
function render($results, colors) {
  var html = [];

  colors.forEach(function (hex, i) {
    html.push("<div style=\"background:" + hex + "\"></div>");
  });

  $results.innerHTML = html.join("");
}

// DOMの構築が完了したら、描画を開始
document.addEventListener("DOMContentLoaded", function () {
  var $original = document.getElementById("results-original"),
      $hsv = document.getElementById("results-hsv"),
      $distance = document.getElementById("results-distance"),
      colors = _Color2["default"].createRandomColors(100); //100件のランダムな色

  render($original, colors);
  render($hsv, new _HSVColorSort2["default"](colors).exec());
  render($distance, new _DistanceColorSort2["default"](colors).exec());
}, false);

},{"./Color":1,"./DistanceColorSort":3,"./HSVColorSort":4}]},{},[5]);
