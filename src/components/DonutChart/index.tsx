import * as React from 'react';

import { PieChart, Pie, Cell, ResponsiveContainer, Label, Text, Tooltip, PieProps, TextProps, LabelProps } from 'recharts';
import { ReportStore } from 'app/store/modules/report/types';

import { Container, Title, Total, Delta, PieCenterIcon, TotalTitle, TotalElement, DeltaTitle, WrapTooltip } from './styled';
import { WidgetDataCirle } from 'app/store/modules/analytics/types';

type ChartData = WidgetDataCirle['charts'][0] & {
  inCircleDescription: React.ReactNode | string;
  outCircleDescription: string;
};

export type DonutChartComponentProps = {
  data: ChartData;
  colorCode: ReportStore['data']['colorSchema']['colorCode'];
  index: number;
};

const getFillFunction = (colorCode: ReportStore['data']['colorSchema']['colorCode']) => (type: string) => {
  return colorCode.find(item => item.code === type).color || '#afafcb';
};

const checkSign = (value: number) => value > 0 ? `+ ${value}` : value;

const renderLabelFunction = (inCircleValue: number, innerTitle: any) => (props: any) => {  
  const {viewBox: { cx }} = props;
  
  const positioningProps: Pick<TextProps, 'x' | 'y' | 'textAnchor'> = {
    x: cx,
    y: 187,
    textAnchor: 'middle',
  };
  return (
    <React.Fragment>
      <Text {...positioningProps} style={{fontFamily: 'Circe-Bold', fontSize: '25px'}}>
        {inCircleValue}
      </Text>
      <text {...positioningProps} y={210}>
        {innerTitle(cx)}
      </text>
    </React.Fragment>
  );
};

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel: PieProps['label']  = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const diff = Math.abs(Math.sin(midAngle * RADIAN)) * 2;
  const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * (0.8 + (1 - diff) * 0.1);
  const x  = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
  const y = Number(cy)  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="white" style={{ fontSize: '12px' }} textAnchor={x < cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
  
const DonutChartComponent: React.FC<DonutChartComponentProps> = (props) => {
  const { data, colorCode, index } = props;

  const { 
    name: title, 
    inCircleValue, 
    outCircleValue, 
    lastDayDelta, 
    objects,
    inCircleDescription,
    outCircleDescription,
  } = data;

  const isPositive = React.useMemo(() => lastDayDelta <= 0, [lastDayDelta]);

  const getFill = React.useMemo(() => getFillFunction(colorCode), [colorCode]);
  const renderLabel: LabelProps['content'] = React.useMemo(() => renderLabelFunction(inCircleValue, inCircleDescription), [inCircleValue, inCircleDescription]);

  const customTooltip = (props) =>{  
    return (
      <WrapTooltip>
        {`${props?.payload?.[0]?.payload.name}: `}
        <span>
          {`${props?.payload?.[0]?.payload.total}`}
        </span>
      </WrapTooltip> 
    );
  };

  return (
    <Container>
      <Title>{ title }</Title>
      <PieCenterIcon type={index === 0 ? 'selected' : 'flag'} />
      <ResponsiveContainer> 
        <PieChart>
          <Pie
            data={objects}
            cx="50%"
            cy="50%"
            dataKey="value"
            innerRadius={87}
            labelLine={false}
            label={renderCustomizedLabel}
            isAnimationActive={false}
          >
            <Label
              content={renderLabel}
            />
            {
              objects.map(
                (entry, index: number) => (
                  <Cell key={`cell-${index}`} fill={getFill(entry.type)} />
                )
              )
            }
          </Pie>
          <Tooltip content={customTooltip} wrapperStyle={{zIndex: 1000}}/>
        </PieChart> 
      </ResponsiveContainer>
      <Total>
        <TotalTitle>
          {outCircleDescription}
        </TotalTitle>
        <TotalElement>
          {outCircleValue} <br/>
          <Delta isPositive={isPositive}>{checkSign(lastDayDelta)}</Delta>
          <DeltaTitle>
            к предыдущему <br/> периоду
          </DeltaTitle>
        </TotalElement>
      </Total>
    </Container>  
  );
};

export default DonutChartComponent;
