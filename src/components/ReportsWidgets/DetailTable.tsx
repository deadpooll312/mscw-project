import * as React from 'react';
import styled from 'styled-components';
import { REPORT_RED } from './constants';
import { DetailTableProps } from './types';
import Loading from '@next/ui/atoms/Loading';
import TableAdvanced from '@next/ui/atoms/TableAdvanced';

const AdvancedTableContainer = React.lazy(() => (
  import(/* webpackChunkName: "AdvancedTableContainer" */ 'components/HelpInfo/widgets/AdvancedTableContainer')
));

export const DetailTable: React.FC<DetailTableProps> = (props) => {
  const {
    lastDayDate,
    currentDayDate,
    dataSource,
    columns,
    renderHeader,
  } = props;

  return (
    <StyledDetailTable>
      <div>
        {
          Boolean(lastDayDate && currentDayDate) && (
            <StyledDetailTableCaption>
              <span>
                {lastDayDate}
              </span>
              <span>
                {currentDayDate}
              </span>
            </StyledDetailTableCaption>
          )
        }
        <React.Suspense fallback={<Loading type="new_spinner" />} >
          <AdvancedTableContainer
            columns={columns}
            dataSource={dataSource}
            stripped="odd"
            renderHeader={renderHeader}
          />
        </React.Suspense>
      </div>   
    </StyledDetailTable>
  );
};

const StyledDetailTable = styled.div`
  display: flex;
  text-align: center;
  width: 100%;
  overflow-x: auto;

  && ${TableAdvanced}{
    width: auto;
    thead, th {
      background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground};
    }
    tbody, thead {
      width: auto;
      position: relative;
    }
    th, td {
      width: 200px;
      border-right: 1px solid grey;
      border-left: 1px solid grey;
    }
    th{
      height: 55px;
      word-wrap: break-word;
      font-size: 13px;
      & > i {
        font-weight: 400;
      }
      & > b {
        font-weight: 800;
      }
    }
    th:last-child, td:last-child{
      border-right: 1px solid grey;
    }
    td{
      padding: 0;
    }
  }
`;

export const StyledDetailTableSpan = styled.span<{ isCritic?: boolean; isBold?: boolean; isItalic?: boolean }>`
  color: ${({ isCritic, theme }) => isCritic ? REPORT_RED : theme.colors.dashboardCard.defaultText };
  font-weight: ${({ isBold }) => isBold ? 'bold' : 'normal'};
  font-style: ${({ isItalic }) => isItalic ? 'italic' : 'normal'};
`;

export const StyledPercent = styled.span<{ backgroundColor?: string; textColor?: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  font-weight: bold;
  color: #ffff;
  width: 100%;
  height: 100%;
  display: block;
  color: ${({ textColor }) => textColor};
`;

const StyledDetailTableCaption = styled.div`
  display: flex;
  justify-content: space-around;
`;