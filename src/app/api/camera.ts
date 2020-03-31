import { MomentInput } from 'moment';
import { axiosDashboard } from 'app/api/axios';
import { getFormattedDateTimeStandart } from '@next/utils/dates';

import { RestResult } from 'app/types';
import { EchdStreamDataDTO } from 'app/swagger/model/echdStreamDataDTO';
import { EchdDataDTO } from 'app/swagger/model/echdDataDTO';
import { CameraPositionsToMove, EchdNearCameraResponse, AnsGetCamerasAzimuths } from './types';

import {
  URL_GET_NEARBY_CAMERAS,
  URL_SEND_CAMERA_COMMAND,
  URL_GET_CAMERAS_AZIMUTHS,
  URL_GET_CAMERA_POSITIONS,
  URL_GET_CAMERA_STREAM,
  URL_GET_VIDEO_DATA_FROM_ECHD
} from './constants';

//  TODO wrong swagger response type
export function loadNearbyCameras(lng: number, lat: number, trash: boolean, radius: number = 50, types?: string) {
  return axiosDashboard
    .get<EchdNearCameraResponse, RestResult<EchdNearCameraResponse>>(URL_GET_NEARBY_CAMERAS, {
      params: {
        lng,
        lat,
        radius,
        types,
        trash: !!trash,
      }
    });
}

/**
 * Отправка команды камере
 * id - идентификатор камеры
 *
 * command
 * move_x,y - вертикальный/горизонтальный поворот (значение “x” в пределах -56..+56, “y” в пределах -28..+28)
 * zoom_z - Приближение/отдаление сцены обзора (значение “z” может принимать одно из следующих значений: -1,0,1)
 * movehome - перевод камеры в глобальное домашнее положение
 * sethome - сохранение текущего положения как глобальное домашнее положение.
 */
export function sendCameraCommand(id: string, command: string) {
  return axiosDashboard.get<any>(
    URL_SEND_CAMERA_COMMAND,
    {
      params: {
        id,
        command: command,
      }
    },
  );
}

/**
 * Поворот камеры
 * id - идентификатор камеры
 */
export function sendCameraCommandMove(id: string, move: [number, number]) {
  return sendCameraCommand(
    id,
    `move_${move.toString()}`
  );
}

/**
 * Поворот камеры домой
 * id - идентификатор камеры
 */
export function sendCameraCommandMoveHome(id: string) {
  return sendCameraCommand(
    id,
    'movehome'
  );
}

//  TODO empty in swagger
/**
 * Получение данных положения камеры
 * id - идентификатор камеры
 */
export function getCamerasAzimuths(id: string) {
  return axiosDashboard.post<AnsGetCamerasAzimuths>(
    `${URL_GET_CAMERAS_AZIMUTHS}?id=${id}`,
    {},
  );
}

/**
 * Изменение зума
 * id - идентификатор камеры
 * zoom - зум
 */
export function sendCameraCommandZoom(id: string, zoom: -1 | 0 | 1) {
  return sendCameraCommand(
    id,
    `zoom_${zoom}`,
  );
}

//  TODO empty in swagger
/**
 * Получение списка позиций для камеры
 * id - идентификатор камеры
 */
export function getCameraPositionsToMove(id: string) {
  return axiosDashboard.get<CameraPositionsToMove>(
    URL_GET_CAMERA_POSITIONS,
    {
      params: {
        id,
      }
    },
  );
}

export function getCameraStream(cameraId: string, dataCreation?: MomentInput) {
  const params: Record<string, any> = {
    cameraId
  };

  if (dataCreation) {
    params.data_creation = getFormattedDateTimeStandart(dataCreation);
  }

  return axiosDashboard
    .get<EchdStreamDataDTO, RestResult<EchdStreamDataDTO>>(URL_GET_CAMERA_STREAM, {
      params,
    });
}

export function getCameraVideoPlayer(cameraId: string) {
  return axiosDashboard
    .get<EchdDataDTO, RestResult<EchdDataDTO>>(URL_GET_VIDEO_DATA_FROM_ECHD, {
      params: { cameraId }
    });
}
