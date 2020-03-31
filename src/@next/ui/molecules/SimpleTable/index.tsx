import * as React from 'react';
import styled from 'styled-components';

import TableTbody, { PropsTableTbody } from '@next/ui/atoms/TableTbody';
import TableThead, { PropsTableThead } from '@next/ui/atoms/TableThead';
import { MetaTable } from '@next/ui/molecules/SimpleTable/type';

type Props<F> = {
  arrMeta: MetaTable<F>;
  arrData: F[];
  activeField?: string;

  TableComponent?: React.ComponentType<{}>;
} & (
  PropsTableTbody<F>
  & PropsTableThead<F>
);

export const DefaultTableComponent = styled.table`
  width: 100%;
  cursor: default;
  table-layout: fixed;

  border-collapse: separate; /* Don't collapse */
  border-spacing: 0;
`;

const SimpleTable = <F extends Record<string, any>>(props: Props<F>): React.ReactElement  => {
  const TableComponent = props.TableComponent ?? DefaultTableComponent;

  return (
    <TableComponent>
      <TableThead<F>
        arrMeta={props.arrMeta}
        TheadComponent={props.TheadComponent}
        TheadTrComponent={props.TheadTrComponent}
        TheadTrThComponent={props.TheadTrThComponent}

        sortData={props.sortData}
        onSort={props.onSort}
      />
      <TableTbody<F>
        TbodyComponent={props.TbodyComponent}
        TbodyTrComponent={props.TbodyTrComponent}
        TbodyTrTdComponent={props.TbodyTrTdComponent}
        arrData={props.arrData}
        arrMeta={props.arrMeta}
        activeField={props.activeField}

        uniqField={props.uniqField}
        onClick={props.onClick}
      />
    </TableComponent>
  );
};

export default SimpleTable;
