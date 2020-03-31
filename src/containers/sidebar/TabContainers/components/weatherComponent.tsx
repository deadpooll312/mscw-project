import * as React from 'react';
import styled from 'styled-components';
import remove from 'lodash-es/remove';

import { MomentInput } from 'moment';

import { Table, Icon, Avatar } from 'antd';
import { WIND, TIMES_OF_DAY } from './constants';
import { getCurrentMomentDate, getFormattedDashDate, getFormattedDayMonthDate } from '@next/utils/dates';
import { WeatherPartsType, WeatherPart } from 'app/api/types';
import { getWeatherData } from 'app/api';
import { ThemedStyledProps } from 'styles';

const icons = {
  'partly-cloudy': require('static/svg/cloudy.svg'),
  'cloudy': require('static/svg/cloudy_sun.svg'),
  'clear': require('static/svg/sun.svg'),
  'overcast': require('static/svg/overcast.svg'),
  'partly-cloudy-and-light-rain': require('static/svg/light_rain.svg'),
  'cloudy-and-light-rain': require('static/svg/light_rain.svg'),
  'overcast-and-light-rain': require('static/svg/light_rain.svg'),
  'partly-cloudy-and-rain': require('static/svg/rain.svg'),
  'cloudy-and-rain': require('static/svg/rain.svg'),
  'overcast-and-rain': require('static/svg/heavy_rain.svg'),
  'overcast-thunderstorms-with-rain': require('static/svg/lighting.svg'),
  'overcast-and-wet-snow': require('static/svg/rain_n_snow.svg'),
  'partly-cloudy-and-light-snow': require('static/svg/light_snow.svg'),
  'cloudy-and-light-snow': require('static/svg/light_snow.svg'),
  'overcast-and-light-snow': require('static/svg/light_snow.svg'),
  'partly-cloudy-and-snow': require('static/svg/snow.svg'),
  'cloudy-and-snow': require('static/svg/snow.svg'),
  'overcast-and-snow': require('static/svg/snowfall.svg'),
};

export type WeatherComponentProps = {
  date: MomentInput;
  admItemFeatureId: string;
  isWinter: boolean;
  children?: React.ReactNode;
};

export type WeatherComponentState = {
  showAllTimesOfDay: boolean;
  data: any;
  columns: any[];
};

function createData(arr: Record<WeatherPartsType, WeatherPart> | {}): any[] {
  const data = [];
  Object.keys(arr).forEach((key) => {
    switch (key) {
      case 'morning': {
        data[0] = { key, timesOfDay: TIMES_OF_DAY[key], ...arr[key] };
        break;
      }
      case 'day': {
        data[1] = { key, timesOfDay: TIMES_OF_DAY[key], ...arr[key] };
        break;
      }
      case 'evening': {
        data[2] = { key, timesOfDay: TIMES_OF_DAY[key], ...arr[key] };
        break;
      }
      case 'night': {
        data[3] = { key, timesOfDay: TIMES_OF_DAY[key], ...arr[key] };
        break;
      }
    }
  });
  return data;
}

class WeatherComponent extends React.PureComponent<WeatherComponentProps, WeatherComponentState> {

  state: WeatherComponentState = {
    showAllTimesOfDay: false,
    data: [],
    columns: [],
  };

  async componentDidMount() {
    const { date, admItemFeatureId } = this.props;
    const resp = await getWeatherData(getFormattedDashDate(date ?? getCurrentMomentDate()), admItemFeatureId);
    const columns = [
      {
        title: getFormattedDayMonthDate(date?? getCurrentMomentDate()).toUpperCase(),
        dataIndex: 'timesOfDay',
        key: 'timesOfDay',
        render: (value, record, rowIndex) => (
          <div className="custom-cell">
            {value}
          </div>
        ),
        width: 108,
      },
      {
        title: 'T°',
        dataIndex: 'tempAvg',
        key: 'tempAvg',
        render: (value, record, rowIndex) => (
          <div className="custom-cell">
            {`${value}°`}
          </div>
        ),
        width: 62,
      },
      {
        title: 'ОСАДКИ, ММ',
        dataIndex: 'precMm',
        key: 'precMm',
        render: (value, record, rowIndex) => (
          <div
            className="custom-cell"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <StyledIconCloud component={() => <Avatar size="small" shape="square" src={icons[record.condition]} />} />
            {value}
          </div>
        ),
        width: 108,
      },
    ];

    if(!this.props.isWinter){
      columns.push({
        title: 'ВЕТЕР, М/С',
        dataIndex: 'wind',
        key: 'wind',
        width: 62,
        render: (value, record, rowIndex) => (
          <div className="custom-cell">
            {`${WIND[record.windDir]} / ${record.windGust}`}
          </div>
        ),
      });
    }
    
    if (resp?.parts) {
      const { parts } = resp;
      const data = createData(parts);

      this.setState({
        data,
        columns,
      });
    } else {
      this.setState({
        columns,
      });
    }
  }

