import * as React from 'react';
import type Map from 'ol/Map';
import type MapBrowserEvent from 'ol/MapBrowserEvent';
import type VectorLayer from 'ol/layer/Vector';
import type { FeatureLike } from 'ol/Feature';
import Select from 'ol/interaction/Select';
import { pointerMove } from 'ol/events/condition';

import { SHADOW_OFFSET, LIGHT_GREY } from 'containers/layers/constants';
import { generateStyle, clearStyle } from 'containers/layers/utils/common';
import { FEATURE_TYPES } from 'containers/layers/utils/constants';
import { darken } from 'polished';

export const cantSelect = 'cantSelect';
export const isShadow = 'isShadow';

export const useDefaultHoverFeature = (map: Map, layer: VectorLayer) => {
  const useHoverHook = useHoverInteractionWrap(map, layer);

  return (isShow: boolean) => {
    const [selectedFeature, setSelectedFeature] = React.useState<FeatureLike>(null);

    const findFeatureInHoverOrCenterMap = React.useCallback(
      () => {
        let hoveredFeature = selectedFeature;                                          // фича под мышкой

        if (!hoveredFeature) {                                                         // если нет фичи под мышкой, то ищем по центру
          const centerCoordinate = map.getView().getCenter();
          const centerPixel = map.getPixelFromCoordinate(centerCoordinate);

          hoveredFeature = map.getFeaturesAtPixel(
            centerPixel,
            {
              layerFilter: (layerFind: VectorLayer) => (
                layerFind && layer && layerFind.get('name') === layer.get('name')
              ),
            }
          )?.[0];
        }

        if (hoveredFeature?.get(cantSelect)) {
          hoveredFeature = null;
        }

        return hoveredFeature;
      },
      [map, selectedFeature, layer],
    );

    // сам селект фичи
    const handleHover = React.useCallback(
      (featureOwn) => {
        if (isShow) {
          const feature = featureOwn ?? null;

          const triggerOnUpdateSelectedFeature = (
            feature
            && !feature.get(isShadow)
            && (
              !selectedFeature
              || (
                selectedFeature.getId() !== feature.getId()
              )
            )
          );

          if (!feature || triggerOnUpdateSelectedFeature) {
            setSelectedFeature(feature);
          }
        } else {
          setSelectedFeature(null);
        }
      },
      [selectedFeature, isShow],
    );

    // измнение цвета выбранной фичи
    React.useEffect(
      () => {
        if (selectedFeature && ('getStyle' in selectedFeature)) {
          const style = selectedFeature.getStyle();

          if (style) {
            if ('getFill' in style) {
              const fillColor = style.getFill().getColor();
              const strokeColor = style.getStroke().getColor();

              selectedFeature.setStyle(generateStyle(fillColor, strokeColor, 2, 10));

              return () => {
                setTimeout(
                  () => {
                    clearStyle(selectedFeature);
                  },
                  200,
                );
              };
            }
          }
        }
      },
      [selectedFeature],
    );

    // тень выбранной фичи
    React.useEffect(
      () => {
        if (selectedFeature && layer) {
          if ('clone' in selectedFeature) {
            const shadowFeature = selectedFeature.clone();
            shadowFeature.set(isShadow, true);
            const style = selectedFeature.getStyle();
            if (style) {
              if ('getStroke' in style) {
                const strokeColor = style.getStroke().getColor();

                shadowFeature.setStyle(generateStyle(darken(0.05, LIGHT_GREY), strokeColor, 2, 0));
                layer.getSource().addFeature(shadowFeature);

                return () => {
                  setTimeout(
                    () => {
                      if (shadowFeature) {
                        if (layer.getSource().hasFeature(shadowFeature)) {
                          layer.getSource().removeFeature(shadowFeature);
                        }
                      }
                    },
                    100,
                  );
                };
              }
            }
          }
        }
      },
      [selectedFeature, layer],
    );

    // сдвиг выбранной фичи
    React.useEffect(
      () => {
        if (selectedFeature && !selectedFeature.get(cantSelect)) {
          let inMove = true;

          let step = SHADOW_OFFSET / 2;
          let stepX = -step;
          let stepY = step;

          let currentMove = 0;
          const allMove = Math.abs(SHADOW_OFFSET / stepY);

          const moveUp = () => {
            currentMove += 1;
            const geometry = selectedFeature.getGeometry();
            if ('translate' in geometry) {
              geometry.translate(stepX, stepY);
            }

            if (inMove && currentMove < allMove) {
              requestAnimationFrame(moveUp);
            }
          };

          requestAnimationFrame(moveUp);

          // поднимаем фичи
          return () => {
            inMove = false;

            const moveDown = () => {
              currentMove -= 1;
              const geometry = selectedFeature.getGeometry();
              if ('translate' in geometry) {
                geometry.translate(-stepX, -stepY);
              }

              if (!inMove && currentMove > 0) {
                requestAnimationFrame(moveDown);
              }
            };

            requestAnimationFrame(moveDown);
          };
        }
      },
      [selectedFeature],
    );

    useHoverHook(handleHover, isShow);

    return React.useMemo(
      () => {
        return ({
          selectedFeature,
          findFeatureInHoverOrCenterMap,
        });
      },
      [
        selectedFeature,
        findFeatureInHoverOrCenterMap,
      ]
    );
  };
};

