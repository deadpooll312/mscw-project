import { Tooltip, Input, Icon, Button } from 'antd';
import { FilterContainer, ConfirmButton } from './styled';
import * as React from 'react';

export function validateField(col) {
  if (col.id === 'alias') {
    return [{
      required: false,
      whitespace: true,
      message: 'недопустимое значение',
      validator: (rule, value, callback) => {
        if (/[^a-zA-Z0-9_]/.test(value)) {
          callback('Алиас должен начинаться с буквы и состоять из латинских букв, цифр, подчеркиваний');
        }
        callback();
      },
    }];
  } else {
    return [{
      required: false,
      message: 'недопустимое значение',
    }];
  }
}

export function getFiltering(col, type = 'text') {

  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      const s = selectedKeys[0] || {
        key: col.data.id,
      };

      function setState(ps) {
        const ns = { ...s, ...ps };
        setSelectedKeys([ns]);
      }

      function onConfirm() {
        confirm();
      }

      function onClear() {
        clearFilters();
      }

      return (
        <FilterDropdown {...{ setSelectedKeys, selectedKeys, confirm: onConfirm, clearFilters: onClear }}>
          <Input
            type={type}
            placeholder="поиск"
            size="small"
            value={s.value || ''}
            onChange={(e) => setState((e.target.value ?? false) ? { value: e.target.value } : s)}
            onPressEnter={confirm}
          />
        </FilterDropdown>
      );
    },
  };
}

export function FilterDropdown({ confirm, clearFilters, children }) {
  return (
    <FilterContainer>
      {children}
      <Tooltip title="Применить" placement="topLeft">
        <ConfirmButton size="small" onClick={confirm}>
          <Icon type="check-circle" theme="twoTone" twoToneColor="#00bb44" />
        </ConfirmButton>
      </Tooltip>
      <Tooltip title="Сбросить" placement="topLeft">
        <Button size="small" onClick={clearFilters}>
          <Icon type="close-circle" theme="twoTone" twoToneColor="#da0c0c" />
        </Button>
      </Tooltip>
    </FilterContainer>
  );
}