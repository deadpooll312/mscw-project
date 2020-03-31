import styled from 'styled-components';
import { Button } from 'antd';

export const WidgetHeaderRow = styled.div`
  height: 7%;
  padding: 5px 10px;
  & .ant-btn-primary, .ant-btn-primary:hover, .ant-btn:active {
    background-color: transparent;
    border-color: #e7c798;
    border-width: 4px;
  }
  .ant-btn-primary:focus {
    background-color: transparent;
    border-color: #e7c798;
  }
`;

export const FlexContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;

  .ant-btn:last-child:not(:first-child){
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

export const ButtonsContainer = styled.div``;
export const ButtonType = styled(Button)`
  &&& {
    width: 42px;
    height: 40px;
    padding-left: 0;
    padding-right: 0;
    margin-right: 5px;
    > i {
      transform: scale(1.4);
    }
  }
`;

export const CurrentTimeAndPrint = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  align-items: flex-end;
  line-height: 1;
  color: black;

  >* {
    margin: 0 10px;
  }
  >*:first-child {
    margin-left: 0px;
  }
  >*:last-child {
    margin-right: 0px;
  }
`;

export const CurrentTime = styled.div`
  font-size: 26px;
  font-weight: bold;
  text-decoration: underline;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: flex-end;
  line-height: 1;
  color: black;
`;

export const IconWrap = styled.div`
  &:hover::after { 
    content: attr(data-title);
    position: absolute;
    top: 45px;
    left: 0;
    z-index: 1;
    background: #fff;
    font-size: 11px;
    padding: 5px 10px;
    border: 1px solid #d1d1d1;
    color: #000;
    border-radius: 3px;
  }
`;

export const PrintButton = styled.button`
  margin-right: 20px;
  padding: 6px 10px;
  background-color: #fff;
  border-radius: 3px;
  cursor: pointer;
  &:hover{
    box-shadow:1px 1px 5px 0px rgba(0,0,0,0.41);
    -webkit-box-shadow:1px 1px 5px 0px rgba(0,0,0,0.41);
    -moz-box-shadow:1px 1px 5px 0px rgba(0,0,0,0.41);
  }
  &:focus{
    outline: none;
  }
`;