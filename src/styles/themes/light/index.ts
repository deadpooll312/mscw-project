import { IStyledComponentsTheme } from 'styles/themes/types';
import colors from './colors';
import fonts from './fonts';
import spacing from './spacing';

const lightTheme: IStyledComponentsTheme = {
  colors,
  fonts,
  animation: null,
  spacing,
  media: {
    desktop: 1300
  },
};

export default lightTheme;