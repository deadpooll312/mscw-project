import { Checkbox, Table, Button, Menu, Layout, Icon, Select, Form } from 'antd';
const { Header, Sider } = Layout;
import styled from 'styles';

export const StyledTable = styled(Table)`
  background: rgba(255, 255, 255, .1);
  height: 100%;
  overflow: auto;
  padding-right: 20px;

  .ant-table-column-title{
    font-weight: bold;
  }

  .ant-spin-nested-loading, .ant-table-content {
    height: 100%;
  }

  .ant-spin-container, .ant-table-scroll {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: unset;
  }

  .ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-header > table > .ant-table-thead > tr > th{
    height: 60px;
  }

  .ant-table-header {
    flex-shrink: 0;
  }

  .ant-table-body {
    height: 100%;
  }

  .ant-table {
    /* border-color: #98bf21; */
    border-color: rgba(129,132,144,0.35);
    overflow: hidden;
    .ant-table-tbody > tr:nth-child(even) {
      background-color: #e6f7ff;
    }
    .ant-table-content > .ant-table-body {
      margin: 0;
    }
    table {
      table-layout: fixed;
    }
  }

  .ant-pagination-item, .ant-pagination-item:hover, .ant-pagination-item:focus {
    a {
      color: rgba(0, 0, 0, 0.45);
    }
  }

  .ant-pagination-item-active, .ant-pagination-item-active:hover, .ant-pagination-item-active:focus {
    border-color: rgba(129,132,144,0.35);
    background-color: #2b55e6;
    a {
      color: #fff;
    }
  }

  .ant-pagination-jump-next:hover .ant-pagination-item-ellipsis {
    opacity: 1;
  }

  .ant-pagination-next:hover .ant-pagination-item-link,
  .ant-pagination-prev:hover .ant-pagination-item-link {
    color: rgba(0, 0, 0, 0.65);
  }

  .ant-checkbox-wrapper{
    margin-left: 14px;
  }

  .ant-checkbox-checked .ant-checkbox-inner{
    background-color: rgba(43, 85, 230, .8);
    border-color: rgba(43, 85, 230, .8);
  }

  .ant-table-pagination.ant-pagination {
    display: flex;
    justify-content: flex-end;
    float: unset;
    flex-grow: 1;
    align-items: flex-end;
  }

  .ant-table-bordered {
    .ant-table-tbody > tr > td, .ant-table-thead > tr > th {
      border-color: rgba(129,132,144,0.35);
    }
  }

  .ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-body > table > .ant-table-tbody > tr > td {
    padding: 2px 8px;
  }

  .ant-table-thead {
    background-color: #2b55e6;
    color: #fff;
  }

  .ant-table-thead > tr {
    th, .ant-table-column-has-actions.ant-table-column-has-sorters:hover,
    th.ant-table-column-has-actions.ant-table-column-has-filters {
      color: #fff;
      .ant-table-filter-selected.anticon-filter, .ant-table-filter-selected.anticon-filter:hover {
        color: #e8eefc;
      }
      .anticon-filter, .anticon-filter:hover,
      .ant-table-column-sorter .ant-table-column-sorter-inner,
      .anticon-filter.ant-table-filter-open {
        color: rgba(0, 0, 0, 0.45);
        background-color: inherit;
      }
    }
  }
`;

export const StyledButton = styled(Button)`
  color: #2b55e6 !important;
  font-weight: bold;
  &.ant-btn:hover, .ant-btn:focus {
    color: #fff !important;
    background-color: #2b55e6;
  }
`;

export const FilterContainer = styled.section`
  display: flex;
  padding: 8px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
`;

export const ConfirmButton = styled(Button)`
  margin: 0 3px;
`;

export const HeaderCheckbox = styled(Checkbox)`
  && {
    display: block;
  }
`;

export const LayerInput = styled.input``;

export const CellCheckbox = styled(Checkbox)`

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #009587;
    border-color: #009587;
  }

  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox .ant-checkbox-inner,
  &.ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: #009587;
  }

  &.ant-checkbox-wrapper {
    &:hover .ant-checkbox::after {
      visibility: hidden;
    }
  }
`;

export const StyledMenu = styled(Menu)`
    &.ant-menu {
        height: 100%;
        border-right: 0;
        background: #f2f3f6;
        padding-right: 22px;
    }
    &.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
        background-color: #2b55e6;
        color: #fff;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        &::after{
          transform: scaleY(0);
        }
    }
    .ant-menu-item:not(.ant-menu-item-selected) {
        a:hover, &:hover {
            color: #2b55e6;
        }
    }
`;

export const Sidebar = styled(Sider)`
  &&{
    background-color: #f2f3f6;
  }
`;

export const StyledHeader = styled(Header)`
    color: #2b55e6;
    font-weight: bold;
    &.ant-layout-header {
        background: #f2f3f6;
        text-align: right;
    }
`;

export const DeleteIcon = styled(Icon)<{ theme: string }>`
  &.anticon {
    color: red;
    font-size: 12px;
  }
`;

export const StyledSelect = styled(Select)`
  width: 100%;
`;

export const FormItemStyled = styled(Form.Item)`
  && {
    display: flex;
  }

  & .ant-form-item-control-wrapper {
    flex-grow: 1;
    flex-basis: 75%;
    max-width: 75%;
  }

  & .ant-form-item-label {
    flex-grow: 1;
    flex-basis: 36%;
  }
`;

export const Color = styled.div<any>`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background-color: ${(p) => p.color};
  margin-top: 10px;
`;

export const Link = styled.a`
  &:hover {
    color: inherit;
  }
  color: inherit;
`;

export const BtnLink = styled.div<any>`
  text-align: center;
  margin: 13px 47px 9px 22px;
  color: #2b55e6;
  font-weight: bold;
  background-color: #fff;
  border: solid 1px rgba(129,132,144,0.35);
  border-radius: 6px;
  padding: 8px;
  &:hover{
    background-color: #2b55e6;
    cursor: pointer;
    color: #fff;
  }
`;

export const StyledLayout = styled(Layout)`
   height: 100vh;
   padding-bottom: 20px;
`;

