import { IStyledComponentsTheme } from 'styles/themes/types';

const fonts: IStyledComponentsTheme['fonts'] = {
  family: {
    sidebar: {
      main: 'Oswald-Bold',
      extra: 'Circe-Bold',
      modal: 'Circe-Regular'
    },
    map: {
      main: 'Circe-Regular',
    },
    reports: {
      main: {
        regular: 'Circe-Regular',
        bold: 'Circe-Bold',
      }
    },
    login: {
      main: 'Oswald-Medium',
      extra: 'OpenSans'
    },
    extra: 'Roboto',
  },
  size: {
    default: '14px',
    md: '16px',
    lg: '20px'
  },
};

export default fonts;