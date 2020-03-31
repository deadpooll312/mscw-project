import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Feature from 'ol/Feature';
import type Map from 'ol/Map';
import Point from 'ol/geom/Point';
import * as ReconnectingWebSocket from 'reconnectingwebsocket';

import { selectSelectedDistrict, selectKeyByLegendForCarsByColor } from 'app/store/modules/semantics/selectors';
import { createGeometryLayer } from '@next/utils/map';
import { DistrictDataItem } from 'app/store/modules/semantics/types';
import { transform } from 'ol/proj';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import { WssCar, WssCarAns } from '@next/routes/MapPage/Layers/Cars/_temp';
import { cantSelect } from 'containers/DefaultLayer';
import { selectShowCars } from 'app/store/modules/app/selectors';
import keyBy from 'lodash-es/keyBy';
import { decAppGlobalLoadingCount, changeShowCars } from 'app/store/modules/app/actions';
import { message } from 'antd';

import Select from 'ol/interaction/Select';
import { click } from 'ol/events/condition';
import { setCarMainCardData, resetCarCardData } from 'app/store/modules/car_card/actions';
import { selectModuleCarCardMainCarData } from 'app/store/modules/car_card/selectors';

type Props = {
  map: Map;
};

const isShowed = (selectedDisctrict: DistrictDataItem, showCars: boolean) => {
  return selectedDisctrict && showCars;
};

