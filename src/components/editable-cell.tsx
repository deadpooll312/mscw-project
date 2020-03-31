import * as React from 'react';
import styled from 'styled-components';
import {
  Form, Input, InputNumber, Checkbox,
  DatePicker as DatePickerAntd,
} from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { DatePickerProps } from 'antd/lib/date-picker/interface';
import TextArea from 'antd/lib/input/TextArea';
import { getCurrentMomentDate } from '@next/utils/dates';
import { DataType } from 'app/types';

const DatePicker = DatePickerAntd as any;
const FormItem = Form.Item;
const EditableContext = React.createContext<WrappedFormUtils>(undefined);

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

export const EditableFormRow = Form.create()(EditableRow);

type FormItemType = InputNumber | Checkbox | React.ClassicComponent<DatePickerProps, any> | Input | TextArea;

export type Props = {
  editable: boolean;
  dataIndex: string;
  title: string;
  record: any;
  handleSave(row, vals?): void;
  inputType: DataType;
  dateFormat: string;
  col: any;
  formItemProps: any;
  onEditing(): void;
};
export type State = {
  editing: boolean;
  calendarOpen: boolean;
};

export class EditableCell extends React.Component<Props, State> {
  state: State = {
    editing: false,
    calendarOpen: false
  };

  formItemElement: FormItemType;
  form: WrappedFormUtils;
  cell: HTMLTableCellElement;

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  toggleEdit = (val?) => {
    const editing = val;
    this.setState({ editing }, () => {
      if (editing && this.formItemElement && 'focus' in this.formItemElement) {
        this.formItemElement.focus();
        if (this.props.onEditing) {
          this.props.onEditing();
        }
      }
    });
  };

  handleClickOutside = (e) => {
    const { editing, calendarOpen } = this.state;

    if (editing && !this.cell.contains(e.target) && !calendarOpen
      && !e.target.className.includes('dropdown') && !e.target.className.includes('checkbox')) {
      this.onClickConfirm();
    }
  };

  save = () => {
    const { record, handleSave, inputType } = this.props;
    this.form.validateFields((error, values) => {
      const vals = Object.keys(values).reduce((agg, k) => {
        const v = values[k];
        if (inputType === DataType.BOOLEAN) {
          agg[k] = String(v);
          return agg;
        }

        agg[k] = v;
        return agg;
      }, {});
      handleSave({ ...record, ...vals }, vals);
    });
  };

  onClickTextCell = () => {
    setTimeout(() => {
      this.toggleEdit(true);
    });
  };

  onClickConfirm = () => {
    setTimeout(() => {
      this.save();
      this.toggleEdit(false);
    }, 0);
  };

  onOpenChangeCalendar = (status) => {
    setTimeout(() => {
      this.setState({
        calendarOpen: status
      });
    }, 0);
  };

  onClickConfirmInput = (e) => {
    if (e.key === 'Enter') {
      this.onClickConfirm();
    }
  };

  getInput = (type: DataType | 'textarea', val) => {
    if (type === DataType.INTEGER || type === DataType.DECIMAL) {
      return (
        <InputNumber
          ref={(node) => (this.formItemElement = node)}
          min={-Infinity}
          max={Infinity}
          size="small"
          style={{ width: '100%' }}
          formatter={(value) => `${value}`.replace(/\D/g, '')}
          onKeyUp={this.onClickConfirmInput}
          {...type === DataType.INTEGER ? {
            precision: 0
          } : {}}

        />
      );
    }

    if (type === DataType.BOOLEAN) {
      return (
        <Checkbox
          ref={(node) => (this.formItemElement = node)}
        />
      );
    }

    if (type === DataType.DATE) {
      const format = 'DD-MM-YYYY';
      return <DatePicker
        ref={(node) => (this.formItemElement = node)}
        format={format}
        size="small"
        onOk={this.onClickConfirm}
        onOpenChange={this.onOpenChangeCalendar}
        showTime
      />;
    }

    if (type === 'textarea') {
      return (
        <Input.TextArea
          autosize
          ref={(node) => (this.formItemElement = node)}
          onPressEnter={this.onClickConfirm}
        />
      );
    }

    return (
      <Input
        ref={(node) => (this.formItemElement = node)}
        size="small"
        onPressEnter={this.onClickConfirm}
      />
    );
  };

  render() {
    const { editing } = this.state;
    const { editable, dataIndex, title, record, handleSave, inputType, dateFormat,
      col = {}, formItemProps, onEditing, ...restProps } = this.props;
    const isDate = col?.data && col.data.type === DataType.DATE;
    const isBool = col?.data && col.data.type === DataType.BOOLEAN;

    function initialValue(record, dataIndex) {
      if (isDate) {
        return record[dataIndex] ? getCurrentMomentDate(record[dataIndex]) : null;
      }
      if (isBool) {
        const boolVal = editable && (String(record[dataIndex]) === 'true' ? true : false);
        return boolVal;
      }
      return record[dataIndex];
    }
    return (
      <StyledTD {...restProps} ref={(node) => (this.cell = node)}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing
                  ? (
                    <Container>
                      <StyledFormItem>
                        {form.getFieldDecorator<Record<PropertyKey, any>>(dataIndex, {
                          initialValue: initialValue(record, dataIndex),
                          valuePropName: isBool ? 'checked' : 'value',
                          ...formItemProps
                        })(
                          this.getInput(inputType, record[dataIndex])
                        )}
                      </StyledFormItem>
                    </Container>
                  ) : (
                    <CellValue
                      className="editable-cell-value-wrap"
                      onClick={this.onClickTextCell}
                    >
                      {
                        restProps.children
                      }
                    </CellValue>
                  )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </StyledTD>
    );
  }
}

const StyledTD = styled.td`
  word-break: break-word;

  @media (max-width: ${(p) => p.theme.media.desktop - 1}px) {
    padding: 2px;
  }

  & .ant-btn {
    padding-left: 2px !important;
    padding-right: 2px !important;
  }

  & .ant-calendar-picker {
    width: auto !important;
    min-width: 30px !important;
    max-width: 80% !important;
  }

  & .ant-form-item-control {
    line-height: 20px !important;
  }
`;

const Container = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledFormItem = styled(FormItem)`
  &.ant-form-item {
    margin: 0;
    padding: 0;
  }
  width: 100%;
`;

const CellValue = styled.div`
  padding: 0;
  min-height: 32px;
  display: flex;
  align-items: center;
  word-break: break-word;
`;
