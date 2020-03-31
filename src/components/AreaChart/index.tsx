import * as React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';
import { Container, Title, Indicators, Total, StatisticsIcon, Percent, Period, Date, WrapTooltip } from 'components/AreaChart/styled';

type AreaChartComponentProps = {
  data: any;
};

const checkPositive = (lastPeriodPercent) => lastPeriodPercent?.includes('-') || lastPeriodPercent === '0.00';
  
export const AreaChartComponent: React.FC<AreaChartComponentProps> = (props) => {
  const { data } = props;
  const { violation, lastPeriodPercent } = data;
  const startDate = data.objects[0]?.name.slice(0, -8);
  const endDate = data.objects[data.objects.length - 1]?.name.slice(0, -8);
  const isPositive = React.useMemo(() => checkPositive(lastPeriodPercent), [lastPeriodPercent]);

  const customTooltip = (props) =>{    
    return (
      <WrapTooltip>
        {props?.payload?.[0]?.payload.value || ''}
      </WrapTooltip> 
    );
  };
  
  return (
    <Container>
      <Title>Объектов с нарушениями</Title>
      <Indicators>
        <Total>{violation}</Total>
        <StatisticsIcon type={isPositive ? 'positive' : 'negative'}/>
        <Percent isPositive={isPositive}>{`${lastPeriodPercent || 0 }%`}</Percent>
      </Indicators>

      <ResponsiveContainer> 
        <AreaChart data={data.objects}>
          <XAxis dataKey='name' hide={true}/>
          <Area type='monotone' dataKey='value' stroke='#8884d8' fill='#8884d8' />
          <Tooltip content={customTooltip}/>
        </AreaChart>
      </ResponsiveContainer>

      <Period>
        <Date>{startDate}</Date>
        <Date>{endDate}</Date>
      </Period>
    </Container>  
  );
};

