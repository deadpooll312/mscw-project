export const URL_FEATURES = '/api/v1/dashboard/features';

export const URL_LEGEND = '/api/v1/dashboard/legend';

export const URL_GET_NEARBY_CAMERAS = '/api/v1/dashboard/violations/get/nearby/cameras';
export const URL_SEND_CAMERA_COMMAND = '/api/v1/dashboard/violations/sendCameraCommand';
export const URL_GET_CAMERAS_AZIMUTHS = '/api/v1/dashboard/violations/getCamerasAzimuths';
export const URL_GET_CAMERA_POSITIONS = '/api/v1/dashboard/violations/getCameraPositions';
export const URL_GET_CAMERA_STREAM = '/api/v1/dashboard/violations/stream';
export const URL_GET_VIDEO_DATA_FROM_ECHD = '/api/v1/dashboard/violations/video';

export const URL_SYSTEM_TYPE = '/api/v1/dashboard/system_type';

export const URL_VIOLATIONS = '/api/v1/dashboard/violations';
export const URL_VIOLATIONS_CARD = `${URL_VIOLATIONS}/card`;
export const URL_VIOLATIONS_BY_DIMENSION = `${URL_VIOLATIONS}/dimension`;
export const URL_VIOLATIONS_MOVE_CAMERA_TO_COORDINATES = `${URL_VIOLATIONS}/moveCamerasToCoordinates`;

export const URL_WEATHER = '/api/v1/dashboard/weather';

export const URL_LAYERS = '/api/v1/dashboard/layers';

export const URL_WINTER_DATA = '/api/v1/dashboard/winter/snow';

export const URL_SAVE_REPORT = '/api/v1/dashboard/report/save';
export const URL_REPORT_TYPES = '/api/v1/dashboard/report/types';
export const URL_CHECK_REPORT = '/api/v1/dashboard/report/isExists';
export const URL_REPORT_LINK = '/api/v1/dashboard/report/get';
export const URL_INSTRUCTION = 'api/v1/dashboard/report/instruction';
export const URL_REPORT_INFO = '/api/v1/dashboard/info/report';

export const URL_GRAPHICS = '/api/v1/dashboard/graphics';

export const URL_WIDGETS_BY_TYPE = '/api/v1/dashboard/widget';
export const URL_WIDGETS = `${URL_WIDGETS_BY_TYPE}/all`;
export const URL_FOR_TABLE = `${URL_WIDGETS_BY_TYPE}/forTable`;
export const URL_FOR_TABLE_IN_EXCEL = `${URL_WIDGETS_BY_TYPE}/tableInExcel`;

export const URL_INITIAL_FILTERS = `${URL_WIDGETS_BY_TYPE}/initial/filters`;

export const URL_DASHBOARD_DASHLET = 'api/v1/dashboard/dashlet';

export const URL_LAYER_INCIDENTS = '/api/v1/dashboard/incident/all';
export const URL_INCIDENT_FEATURE = '/api/v1/dashboard/incident/feature';
