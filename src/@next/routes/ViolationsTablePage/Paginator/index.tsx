import * as React from 'react';
import FlexContainer from '@next/ui/atoms/FlexContainer';
import PaginatorButton from '@next/routes/ViolationsTablePage/Paginator/PaginatorButton';
import styled from 'styled-components';

type Props = {
  page: number;
  size: number;
  totalPages: number;

  onChangePage: (page: number) => any;
};

const countOtherPageButtons = 4;

const Paginator: React.FC<Props> = React.memo(
  (props) => {
    const countNumberButtons = Math.min(countOtherPageButtons, props.totalPages - 2);

    const buttonsIndex = React.useMemo(
      () => {
        let indexes = Array.from({ length: countNumberButtons }).map(
          (d, index) => index + props.page + -Math.ceil(countOtherPageButtons / 2)
        );

        if (indexes[0] <= 0) {
          indexes = indexes.map(
            (indexNumber) => (
              indexNumber + Math.abs(indexes[0]) + 1
            )
          );
        }

        if (indexes[countNumberButtons - 1] >= props.totalPages - 1) {
          indexes = indexes.map(
            (indexNumber) => (
              indexNumber - Math.abs(indexes[countNumberButtons - 1] - props.totalPages - 1) - 1
            )
          );
        }

        return indexes;
      },
      [countNumberButtons, props.page],
    );
    return props.totalPages > 1 && (
      <PaginatorContainer alignItems="flex-end">
        <PaginatorButton onChangePage={props.onChangePage} isSelected={props.page === 0} pageNumber={0} />
        {
          buttonsIndex[0] > 1 && (
            <div>...</div>
          )
        }
        {
          buttonsIndex.map((indexNumber) => (
            <PaginatorButton key={indexNumber} onChangePage={props.onChangePage} isSelected={props.page === indexNumber} pageNumber={indexNumber} />
          ))
        }
        {
          buttonsIndex[countNumberButtons - 1] < (props.totalPages - 2) && (
            <div>...</div>
          )
        }
        <PaginatorButton onChangePage={props.onChangePage} isSelected={props.page === (props.totalPages - 1)} pageNumber={props.totalPages - 1} />
      </PaginatorContainer>

    );
  },
);

export default Paginator;

const PaginatorContainer = styled(FlexContainer)`
  margin: 5px -2px;
  >* {
    margin: 1px 2px;
  }
`;
