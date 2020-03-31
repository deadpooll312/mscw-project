import * as React from 'react';
import styled, { css } from 'styles';

import { MetaTable } from '@next/ui/molecules/SimpleTable/type';
import { isFunction } from 'util';
import { Icon } from 'antd';

export type PropsTableTheadTrTh<F> = {
  colMeta: ValuesOf<MetaTable<F>>;
  sortData: {
    field: keyof F;
    isReverse: boolean;
  };
  onSort: (filedKey: keyof F, isReverse?: boolean) => any;
  TheadTrThComponent?: React.ComponentType<{ width?: string; canSort?: boolean }>;
};

export const DefaultTheadTrThComponent = styled.th<{ width?: string; canSort?: boolean }>`
  position: sticky;
  z-index: 10;
  top: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  width: ${({ width }) => width ?? 'auto'};
  text-align: left;
  background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground};

  ${({ canSort }) => canSort && css`
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.dashboardCard.buttonActive};
      color: white;
    }
  `}

  transition: background-color 0.5s, color 0.5s;
`;

const TableTheadTrTh = <F extends Record<string, any>>(props: PropsTableTheadTrTh<F>): React.ReactElement => {
  const TheadTrThComponent = props.TheadTrThComponent ?? DefaultTheadTrThComponent;

  const handleClick = React.useCallback(
    () => {
      if (isFunction(props.onSort) && !props.colMeta.cantSort) {
        let field = null;
        let isReverse = false;

        if (props.sortData?.field !== props.colMeta.key) {
          field = props.colMeta.key;
          isReverse = false;
        } else {
          if (!props.sortData?.isReverse) {
            field = props.colMeta.key;
            isReverse = true;
          } else {
            field = null;
            isReverse = false;
          }
        }

        props.onSort(field, isReverse);
      }
    },
    [props.sortData, props.colMeta, props.onSort],
  );

  return (
    <TheadTrThComponent width={props.colMeta.width} onClick={handleClick} canSort={Boolean(props.onSort) && !props.colMeta.cantSort}>
      {props.colMeta.label}
      {
        props.sortData?.field === props.colMeta.key && (
          <Icon type={!props.sortData?.isReverse ? 'sort-ascending' : 'sort-descending'} />
        )
      }
    </TheadTrThComponent>
  );
};

export default TableTheadTrTh;