  async componentDidUpdate(prevProps: WeatherComponentProps) {
    const { date, admItemFeatureId } = this.props;
    if(prevProps.isWinter !== this.props.isWinter){
      const newColumns = this.state.columns.slice();
      if (this.props.isWinter) {
        remove(newColumns, (column) => column.key === 'wind');
      } else {
        newColumns.push({
          title: 'ВЕТЕР, М/С',
          dataIndex: 'wind',
          key: 'wind',
          width: 62,
          render: (value, record, rowIndex) => (
            <div className="custom-cell">
              {`${WIND[record.windDir]} / ${record.windGust}`}
            </div>
          ),
        });
      }
      this.setState({ columns: newColumns });
    }
    const isDateChange = !getCurrentMomentDate(prevProps.date).isSame(date) && !(prevProps.date === null && date === null);
    if (isDateChange || prevProps.admItemFeatureId !== admItemFeatureId) {
      const resp = await getWeatherData(date ? getFormattedDashDate(date) : getFormattedDashDate(getCurrentMomentDate()), admItemFeatureId);
      let data = [];
      if (resp?.parts) {
        const parts = resp.parts;
        if (parts) {
          data = createData(parts);
        }
      }
      if (isDateChange) {
        this.state.columns[0].title = this.props.date ? getFormattedDayMonthDate(this.props.date).toUpperCase() : getFormattedDayMonthDate(getCurrentMomentDate()).toUpperCase();
      }
      this.setState({ data });
    }

  }

  render() {
    const {
      children,
      isWinter
    } = this.props;
    const forceUpdate = children && isWinter;
    const className = `${this.state.showAllTimesOfDay ? '' : `closed${forceUpdate? '-max' : '' }`}`;
    return (
      <Container className={className}  key={forceUpdate.toString()}>
        <Weather
          columns={this.state.columns}
          dataSource={this.state.data}
          pagination={false}
          locale={{ emptyText: 'Нет данных на эту дату' }}
          onRow={(record, rowIndex) => ({
            onClick: (event) => {
              this.setState((prevState) => ({ showAllTimesOfDay: !prevState.showAllTimesOfDay }));
            },
          })}
          onHeaderRow={(column) => ({
            onClick: () => {
              this.setState((prevState) => ({ showAllTimesOfDay: !prevState.showAllTimesOfDay }));
            },
          })}
        />
        {this.props.children}
        <Icon
          type={this.state.showAllTimesOfDay ? 'arrow-down' : 'arrow-up'}
          onClick={() => {
            this.setState((prevState) => ({ showAllTimesOfDay: !prevState.showAllTimesOfDay }));
          }}
        />
      </Container>
    );
  }
}

export default WeatherComponent;

const Container = styled.div`
  /* display: flex;
  flex-direction: row;
  margin-top: -100px;
  flex-shrink: 0; */
  background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground};
  transition: background-color 0.5s;
  padding: 10px 14px 0 0;
  position: fixed;
  bottom: 0;
  transition-duration: 0.8s;
  bottom: 0;
  width: 380px;
  z-index: 11;
  left: 10px;
  padding-left: 16px;
  border-radius: 6px;
  transition: all 1s;

  &.closed-max {
    transform: translate3d(0, 78%, 0);
  }

  &.closed {
    transform: translate3d(0, 65%, 0);
  }

   @media (min-width: 2000px) and (max-width: 4000px)  {
    width: 490px;
  }

  .anticon-arrow-up, .anticon-arrow-down {
    position: absolute;
    top: 8px;
    right: 10px;
    color: ${({ theme }) => theme.colors.dashboardCard.defaultText}
  }
`;

const Weather = styled(Table)`
    width: calc(100% - 14px);
    overflow: hidden;
    flex-shrink: 0;
    padding-bottom: 5px;

    .ant-table {
        font-family: OpenSans-Bold;
        font-size: 12px;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.67;
        letter-spacing: normal;
        color: ${({ theme }) => theme.colors.dashboardCard.defaultText} !important;
        cursor: pointer;
        @media (max-width: 768px) {
            font-size: 10px;
        }
        @media (min-width: 2000px) and (max-width: 4000px)  {
          font-size: 16px;
        }
    }
    .ant-table-header-column {
        font-family: OpenSans-Bold;
        font-size: 9px;
        font-style: normal;
        font-stretch: condensed;
        line-height: 1.33;
        letter-spacing: 0.8px;
        color: #818490;
        @media (min-width: 2000px) and (max-width: 4000px)  {
          font-size: 13px;
        }
    }
    .ant-table-thead > tr > th:first-child .ant-table-header-column {
      color: ${({ theme }) => theme.colors.dashboardCard.defaultText};
      transition: color 0.5s;
    }

    .ant-table-tbody > tr > td:first-child {
        color: #818490;
        font-size: 9px;
        @media (min-width: 2000px) and (max-width: 4000px)  {
          font-size: 13px;
        }
    }

    .ant-table-tbody > tr > td {
      border-bottom: unset;
    }

    .ant-table-placeholder{
      background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground};
      transition: background-color 0.5s, color 0.5s;
      color: ${({ theme }) => theme.colors.dashboardCard.defaultText};
      border: none;
    }

    .ant-table-tbody > tr > td, .ant-table-thead > tr > th {
        padding: 0;
        background-color: ${({ theme }: ThemedStyledProps<{}>) => theme.colors.dashboardCard.cardBackground};
        transition: background-color 0.5s;
    }
    .ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
        background-color: transparent;
    }

    .ant-table-row > td:first-child > .custom-cell {
      margin-left: 5px;
    }
    
    .custom-cell {
      height: 36px;
      display: flex;
      align-items: center;
    }
`;

const StyledIconCloud = styled(Icon)`
    margin-right: 28px;
    @media (max-width: 768px) {
      margin-right: 2vw;
    }
`;
