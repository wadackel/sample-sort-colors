import Color from "./Color";
import ColorSort from "./ColorSort";


export default class HSVColorSort extends ColorSort {

  /**
   * 並び替えを実行し配列を返す
   * @return array
   */
  exec() {
    let results = [];

    this.colors.forEach((hex, i) => {
      let color = new Color(hex);
      results.push(color);
    });

    results.sort((a, b) => {
      if( a.h < b.h ) return 1;
      if( a.h > b.h ) return -1;
      if( a.s < b.s ) return 1;
      if( a.s > b.s ) return -1;
    });

    return results.map((color) => { return color.toHEXString(); });
  }
}