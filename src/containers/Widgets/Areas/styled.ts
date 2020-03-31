import styled from 'styled-components';

const StatisticsIcons = {
  positive: 'static/positive.png',
  negative: 'static/negative.png',
} as const;

const DirectionColors = {
  positive: '#49a59d',
  negative:'#95354b',
  unchanged: '#000'
};

const TextColors = {
  government: '#577095',
  citizen:'#84629d',
  government_citizen: '#737373',
  checked_object: '#4ea49c',
  violation_object: '#92364c'
};

export const StatisticsIcon = styled.div<{ typeDirection: keyof typeof StatisticsIcons }>`
    content: url(${({typeDirection}) => StatisticsIcons[typeDirection]});
    display: inline-block;
    width: 25px;
    position: relative;
`;

export const AreasWrap = styled.div`
  position: relative;
  display: inline-block;
  height: 350px;
  width: 650px;
  margin-right: 25px;
  padding-top: 90px;
  flex: 1 0 auto;
`;

export const Donut = styled.div`
  display: inline-block;
  height: 100%;
  width: 50%;
`;

export const Area = styled.div`
  height: 45px;
`;

export const AreaControl = styled.div`
  width: 85%;
  margin-left: 15%;
  height: 45px;
`;

export const DepartmentIcon = styled.div`
 content: url('./static/camera.png');
 display: inline-block;
 width: 23px;
 position: relative;
 top: 2px;
`; 

export const PeopleIcon = styled(DepartmentIcon)`
  content: url('./static/citizen.png');
`;

export const Together = styled(DepartmentIcon)`
  content: url('./static/together.png');
`;

export const Сhecked = styled(DepartmentIcon)`
  content: url('./static/selected.png');
  width: 34px;
  height: 36px;
`;

export const Violation = styled(DepartmentIcon)`
  content: url('./static/flag.png');
  width: 34px;
  height: 36px;
`;

export const Discription = styled.div`
  display: inline-block;
  width: 47%;
`;

export const DiscriptionControl = styled(Discription)`
  width: 37.6%;
`;

export const IndicatorsWrap = styled(Discription)`
  width: 53%;
  height: 60px;
`;

export const IndicatorsWrapControl = styled(IndicatorsWrap)`
  width: 62%;
`;

// export const Indicators = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   margin-top: 25px; 
//   p {
//     margin-right: 25px;
//     color: #000;
//     font-size: 18px;
//     font-weight: bold;
//   }
// `;

export const Text = styled.p<{ typeDirection: keyof typeof TextColors }>`
  display: inline-block;
  width: 165px;
  font-size: 10px;
  font-family: 'Circe-Bold';
  text-transform: uppercase;
  line-height: 1;
  color: ${({typeDirection}) => TextColors[typeDirection]};
  margin-left: 10px;
`;

export const StatisticsText = styled(Text)`
  width: 249px;
  font-size: 17px;
  &:last-child{
    position: relative;
    top: -5px;
  }
`;

export const ViolationsBlock = styled.div`
  width: 73%;
  display: inline-block;
  text-align: center;
`;

export const PercentsBlock = styled(ViolationsBlock)`
width: 27%;
display: inline-block;`;

export const Direction = styled.div`
  display: inline-block;
`;

export const ToObjectPercent = styled.p<{ typeDirection: keyof typeof TextColors }>`
  display: inline-block;
  color: ${({typeDirection}) => TextColors[typeDirection]};
  font-size: 24px;
  position: relative;
  top: -4px;
  font-family: 'Circe-Bold';
  width: 97px;
`;

export const ToObjectPercentControl = styled(ToObjectPercent)<{ typeDirection: keyof typeof TextColors }>`
  font-size: 21px;
`;

export const Violations = styled.p`
  font-family: 'Circe-Bold';
  display: inline-block;
  font-weight: bold;
  font-size: 17px;
  color: #000;
  position: relative;
  top: -4px;
  width: 142px;
  text-align: right;
`;

export const Percents = styled(Violations)<{ typeDirection: keyof typeof DirectionColors }>`
  color: ${({ typeDirection }) => DirectionColors[typeDirection]};
  font-size: 20px;
  width: 100px;
`;

export const FirstRow = styled.div`
  margin-bottom: 13px;
`;

