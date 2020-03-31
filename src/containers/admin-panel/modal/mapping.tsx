import * as React from 'react';
import { EditMappingField as EditMappingFieldModal } from './editMappingField';
import { Modal, Tooltip, notification } from 'antd';
import { FieldData } from '../types';
import { StyledTable, StyledButton, DeleteIcon } from '../styled';

import { getMapping, deleteMappingField } from 'app/api/admin';

export type Props = {
  title: string;
  alias: string;
  onClose(): any;
};

const columns = [
  {
    title: 'Переменная',
    dataIndex: 'attributeId',
    width: 100
  },
  {
    title: 'Значение',
    dataIndex: 'attributeValue',
    width: 150
  },
];

const initialFieldData = [{ attributeId: '', attributeValue: '' }];
export const Mapping: React.FC<Props> = (props) => {
  const { title, alias, onClose } = props;
  const [fieldData, setFieldData] = React.useState<FieldData>({ isOpen: false, data: initialFieldData });
  const [data, setData] = React.useState([]);

  const fetchData = () => {
    getMapping(alias)
      .then((response) => {
        setData(response);
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleAddClick = () => {
    setFieldData({ isOpen: true, data: initialFieldData });
  };

  const handleDeleteClick = (e, id) => {
    deleteMappingField(id)
      .then((response) => {
        if (response.code && response.code === 'ERROR') {
          notification.error({
            message: `Ошибка при удалении поля: ${response.synopsis}`,
            duration: 0,
          });
        } else {
          fetchData();
        }
      });
  };

  const editMappingField = (e, record) => {
    setFieldData({ isOpen: true, data: [record] });
  };

  const getColumns = (columns) => {
    return columns
      .concat(
        {
          title: '',
          width: 50,
          render: (text, record) => {
            return (
              <Tooltip title='Удаление записи из таблицы dashboard.field_mapping'>
                <DeleteIcon
                  type="minus-circle"
                  onClick={(e) => handleDeleteClick(e, record.id)}
                  theme={'filled' as any}
                />
              </Tooltip>
            );
          }
        }
      );
  };

  const cols = getColumns(columns);

  return (
    <React.Fragment>
      <Modal
        visible={true}
        title={title}
        onCancel={onClose}
        footer={[
          <Tooltip key="add" title='Добавление записи в таблицу dashboard.field_mapping - в отдельной форме'>
            <StyledButton onClick={handleAddClick}>
              Добавить
            </StyledButton>
          </Tooltip>
        ]}
      >
        <StyledTable<any>
          size="small"
          rowKey={(record) => record.attributeId}
          bordered
          dataSource={data}
          columns={cols}
          pagination={false}
          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: (event) => editMappingField(event, record),
            };
          }}
        />
      </Modal>
      {
        fieldData.isOpen
        && <EditMappingFieldModal
          alias={alias}
          data={fieldData.data}
          onClose={() => setFieldData({ isOpen: false, data: initialFieldData })}
          updateData={fetchData}
        />
      }
    </React.Fragment>
  );
};

