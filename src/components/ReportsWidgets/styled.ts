import styled from 'styled-components';

export const setContent = (url: string) => () => `
    content: url(${url});
    width: 16px;
    height: 16px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

export const GoodIcon = styled.div`
  ${setContent('static/good.png')};
`;

export const NotBadIcon = styled.div`
  ${setContent('static/notBad.png')};
`;

export const BadIcon = styled.div`
  ${setContent('static/bad.png')};
`;

export const StyledReportPage = styled.div`
  position: absolute;
  top: 10px;
  width: 100%;
  text-align: center;
`;