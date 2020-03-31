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
    mainBackground: palette.grey7,
    cardBackground: palette.white1,
    defaultText: palette.black,
    defaultDisabledText: palette.black_25,
    buttonActive: palette.purpure,
    boxShadow: palette.black_25,
    radioDate: palette.purpure,
    radioDateColor: palette.white1,
    tableMatrixBackground: palette.blueGrayLight,
    weatherTableHover: palette.lightBlue2,
    btnBackground: palette.blue6,
  },
};

export default colors;
