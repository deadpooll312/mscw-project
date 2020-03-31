import * as React from 'react';
import { SidebarButton } from '@next/ui/atoms/SidebarButton';

type Props = {
  pageNumber: number;
  onChangePage: (page: number) => any;
  isSelected: boolean;
};

const PaginatorButton: React.FC<Props> = React.memo(
  (props) => {

    const handleClick = React.useCallback(
      () => {
        props.onChangePage(props.pageNumber);
      },
      [props.onChangePage, props.pageNumber],
    );
    
    return (
      <SidebarButton
        isActive={props.isSelected}
        title={props.pageNumber + 1}
        value={props.pageNumber + 1}
        onClick={handleClick}
      />

    );
  },
);

export default PaginatorButton;
