import * as React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import themes from 'styles/themes';
import { useSelector } from 'react-redux';
import { selectAppThemeName } from 'app/store/modules/app/selectors';

type Props = {};

const DahsboardThemeProvider: React.FC<Props> = React.memo(
  (props) => {
    const themeName = useSelector(selectAppThemeName);

    return (
      <StyledThemeProvider
        theme={themes[themeName]}
        children={props.children}
      />
    );
  }
);

export default DahsboardThemeProvider;
