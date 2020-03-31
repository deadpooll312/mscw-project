import { css } from 'styled-components';

export const mediaWidth1300 = css`
  @media (min-width: 1400px) {
    /* width: 1300px; */
    width: 1320px;
  }
`;

export const mediaWidth1100 = css`
  @media (min-width: 1200px) and (max-width: 1400px)  {
    /* width: 1100px; */
    width: 1320px;
  }
`;

export const mediaWidth900 = css`
  @media (min-width: 1000px) and (max-width: 1200px)  {
    width: 900px;
  }
`;

export const mediaWidth700 = css`
  @media (max-width: 1000px)  {
    width: 700px;
  }
`;

export const commonMedia = css`
  ${mediaWidth1300};
  ${mediaWidth1100};
  ${mediaWidth900};
  ${mediaWidth700};
`;

export const commonMediaAnalytic = css`
  ${mediaWidth1300};
  ${mediaWidth1100};
  ${mediaWidth700};
`;