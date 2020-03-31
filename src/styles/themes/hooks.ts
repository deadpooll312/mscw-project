/* eslint-disable import/prefer-default-export */
import React from 'react';
import { ThemeContext } from 'styles';

// для динамического доступа к стилевой теме в компоненте
export const useStyledTheme = () => React.useContext(ThemeContext);