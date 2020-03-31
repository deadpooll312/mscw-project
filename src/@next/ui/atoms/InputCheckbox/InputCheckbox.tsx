import * as React from 'react';
import styled from 'styles';

enum Size {
  small = 2,
  medium = 3,
  big = 4,
}

type Props<T = any> = {
  value?: T;
  size?: keyof typeof Size;
  isChecked: boolean;
  onChange: (isChecked?: boolean, value?: T, event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

  isDisabled?: boolean;
};

const space = 0.2;

const Container = styled.div<{ isChecked: boolean; sizeKey: keyof typeof Size; isDisabled: boolean }>`
  cursor: ${({ isDisabled }) => !isDisabled ? 'pointer' : 'not-allowed'};
  opacity: ${({ isDisabled }) => !isDisabled ? 1 : 0.5};
  position: relative;
  width: ${({ sizeKey }) => Size[sizeKey]}rem;
  height: ${({ sizeKey }) => Size[sizeKey] / 2}rem;

  border-radius: ${({ sizeKey }) =>Size[sizeKey] / 2 / 2}rem;

  /* background-color: ${({ isChecked, theme }) => !isChecked ? theme.colors.dashboardCard.defaultDisabledText : theme.colors.dashboardCard.buttonActive}; */
  background-color: ${({ isChecked, theme }) => !isChecked ? theme.colors.dashboardCard.defaultDisabledText : theme.colors.dashboardCard.radioDate};
  transition: background-color 0.25s ease-in-out, opacity 0.25 ease-in-out;

  &::after {
    content: " ";

    width: ${({ sizeKey }) => Size[sizeKey] / 2 - space}rem;
    height: ${({ sizeKey }) => Size[sizeKey] / 2 - space}rem;
    background-color: blue;
    position: absolute;
    border-radius: ${({ sizeKey }) => (Number(Size[sizeKey]) - space) / 2 / 2}rem;

    box-shadow: 0 2px 4px 0 rgba(0, 35, 11, 0.2);
    background-color: #fff;

    transform: translate(${({ isChecked }) => isChecked ? '100%' : '0'});

    transition: transform 0.25s ease-in-out;

    top: ${space / 2}rem;
    left: ${space}rem;
  }
`;

const InputCheckbox: React.FC<Props> = React.memo(
  (props) => {
    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!props.isDisabled) {
          props.onChange(!props.isChecked, props.value, event);
        }
      },
      [props.onChange, props.isChecked, props.isDisabled],
    );
    return (
      <Container
        sizeKey={props.size ?? 'medium'}
        isChecked={props.isChecked}
        onClick={handleClick}
        isDisabled={props.isDisabled}
      />
    );
  },
);

export default InputCheckbox;