export const useHoverInteractionWrap = (map: Map, layer: VectorLayer) => {
  return (handleHover: (event) => any, isShow: boolean) => {
    return React.useEffect(
      () => {
        const selectPointerMove = new Select({
          condition: pointerMove,
          layers: [layer],
          style: null,
        });

        selectPointerMove.on('select', function(e) {
          const hasSelectedFeature = Boolean(e.selected[0]);
          handleHover(e.selected[0] ?? null);
          document.getElementById('map-section').style.cursor = hasSelectedFeature ? 'pointer' : 'default';
        });

        const handleHoverWrap = (e) => handleHover(e.feature);

        map.getViewport().addEventListener('mouseout', handleHoverWrap);
        map.addInteraction(selectPointerMove);

        return () => {
          map.removeInteraction(selectPointerMove);

          map.getViewport().removeEventListener('mouseout', handleHoverWrap);
        };
      },
      [map, handleHover, layer],
    );
  };
};

export const useLayerClickEventWrap = (map: Map, layer: VectorLayer) => {
  return (featureType: typeof FEATURE_TYPES[keyof typeof FEATURE_TYPES], handleClick: (feature: FeatureLike) => any) => {
    const handleMapClick = React.useCallback(
      (event: MapBrowserEvent) => {
        const [selectedFeature] = (map.getFeaturesAtPixel(
          event.pixel,
          {
            layerFilter: (layerFind: VectorLayer) => (
              layerFind && layer && layerFind.get('name') === layer.get('name')
            ),
          }
        ) || []).filter((feature) => (
          feature.get('featureType') === featureType
          && !feature.get(isShadow)
          && !feature.get(cantSelect)
        ));

        handleClick(selectedFeature);
      },
      [handleClick, layer, featureType],
    );

    React.useEffect(
      () => {
        map.on('click', handleMapClick);
        return () => map.un('click', handleMapClick);
      },
      [handleMapClick],
    );
  };
};

export const defaultLayerHook = (map: Map, layer: VectorLayer) => {
  return React.useMemo(
    () => {
      const useLayerClickEvent = useLayerClickEventWrap(map, layer);
      const useHoverInteraction = useHoverInteractionWrap(map, layer);
      const useDefaultHoverFeatureWrap = useDefaultHoverFeature(map, layer);

      return {
        useLayerClickEvent,
        useHoverInteraction,
        useDefaultHoverFeature: useDefaultHoverFeatureWrap,
      };
    },
    [
      map,
      layer,
    ],
  );
};
