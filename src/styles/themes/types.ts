import palette from 'styles/themes/palette';

export type IStyledComponentsTheme = {
  colors: {
    palette: typeof palette;
    gradient: {
      lightGrey: {
        light: typeof palette[keyof typeof palette];
      };
    };
    dashboardCard: {
      mainBackground: typeof palette[keyof typeof palette];
      cardBackground: typeof palette[keyof typeof palette];
      defaultText: typeof palette[keyof typeof palette];
      defaultDisabledText: typeof palette[keyof typeof palette];
      buttonActive: typeof palette[keyof typeof palette];
      boxShadow: typeof palette[keyof typeof palette];
      radioDate: typeof palette[keyof typeof palette];
      radioDateColor: typeof palette[keyof typeof palette];
      tableMatrixBackground: typeof palette[keyof typeof palette];
      weatherTableHover: typeof palette[keyof typeof palette];
      btnBackground: typeof palette[keyof typeof palette];
    };
  };
  fonts: {
    family: {
      sidebar: {
        main: string;
        extra: string;
        modal: string;
      };
      map: {
        main: string;
      };
      reports: {
        main: {
          regular: string;
          bold: string;
        };
      };
      login: {
        main: string;
        extra: string;
      };
      extra: string;
    };
    size: {
      default: string;
      md: string;
      lg: string;
    };
  };
  animation: any;
  spacing: any;
  media: any;
};
