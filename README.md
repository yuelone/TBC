# 這是一個一頁式的行銷網站
[DEMO](https://tbc-tauvercelapp.net/)\
透過開發者工具 LightHouse 去確認網站效能等等
## 進行優化之前
<img width="500" alt="手機版本優化前" src="https://github.com/yuelone/TBC/assets/62279534/b8c0d7db-41a2-4381-8dc0-6d6541fb51a0">\
發現的問題有:
* 進入網站時，因為圖片檔案過大，造成 Loading 過久，以至於效能分數過低。
* JS 跟 CSS 打包時，未進行優化，導致過於肥大。
* 由於是行銷網站，所以希望 SEO 可以提升。
## 進行優化之後
<img width="500" alt="截圖 2024-04-01 凌晨2 06 54" src="https://github.com/yuelone/TBC/assets/62279534/52010078-f4a6-4bb2-a8f7-7501aa26b160">\
### 圖片問題
* 透過圖片壓縮工具 [SVGOMG](https://svgomg.net/) 將圖片進行壓縮，減少圖片大小。
* 發現第一張圖 tv.svg 仍然有明顯的消能流失的狀況，於是使用 Webpack 工具 [@vue/preload-webpack-plugin](https://www.npmjs.com/package/@vue/preload-webpack-plugin)，加上 Preload Link 由於是一頁式網站所以不考慮使用 Prefetch Link，透過 Preload Link 去改變進入網站時，要先去下載圖片資源。
* 發現 tv.svg 在下載完成，透過 CSS 繪製時，仍然有效能流失的狀況，於是將 CSS 的 background-size： cover 屬性，改成 100% 100% ，不讓 CSS 繪製時做太多的計算。
### JS 跟 CSS 肥大問題
* 透過 [TerserWebpack](https://webpack.js.org/plugins/terser-webpack-plugin/) 壓縮 JS ，減少 JS 肥大問題。
* 透過 [CssMinimizerWebpackPlugin](https://webpack.js.org/plugins/css-minimizer-webpack-plugin/#root) 壓縮 CSS ，減少 CSS 肥大問題。
### SEO 問題
* 注意 HTML Tag 的使用與順序。
* 加上 SEO 相關的 meta 標籤。
