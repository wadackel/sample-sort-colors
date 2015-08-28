export default class Color {

  /**
   * ランダムな色を生成
   * @param integer
   * @return array
   */
  static createRandomColors(length=50) {
    var colors = [];
    for( var i = 0; i < length; i++ ){
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
  static RGBtoHSV(r, g, b) {
    var rr, gg, bb,
        r = arguments[0] / 255,
        g = arguments[1] / 255,
        b = arguments[2] / 255,
        h, s,
        v = Math.max(r, g, b),
        diff = v - Math.min(r, g, b),
        diffc = function(c){
            return ( v - c ) / 6 / diff + 1 / 2;
        };

    if( diff === 0 ){
      h = s = 0;
    }else{
      s = diff / v;
      rr = diffc(r);
      gg = diffc(g);
      bb = diffc(b);

      if( r === v ){
        h = bb - gg;
      }else if( g === v ){
        h = ( 1 / 3 ) + rr - bb;
      }else if( b === v ){
        h = ( 2 / 3 ) + gg - rr;
      }
      if( h < 0 ){
        h += 1;
      }else if( h > 1 ){
        h -= 1;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(h * 100),
      v: Math.round(h * 100)
    }
  }

  /**
   * HEXをRGBへ変換
   * http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
   * @param integer
   * @param integer
   * @param integer
   * @return object
   */
  static HEXtoRGB(hex) {
    hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
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
  static RGBtoHEX(r, g, b) {
    return "#" + ( ( 1 << 24 ) + ( r << 16 ) + ( g << 8 ) + b ).toString(16).slice(1);
  }

  /**
   * コンストラクタ
   * @param string | integer
   * @param integer
   * @param integer
   */
  constructor(r, g=null, b=null) {
    if( g == null && b == null ){
      let rgb = this.constructor.HEXtoRGB(r);
      r = rgb.r;
      g = rgb.g;
      b = rgb.b;
    }
    this.r = r;
    this.g = g;
    this.b = b;

    let hsv = this.constructor.RGBtoHSV(r, g, b);
    this.h = hsv.h;
    this.s = hsv.s;
    this.v = hsv.v;
  }

  /**
   * HEX値を返す
   * @return string
   */
  toHEXString() {
    return this.constructor.RGBtoHEX(this.r, this.g, this.b);
  }

  /**
   * 指定されたColorインスタンスとの色空間上の距離を算出
   * @param Color
   * @return number
   */
  getDistance(color) {
    return Math.sqrt(Math.pow(this.r - color.r, 2) + Math.pow(this.g - color.g, 2) + Math.pow(this.b - color.b, 2));
  }
}