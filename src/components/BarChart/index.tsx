import * as React from 'react';
import findKey from 'lodash-es/findKey';
import styled from 'styled-components';
import {
  BarChart as BarRechart, Bar, XAxis, LabelList, Tooltip, ResponsiveContainer,
} from 'recharts';
import { checkPercentValue } from 'utils';
import { useStyledTheme } from 'styles/themes/hooks';

type BarChartProps = {
  data: any;
  colors: any;
  types: {
    [key: string]: string;
  };
};

const FIELDS = [
  'Нет нарушений',
  'Некритичные нарушения',
  'Критичные нарушения',
];

const isCritical = (name: string) =>
  name.toLowerCase().includes('критичные') && !name.toLowerCase().includes('некритичные');

const tooltipFormatter = (value, name, props) => checkPercentValue(value, isCritical(name));

// В зависимости от типа данных выводим разные стили к подписям
const tempObject = {
  critical: (props, theme) => {
    const { x, y, width, height } = props;
    return props.value
      ? (
        <g>
          <text x={x + width / 2 - 5} y={y + (height / 2) - 12} style={{ fontSize: '12px', fill: theme.colors.dashboardCard.defaultText }} textAnchor="middle" dominantBaseline="middle">
            {checkPercentValue(props.value.percent, true)}
          </text>

          <text x={x + width / 2 + 21} y={y + (height / 2) - 11} style={{ fontSize: '9px', fill: theme.colors.dashboardCard.defaultText }} textAnchor="middle" dominantBaseline="middle">
            {props.value.value}
          </text>

          {/* <line x1={x + width / 2} y1={y + (height / 2) - 15} x2={x + width / 2} y2={y + (height / 2) - 8} stroke="#000" strokeWidth="0.8" /> */}
        </g>
      )
      : null;
  },
  not_critical: (props) => {
    const { x, y, width, height } = props;
    return props.value
      ? (
        <g>
          {/* <line x1={x + width / 2} y1={y + (height / 2) + 17} x2={x + width / 2} y2={y + (height / 2) + 10} stroke="#000" strokeWidth="0.8" /> */}

          <text x={x + width / 2 - 5} y={y + (height / 2) + 12} style={{ fontSize: '12px', fill: '#000' }} textAnchor="middle" dominantBaseline="middle">
            {checkPercentValue(props.value.percent)}
          </text>

          <text x={x + width / 2 + 21} y={y + (height / 2) + 13} style={{ fontSize: '9px', fill: '#000' }} textAnchor="middle" dominantBaseline="middle">
            {props.value.value}
          </text>
        </g>
      )
      : null;
  },
  no_violation: (props) => {
    const { x, y, width, height } = props;
    return props.value
      ? (
        <g>
          <text x={x + width / 2 - 5} y={y + (height / 2) + 2} style={{ fontSize: '12px', fill: '#000' }} textAnchor="middle" dominantBaseline="middle">
            {checkPercentValue(props.value.percent)}
          </text>

          <text x={x + width / 2 + 21} y={y + (height / 2) + 3} style={{ fontSize: '9px', fill: '#000' }} textAnchor="middle" dominantBaseline="middle">
            {props.value.value}
          </text>
        </g>
      )
      : null;
  },
  _default: (props) => {
    const { x, y, width, height } = props;
    return props.value
      ? (
        <g>
          <text x={x + width / 2 - 14} y={y + (height / 2) + 2} style={{ fontSize: '12px', fill: '#fff' }} textAnchor="middle" dominantBaseline="middle">
            {checkPercentValue(props.value.percent)}
          </text>

          <text x={x + width / 2 + 21} y={y + (height / 2) + 2} style={{ fontSize: '9px', fill: '#fff' }} textAnchor="middle" dominantBaseline="middle">
            {props.value.value}
          </text>
        </g>
      )
      : null;
  }
};

const renderCustomizedLabel = (field, types, theme) => (props) => {
  const type = findKey(types,  function(o) {
    return o === field;
  });
  return tempObject?.[type]?.(props, theme) ?? tempObject._default(props);
};

const BarChart: React.FC<BarChartProps> = React.memo(
  (props) => {
    const { data, colors: colorFromProps, types } = props;
    const total = [];
    const theme = useStyledTheme();

    data.forEach((i) => {
      total.push(i.total);
    });

    const COLORS = {};

    colorFromProps?.forEach((item) => COLORS[item.description] = item.color);

    // const fields: string[] = Object.keys(omit(data[0], ['total', 'name', 'type']));

    const customizedTick = (theme) => (props) => {
      const { x, y } = props;
      const color = theme.colors.dashboardCard.defaultText;
      return (
        <g>
          <text x={x} y={y + 10} style={{ fontSize: '11px', lineHeight: 1, fill: color }} textAnchor="middle" dominantBaseline="middle">
            {total[props.index]}
          </text>

          <text x={x} y={y + 30} style={{ fontSize: '11px', lineHeight: 1, fill: color }} textAnchor="middle" dominantBaseline="middle">
            {props.payload.value}
          </text>
        </g>
      );
    };

    const memoizedTick = React.useMemo(() => customizedTick(theme), [theme]);

    return (
      <React.Fragment>
        <ChartWrapper>
          <ResponsiveContainer className="wrap_bar" width="100%" height="100%">
            <BarRechart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 15 }}
            >
              <XAxis dataKey="name" tick={memoizedTick} />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                formatter={tooltipFormatter}
              />
              {/* TODO Заменить все key на нормальные тут, в отчете и в круговой */}
              {
                FIELDS.map((field, key) => {
                  return (
                    <Bar
                      key={key}
                      dataKey={`${field}.percent`}
                      name={field}
                      fill={COLORS[field]}
                      stackId="a"
                    >
                      <LabelList
                        dataKey={field}
                        content={renderCustomizedLabel(field, types, theme)}
                      />
                    </Bar>
                  );
                }
                )
              }
            </BarRechart>
          </ResponsiveContainer>
        </ChartWrapper>
      </React.Fragment>
    );
  },
);

export default BarChart;

const ChartWrapper = styled.div`
    width: 100%;
    height: 100%;
    & button {
      margin-left: 20px;
    }
`;

