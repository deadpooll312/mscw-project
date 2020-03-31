import { rgba } from 'polished';

const palette = {
  blue1: '#2B55E6',
  blue2: '#3666a7',
  blue3: '#577095',
  blue4: '#394FA1',
  blue5: '#746a8f',
  // blue5: '#BF94A3',
  //все зашло слишком далеко и запуталось, временный цвет
  blue6: '#746a8f',
  lightBlue1: '#E8EEFC',
  lightBlue2: 'rgba(43,85,230,0.1)',
  green1: '#02A79D',
  green2: '#88BBBB',
  green3: '#49A59D',
  green4: '#4ea49c',
  grey1: '#818490',
  grey2: '#595959',
  grey3: '#737373',
  grey4: 'linear-gradient(to right,#DEE2E8 0%,#FFF)',
  grey5: '#AFAFCB',
  grey6: '#AAAFB9',
  grey7: '#efefef',
  grey8: '#e7e5e6',
  lightGrey1: 'rgba(222,226,232,0.8)',
  lightGrey2: 'rgba(222,226,232,0.6)',
  lightGrey3: '#D1D2D9',
  lightGrey4: '#E6E6E6',
  purple: '#84629d',
  pink: '#BF94A3',
  textGray: '#545456',
  textGrey2: '#95989C',
  textDisabled: 'rgba(0, 0, 0, 0.25)',
  red1: '#A12A4A',
  red2: '#95354B',
  red3: '#92364c',
  red4: '#D093A4',
  red5: '#F5222D',
  yellow1: '#E99B2B',
  yellow2:'#ECC691',
  yellow3: '#B49A3B',
  yellow4: '#E7798',

  white1: '#FFFFFF',
  white1_25: '#FFFFFF',
  black: '#2A2A2C',
  black_25: '#2A2A2C',

  //blueDark: '#0f0f25',
  blueDark: '#121212',
  // blueDark: '#fff',
  //blueDarkDark: '#080814',
  blueDarkDark: '#121212',
  // blueDarkDark: '#efefef',
  purpure: '#736a8f',
  valentine: '#BF94A3',

  blueGrayLight: '#dde6f0',
  blueGrayDark: '#9db1cc',
  disableGray: rgba(42, 42, 44, 0.25),
};

palette.white1_25 = rgba(palette.white1, 0.25);
palette.black_25 = rgba(palette.black, 0.25);

export default palette;
