import * as React from 'react';
import styled from 'styled-components';
// import { Input } from 'antd';
import { getPluralDays } from '@next/utils/common';

type SnowInfoComponentProps = {
  isSummerMonitor: boolean;
  isMixedMonitor: boolean;
  isWinterMonitor: boolean;
  days: number | string;
  height: string;
};

const SnowInfo: React.FC<SnowInfoComponentProps> = React.memo(
  (props) => {
    
    return (
      <SnowInfoContainer hasMinHeight={props.isWinterMonitor}>
        {
          (props.isWinterMonitor) && (
            <React.Fragment>
              <div>
                <p>Прошло после снегопада: </p>
                <p><strong>{getPluralDays(props.days || 0)}</strong></p>
                {/* <Input readOnly type="text" value={props.days}/> */}
              </div>

              <div>
                <p>Высота снежного покрова: </p>
                <p><strong>{props.height}</strong></p>
                {/* <Input readOnly type="text" value={props.height}/> */}
              </div>
            </React.Fragment>
          )
        }

      </SnowInfoContainer>
    );
  },
);

export default SnowInfo;

const SnowInfoContainer = styled.div<{ hasMinHeight?: boolean }>`
  margin-top: 10px;
  height: ${({ hasMinHeight }) => hasMinHeight ? '125px' : '0'};
  overflow-y: auto;
  color: ${({ theme }) => theme.colors.dashboardCard.defaultText};
  @media (min-width: 2000px) and (max-width: 4000px)  {
    font-size: 18px;
  }

  & > div {
    display: flex;
    flex-direction: column;
    margin: 5px 0;
  }

  & p {
    margin-bottom: 0.5em;
  }

  & input {
    width: 100px;
    text-align: center;
    @media (min-width: 2000px) and (max-width: 4000px)  {
      font-size: 18px;
    }
  }
`;
