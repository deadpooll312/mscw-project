import styled from 'styled-components';
import { Radio, Button } from 'antd';
import { isNumber } from 'util';

export const ObjectsTitle = styled.div`
  font-family: OpenSans-Bold;
  font-size: 9px;
  font-style: normal;
  font-stretch: condensed;
  line-height: 1.33;
  letter-spacing: 0.8px;
  color: #818490;
  margin-top: 19px;
  margin-bottom: 8px;
`;

export const ObjectContainer = styled.div<any>`
  display: flex;
  width: 94%;
  align-items: center;
  padding: ${(p) => `${p.paddingHeight} 0`};
  margin-left: ${(p) => {
    if(p.hasMargin) {
      return '22px';
    }
    if(p.isSub){
      return '44px';
    }
    return '18px';
  }};
`;

export const Name = styled.div<any>`
  opacity: 0.8;
  font-family: 'Oswald-Bold';
  font-size: ${(p) => p.height};
  font-style: normal;
  font-stretch: normal;
  line-height: 1.11;
  letter-spacing: 0.2px;
  color: #2a2a2c;
  white-space: normal;
  @media (min-width: 2000px) and (max-width: 4000px)  {
    font-size: 30px;
  }
`;

export const Percent = styled.div<any>`
  display: inline-block;
  opacity: 0.8;
  font-family: OpenSans-Bold;
  font-size: ${(p) => p.smallHeight ? '14px' : '15px'};
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #2a2a2c;
  margin-right: 5px;
  @media (min-width: 1600px) and (max-width: 4000px)  {
    font-size: 19px;
  }
`;

export const Count = styled.div<any>`
  display: inline-block;
  font-family: OpenSans-Bold;
  font-size: ${(p) => p.smallHeight ? '14px' : '15px'};
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #818490;
  @media (min-width: 1600px) and (max-width: 4000px)  {
    font-size: 19px;
  }
`;

export const StyledRadio = styled(Radio)<{ isSubObject?: boolean; noBorderBottom?: boolean; order?: 0 | 1 }>`
  &.ant-radio-wrapper {
    display: flex;
    border-bottom: ${({ noBorderBottom }) => !noBorderBottom ? '1px solid #dee2e8' : 'initial'};
    align-items: center;
    margin-right: 0;
    background-color: ${(p) => (p.isSubObject && 'rgba(43, 85, 230, 0.05)')};
    padding-left: ${(p) => (p.isSubObject && '20px')};
    border-color: ${(p) => (p.isSubObject && '#fff')};
    color: #2a2a2c;
  }
  >span:not(.ant-radio) {
    flex-grow: 1;
  }
  .ant-radio {
    order: ${({ order }) => isNumber(order) ? order : 1};
    padding-right: ${({ order }) => order ? '20px' : 'initial'};
  }
  .ant-radio-inner, .ant-radio-checked .ant-radio-inner,
  .ant-radio:hover .ant-radio-inner, .ant-radio-input:focus + .ant-radio-inner {
    border: 2px solid #2b55e6;
    &::after {
      background-color: #2b55e6;
      top: 2px;
      left: 2px;
    }
  }
  &.ant-radio-wrapper-checked {
    background-color: rgba(43, 85, 230, 0.1);
    border-color: #fff;
  }
`;

export const SwitchWrap = styled.div`
  width: 20%;
  text-align: end;
  padding-right: 10px;
`;

export const LayersNameWrap = styled.div`
  width: 80%;
`;

export const StyledRadioGroup = styled(Radio.Group)`
  overflow: hidden;
  &.ant-radio-group {
    width: 100%;
    display: block;
  }

  & > div:last-child .ant-radio-wrapper {
    border: none;
  }

  .ant-radio-wrapper:last-child {
    border-bottom: 1px solid #dee2e8;
  }
`;

export const TabTitle = styled.div`
    width: 100%;
    word-spacing: normal;
    word-wrap: break-word;
    border: 1px solid #dee2e8;
    border-radius: 5px;
    padding: 4px;
    cursor: pointer;
    font-family: 'Oswald-Bold';
    height: 100%;
    font-size: 12px;
    & > span {
      width: 100%;
    }
    @media (max-width: 768px) {
      font-size: 10px;
    }
    @media (min-width: 2000px) and (max-width: 4000px)  {
      font-size: 17px;
      padding-top: 6px;
    }
`;

export const LayerSelectorWrapper = styled.div`
  min-height: 330px;

  @media (max-height: 768px)  {
    height: 38vh;
    min-height: inherit;
  }
  & .customTabBar{
    & .ant-tabs-nav {
      color: #545456;
      width: 100%;
      height: 100%;
      & > div {
        display: flex;
        justify-content: space-between;
      }
    }
    & .ant-tabs-nav .ant-tabs-tab-active{
      color: #ffff;
      & ${TabTitle}{
        background-color: #2b55e6;
      }
    }
    & .ant-tabs-nav-container-scrolling{
      padding: 0;
    }
    & .ant-tabs-tab-prev, & .ant-tabs-tab-next{
      display: none;
    }
    & .ant-tabs-tab{
      margin: 0;
      width: 48%;
      height: 70px;
      white-space: pre-wrap;
      text-align: center;
      padding: 12px 0px;
      vertical-align: middle;
      @media (min-width: 2000px) and (max-width: 4000px)  {
        height: 90px;
      }
    }
  }

  & .ant-tabs, .ant-tabs-content {
    height: 100%;
  }

  & .ant-tabs-tabpane{
    /* height: 77%; */
    height: 83%;
    overflow-y: auto;
    @media (min-width: 2000px) and (max-width: 4000px)  {
      height: 85%;
    }
  }
`;

export const ArrowButton = styled(Button)`
  &.ant-btn.ant-btn.ant-btn.ant-btn {
    border: unset;
    box-shadow: unset;
    padding: 0;
    background: transparent;
    z-index: 10;
    text-align: start;

    .anticon {
      font-size: 10px;
    }
    &:hover, &:focus {
      color: rgba(0, 0, 0, 0.65);
      border: unset;
      background: transparent;
    }
  }
  margin-right: 0;

  &&.ant-btn-icon-only{
    width: 20px;
    height: 40px;
  }
`;

export const SubDiv = styled.div`
  position: relative;
  width: 73%;
  &::before{
    content: '—';
    position: absolute;
    left: -30px;
    margin-top: 6px;
  }
`;

