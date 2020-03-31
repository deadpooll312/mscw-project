import * as React from 'react';
import { message } from 'antd';
import { useSelector } from 'react-redux';

import { SidebarButton } from '@next/ui/atoms/SidebarButton';
import { selectPrimaryFiltersWithoutTheme, selectSecondaryFiltersWithSearch } from 'app/store/modules/sidebar/selectors';
import { prepareFilters, preparePrimaryFilters } from 'app/store/modules/dashboard/utils';
import { getDashboardTableExcel } from 'app/api/dashboard';
import { saveData } from '@next/utils/saveData';
import { getReportFormattedDate } from '@next/utils/dates';

type Props = {
  sortData: {
    field: string;
    isReverse: boolean;
  };
  isDataEmpty: boolean;
};

const ButtonExportViolationTable: React.FC<Props> = React.memo(
  (props) => {
    const [loadDisabled, setLocalDisabled] = React.useState(false);
    const primaryFiltersWithoutTheme = useSelector(selectPrimaryFiltersWithoutTheme);
    const secondaryFilters = useSelector(selectSecondaryFiltersWithSearch);

    const isDisabled = props.isDataEmpty || !Object.keys(secondaryFilters).length || loadDisabled ;

    const handleClick = React.useCallback(
      async () => {
        if (!isDisabled) {
          setLocalDisabled(true);
          const hide = message.loading({
            content: 'Формирование таблицы',
          });

          const getParams = {
            ...preparePrimaryFilters(primaryFiltersWithoutTheme),
            sortBy: props.sortData.field,
            sortingOrder: !props.sortData.isReverse ? 'ASC' : 'DESC',
          };

          if (!getParams.sortBy) {
            delete getParams.sortBy;
            delete getParams.sortingOrder;
          }

          const bodyParams = prepareFilters(secondaryFilters);
          try {
            const blob = await getDashboardTableExcel(bodyParams, getParams);
            const formattedDate = getReportFormattedDate(`${getParams.endDate}Z`);

            saveData(blob, `Таблица нарушений_${formattedDate}.xlsx`);
          } catch (e) {
            console.error(e);
          }

          hide();
          setLocalDisabled(false);
        }
      },
      [primaryFiltersWithoutTheme, secondaryFilters, props.sortData, isDisabled],
    );

    return (
      <SidebarButton
        title="Выгрузить"
        value={null}
        onClick={handleClick}
        disabled={isDisabled}
      />
    );
  },
);

export default ButtonExportViolationTable;
