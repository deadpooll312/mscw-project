export enum BackendSRS {
  MSK_77 = 'MSK_77',
  EPSG_3857 = 'EPSG_3857',
  EPSG_4326 = 'EPSG_4326',
}

export enum GeometryType {
  Point = 'POINT',
  MultiPoint = 'MULTIPOINT',
  LineString = 'LINESTRING',
  Polygon = 'POLYGON',
  MultiLineString = 'MULTILINESTRING',
  MultiPolygon = 'MULTIPOLYGON',
  GeometryCollection = 'GEOMETRYCOLLECTION',
}

export type EgipError = {
  details: string;
  errorCode: 'ILLEGAL_PARAMETER';
  message: string;
  result: 'FAIL';
};
