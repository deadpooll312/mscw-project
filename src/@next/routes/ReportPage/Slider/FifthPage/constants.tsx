import { AdvancedTableColumn } from 'components/HelpInfo/widgets/types';

export const fifthReportTableNames = {
  name: 'Округ',
  totalObject: 'Количество объектов в округе, шт',
  totalChecked: 'Всего проверено объектов (Ведомственный контроль + Контроль жителей)',

  departmentalControl_uniqueCheckedPercent: 'Доля уникальных проверенных объектов, к количеству объектов (%)',
  departmentalControl_violationToCheckedPercent: 'Доля объектов с нарушениями, к всего проверенным объектов (%)*',
  departmentalControl_criticalToCheckedPercent: 'Доля объектов с критичными нарушениями, к всего проверенным объектов (%)*',
  departmentalControl_rating: 'Место округа по доле объектов с критичными нарушениями**',

  citizenControl_uniqueCheckedPercent: 'Доля уникальных проверенных объектов, к количеству объектов (%)',
  citizenControl_violationToCheckedPercent: 'Доля объектов с нарушениями, к всего проверенным объектов (%)*',
  citizenControl_criticalToCheckedPercent: 'Доля объектов с критичными нарушениями, к всего проверенным объектов (%)*',
  citizenControl_rating: 'Место округа по доле объектов с критичными нарушениями**',

  consolidatedControl_uniqueCheckedPercent: 'Доля уникальных проверенных объектов, к количеству объектов (%)',
  consolidatedControl_violationToCheckedPercent: 'Доля объектов с нарушениями, к всего проверенным объектов (%)*',
  consolidatedControl_criticalToCheckedPercent: 'Доля объектов с критичными нарушениями, к всего проверенным объектов (%)*',
  consolidatedControl_rating: 'Место округа по доле объектов с критичными нарушениями**',
};

const fifthReportMatchedFields = {
  departmentalControl_rating: 'departmentalControl_criticalToCheckedPercent',
  citizenControl_rating: 'citizenControl_criticalToCheckedPercent',
  consolidatedControl_rating: 'consolidatedControl_criticalToCheckedPercent'
};

const percentFields = new Set([
  'departmentalControl_uniqueCheckedPercent',
  'departmentalControl_violationToCheckedPercent',
  'departmentalControl_criticalToCheckedPercent',

  'citizenControl_uniqueCheckedPercent',
  'citizenControl_violationToCheckedPercent',
  'citizenControl_criticalToCheckedPercent',

  'consolidatedControl_uniqueCheckedPercent',
  'consolidatedControl_violationToCheckedPercent',
  'consolidatedControl_criticalToCheckedPercent',
]);

const checkMatchedFields = (fieldKey: 'departmentalControl_rating' | 'citizenControl_rating' | 'consolidatedControl_rating', record) => {
  if (record[fifthReportMatchedFields[fieldKey]] === 0){
    return '-';
  }
  return record[fieldKey] !== 0 ? `${record[fieldKey]}` : '—';
};

export const tableColumnMeta: AdvancedTableColumn[] = Object.entries(fifthReportTableNames).map(
  ([fieldKey, fieldTitle]) => {
    if (fieldKey === 'departmentalControl_rating' || fieldKey === 'citizenControl_rating' || fieldKey === 'consolidatedControl_rating'){
      return ({
        key: fieldKey,
        dataIndex: fieldKey,
        renderCell: (
          (title: number, record) => checkMatchedFields(fieldKey, record)
        ),
        title: fieldTitle,
      });
    } else {
      return ({
        key: fieldKey,
        dataIndex: fieldKey,
        renderCell: (
          percentFields.has(fieldKey)
            && (
              (title: number) => `${title.toFixed(2)} %`
            )
        ),
        title: fieldTitle,
      });
    }
  }
);