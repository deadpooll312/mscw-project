import * as React from 'react';
import styled from 'styled-components';
import { GoodIcon, NotBadIcon, BadIcon } from './styled';
import { DetailTableLegendProps } from './types';

const selectedEmoji = {
  '😊': <GoodIcon />,
  '😐': <NotBadIcon />,
  '😟': <BadIcon />
};

export const DetailTableLegend: React.FC<DetailTableLegendProps> = (props) => {
  const { legend } = props;

  const renderEmoji = (item) =>  {
    const type = item.emoji;
    return selectedEmoji[type] ? selectedEmoji[type] : null;
  };

  return(
    <StyledDetailTableLegend>
      {
        legend.map((item, index) =>
          (
            <div key={`${item.color}_${index}`}>
              <StyledColor backgroundColor={item.colorValue} withEmoji={Boolean(item.emoji)}>{renderEmoji(item)}</StyledColor>
              <span>{item.description}</span>
            </div>
          )
        )
      }
    </StyledDetailTableLegend>
  );
};

const StyledDetailTableLegend = styled.div`
    columns: 3;
    font-size: 12px;
    & > div {
        height: 70px;
        display: flex;
        & > span:last-child{
            display: inline-block;
            width: 80%;
            vertical-align: middle;
            text-align: left;
        }
    }
`;

const StyledColor = styled.div<{ withEmoji: boolean; backgroundColor: string }>`
    display: inline-block;
    background-color: ${({ backgroundColor }) => backgroundColor};
    width: 32px;
    height: ${({ withEmoji }) => withEmoji ? '20px' : '8px'};
    margin: 10px;
    vertical-align: middle;
    text-align: center;
`;