import * as React from 'react';
import styled from 'styled-components';

import { MetaTable } from '@next/ui/molecules/SimpleTable/type';
import TableTheadTrTh, { PropsTableTheadTrTh } from '@next/ui/atoms/TableTheadTrTh';

export type PropsTableThead<F> = {
  arrMeta: MetaTable<F>;
  onSort: (filedKey: keyof F, isReverse?: boolean) => any;

  TheadComponent?: React.ComponentType<{}>;
  TheadTrComponent?: React.ComponentType<{}>;
} & (
  Omit<PropsTableTheadTrTh<F>, 'colMeta'>
);

export const DefaultTheadComponent = styled.thead`
`;
export const DefaultTheadTrComponent = styled.tr`
`;

const TableThead = <F extends Record<string, any>>(props: PropsTableThead<F>): React.ReactElement => {
  const TheadComponent = props.TheadComponent ?? DefaultTheadComponent;
  const TheadTrComponent = props.TheadTrComponent ?? DefaultTheadTrComponent;

  return (
    <TheadComponent>
      <TheadTrComponent>
        {
          props.arrMeta.map((colMeta) => (
            <TableTheadTrTh
              key={colMeta.key}
              colMeta={colMeta}
              sortData={props.sortData}
              onSort={props.onSort}
            />
          ))
        }
      </TheadTrComponent>
    </TheadComponent>
  );
};

export default TableThead;
