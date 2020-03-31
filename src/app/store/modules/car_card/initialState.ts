import type { CarCardState } from 'app/store/modules/car_card/types';
import type { WssCar } from '@next/routes/MapPage/Layers/Cars/_temp';

let defaultMainCarData: WssCar = {
  id: 178793,
  lat: 55.9340209960938,
  long: 37.7475318908691,
  date: '2018-03-31T13:56:49.000+03:00',
  status_id: 4,
  speed: 0,
  type_id: 19,
  gnum: 'К740АЕ799',
  condition: 1,
  contract: 8,
  season: 2,
  owner_id: 10241511,
};

if (true || __DEV__) {
  defaultMainCarData = null;
}

export const initialStateCarCard: CarCardState = {
  mainCarData: defaultMainCarData,
};
