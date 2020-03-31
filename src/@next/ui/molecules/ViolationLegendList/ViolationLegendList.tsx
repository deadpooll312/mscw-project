
import * as React from 'react';
import styled from 'styles';

import { Icon, Avatar } from 'antd';
import { LegendItem } from 'app/store/modules/semantics/types';

const icons = {
  foto_violation: require('static/svg/legend_media.svg'),
  systematic_violation: require('static/svg/legend_relapse.svg'),
};

const AvatarFotoViolation = () => (
  <AvatarWrap
    size={20}
    shape="square"
    src={icons.foto_violation}
  />
);

// const AvatarSystematicViolation = () => (
//   <AvatarWrap
//     size={20}
//     shape="square"
//     src={icons.systematic_violation}
//   />
// );

type Props = {
  showAllViolation: boolean;
  legendData: LegendItem[];
  violationActiveIsSys?: boolean;
};

const ViolationLegendList: React.FC<Props> = React.memo(
  (props) => {
    return (
      <Container>
        <Left>
          <MainTitle>Критерии</MainTitle>
        </Left>
        <Line />
        <Right>
          {
            !props.showAllViolation && (
              <Title>Объектов с нарушениями от количества проверенных:</Title>
            )
          }
          <Content>
            {
              props.legendData?.map(
                (item) => {
                  if (props.showAllViolation) {
                    if (item.color === 'foto_violation') {
                      return (
                        <Item key={item.color}>
                          <Icon component={AvatarFotoViolation} />
                          <span>
                            {item.description}
                          </span>
                        </Item>
                      );
                    }
                    // if (item.color === 'systematic_violation') {
                    //   if (!props.violationActiveIsSys) {
                    //     return null;
                    //   }
                    //   return (
                    //     <Item key={item.color}>
                    //       <Icon component={AvatarSystematicViolation} />
                    //       <span>
                    //         {item.description}
                    //       </span>
                    //     </Item>
                    //   );
                    // }
                  }
                  return (
                    <Item key={item.color}>
                      <Color color={item.colorValue} />
                      <span>
                        {item.description}
                      </span>
                    </Item>
                  );
                }
              )
            }
          </Content>
        </Right>
      </Container>
    );
  },
);

export default ViolationLegendList;

export const Container = styled.section<any>`
  margin-left: 400px;
  display: flex;
  flex-direction: row;
  position: absolute;
  max-width: calc(65vw - 60px);
  opacity: 1;
  border-radius: 6px;
  box-shadow: 0 -1px 4px 0 rgba(42, 42, 44, 0.2);
  min-height: 85px;
  pointer-events: all;
  bottom: 0;

  background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground};
  color: ${({ theme }) => theme.colors.dashboardCard.defaultText};
  @media (min-width: 1142px) {
    max-width: calc(100vw - 430px);
  }
  @media (min-width: 2000px) and (max-width: 4000px)  {
    margin-left: 510px;
  }

transition: background-color 0.5s, color 0.5s;
`;

export const Left = styled.div`
  width: 114px;
`;

export const MainTitle = styled.div`
  width: 100%;
  font-family: Oswald-Bold;
  font-size: 18px;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.11;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.colors.dashboardCard.defaultText};
  transition: color 0.5s;
  padding: 22px 20px;
`;

export const Title = styled.div`
  opacity: 0.8;
  font-family: OpenSans-Bold;
  font-size: 12px;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: ${({ theme }) => theme.colors.dashboardCard.defaultText};
  transition: color 0.5s;
  padding-left: 40px;
  padding-bottom: 19px;
`;

export const Color = styled.div<any>`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background-color: ${(p) => p.color};
  flex-shrink: 0;
`;

export const Right = styled.div`
  width: 56vw;
  padding-top: 23px;
`;

export const Line = styled.div`
    width: 1px;
    margin: 10px 0;
    background-color: #dee2e8;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  flex-basis: 150px;
  margin-bottom: 20px;
  margin-right: 10px;
  &>*:nth-child(n + 2) {
    margin-left: 10px;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: stretch;
  flex-wrap: wrap;
  margin-left: 40px;
`;

const AvatarWrap = styled(Avatar)`
  &&& {
    background-color: ${({ theme }) => theme.colors.palette.white1};
  }
`;
