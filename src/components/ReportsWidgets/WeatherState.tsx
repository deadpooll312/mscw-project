import * as React from 'react';
import styled from 'styled-components';
import { WeatherStateTableProps } from './types';
import { REPORT_RED, REPORT_GREEN } from './constants';
import Loading from '@next/ui/atoms/Loading';
import TableAdvanced from '@next/ui/atoms/TableAdvanced';

const AdvancedTableContainer = React.lazy(() => (
  import(/* webpackChunkName: "AdvancedTableContainer" */ 'components/HelpInfo/widgets/AdvancedTableContainer')
));

export const WeatherStateTable: React.FC<WeatherStateTableProps> = (props) => {
  const { tableColumns, dataSource } = props;
  return (
    <StyledWeatherStateTable>
      <StyledTableCaption>Погодные условия за отчетный период</StyledTableCaption>
      <React.Suspense fallback={<Loading type="new_spinner" />} >
        <AdvancedTableContainer
          columns={tableColumns}
          dataSource={dataSource}
          stripped="even"
        />
      </React.Suspense>
      <StyledFooterTableCaption>
        <span>
          <StyledSnowHeight colorStatus="green">Высота снежного покрова</StyledSnowHeight> &nbsp; -  матрица учета нарушений от 2 до 6 см
        </span>
        <span>
          <StyledSnowHeight colorStatus="warn">Высота снежного покрова</StyledSnowHeight>  &nbsp; -  матрица учета нарушений от 6 до 10 см
        </span>             
      </StyledFooterTableCaption>
    </StyledWeatherStateTable>
  );
};

const StyledWeatherStateTable = styled.div`
    && ${TableAdvanced}{
        font-size: 13px;
        width: auto;
        tbody, thead {
            width: auto;
            position: relative;
        }
        th, td {
            width: 200px;
        }
        th:first-child{
            border: none;
        }
        td > p {
            padding: 0;
            margin-block-start: 0;
            margin-block-end: 0;
        }
    }
`;

export const StyledSnowHeight = styled.p<{ colorStatus: 'warn' | 'green' }>`
    color: ${({ colorStatus }) => colorStatus === 'warn' ? REPORT_RED : REPORT_GREEN};
`;

const StyledTableCaption = styled.p`
    font-weight: bold;
    margin: 10px 0;
`;

const StyledFooterTableCaption = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 12px;

    span{
        display: flex;
        margin: 0 30px;
    }
`;