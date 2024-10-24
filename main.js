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
import Extent from 'ol/interaction/Extent.js';
import Projection from 'ol/proj/Projection.js';
import {getCenter} from 'ol/extent.js';
import ZoomToExtent from 'ol/control/ZoomToExtent.js';

const source = new GeoTIFF({
  sources: [
    {
      url: 'resources/test3.tif',
    },
  ],
  
});

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    new TileLayer({
      source: source,
      // projection: 'EPSG:3857',  // 依据地图投影调整
      
      opacity: 0.95,
      visible: true,
      zIndex: 997,
      preload:1,
    }),
  ],
  // view: source.getView(),
  view: new View({
    projection: 'EPSG:3857',
    center: [12711171.903517054, 2556018.552300771],
    // extent: transform([113.7909, 22.1271, 114.524, 22.607], "EPSG:4326", "EPSG:3857"),
    zoom: 11,
    extent:[12667145.044908313, 2526791.9622115255, 12748753.363608863, 2584560.61803718],
  }),
});

function pointerLocationWindowFade(event) {
  var lz = document.getElementById("location-zoom")
  lz.style.opacity = 1;

  let end = setInterval(function () {
    lz.style.opacity = lz.style.opacity - 0.01;
  }, 20);
  for (let i = 1; i < end; i++) {
    clearInterval(i);
  }
}

// map.addLayer(layer);

map.on('pointermove', function (event) {
  // 获取鼠标所在位置的地理坐标（经纬度）
  var coordinates = toLonLat(event.coordinate);

  // 将坐标赋值给变量
  var mouseCoordinates = coordinates;

  // operation
  document.getElementById("location").innerHTML = `${mouseCoordinates[0].toFixed(4)}°E, ${mouseCoordinates[1].toFixed(4)}°N`;
  pointerLocationWindowFade(event)
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
  pointerLocationWindowFade(event)
});