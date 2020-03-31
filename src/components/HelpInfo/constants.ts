export const townAliases = {
  region: {
    title: 'городу',
    infoTitle: 'округам',
  },
  district: {
    title: 'округу',
    infoTitle: 'районам',
  },
  violation: {
    title: 'району ',
    infoTitle: null,
  },
};

export const cityColumns = [
  {
    title: 'Объекты контроля',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Всего нарушений',
    dataIndex: 'objects_with_violations',
    key: 'objects_with_violations',
  },
  // {
  //   title: 'Критичные нарушения',
  //   dataIndex: 'violations_all',
  //   key: 'violations_all',
  // },
  {
    title: 'Выявлено городом',
    dataIndex: 'objects_gov',
    key: 'objects_gov',
  },
  {
    title: 'Выявлено жителями',
    dataIndex: 'objects_citizen',
    key: 'objects_citizen',
  }
];

export const cityObjectsColumns = [
  {
    title: 'Округа',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Всего нарушений',
    dataIndex: 'objects_with_violations',
    key: 'objects_with_violations',
  },
  // {
  //   title: 'Критичные нарушения',
  //   dataIndex: 'violations_all',
  //   key: 'violations_all',
  // },
  {
    title: 'Выявлено городом',
    dataIndex: 'objects_gov',
    key: 'objects_gov',
  },
  {
    title: 'Выявлено жителями',
    dataIndex: 'objects_citizen',
    key: 'objects_citizen',
  }
];

export const regionObjectsColumns = [
  {
    title: 'Районы',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Всего нарушений',
    dataIndex: 'objects_with_violations',
    key: 'objects_with_violations',
  },
  // {
  //   title: 'Критичные нарушения',
  //   dataIndex: 'violations_all',
  //   key: 'violations_all',
  // },
  {
    title: 'Выявлено городом',
    dataIndex: 'objects_gov',
    key: 'objects_gov',
  },
  {
    title: 'Выявлено жителями',
    dataIndex: 'objects_citizen',
    key: 'objects_citizen',
  }
];
