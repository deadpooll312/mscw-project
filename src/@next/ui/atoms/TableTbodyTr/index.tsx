import * as React from 'react';
import styled, { css } from 'styled-components';
import { MetaTable } from '@next/ui/molecules/SimpleTable/type';
import { isFunction } from 'util';

export type PropsTableTbodyTr<F> = {
  arrMeta: MetaTable<F>;
  rowData: F;
  isActive?: boolean;

  onClick?: (rowData?: F, event?: any) => any;

  TbodyTrComponent?: React.ComponentType<{ rowData: F; canSelect?: boolean; isActive?: boolean }>;
  TbodyTrTdComponent?: React.ComponentType<{ rowData: F; width?: string }>;
};

export const pointerCss = css`
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.dashboardCard.buttonActive};
    color: white;
  }

  transition: background-color 0.25s, color 0.25s;
`;

export const DefaultTbodyTrComponent = styled.tr`
  ${({ onClick }) => onClick && pointerCss};
`;

export const DefaultTbodyTrTdComponent = styled.td<{
  rowData: any;
  width: string;
}>`
  width: ${({ width }) => width ?? 'auto'};
`;

const TableTbodyTr = <F extends Record<string, any>>(props: PropsTableTbodyTr<F>): React.ReactElement => {
  const TbodyTrComponent = props.TbodyTrComponent ?? DefaultTbodyTrComponent;
  const TbodyTrTdComponent = props.TbodyTrTdComponent ?? DefaultTbodyTrTdComponent;

  const handleClick = React.useCallback(
    (event) => {
      if (isFunction(props.onClick)) {
        props.onClick(props.rowData, event);
      }
    },
    [props.rowData, props.onClick],
  );

  return (
    <TbodyTrComponent rowData={props.rowData} onClick={handleClick} isActive={props.isActive}>
      {
        props.arrMeta.map((colMeta) => (
          <TbodyTrTdComponent
            key={colMeta.key}
            rowData={props.rowData}
            width={colMeta.width}
          >
            {
              colMeta.RenderComponent
                ? <colMeta.RenderComponent rowData={props.rowData}>{props.rowData[colMeta.key]}</colMeta.RenderComponent>
                : props.rowData[colMeta.key]
            }
          </TbodyTrTdComponent>
        ))
      }
    </TbodyTrComponent>
  );
};

export default TableTbodyTr;
