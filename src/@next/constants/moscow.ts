import {transform} from 'ol/proj';

const long = 37.624876;
const lat = 55.756288;

const center = transform([long, lat], 'EPSG:4326', 'EPSG:3857');

export const centerMsk = center;
export const extentMsk: [number, number, number, number] = [centerMsk[0], centerMsk[1], centerMsk[0], centerMsk[1]];

export const regionPickZoom = 12;
export const districtPickZoom = 13;
export const violationPickZoom = 30;
