import palette from 'styles/themes/palette';
import { IStyledComponentsTheme } from 'styles/themes/types';

const colors: IStyledComponentsTheme['colors'] = {
  palette,
  gradient: {
    lightGrey: {
      light: palette.grey4,
    },
  },
  dashboardCard: {
    mainBackground: palette.blueDarkDark,
    cardBackground: palette.blueDark,
    // defaultText: palette.white1,
    defaultText: palette.white1,
    defaultDisabledText: palette.white1_25,
    buttonActive: palette.purpure,
    boxShadow: palette.black_25,
    // boxShadow: palette.textGrey2,
    // radioDate: palette.purpure,
    radioDate: palette.purpure,
    radioDateColor: palette.white1,
    tableMatrixBackground: palette.blueGrayDark,
    weatherTableHover: palette.purpure,
    btnBackground: palette.blue5,
  },
};

export default colors;
