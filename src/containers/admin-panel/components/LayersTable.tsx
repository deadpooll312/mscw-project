import * as React from 'react';
import isEqual from 'lodash-es/isEqual';

import { Tooltip, Dropdown, Menu, notification } from 'antd';
import { Pagination, MappingData } from '../types';
import { Mapping as MappingModal } from '../modal/mapping';
import { validateField, getFiltering } from '../utils';
import { layersColumns, initialMappingData, initialPagination } from '../constants';
import { HeaderCheckbox, CellCheckbox, StyledButton } from '../styled';
import { Table } from './table';
import { getLayers, editEnableField, editField, getLayerTypes } from 'app/api/admin';

const LayersTable = () => {
  const [layers, setLayers] = React.useState([]);
  const [currentActiveCheckbox, setCurrentActiveCheckbox] = React.useState({});
  const [layerTypes, setLayerTypes] = React.useState({});
  const [pagination, setPagination] = React.useState<Pagination>(initialPagination);
  const [filters, setFilters] = React.useState([]);
  const [fieldEnabled, setFieldEnabled] = React.useState<boolean>(false);
  const [mappingData, setMappingData] = React.useState<MappingData>(initialMappingData);

  const handlePaginationChange = (page, size) => {
    setPagination((prevState) => {
      return { ...prevState, page: page, size: size };
    });
  };

  const handleFiltersChange = (fields) => {
    const equal = isEqual(filters, fields);
    if (!equal) {
      setFilters(fields);
      setPagination((prevState) => {
        return { ...prevState, page: 0 };
      });
    }
  };

  const fetchLayers = () => {
    const params = {
      page: pagination.page,
      size: pagination.size,
      enabled: fieldEnabled,
    };
    if (filters.length) {
      params['fields'] = filters;
    }
    getLayers(params)
      .then((response) => {
        setLayers(response.objects);
        if (pagination.total !== response.totalElements) {
          setPagination((prevState) => {
            return { ...prevState, total: response.totalElements };
          });
        }
      });
  };

  const handleCheckboxClick = (event, key) => {
    if (event.target.checked) {
      const value = {};
      value[key] = event.target.checked;
      setCurrentActiveCheckbox(value);
    } else {
      let params = {
        id: key,
        enabled: event.target.checked
      };
      editEnableField(params)
        .then((response) => {
          if (response.code && response.code === 'ERROR') {
            notification.error({
              message: `Ошибка при сохранении поля`,
              duration: 0,
            });
          } else {
            fetchLayers();
          }
        });
    }
  };

  React.useEffect(() => {
    fetchLayers();
  }, [pagination, filters, fieldEnabled]);

  React.useEffect(() => {
    getLayerTypes()
      .then((response) => {
        setLayerTypes(response);
      });
  }, []);

  const handleSaveCell = (row, vals?) => {
    let params = {
      id: row.id,
      name: row.name,
      alias: row.alias,
      description: row.description,
      sortOrder: row.sortOrder
    };
    const layer = layers.find((item) => item.id === row.id);
    let isDataChanged = JSON.stringify(row) !== JSON.stringify(layer);
    // Object.keys(vals).forEach(key => params[key] = vals[key])
    if (isDataChanged) {
      editField(params)
        .then((response) => {
          if (response.code && response.code === 'ERROR') {
            notification.error({
              message: `Ошибка при сохранении поля: ${response.synopsis}`,
              duration: 0,
            });
          } else {
            fetchLayers();
          }
        });
    }
  };

  const handleMenuBusinessTypeClick = (event) => {
    let params = {};
    Object.keys(currentActiveCheckbox).forEach((key) => {
      params['id'] = key;
      params['enabled'] = currentActiveCheckbox[key];
      if (currentActiveCheckbox[key]) {
        params['businessType'] = event.key;
      }
    });
    setCurrentActiveCheckbox({});
    editEnableField(params)
      .then((response) => {
        if (response.code && response.code === 'ERROR') {
          notification.error({
            message: `Ошибка при сохранении поля`,
            duration: 0,
          });
        } else {
          fetchLayers();
        }
      });
  };

  const menu = (
    <Menu onClick={handleMenuBusinessTypeClick}>
      {
        Object.keys(layerTypes).map((key) => <Menu.Item key={key}>{layerTypes[key]}</Menu.Item>)
      }
    </Menu>
  );

  const onChangeHeaderCheckbox = (event) => {
    setPagination((prevState) => {
      return { ...prevState, page: 0 };
    });
    setFieldEnabled(event.target.checked);
  };

  const handleClickMappingButton = (e, record) => {
    setMappingData({ isOpen: true, name: record.name, alias: record.alias });
  };

  const getColumns = (columns) => {
    return columns
      .concat(
        {
          title: () => {
            return (
              <React.Fragment>
                В работе
                <HeaderCheckbox
                  onChange={onChangeHeaderCheckbox}
                  checked={fieldEnabled}
                />
              </React.Fragment>
            );
          },
          width: 90,
          dataIndex: 'enabled',
          data: {
            id: 'enabled',
            type: 'BOOLEAN',
          } as any,
          render: (text, record) => {
            return (
              <Tooltip title='Добавление / удаление записи из таблицы dashboard.layers_alias'>
                {
                  !record.enabled
                    ? <Dropdown overlay={menu} trigger={['click']}>
                      <CellCheckbox
                        onChange={(event) => handleCheckboxClick(event, record.id)}
                        checked={record.enabled}
                      />
                    </Dropdown>
                    : <CellCheckbox
                      onChange={(event) => handleCheckboxClick(event, record.id)}
                      checked={record.enabled}
                    />
                }
              </Tooltip>
            );
          },
        },
        {
          title: '',
          width: 90,
          render: (text, record) => {
            if (record.enabled) {
              return (
                <StyledButton
                  size="small"
                  onClick={(e) => handleClickMappingButton(e, record)}
                >
                  Маппинг
                </StyledButton>
              );
            } else {
              return null;
            }
          }
        },
      )
      .map((col) => {
        const fs = (col.data && col.data.searchable ? getFiltering(col) : {});
        if (!col.editable) {
          return {
            ...col,
            ...fs,
          };
        }
        return {
          ...col,
          ...fs,
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
              col,
            });
          },
        };
      });
  };

  const columns = getColumns(layersColumns);

  return (
    <React.Fragment>
      <Table
        dataSource={layers}
        columns={columns}
        pagination={pagination}
        onFiltersChange={handleFiltersChange}
        onPaginationChange={handlePaginationChange}
      />
      {
        mappingData.isOpen
        && <MappingModal
          alias={mappingData.alias}
          title={mappingData.name}
          onClose={() => setMappingData({ isOpen: false, name: '', alias: '' })}
        />
      }
    </React.Fragment>
  );
};

export default LayersTable;
