import * as React from 'react';
import styled from 'styled-components';
import { MetaTable } from '@next/ui/molecules/SimpleTable/type';
import TableTbodyTr, { PropsTableTbodyTr } from '@next/ui/atoms/TableTbodyTr';

export type PropsTableTbody<F> = {
  arrMeta: MetaTable<F>;
  arrData: F[];
  uniqField?: Extract<keyof F, string>;      // default - id
  activeField?: string;

  TbodyComponent?: React.ComponentType<{}>;
} & (
  Omit<PropsTableTbodyTr<F>, 'rowData'>
);

export const DefaultTbodyComponent = styled.tbody`
`;

const TableTbody = <F extends Record<string, any>>(props: PropsTableTbody<F>): React.ReactElement => {
  const TbodyComponent = props.TbodyComponent ?? DefaultTbodyComponent;
  const [activeKey, setActiveKey] = React.useState<string>(null);

  const handleTRClick = React.useCallback(
    (rowData?: F, event?: any) => {
      setActiveKey(rowData?.featureId);
      props.onClick(rowData, event);
    },
    [props.onClick]);

  return (
    <TbodyComponent>
      {
        props.arrData.map((rowData) => (
          <TableTbodyTr<F>
            isActive={props.activeField && (activeKey === rowData[props.activeField])}
            key={rowData[props.uniqField || 'id']}
            rowData={rowData}

            TbodyTrComponent={props.TbodyTrComponent}
            TbodyTrTdComponent={props.TbodyTrTdComponent}
            arrMeta={props.arrMeta}
    
            onClick={handleTRClick}
          />
        ))
      }
    </TbodyComponent>
  );
};

export default TableTbody;
