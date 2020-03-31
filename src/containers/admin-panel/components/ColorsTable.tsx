import * as React from 'react';
import { Dropdown, notification, Checkbox, Cascader } from 'antd';
import { Pagination } from '../types';
import { colorsColumns, initialPagination, emojiOptions } from '../constants';
import { Table } from './table';
import { DeleteIcon, StyledButton, Link } from '../styled';
import { EditLegend as EditLegendModal } from '../modal/editLegend';
import ColorPicker from '@next/ui/atoms/ColorPicker';
import { getLegendData, deleteLegend, editLegend } from 'app/api/admin';

const ColorsTable = () => {
  const [pagination, setPagination] = React.useState<Pagination>(initialPagination);
  const [data, setData] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const fetchData = () => {
    getLegendData(pagination)
      .then((response) => {
        setData(response.objects);
        if (pagination.total !== response.totalElements) {
          setPagination((prevState) => {
            return { ...prevState, total: response.totalElements };
          });
        }
      });
  };

  React.useEffect(() => {
    fetchData();
  }, [pagination]);

  const handleDeleteClick = (e, id) => {
    deleteLegend(id)
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

  const handleSaveCell = (row, vals?) => {

    const record = data.find((item) => item.id === row.id);
    let isDataChanged = JSON.stringify(row) !== JSON.stringify(record);

    if (isDataChanged) {
      const newRecord = {
        ...record,
        ...vals,
      };
      editLegend(newRecord)
        .then((response) => {
          if (response.code && response.code === 'ERROR') {
            notification.error({
              message: `Ошибка при сохранении поля: ${response.synopsis}`,
              duration: 0,
            });
          } else {
            fetchData();
          }
        });
    }
  };

  const saveColor = React.useCallback( (id) => (text) => {
    const record = data.find((item) => item.id === id);
    const vals = {
      colorValue: text
    };

    const row = {
      ...record,
      ...vals
    };
    handleSaveCell(row, vals);
  }, [data]);

  const saveInputReport = React.useCallback((id, value?) => () => {
    const record = data.find((item) => item.id === id);
    const vals = {
      report: !value.report
    };

    const row = {
      ...record,
      ...vals
    };

    handleSaveCell(row, vals);
  }, [data]);

  const saveSmile = React.useCallback( (id) => (value) => {
    const record = data.find((item) => item.id === id);
    const vals = {
      emoji: value[0]
    };

    const row = {
      ...record,
      ...vals
    };

    handleSaveCell(row, vals);
  }, [data]);

  const getColumns = (columns) => {
    return columns
      .concat(
        {
          title: 'Отчет',
          dataIndex: 'report',
          data: {
            id: 'report',
            type: 'boolean',
          } as any,
          width: 45,
          render: (text, record) => {
            return (
              <Checkbox
                checked={record.report}
                disabled={false}
                onChange={saveInputReport(record.id, record)}
              />
            );
          }
        },
        {
          title: 'Символ',
          dataIndex: 'emoji',
          data: {
            id: 'emoji',
            type: 'STRING',
          } as any,
          width: 60,
          render: (text, record) => {
            return (
              <Cascader
                options={emojiOptions}
                placeholder={text ? text : 'no'}
                onChange={saveSmile(record.id)}
              />
            );
          }
        },
        {
          title: 'Цвет',
          dataIndex: 'colorValue',
          data: {
            id: 'colorValue',
            type: 'STRING',
          } as any,
          width: 70,
          render: (text, record) => {
            return (
              <Dropdown
                overlay={
                  <ColorPicker
                    color={text}
                    onChange={saveColor(record.id)}
                  />
                }
                trigger={['click']}
              >
                <Link>{text}</Link>

              </Dropdown>
            );
          }
        },
        {
          title: '',
          width: 30,
          render: (text, record) => {
            return (
              <DeleteIcon
                type="minus-circle"
                onClick={(e) => handleDeleteClick(e, record.id)}
                theme={'filled' as any}
              />
            );
          }
        }
      )
      .map((col) => {
        if (!col.editable) {
          return {
            ...col,
          };
        }
        return {
          ...col,
          onCell: (record) => {
            return ({
              record,
              editable: true,
              dataIndex: col.dataIndex,
              title: col.title,
              handleSave: handleSaveCell,
              inputType: col.data.type,
              formItemProps: {
              },
              col,
            });
          },
        };
      });
  };

  const handlePaginationChange = (page, size) => {
    setPagination((prevState) => {
      return { ...prevState, page: page, size: size };
    });
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const footer = () => {
    return (
      <StyledButton onClick={handleAddClick}>
                Добавить
      </StyledButton>
    );
  };

  const columns = getColumns(colorsColumns);

  return (
    <React.Fragment>
      <Table
        dataSource={data}
        columns={columns}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        footer={footer}
      />
      {
        isModalOpen
                && <EditLegendModal
                  onClose={handleModalClose}
                  updateData={fetchData}
                />
      }
    </React.Fragment>
  );
};

export default ColorsTable;
