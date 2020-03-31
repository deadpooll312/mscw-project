import * as React from 'react';
import { Modal, notification, Select } from 'antd';
import { tableComponents } from '../constants';
import { FieldDataItem } from '../types';
import { StyledButton, StyledTable, StyledSelect } from '../styled';
import { editMappingField, getAttributeValues } from 'app/api/admin';

export type Props = {
  data: FieldDataItem[];
  alias: string;
  onClose(): any;
  updateData(): any;
};

function validateField(col) {
  if (col.id === 'attributeValue') {
    return [{
      required: true,
      message: 'недопустимое значение',
    }];
  } else {
    return [{
      required: false,
      message: 'недопустимое значение',
    }];
  }
}

export const EditMappingField: React.FC<Props> = (props) => {
  const { data, alias, onClose, updateData } = props;

  const [localData, setLocalData] = React.useState(data);
  const [savable, setSavable] = React.useState(false);
  const [attributeValues, setAttributeValues] = React.useState<string[]>([]);

  React.useEffect(() => {
    getAttributeValues(alias)
      .then((response) => {
        setAttributeValues(response);
      });
  }, []);

  const changeAttributeValue = (value) => {
    setLocalData((prevState: FieldDataItem[]) => {
      return [{
        ...prevState[0],
        attributeValue: value
      }];
    });
  };

  const columns = [
    {
      title: 'Переменная',
      dataIndex: 'attributeId',
      width: 100,
      editable: true,
      data: {
        id: 'attributeId',
        type: 'NUMBER',
      } as any,
    },
    {
      title: 'Значение',
      dataIndex: 'attributeValue',
      width: 150,
      render: (text, record) => {
        return (
          <StyledSelect
            value={record.attributeValue}
            onChange={changeAttributeValue}
          >
            {
              attributeValues.map((item) => {
                return <Select.Option key={item} value={item}>{item}</Select.Option>;
              })
            }
          </StyledSelect>
        );
      }
    },
  ];

  const handleSaveCell = (row, vals?) => {
    setLocalData([row]);
    setSavable(true);
  };

  const onEditing = () => {
    setSavable(false);
  };

  const handleSaveClick = () => {
    const row = localData[0];
    if (savable) {
      if (!row.attributeValue) {
        notification.error({
          message: 'Значение не может быть пустым',
          duration: 0,
        });
      } else {
        const params = {
          alias: alias,
          attributeId: row.attributeId,
          attributeValue: row.attributeValue,
        };
        if (row.id) {
          params['id'] = row.id;
        }
        editMappingField(params)
          .then((response) => {
            if (response.code && response.code === 'ERROR') {
              notification.error({
                message: `Ошибка при сохранении поля ${response.synopsis}`,
                duration: 0,
              });
            } else {
              onClose();
              updateData();
            }
          });
      }
    }
  };

  const getColumns = (columns) => {
    return columns
      .map((col) => {
        if (col.editable) {
          return {
            ...col,
            onCell: (record) => {
              return ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSaveCell,
                inputType: col.data.type,
                formItemProps: {
                  rules: validateField(col.data),
                },
                onEditing: onEditing,
                col,
              });
            },
          };
        } else {
          return col;
        }
      });
  };

  const cols = getColumns(columns);

  return (
    <Modal
      visible={true}
      onCancel={onClose}
      title={'Добавление записи в таблицу dashboard.field_mapping'}
      footer={[
        <StyledButton key="back" onClick={onClose}>
          Отменить
        </StyledButton>,
        <StyledButton key="save" onClick={handleSaveClick} disabled={!savable || !localData[0].attributeValue}>
          Сохранить
        </StyledButton>
      ]}
      maskClosable
    >
      <StyledTable<any>
        size="small"
        rowKey={(record) => record.attributeId}
        bordered
        dataSource={localData}
        columns={cols}
        pagination={false}
        rowClassName={() => 'editable-row'}
        components={tableComponents}
      />
    </Modal>
  );
};
