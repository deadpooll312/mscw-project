import { Button } from 'antd';
import styled, { css } from 'styled-components';
import { Backdrop, Container }  from '@next/ui/atoms/Modal';

import TableAdvanced from '@next/ui/atoms/TableAdvanced';

export const StyledAntBtn = styled(Button)`
  && :hover{
    background-color: ${({type}) => type === 'primary' ? '#2b55e6;' : 'white' };
  }

  &:nth-child(2){
    margin-left:10px;
  }
`;

export const StyledTitle = styled.a<{ isActive?: boolean }>`
  color: #746a8f;
  text-decoration: underline;

  &:hover{
    color: #0d226e;
  }
`;

export const StyledInfoDropdown = styled.div<{ hiddenProp?: boolean }>`
  ${({ hiddenProp }) => hiddenProp ? css`
    transition: max-height 0.5s ease;
    max-height: 0;
    transform:scaleY(0);
  `
    : css`
    height: auto;
    max-height: 100%;
    overflow: hidden;
    transition: max-height 0.5s ease;
  `}
`;

export const DropdownButtons = styled.div`
  margin-bottom: 10px;
`;

export const StyledTitleWrap = styled.div`
  text-align: center;
  @media (min-width: 2000px) and (max-width: 4000px)  {
    font-size: 22px;
  }
`;

export const StyledHelpInfo = styled.div<{ isActive?: boolean }>`
  margin: 30px;
  /* ${({ isActive }) => !isActive ? css`max-height: 0` : ''}; */
  .ant-btn-primary, .ant-btn-primary:active, .ant-btn-primary:focus {
    background-color: #746a8f;
  }
  .ant-btn:hover{
    color: rgba(0, 0, 0, 0.65);
    cursor: pointer;
  }
  .ant-btn-primary:hover{
    background-color: #746a8f;
    color: white;
    cursor: pointer;
  }

  ${Backdrop} {
    z-index: 1;
    background-color: transparent;
    position: relative;
  }
  ${Container}{
    bottom: 20px;
    right: 10px;
    top: unset;
    left: unset;
    transform: none;
    height: 270px;
    width: 755px;
    border: 1px solid #dee2e8;
    padding: 10px;
    transition: height 0.4s linear;

    & > div {
      width: 100%;
      text-align: left;
    } 
  }

  && ${TableAdvanced}{
    th {
      padding: 5px;
      word-break: break-word;
      border-right: none;
    }

    tbody{
      margin-top: 55px;
    }
  }
`;

export const CloseModalButton = styled(Button)`
  && {
  position: absolute;
    top: 0;
    right: 0;
    background-color: transparent;
    border: 0;
  }
`;