const CarsLayer: React.FC<Props> = React.memo(
  (props) => {
    const [carsList, setCarsList] = React.useState<Record<WssCar['id'], WssCar>>({});
    const mainCarData = useSelector(selectModuleCarCardMainCarData);

    const selectedDisctrict = useSelector(selectSelectedDistrict);
    const showCars = useSelector(selectShowCars);
    const legendColorRecord = useSelector(selectKeyByLegendForCarsByColor);
    const dispatch = useDispatch();

    const isShow = isShowed(selectedDisctrict, showCars);

    const layer = React.useMemo(
      () => {
        const newLayer = createGeometryLayer('is_cars_layer', null, 10000);

        props.map.addLayer(newLayer);

        return newLayer;
      },
      [],
    );

    React.useEffect(
      () => {
        if (layer) {
          layer.setStyle((feature) => {
            const fillColor = legendColorRecord[feature.getProperties().carData?.status_id]?.colorValue;

            if (fillColor) {
              return new Style({
                image: new Circle({
                  radius: 8,
                  stroke: new Stroke({
                    width: 3,
                    color: '#fff'
                  }),
                  fill: new Fill({
                    color: fillColor,
                  }),
                }),
                zIndex: 10000,
              });
            }

            return null;
          });
        }
      },
      [layer, legendColorRecord],
    );

    React.useEffect(
      () => {
        return () => {
          props.map.removeLayer(layer);
        };
      },
      [layer],
    );

    React.useEffect(
      () => {
        if (mainCarData) {
          const carInCarsList = carsList[mainCarData.id];

          if (carInCarsList) {
            if (JSON.stringify(carInCarsList) !== JSON.stringify(mainCarData)) {
              dispatch(
                setCarMainCardData(carInCarsList)
              );
            }
          }
        }
      },
      [mainCarData, carsList],
    );

    // обработка сокета
    React.useEffect(
      () => {
        if (isShow) {
          const objectCode = selectedDisctrict?.objectCode;

          console.info('i want open wss with objectCode', objectCode);
          let ws = null;
          let timeOudId = null;
          let itFirst = true;
          let hide = null;

          const connectToWss = (numberOfTry: number) => {
            if (numberOfTry < 3) {
              const wsUrl = `wss://${_WS_CAR_PATH_}/${objectCode}`;
              ws = new ReconnectingWebSocket(wsUrl, null);

              ws.onerror = () => {
                console.info('error onerror');
                ws.close();

                hide = message.loading({
                  content: `Попытка соединения ${numberOfTry + 1}`,
                  duration: 0,
                });

                timeOudId = setTimeout(
                  () => {
                    if (hide) {
                      hide();
                      hide = null;
                    }
                    connectToWss(numberOfTry + 1);
                  },
                  5 * 1000,
                );
              };

              ws.onmessage = ({ data }) => {
                if (hide) {
                  hide();
                  hide = null;
                }
                if (itFirst) {
                  itFirst = false;
                  dispatch(decAppGlobalLoadingCount());
                }

                let wssCarData: WssCarAns = null;

                try {
                  wssCarData = JSON.parse(data);
                } catch {
                  //
                }
                const carArr = wssCarData?.vehicles?.vehicle ?? [];

                setCarsList((oldState) => ({
                  ...oldState,
                  ...keyBy(carArr, 'id'),
                }));
              };

              ws.onclose = () => {
                console.info('close onclose');
              };
            } else {
              if (itFirst) {
                itFirst = false;
                clearTimeout(timeOudId);

                if (hide) {
                  hide();
                  hide = null;
                }
                message.info({
                  content: 'Ошибка подключения к сокету',
                });
                dispatch(changeShowCars(false));
                dispatch(decAppGlobalLoadingCount());
              }
            }
          };
          connectToWss(1);
          // dispatch(decAppGlobalLoadingCount());
          // setCarsList(() => ({
          //   158338: {
          //     id: 158338,
          //     lat: 55.67777,
          //     long: 37.7455,
          //     date: '2020-03-19T14:10:32.000+03:00',
          //     status_id: 1,
          //     speed: 7,
          //     type_id: 21,
          //     gnum: 'Е331СН777',
          //     condition: 1,
          //     contract: 8,
          //     season: 2,
          //     owner_id: 10228359,
          //   }
          // }));

          return () => {
            if (hide) {
              hide();
            }
            clearTimeout(timeOudId);
            if (ws) {
              ws.close();
            }
            setCarsList({});

            if (itFirst) {
              dispatch(decAppGlobalLoadingCount());
            }
          };
        }
      },
      [selectedDisctrict, isShow],
    );

    React.useEffect(
      () => {
        if (isShow) {
          return () => {
            dispatch(
              resetCarCardData(),
            );
          };
        }
      },
      [isShow],
    );

    // отображение ТС
    React.useEffect(
      () => {
        if (layer) {
          layer.getSource().clear();
          if (isShow) {
            for (const stringId in carsList) {
              const carData = carsList[stringId];
              const existFeature = layer.getSource().getFeatureById(stringId);

              const long = Number(carData.long);
              const lat = Number(carData.lat);

              if (existFeature) {
                existFeature.setGeometry(
                  new Point(transform([long, lat], 'EPSG:4326', 'EPSG:3857')),
                );
                existFeature.setProperties(
                  {
                    ...existFeature.getProperties(),
                    carData,
                  }
                );
              } else {
                const feature = new Feature({
                  geometry: new Point(transform([long, lat], 'EPSG:4326', 'EPSG:3857')),
                  carData,
                });

                feature.setId(stringId);
                feature.set(cantSelect, true);
                layer.getSource().addFeature(feature);
              }
            }
          }
        }
      },
      [layer, carsList, isShow],
    );

    React.useEffect(
      () => {
        const selectInteractionClick = new Select({
          condition: click,
          layers: [layer],
          style: null,
        });
        selectInteractionClick.on('select', (evt) => {
          const foundedFeature = evt.selected[0];

          if (!foundedFeature) {
            return;
          }

          const carData = foundedFeature.getProperties()?.carData;

          if (carData) {
            dispatch(
              setCarMainCardData(carData)
            );
          } else {
            dispatch(
              resetCarCardData()
            );
          }
        });
        props.map.addInteraction(selectInteractionClick);

        return () => {
          props.map.removeInteraction(selectInteractionClick);
          selectInteractionClick.getFeatures().clear();
        };
      },
      [layer, mainCarData],
    );

    return null;
  },
);

export default CarsLayer;
