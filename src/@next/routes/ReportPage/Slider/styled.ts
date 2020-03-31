import styled, { css } from 'styled-components';
import { commonMedia, commonMediaAnalytic } from '@next/ui/@media';

const commontCss = css`
  margin: 0 auto;
  height: unset;
  width: 1300px;
  ${commonMedia};
`;

// TODO Поставить фиксированный размер ширине сайдбара
export const ReportsWrap = styled.div`
  ${commontCss};

  font-family: 'Circe-Regular';
  /* transform: translateY(-50%); */
  position: relative;
  /* top: 50%; */

  display: flex;
  align-items: center;
`;

export const FixSize = styled.div`
  margin: 0 auto;
  height: unset;
  width: 1300px;
  ${commonMediaAnalytic};
  display: block;
`;
