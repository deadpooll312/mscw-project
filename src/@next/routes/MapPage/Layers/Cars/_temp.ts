export type WssCar = {
  date: string;
  condition: number;
  status_id: number;
  type_id: number;
  owner_id: number;
  contract: number;
  season: number;
  id: number;
  lat: number;
  long: number;
  speed: number;
  gnum: string;
};

export type WssCarAns = {
  vehicles: {
    vehicle: WssCar[];
  };
};
