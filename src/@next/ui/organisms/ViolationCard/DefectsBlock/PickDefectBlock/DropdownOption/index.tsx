import * as React from 'react';
import styled from 'styles';

type Props = {
  item: {
    text: string;
    idSystemsName?: string;
    dataToRequest?: {
      ID_object: string;
      ticket: string;
      data_creation: string;
      ID: string;
      system: string;
    };
  };
  handleSelect: (item: Props['item']) => any;
};

const DropdownOption: React.FC<Props> = React.memo(
  (props) => {
    const handleClick = React.useCallback(
      () => {
        props.handleSelect(props.item);
      },
      [props.handleSelect, props.item],
    );

    return (
      <OptionContainer onClick={handleClick}>
        <div>{props.item.text}</div>
      </OptionContainer>
    );
  },
);

export default DropdownOption;

const OptionContainer = styled.div`
  cursor: pointer;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground};
  color: ${({ theme }) => theme.colors.dashboardCard.defaultText};
  padding: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.dashboardCard.buttonActive};
    color: white;
  }

  transition: background-color 0.25s, color 0.25s;
`;
