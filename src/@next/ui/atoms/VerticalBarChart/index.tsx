import * as React from 'react';
import { TYPES_OF_COEFFICIENTS } from './constants';

import findKey from 'lodash-es/findKey';
import keyBy from 'lodash-es/keyBy';
import omit from 'lodash-es/omit';
import { ChartWrapper, WrapTooltip, TooltipDescription, ShowPercentBtn, LegendLine } from './styled';
import {
  BarChart as BarRechart, Bar, XAxis, YAxis, LabelList, Tooltip, ResponsiveContainer,
} from 'recharts';

type VerticalBarChartProps = {
  LegendByShowPercent: React.ComponentType<{ showPercent: boolean }>;
  data: any;
  colors: any;
  types: {
    [key: string]: string;
  };
};

const totalStyle = { fontSize: '15px', fill: '#000', fontFamily: 'Circe-Bold'};
const percentStyle = { fontSize: '18px', fontFamily: 'Circe-Bold', fill: '#923749' };

const renderTotal = (props, tempData) => { 
  const { x, y, width, height, index } = props;
  const total = tempData[index].total;
  const percent = `${Number(tempData[index].percent).toFixed(2)}%`;

  return (
    <g>
      <text x={x + width + 30} y={y + (height / 2 + 1)} style={totalStyle} textAnchor="middle" dominantBaseline="middle">
        {total}
      </text>

      <text x={x + width + 90} y={y + (height / 2 + 1)} style={percentStyle} textAnchor="middle" dominantBaseline="middle">
        {percent}
      </text>
    </g>
  );
};

// https://github.com/recharts/recharts/issues/829#issuecomment-375749352
// лейблы на графиках не отображались. возможно, баг самой библиотеки.
const tempData = [];

// В зависимости от типа данных выводим разные стили к подписям
const tempObject = {
  online_critical_winter: (props) => {
    const { x, y, width, height } = props;

    return props.value
      ? (
        <g>
          <text x={x + width / 2} y={y + (height / 2) + 1} style={{ fontSize: '12px', fill: '#fff' }} textAnchor="middle" dominantBaseline="middle">
            {props.value}
          </text>
        </g>
      )
      : null;
  },
  online_critical_all: (props, tempData, isLastField) => {
    const { x, y, width, height } = props;
    
    return (
      <g>
        <text x={x + width / 2} y={y + (height / 2) + 1} style={{ fontSize: '12px', fill: '#fff' }} textAnchor="middle" dominantBaseline="middle">
          {props.value || null}
        </text>
        {
          isLastField ? renderTotal(props, tempData) : null
        }
      </g>
    );
  },
  no_violation: (props) => {
    const { x, y, width, height } = props;
    return props.value
      ? (
        <g>
          <text x={x + width / 2} y={y + (height / 2 + 1)} style={{ fontSize: '12px', fill: '#000' }} textAnchor="middle" dominantBaseline="middle">
            {props.value}
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
          <text x={x + width / 2} y={y + (height / 2 + 1)} style={{ fontSize: '12px', fill: '#000' }} textAnchor="middle" dominantBaseline="middle">
            {props.value}
          </text>
        </g>
      )
      : null;
  }
};

tempObject['online_not_critical_winter'] = tempObject.online_critical_all;
tempObject['online_not_critical_all'] = tempObject.online_critical_all;

const renderCustomizedLabel = (field: string, types, tempData, isLastField: boolean) => (props) => {
  // eslint-disable-line
  const type = findKey(types,  function(o) {
    return o === field;
  });

  return tempObject[type] ? tempObject[type](props, tempData, isLastField) : tempObject._default(props);
};

