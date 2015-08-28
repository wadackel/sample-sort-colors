import Color from "./Color";
import HSVColorSort from "./HSVColorSort";
import DistanceColorSort from "./DistanceColorSort";


// 色の一覧を描画
function render($results, colors){
  let html = [];

  colors.forEach((hex, i) => {
    html.push(`<div style="background:${hex}"></div>`)
  });

  $results.innerHTML = html.join("");
}


// DOMの構築が完了したら、描画を開始
document.addEventListener("DOMContentLoaded", () => {
  var $original = document.getElementById("results-original"),
      $hsv = document.getElementById("results-hsv"),
      $distance = document.getElementById("results-distance"),
      colors = Color.createRandomColors(100); //100件のランダムな色

  render($original, colors);
  render($hsv, new HSVColorSort(colors).exec());
  render($distance, new DistanceColorSort(colors).exec());
}, false);