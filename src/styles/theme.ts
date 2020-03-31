import { css } from 'styled-components';

const media = {
  desktop: 1300,
};

export const THEMES_CONSTANTS = {
  controlIconWidth: '64px',
  sidebarWidthOpen: '292px',
  sidebarWidthClosed: '64px',
};

export const THEME = {
  media,
  primaryColor: 'white',
  primaryColorInverted: 'green',
  bordered: css`
    border: 1px solid lightgrey;
    border-radius: 3px;
    box-shadow: 0px 1px 1px 2px rgba(0, 0, 0, 0.12), 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  `,
};

export type IStyledComponentsTheme = typeof THEME;