const VerticalBarChart: React.FC<VerticalBarChartProps> = React.memo(
  (props) => {
    const [showPercent, setShowPercent] = React.useState(false);

    const { data, colors: colorFromProps, types, LegendByShowPercent } = props;

    React.useEffect(() => {
      tempData.length = 0;

      data.forEach((item) => {
        tempData.push(item);
      });
    }, [data]);

    const COLORS = {};

    colorFromProps?.forEach((item) => COLORS[item.description] = item.color);

    const fields = Object.keys(omit(data[3], ['total', 'name', 'type', 'percent', 'coefficients', 'checkedObject', 'totalObject', 'tooltipPercent' ]));

    const tempDataNameIndex = React.useMemo(
      () => {
        const dataNameIndex = Object.entries(keyBy(data, 'name')).reduce(
          (newObj, [key, dataValue]) => {
            newObj[key] = {
              ...dataValue,
              coefficientsIndex: keyBy(dataValue.coefficients, 'type'),
            };
  
            return newObj;
          },
          {},
        );
  
        return dataNameIndex;
      },
      [data],
    );
    
    const CustomizedTick = (props) =>{
      const { x, y } = props;
      const districtData = tempDataNameIndex[props.payload.value];
      const checkedPercents = districtData.coefficientsIndex[TYPES_OF_COEFFICIENTS.CHECKED_OBJECT];
      const governmentPercents = districtData.coefficientsIndex[TYPES_OF_COEFFICIENTS.GOVERNMENT];
      const citizenPercents = districtData.coefficientsIndex[TYPES_OF_COEFFICIENTS.CITIZEN];
      const governmentAndCitizenPercents = districtData.coefficientsIndex[TYPES_OF_COEFFICIENTS.GOVERNMENT_CITIZEN];
  
      return (
        showPercent ? (
          <g>
            <text x={x - 260} y={y} style={{ fontSize: '12px', lineHeight: 1 }} textAnchor="start" dominantBaseline="middle">
              <tspan style={{ fill: '#4ea49c'}}>{ `${checkedPercents?.percent ?? 0}%`}</tspan> / 
              <tspan style={{ fill: '#577095'}}>{ `${governmentPercents?.percent ?? 0}%` }</tspan> /
              <tspan style={{ fill: '#84629d'}}>{ `${citizenPercents?.percent ?? 0}%` }</tspan> /
              <tspan style={{ fill: '#737373'}}>{ `${governmentAndCitizenPercents?.percent ?? 0}%` }</tspan>
            </text>
  
            <text x={x} y={y + 4} textAnchor="end" style={{ fontSize: '14px', fontFamily: 'Circe-Bold' }}>{props.payload.value}</text>
          </g>
        ) : (
          <g>
            <text x={x - 225} y={y} style={{ fontSize: '12px', lineHeight: 1 }} dominantBaseline="middle">
              <tspan textAnchor="start" style={{fontWeight: 'bold', fontFamily: 'Circe-Bold'}}>{districtData.checkedObject}</tspan> из {districtData.totalObject}  
            </text>
            <text x={x} y={y + 4} textAnchor="end" style={{ fontSize: '14px', fontFamily: 'Circe-Bold' }}>{props.payload.value}</text>
          </g>
        )
      );
    };

    const customTooltip = (props) =>{
      return (
        <WrapTooltip>
          {`${props?.payload?.[0]?.payload.name}`}
          {
            props?.payload.map((item, key) => {
              return (
                <TooltipDescription stringColor={item.color} key={key}>{`${item.dataKey}: ${item.payload.tooltipPercent[item.dataKey]}%`}</TooltipDescription>
              );
            })
          }

        </WrapTooltip> 
      );
    };

    const toggleShowPercent = React.useCallback(
      () => {
        setShowPercent((oldShowPercent) => !oldShowPercent);
      },
      [],
    );

    return (
      <React.Fragment>
        {
          Boolean(LegendByShowPercent) && (
            <LegendLine>{<LegendByShowPercent showPercent={showPercent} />}</LegendLine>
          )
        }
        <ShowPercentBtn onClick={toggleShowPercent}>%</ShowPercentBtn>
        <ChartWrapper>
          <ResponsiveContainer >
            <BarRechart
              data={tempData}
              margin={{ top: 20, right: 20, left: 20, bottom: 15 }}
              layout='vertical'
            >
              <XAxis type='number' hide={true}/>
              <YAxis type='category' dataKey="name" interval={0} tick={CustomizedTick}/>
              <Tooltip content={customTooltip} cursor={{ fill: 'transparent' }} wrapperStyle={{zIndex: 1000}}/>
              {/* TODO Заменить все key на нормальные тут, в отчете и в круговой */}
              {
                fields.map((field, key) => {
                  const isLastField = key === fields.length - 1;
                  return (
                    <Bar key={key} dataKey={field} stackId="a" fill={COLORS[field]} barSize={20}>
                      <LabelList
                        dataKey={field}
                        content={renderCustomizedLabel(field, types, tempData, isLastField)}
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

export default VerticalBarChart;
