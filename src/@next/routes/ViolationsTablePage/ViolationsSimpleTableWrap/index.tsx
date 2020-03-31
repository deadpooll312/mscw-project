import * as React from 'react';
import styled, { css } from 'styled-components';

import SimpleTable from '@next/ui/molecules/SimpleTable';
import { MetaTable } from '@next/ui/molecules/SimpleTable/type';
import { getTitleObjectByCount, capitalize } from '@next/utils/names';
import { ObjectForTable } from 'app/api/types';
import ThemeDashboardCardBlock from '@next/ui/atoms/ThemeDashboardCardBlock';
import FlexContainer from '@next/ui/atoms/FlexContainer';
import Paginator from '@next/routes/ViolationsTablePage/Paginator';
import iconsPhoto from 'static/dashboard_table/icon_photo_a.png';
import { pointerCss } from '@next/ui/atoms/TableTbodyTr';

type Props = {
  localArrData: ObjectForTable[];
  isSys: boolean;
  handleShowViolationInfo: (rowData: ObjectForTable) => any;

  sortData: {
    field: keyof ObjectForTable;
    isReverse: boolean;
  };
  handleSort: (filedKey: keyof ObjectForTable, isReverse?: boolean) => any;

  handleChangePage: (page: number) => any;
  paginationData: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
};

const PhotoIcon = styled.div`
  content: ${`url(${iconsPhoto})`};
  width: 20px;
`;

const arrMeta: MetaTable<ObjectForTable> = [
  {
    key: 'objectId',
    label: 'ID',
  },
  {
    key: 'address',
    label: 'Адрес',
  },
  {
    key: 'okrugName',
    label: 'Округ',
  },
  {
    key: 'districtName',
    label: 'Район',
    RenderComponent: React.memo(
      ({ rowData }) => {
        return (
          <span>
            {capitalize(rowData.districtName)}
          </span>
        );
      }),
  },
  {
    key: 'isCritical',
    label: 'Критичность',
    RenderComponent: React.memo(
      ({ rowData }) => {
        return (
          <span>
            {rowData.isCritical ? 'Критичное' : 'Некритичное'}
          </span>
        );
      }),
  },
  {
    key: 'defectTypes',
    label: 'Тип нарушения',
  },
  {
    key: 'violationsCount',
    label: 'Количество',
  },
  {
    key: 'source',
    label: 'Источник контроля',
  },
  {
    key: 'objectType',
    label: 'Тип объекта',
  },
  {
    key: 'hasFotoVideo',
    label: <PhotoIcon />,
    RenderComponent: ({ rowData }) => rowData.hasFotoVideo ? <PhotoIcon /> : <div></div>,
    width: '50px',
    cantSort: true,
  },
];

const TableContainer = styled.div`
  overflow: auto;
  height: 100%;
`;

const isActiveCss = css`    
  background-color: ${({ theme }) => theme.colors.dashboardCard.buttonActive};
  color: white;
`;

const ViolationTableTbodyTrComponent = styled.tr<{isActive: boolean}>`
  ${({ onClick }) => onClick && pointerCss};

  ${({ isActive }) => isActive && isActiveCss};
`;

const TbodyTrTdComponent = styled.td<{ itemData: ObjectForTable[Extract<keyof ObjectForTable, string>]; rowData: ObjectForTable }>`
  padding: 10px 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
`;

const ViolationsSimpleTableWrap: React.FC<Props> = React.memo(
  (props) => {
    const meta = React.useMemo(
      () => props.isSys ? arrMeta.filter(item => item.key !== 'source') : arrMeta, [props.isSys]);

    return (
      <React.Fragment>
        <h2>
          <ThemeDashboardCardBlock>
            {props.paginationData.totalElements} <ObjectTitle>{capitalize(getTitleObjectByCount(props.paginationData.totalElements))}</ObjectTitle>
          </ThemeDashboardCardBlock>
        </h2>
        <TableContainer>
          <SimpleTable<ObjectForTable>
            arrMeta={meta}
            uniqField="objectId"
            arrData={props.localArrData}
            activeField={'featureId'}

            TbodyTrTdComponent={TbodyTrTdComponent}
            TbodyTrComponent={ViolationTableTbodyTrComponent}

            onClick={props.handleShowViolationInfo}

            sortData={props.sortData}
            onSort={props.handleSort}
          />
        </TableContainer>
        <FlexContainer justifyContent="flex-end">
          <Paginator
            size={props.paginationData.size}
            page={props.paginationData.page}
            totalPages={props.paginationData.totalPages}

            onChangePage={props.handleChangePage}
          />
        </FlexContainer>
      </React.Fragment>
    );
  },
);

export default ViolationsSimpleTableWrap;

const ObjectTitle = styled.span`
  font-size: 0.6em;
`;
