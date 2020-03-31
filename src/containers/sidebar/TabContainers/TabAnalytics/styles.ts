import styled from 'styles';
import { Button, Select } from 'antd';

export const SelectWrapper = styled.div`
    margin-top: 20px;
    height: 55px;
    border-radius: 6px;
    background-color: #2b55e6;
    display: flex;
    flex-direction: row;
`;

export const StyledButton = styled(Button)`
    &.ant-btn {
        height: 40px;
        border-radius: 6px;
        background-color: #2b55e6;
        margin-bottom: 16px;
        color: #dee2e8;
        font-family: 'Oswald-Bold';
        letter-spacing: 0.2px;
        text-transform: uppercase;

        &:hover, &:focus {
            background-color: #2b55e6;
            color: #dee2e8;
        }
    }
`;

export const ButonsContainer = styled.div`
  padding: 20px 0;

  ${StyledButton} {
    width: 100%;
  }
`;

export const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    height: 100%;

    ${ButonsContainer} {
      width: 100%;
    }
`;

export const StyledSelect = styled(Select)`
    width: 100%;
    &.ant-select{
        font-family: 'Oswald-Bold';
        font-size: 14px;
        font-style: normal;
        font-stretch: normal;
        letter-spacing: 0.2px;
        color: #2a2a2c;
        margin-top: 10px;
        height: 40px;

        @media (max-width: 768px) {
            font-size: 10px;
        }
    }
    .ant-select-selection, .ant-select-selection:focus{
        border-radius: 6px;
        border: solid 1px #dee2e8;
        box-shadow: none;
        display: flex;
        align-items: center;

        ${(props) => (props.showArrow ? null
    : `&::before {
            width: 0;
            height: 0;
            content: '';
            display: inline-block;
            border-style: solid;
            border-width: 5px 4px 0 4px;
            border-color: #2a2a2c transparent transparent transparent;
            margin-left: 16px;
          }`)
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
    }
`;

export const DropdownMenu = styled.div`
    background: #fff;
    border-radius: 6px;
    box-shadow: rgba(42, 42, 44, 0.4) 0px 2px 10px 1px;
    .ant-select-dropdown-menu {
        margin: 10px 0;

        .ant-select-dropdown-menu-item {
            font-family: 'OpenSans';
            background-color: #fff;
            margin-left: 10px;
            margin-right: 10px;
            border-radius: 6px;
            padding-left: 10px;
        }
        .ant-select-dropdown-menu-item:hover{
            background-color: #2b55e6;
            margin-left: 10px;
            margin-right: 10px;
            border-radius: 6px;
            color: #dee2e8;
            padding-left: 10px;
        }
        .ant-select-dropdown-menu-item-disabled:hover {
            background-color: #fff;
        }
        .ant-select-dropdown-menu-item:focus {
            outline: none;
        }
        .ant-select-dropdown-menu-item-active {
            background-color: #fff;
        }
    }
`;

export const SidebarDescription = styled.p`
  margin-top: 20px;
  @media (min-width: 2000px) and (max-width: 4000px)  {
    font-size: 23px;
  }
`;
