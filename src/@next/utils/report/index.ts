type ColorCode = {
  code: string;
  color: string;
}[];

type Data = {
  objectCriticalToChecked?: {
    objects: {
      type: string;
      name: string;
    }[];
  }[];
  objectSeasonAndCritical?: Data['objectCriticalToChecked'];
  objectStatuses?: Data['objectCriticalToChecked'];
};
export const getPageLegend = (colorCode: ColorCode, data: Data) => {
  const pageLegend = {
    objectCriticalToChecked: [],
    objectSeasonAndCritical: [],
    objectStatuses: [],
  };

  Object.keys(pageLegend).map((key: keyof typeof pageLegend) => {
    const pageLegendItems = (data?.[key]?.[0]?.objects ?? []).map((item) => {
      const color = colorCode.find((color) => color.code === item.type) || null;
      return ({
        color: color ? color.color : 'black',
        code: color ? color.code : 'no_violation',
        description: item.name,
      });
    });
    pageLegend[key] = pageLegendItems;
  });
  return pageLegend;
};