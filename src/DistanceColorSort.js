import Color from "./Color";
import ColorSort from "./ColorSort";


export default class DistanceColorSort extends ColorSort {

  /**
   * 基準色
   */
  static get baseColors() {
    return [
      "#ff0000",
      "#ff3333",
      "#ff6666",
      "#ff7a7a",

      "#ff007f",
      "#ff3399",
      "#ff66b2",
      "#ff7abc",

      "#ff00ff",
      "#ff33ff",
      "#ff66ff",
      "#ff7aff",

      "#7f00ff",
      "#9933ff",
      "#b266ff",
      "#bc7aff",

      "#0000ff",
      "#3333ff",
      "#6666ff",
      "#7a7aff",

      "#007fff",
      "#3399ff",
      "#66b2ff",
      "#7abcff",

      "#00ffff",
      "#33ffff",
      "#66ffff",
      "#7affff",

      "#00ff7f",
      "#33ff99",
      "#66ffb2",
      "#7affbc",

      "#00ff00",
      "#33ff33",
      "#66ff66",
      "#7aff7a",

      "#7fff00",
      "#99ff33",
      "#b2ff66",
      "#bcff7a",

      "#ffff00",
      "#ffff33",
      "#ffff66",
      "#ffff7a",

      "#ff7f00",
      "#ff9933",
      "#ffb266",
      "#ffbc7a"
    ];
  }

  /**
   * 並び替えを実行し配列を返す
   * @return array
   */
  exec() {
    let baseColors = this.constructor.baseColors,
        results = [];
    
    // もっとも近い基準色へグループ分け
    this.colors.forEach((hex1, i) => {
      let color1 = new Color(hex1),
          color2,
          ranking = [];

      baseColors.forEach((hex2, n) => {
        color2 = new Color(hex2);
        ranking.push({
          color: color1,
          group: n,
          distance: color1.getDistance(color2)
        });
      });

      ranking.sort((a, b) => {
        if( a.distance < b.distance ) return -1;
        if( a.distance > b.distance ) return 1;
      });

      results.push(ranking[0]);
    });

    // グループと距離を元に並び替え
    results.sort((a, b) => {
      if( a.group < b.group ) return -1;
      if( a.group > b.group ) return 1;
      if( a.distance < b.distance ) return -1;
      if( a.distance > b.distance ) return 1;
    });

    return results.map((obj) => { return obj.color.toHEXString(); });
  }
}