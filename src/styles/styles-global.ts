import { createGlobalStyle, css } from 'styles';

import 'styles/styles-antd.less';
import 'styles/font.less';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { lighten } from 'polished';

export const GlobalStyle = createGlobalStyle`
  ${({ theme }) => css`
        div.ant-notification {
          z-index: 1000000000;
        }
        html {
            height: 100%;
            box-sizing: border-box;
        }

        *, *:before, *:after {
            box-sizing: inherit;
        }
        body {
        }

        body, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          background-color: ${theme.colors.dashboardCard.mainBackground};
        }

        /* выделение прямоугольника для приближения */
        .ol-dragzoom {
          background-color: rgba(255, 255, 255, 0.6);
          border: 1px solid gray;
        }

        /* для миникарты */
        .ol-overviewmap {
          display: none;
          background: none;
          z-index: 12;
        }
        .ol-overviewmap.ol-overviewmap-map.ol-viewport {
          border-radius: 50%;

        }

        .ol-overviewmap-box {
          border: 2px dotted rgba(0,60,136,.3);
          background: rgba(0,60,136,.3);
        }

      .zoom-popup{
        right: unset !important;
        left: 0;
        top:  unset !important;
        bottom: 40px;

        div{
          margin-right: 0;
        }
      }


    .ol-rotate {

      top: 300px !important;
      right: 15px !important;

      padding: 0 !important;
    }

    .ol-scale-line {
      left: auto !important;
      right: 90px !important;
      bottom: 7px !important;
      background: none !important;
    }

    .ol-scale-line-inner {
        display: none;
        border-color: black !important;
        color: black !important;
        font-size: 14px !important;
    }

    .ol-mouse-position {
      top: auto !important;
      bottom: 10px !important;
      right: 240px !important;
      position: absolute;
    }

    li > i.anticon.anticon-check.ant-select-selected-icon {
      border: 2px solid #2b55e6;
      padding: 2px;
      border-radius: 3px;
    }
    li.ant-select-dropdown-menu-item.ant-select-dropdown-menu-item-selected > i.anticon.anticon-check.ant-select-selected-icon {
      color: #2b55e6 !important;
    }

    .ol-hidden {
      display: none;
    }

    .ant-calendar.ant-calendar, .ant-calendar-year-panel.ant-calendar-year-panel,
    .ant-calendar-month-panel.ant-calendar-month-panel {
      background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground};
      color: ${({ theme }) => theme.colors.dashboardCard.defaultText};
    }

    .ant-calendar-date.ant-calendar-date,
    .ant-calendar-month-select.ant-calendar-month-select.ant-calendar-month-select,
    .ant-calendar-year-select.ant-calendar-year-select.ant-calendar-year-select,
    .ant-calendar-year-panel-year.ant-calendar-year-panel-year,
    .ant-calendar-year-panel-decade-select-content.ant-calendar-year-panel-decade-select-content,
    .ant-calendar-month-panel-year-select-content.ant-calendar-month-panel-year-select-content,
    .ant-calendar-month-panel-month.ant-calendar-month-panel-month
    {
      color: ${({ theme }) => theme.colors.dashboardCard.defaultText};
    }

    .ant-calendar-disabled-cell > .ant-calendar-date.ant-calendar-date, .ant-calendar-active-week .ant-calendar-date {
      color: ${() => lighten(0.5, '#000')};
    }

    .ant-calendar-selected-day > .ant-calendar-date.ant-calendar-date {
      color: #000;
    }

    .ant-calendar-date.ant-calendar-date:hover {
      background: #f0f7ff;
      color: #000;
    }

  `};
`;

export default GlobalStyle;
