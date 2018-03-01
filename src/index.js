import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet-src.js';

//百度地图
import * as BaiduMap from './js/components/BaiduMap.js';
export { BaiduMap };
//聚合数据
import * as markerCluster from './js/components/markercluster_component';
export { markerCluster };

//测量
import * as measure from './js/components/Measure_component';
export { measure };

//坐标转换
import * as transform from './js/components/Transform_component';
export { transform };

//要素编辑
import * as features_edit from './js/components/Featrues_component';
export { features_edit };

//WFS服务
import * as WFS_service from './js/components/WFS_compononent';
export { WFS_service };