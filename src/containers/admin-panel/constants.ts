import { Pagination, MappingData, LegendData } from './types';
import { EditableCell, EditableFormRow } from 'components/editable-cell';

export const layersColumns = [
  {
    title: 'ID слоя',
    dataIndex: 'id',
    data: {
      id: 'id',
      type: 'NUMBER',
      searchable: true
    } as any,
    sorter: false,
    width: 140,
  },
  {
    title: 'Ревизия данных',
    dataIndex: 'revisionId',
    data: {
      id: 'revisionId',
      type: 'NUMBER',
      searchable: true
    } as any,
    sorter: false,
    width: 150
  },
  {
    title: 'Название',
    dataIndex: 'name',
    editable: true,
    data: {
      id: 'name',
      type: 'STRING',
      searchable: true
    } as any,
    sorter: false,
    width: 260
  },
  {
    title: 'Алиас',
    dataIndex: 'alias',
    editable: true,
    data: {
      id: 'alias',
      type: 'STRING',
      searchable: true
    } as any,
    sorter: false,
    width: 140
  },
  {
    title: 'Описание',
    dataIndex: 'description',
    editable: true,
    data: {
      id: 'description',
      type: 'STRING',
      searchable: true
    } as any,
    sorter: false,
    width: 200
  },
  {
    title: 'Система координат',
    dataIndex: 'srcType',
    data: {
      id: 'srcType',
      type: 'STRING',
      searchable: true
    } as any,
    sorter: false,
    width: 120
  },
  {
    title: 'Дата создания',
    dataIndex: 'creationDate',
    data: {
      id: 'creationDate',
      type: 'DATE',
    } as any,
    width: 170
  },
  {
    title: 'Дата модификации',
    dataIndex: 'modificationDate',
    data: {
      id: 'modificationDate',
      type: 'DATE',
    } as any,
    width: 170
  },
  {
    title: 'Бизнес тип',
    dataIndex: 'businessType',
    data: {
      id: 'businessType',
      type: 'STRING',
    } as any,
    width: 120
  },
  {
    title: 'Порядок сортировки',
    dataIndex: 'sortOrder',
    editable: true,
    data: {
      id: 'sortOrder',
      type: 'NUMBER',
    } as any,
    sorter: false,
    required: true,
    width: 120,
  },
];

export const colorsColumns = [
  {
    title: 'Уровень',
    dataIndex: 'level',
    data: {
      id: 'level',
      type: 'STRING',
    } as any,
    sorter: false,
    selectable: true,
    required: true,
    width: 100,
    render: (text, record) => {
      return record.levelDescription;
    }
  },
  {
    title: 'Сезон',
    dataIndex: 'season',
    data: {
      id: 'season',
      type: 'STRING',
    } as any,
    sorter: false,
    selectable: true,
    required: true,
    width: 100,
    render: (text, record) => {
      return record.seasonDescription;
    }
  },
  {
    title: 'Код',
    dataIndex: 'color',
    data: {
      id: 'color',
      type: 'STRING',
    } as any,
    required: true,
    width: 100
  },
  {
    title: 'Легенда',
    dataIndex: 'description',
    editable: true,
    data: {
      id: 'description',
      type: 'STRING',
    } as any,
    width: 210
  },
  {
    title: 'Порядок сортировки',
    dataIndex: 'sortOrder',
    editable: true,
    data: {
      id: 'sortOrder',
      type: 'NUMBER',
    } as any,
    sorter: false,
    required: true,
    width: 120
  },
  {
    title: 'min %',
    dataIndex: 'minPercent',
    editable: true,
    data: {
      id: 'minPercent',
      type: 'NUMBER',
    } as any,
    width: 70,
  },
  {
    title: 'max %',
    dataIndex: 'maxPercent',
    editable: true,
    data: {
      id: 'maxPercent',
      type: 'NUMBER',
    } as any,
    width: 70
  },
];

export const initialPagination: Pagination = { page: 0, size: 25, total: 100 };
export const initialMappingData: MappingData = { isOpen: false, name: '', alias: '' };
export const initialLegendRecord: LegendData = {
  level: '',
  color: '',
  description: '',
  season: '',
  sortOrder: null,
  minPercent: null,
  maxPercent: null,
  colorValue: 'rgba(0, 0, 0, 0.5)'
};

export const tableComponents = {
  body: {
    row: EditableFormRow,
    cell: EditableCell,
  },
};

export const emojiOptions = [
  {
    value: '😊',
    label: '😊'
  },
  {
    value: '😐',
    label: '😐'
  },
  {
    value: '😟',
    label: '😟'
  },
  {
    value: null,
    label: 'no'
  }
];

export const modalEmojiOptions = [
  {
    value: '😊',
    label: '😊'
  },
  {
    value: '😐',
    label: '😐'
  },
  {
    value: '😟',
    label: '😟'
  },
  // {
  //   value: null,
  //   label: 'no'
  // }
];

