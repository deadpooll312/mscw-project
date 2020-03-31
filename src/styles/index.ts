
// styled-components.ts
import 'static/fonts/index.css';
import * as styledComponents from 'styled-components';
import { IStyledComponentsTheme } from 'styles/themes/types';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  ThemeContext,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<IStyledComponentsTheme>;

export type ThemedStyledProps<P> = styledComponents.ThemedStyledProps<P, IStyledComponentsTheme>;

export {
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  ThemeContext,
};

export default styled;

// function styledComponentWithProps<T, U extends HTMLElement = HTMLElement>(styledFunction: StyledFunction<React.HTMLProps<U>>): StyledFunction<T & React.HTMLProps<U>> {
//   return styledFunction
// }

// interface MyProps {
//   // ...
//   xxx: number
// }
