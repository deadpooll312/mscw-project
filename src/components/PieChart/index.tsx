import * as React from 'react';

import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Label, Text, TextProps } from 'recharts';
import { RelativeWrap, AbsoluteWrap, StyledPieChartLegend } from './styled';
import { checkPercentValue } from 'utils';
import { useStyledTheme } from 'styles/themes/hooks';

type PieChartComponentProps = {
  data: any;
  name: string;
  colors: any[];
};

const renderLegend: React.FC<any> = React.memo(
  (props) => {
    const { payload } = props; 
      
    return (
      <StyledPieChartLegend>
        {
          payload.map((entry: any, index: number) => (
            <li key={`item-${index}`} style={{ listStyleType: 'none', display: 'inline-block', height: '10px', marginBottom: '0' }}>
              <div style={{ backgroundColor: `${entry.color}`, width: '8px', height: '8px', display: 'inline-block', marginRight: '3px'}} />
              <p style={{ display: 'inline-block', fontSize: '10px', marginRight: '5px'}}>
                {checkPercentValue(entry.payload.value)}
              </p>
            </li>
          ))
        }
      </StyledPieChartLegend>

    );
  },
);

const textStyle = { fontSize: '9px' };

const renderLabel = (name: string, theme) => (props: any) => {
  const { viewBox: { cx } } = props;
  const color = theme.colors.dashboardCard.defaultText;
  const positioningProps: Pick<TextProps, 'x' | 'y' | 'textAnchor'> = {
    x: cx,
    y: 7,
    textAnchor: 'middle',
  };
  return (<Text {...positioningProps} style={{...textStyle, fill: color }}>{name}</Text>);
};
  
export const PieChartComponent: React.FC<PieChartComponentProps> = React.memo(
  (props) => {
    const [localData, setLocalData] = React.useState(props.data);
    const theme = useStyledTheme();

    const { name, colors } = props;

    React.useEffect(
      () => {
        setImmediate(
          () => setLocalData(props.data),
        );
      },
      [props.data],
    );

    const content = React.useMemo(
      () => {
        return renderLabel(name, theme);
      },
      [name, theme],
    );

    return (
      <React.Fragment>
        <RelativeWrap>
          <AbsoluteWrap>
            <ResponsiveContainer> 
              <PieChart>
                <Pie
                  data={localData}
                  cx='50%'
                  cy='50%'
                  dataKey="value"
                >
                  <Label
                    content={content}
                  />
                  {
                    localData.map((_, index: number) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))
                  }
                </Pie>
                <Legend content={renderLegend}/>
              </PieChart> 
            </ResponsiveContainer>
          </AbsoluteWrap>
        </RelativeWrap>
      </React.Fragment>    
    );
  },
);

