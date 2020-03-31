import * as React from 'react';
import styled from 'styled-components';

import { Select, Icon } from 'antd';

const { Option } = Select;

export type SelectComponentProps = {
  isDistrictSelectVisible: boolean;
  onChange(value: string): any;
  onClear?(): any;
  data: any[];
  name: string;
  defaultValue?: string;
  isRegionSelect?: boolean;
  value: string;
};

const dropdownRenderer = (menu) => (
  <React.Fragment>
    <OptionsArrow />
    <DropdownMenu>
      {menu}
    </DropdownMenu>
  </React.Fragment>
);

const SelectComponent: React.FC<SelectComponentProps>  = (props) => {
  const { isDistrictSelectVisible, onChange, data, name, defaultValue, isRegionSelect, onClear, value } = props;

  return (
    <SelectColumn isRegionSelect={isRegionSelect}>
      <SelectName>
        <span>{name}</span>
        {
          isDistrictSelectVisible && isRegionSelect
                      && (
                        <ArrowContainer>
                          <Line />
                          <Arrow />
                        </ArrowContainer>
                      )
        }
      </SelectName>
      <StyledSelect
        defaultValue={defaultValue}
        showArrow={false}
        onChange={onChange}
        dropdownStyle={{
          backgroundColor: 'transparent',
        }}
        dropdownRender={dropdownRenderer}
        value={value}
      >
        {
          data?.map((item) => (
            <Option
              value={item.objectId}
              key={item.objectId}
            >
              {item.name}
            </Option>
          ))
        }
      </StyledSelect>
      {
        !isRegionSelect
                  && (
                    <ClearIcon
                      onClick={onClear}
                      type="close"
                      className="ant-select-clear-icon"
                    />
                  )
      }
    </SelectColumn>
  );
};

export default SelectComponent;

const SelectColumn = styled.div<any>`
    width: 50%;
    position: relative;
    &:hover {
        background: ${(p) => (!p.isRegionSelect && 'rgba(8, 1, 66, 0.4)')};
        border-radius: ${(p) => (!p.isRegionSelect && '6px')};
        .ant-select-clear-icon {
            opacity: 1;
        }
    }
`;

const SelectName = styled.div`
    height: 12px;
    font-family: 'Oswald-Bold';
    font-size: 9px;
    font-style: normal;
    font-stretch: condensed;
    line-height: 1.33;
    letter-spacing: 0.8px;
    color: #dee2e8;
    margin-left: 32px;
    margin-top: 11px;
    display: flex;
    @media (min-width: 2000px) and (max-width: 4000px)  {
        font-size: 15px;
    }
`;

const StyledSelect = styled(Select)<any>`
    width: 100%;
    &.ant-select{
        font-family: 'Oswald-Bold';
        font-size: 14px;
        font-style: normal;
        font-stretch: normal;
        letter-spacing: 0.2px;
        color: #dee2e8;

        @media (max-width: 768px) {
            font-size: 10px;
        }
    }
    .ant-select-selection--single {
        height: 20px;
    }
    .ant-select-selection, .ant-select-selection:focus{
        background-color: transparent;
        border: none;
        box-shadow: none;
        display: flex;
        align-items: center;

        &::before {
            width: 0;
            height: 0;
            content: '';
            display: inline-block;
            border-style: solid;
            border-width: 5px 4px 0 4px;
            border-color: #dee2e8 transparent transparent transparent;
            margin-left: 16px;
        }
    }

    &.ant-select-focused .ant-select-selection {
        box-shadow: none;
    }

    .ant-select-selection__rendered {
        line-height: 1.43;
        margin-left: 8px;
        display: inline-block;
        vertical-align: middle;
        overflow: hidden;
        margin: 0;
        margin-left: 8px;
        @media (min-width: 2000px) and (max-width: 4000px)  {
          font-size: 20px;
          margin-top: 18px;
        }
    }
`;

const ArrowContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: -21px;
    margin-left: 8px;
    width: 100%;
    margin-top: 0.5px;
`;

const Line = styled.div`
    width: 100%;
    height: 1px;
    opacity: 0.4;
    background-color: #ffffff;
    display: inline-block;
    vertical-align: middle;
`;

const Arrow = styled.div`
    width: 0;
    height: 0;
    opacity: 0.4;
    content: '';
    display: inline-block;
    border-style: solid;
    border-width: 2px 0 2px 3px;
    border-color: transparent transparent transparent #ffffff;
`;

const OptionsArrow = styled.div`
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 12px 12px 12px;
    border-color: transparent transparent #ffffff transparent;
    position: relative;
    margin: auto;
`;

const DropdownMenu = styled.div`
    //background: #746a8f;
    background: ${({ theme }) => theme.colors.dashboardCard.radioDate};
    border-radius: 6px;
    box-shadow: rgba(42, 42, 44, 0.4) 0px 2px 10px 1px;
    @media (min-width: 2000px) and (max-width: 4000px)  {
      font-size: 17px;
    }
    .ant-select-dropdown-menu {
        margin: 10px 0;
        .ant-select-dropdown-menu-item {
            font-family: 'OpenSans';
            //background-color: #746a8f;
            background-color: ${({ theme }) => theme.colors.dashboardCard.radioDate};
            margin-left: 10px;
            margin-right: 10px;
            border-radius: 6px;
            padding-left: 10px;
            color: #fff;
        }
        .ant-select-dropdown-menu-item:hover{
            //background-color: #755d9a;
            background-color: ${({ theme }) => theme.colors.dashboardCard.radioDate};
            margin-left: 10px;
            margin-right: 10px;
            border-radius: 6px;
            color: #000;
            padding-left: 10px;
        }
        .ant-select-dropdown-menu-item:focus {
            outline: none;
        }
        .ant-select-dropdown-menu-item-active {
            //background-color: #755d9a;
            background-color: ${({ theme }) => theme.colors.dashboardCard.radioDate};
        }
    }
`;

const ClearIcon = styled(Icon)`
    &.anticon {
        opacity: 0;
        padding-right: 5px;
        font-size: 12px;
        cursor: pointer;
        transition: opacity 0.15s ease;
        position: absolute;
        right: 8px;
        top: 8px;
        color: #fff;
    }

    &:hover {
        opacity: 1;
    }
`;
