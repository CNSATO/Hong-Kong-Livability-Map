import './style.css';
import { Map, View } from 'ol';
// import TileLayer from 'ol/layer/Tile';
import TileLayer from 'ol/layer/WebGLTile.js';
import TileWMS from 'ol/source/TileWMS.js';
import OSM from 'ol/source/OSM';
import { transform, toLonLat } from 'ol/proj';
import ImageSource from 'ol/source/Image';
import { ImageStatic } from 'ol/source';
import GeoTIFF from 'ol/source/GeoTIFF.js';



const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    new TileLayer({
      source: new GeoTIFF({
        sources: [
          {
            url: 'resources/B50K_R200index-geo.tif',
          },
        ],
        projection: 'EPSG:2326'  // 依据地图投影调整
      }),
    }),
    


    //   new Image({
    //     source: new ImageStatic({
    //         url: 'resources/B50K_R200index-geo.tif',  // 本地栅格图像路径
    //         imageExtent: [113.814, 22.145, 114.451, 22.565],  // 图像的边界坐标（投影坐标）
    //         projection: 'EPSG:2326'  // 依据地图投影调整
    //     })
    // })
  ],
view: new View({
  projection: "EPSG:3857",
  center: [12711171.903517054, 2556018.552300771],
  zoom: 11,
  // maxZoom: 9,
  // extent: transform([113.7909, 22.1271, 114.524, 22.607], "EPSG:4326", "EPSG:3857")
  // 22.3,113.7909; 22.1271,114.1376; 22.371,114.524; 22.607,114.140
}),
});

// const source = new GeoTIFF({
//   sources: [
//     {
//       url: 'https://openlayers.org/data/raster/no-overviews.tif',
//     },
//   ],
//   projection: 'EPSG:2326'  // 依据地图投影调整
// });

// const rasterLayer = new TileLayer({
//   source: source,
// })

// // 添加图层到地图
// map.addLayer(rasterLayer);

// const layer = new TileLayer({
//   source: new TileWMS({
//     projection: "EPSG:4326",
//     url: "https://wms.geo.admin.ch/",
//     params: {
//       "LAYERS": "ch.swisstopo.pixelkarte-farbe-pk1000.noscale",
//       "FORMAT": "image/jpeg",
//     },
//   }),
// });

// map.addLayer(layer);

map.on('pointermove', function (event) {
  // 获取鼠标所在位置的地理坐标（经纬度）
  var coordinates = toLonLat(event.coordinate);

  // 将坐标赋值给变量
  var mouseCoordinates = coordinates;

  // 可以在此处执行任何需要的操作，例如在控制台输出坐标
  document.getElementById("location").innerHTML = `${mouseCoordinates[0].toFixed(4)}°E, ${mouseCoordinates[1].toFixed(4)}°N`;
  var lz = document.getElementById("location-zoom")
  lz.style.opacity = 1;

  let end = setInterval(function () {
    lz.style.opacity = lz.style.opacity - 0.01;
  }, 20);
  for (let i = 1; i < end; i++) {
    clearInterval(i);
  }

});

var currentZoom = 11;

map.on('moveend', function (event) {
  // 获取当前视图中的 zoom 等级
  var newZoom = map.getView().getZoom();
  // 检查 zoom 是否发生了变化
  if (newZoom !== currentZoom) {
    document.getElementById("zoom").innerHTML = newZoom.toFixed(2);
    // 更新当前的zoom等级
    currentZoom = newZoom;
  }
});