import XYZSource from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import OverviewMap, { Options as OverviewMapOptions } from 'ol/control/OverviewMap';
import * as olExtent from 'ol/extent';
import Map from 'ol/Map';

import { getCopyrightControl } from './copyright';
import { MapOptions } from 'ol/PluggableMap';
import { ViewOptions } from 'ol/View';

export const tileId = 'tiles';
export const overViewMapId = 'overviewMap';

/**
 * Найти слой с id (id устанавливаетя либо через layer.setId(..), либо при инициализации слоя как одна из опций)
 * @param map
 * @param id
 */
export function getLayerById(map: Map, id: string): VectorLayer {
  return map.getLayers().getArray().find((l) => l.get('id') === id) as VectorLayer;
}

/**
 * Возвращает url у source
 * @param source
 */
function getSourceUrls(source) {
  return source.urls || [];
}

/**
 * Установить контрол с надписью 2gis
 * @param map
 */
export function addCopyrightControl(map: Map) {
  var copyrightText = document.createElement('span');
  copyrightText.innerHTML = '© Данные предоставлены 2ГИС';

  var element = document.createElement('div');
  element.style.position = 'absolute';
  element.style.bottom = '0';
  element.style.right = '0';

  element.appendChild(copyrightText);
  var copyrightControl = getCopyrightControl();
  map.addControl(copyrightControl);
}

/**
 * Удаляет контрол с надписью 2gis
 * @param map
 */
export function deleteCopyrightControl(map: Map) {
  if (!map) {
    return;
  }
  var copyrightControl = getCopyrightControl();
  map.removeControl(copyrightControl);
}

/**
 * Устанавливает контрол с гадписью 2gis только на 2gis view
 * @param map
 */
export function add2gisCopyrightControl(map: Map) {
  const tiles = getLayerById(map, tileId);
  if (tiles) {
    const source = tiles.getSource();
    if (source) {
      const urls: string[] = getSourceUrls(source);
      const is2gis = urls.some((url) => url.includes('2gis'));
      if (is2gis) {
        addCopyrightControl(map);
      } else {
        deleteCopyrightControl(map);
      }
    }
  }
}

/**
 * функция создания карты ol.Map
 */
export function createMap(options: MapOptions) {
  const map = new Map(options);

  add2gisCopyrightControl(map);
  return map;
}

/**
 * создать ol.View в проекции 3857
 * @param options
 */
export function createView(options: ViewOptions) {
  const v = new View(options);
  return v;
}

/**
 * создать ol.View в проекции 3857, центром в Москве и зумом 11
 * @param options
 */
export function createViewWGS(options: ViewOptions) {
  return createView({
    center: fromLonLat([37.6173, 55.7558]),
    zoom: 9,
    ...options
  });
}

/**
 * Создать ol.tile.Layer с подложкой 2GIS
 */
export function createTiles2GIS(urlTemplate: string, opts = {}) {
  return new TileLayer({
    id: tileId,
    source: new XYZSource({
      url: `${location.protocol}//${urlTemplate}`,
      crossOrigin: 'anonymous',
    }),
    ...opts,
  } as any);
}

/**
 * Установить слой с TILE_LAYER_ID (подложка)
 * @param map
 * @param layer
 */
export function setTileLayer(map: Map, layer) {
  const tiles = getLayerById(map, tileId);
  map.removeLayer(tiles);
  map.getLayers().insertAt(0, layer);
  add2gisCopyrightControl(map);
  return map;
}

/**
 * Создание мини-карты
 * @param options
 */
export function createOverviewMap(options: OverviewMapOptions) {
  const omap = new OverviewMap({
    ...options,
  });
  omap.set('id', overViewMapId);
  return omap;
}

/**
 * Найти control по id
 * @param map
 * @param id
 */
export function getControlById(map: Map, id: any) {
  return map.getControls().getArray().find((x) => x.get('id') === id);
}

/**
 * Найти обзорную карту
 * @param map
 */
export function getOverviewMap(map: Map) {
  return getControlById(map, overViewMapId) as OverviewMap;
}

/**
 * Найти tile слой
 * @param map
 */
export function getTileLayer(map: Map): VectorLayer {
  return getLayerById(map, tileId);
}

export function renderOverViewMap(this): any {
  var map = this.getMap();
  var overviewMap = this.getOverviewMap();

  if (!map.isRendered() || !overviewMap.isRendered()) {
    return;
  }

  var mapSize = map.getSize();
  var view = map.getView();
  var mapExtent = view.calculateExtent(mapSize);
  var overviewMapSize = overviewMap.getSize();
  var overviewMapView = overviewMap.getView();
  var overviewMapExtent = overviewMapView.calculateExtent(overviewMapSize);

  if (!olExtent.containsExtent(overviewMapExtent, mapExtent)) {
    overviewMapView.setCenter(view.getCenter());
  }

  var overlay = overviewMap.getOverlays().getArray()[0];
  var box = overlay.getElement();
  var overviewMapViewResolution = overviewMapView.getResolution();
  var bottomLeft = olExtent.getBottomLeft(mapExtent);
  var topRight = olExtent.getTopRight(mapExtent);

  overlay.setPosition(bottomLeft);
  overviewMapView.setZoom(view.getZoom() - 4);

  if (box) {
    box.style.width = Math.abs((bottomLeft[0] - topRight[0]) / overviewMapViewResolution) + 'px';
    box.style.height = Math.abs((topRight[1] - bottomLeft[1]) / overviewMapViewResolution) + 'px';
  }
}

/**
 * Добавить обзорную карту с одним слоем - tiles для эффективности работы с картой
 * Если не указать слой, все слои карты будут отображены на overviewMap как отдельные wms слои с отдельными запросами
 * Отличается от addOverViewMap тем, что уровень зума для OverViewMap отличается от зума основной карты на 4
 * @param map
 * @param view
 */
export function addOverViewMapWithZoom(map: Map, view: View) {
  const previousMap = getOverviewMap(map);
  map.removeControl(previousMap);
  const tileLayer = getTileLayer(map);
  const omap = createOverviewMap({
    layers: [tileLayer],
    view: view,
    tipLabel: 'Обзорная карта',
    collapsed: previousMap ? previousMap.getCollapsed() : true,
    render: renderOverViewMap
  });
  map.addControl(omap);
}

/**
 * Центр экстента
 * @param map
 * @param layer
 */
export function getCenterOfExtent(extent: number[]) {
  const x = extent[0] + (extent[2] - extent[0]) / 2;
  const y = extent[1] + (extent[3] - extent[1]) / 2;
  return [x, y];
}
