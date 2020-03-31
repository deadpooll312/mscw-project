import * as React from 'react';
import { Modal, notification, Select, Dropdown, Input, Form, Cascader, Checkbox } from 'antd';
import { initialLegendRecord, colorsColumns, modalEmojiOptions } from '../constants';
import { StyledButton, StyledSelect, FormItemStyled, Color } from '../styled';
import { LegendData } from '../types';
import { FormComponentProps } from 'antd/lib/form';
import ColorPicker from '@next/ui/atoms/ColorPicker';
import { getLevels, getSeasons, editLegend } from 'app/api/admin';

export type LegendProps = {
    onClose(): any;
    updateData(): any;
} & FormComponentProps;

export const EditLegendComponent: React.FC<LegendProps> = (props) => {
  const { onClose, updateData } = props;

  const [localData, setLocalData] = React.useState<LegendData[]>([initialLegendRecord]);
  const [levels, setLevels] = React.useState({});
  const [seasons, setSeasons] = React.useState({});

  React.useEffect(() => {
    getLevels()
      .then((response) => {
        setLevels(response);
      });
    getSeasons()
      .then((response) => {
        setSeasons(response);
      });
  }, []);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setLocalData((prevState: LegendData[]) => {
      return [{
        ...prevState[0],
        [name]: value
      }];
    });
  };

  const handleColorChange = (color) => {
    setLocalData((prevState: LegendData[]) => {
      return [{
        ...prevState[0],
        colorValue: color
      }];
    });
  };

  const handleChange = (value, key) => {
    setLocalData((prevState: LegendData[]) => {
      return [{
        ...prevState[0],
        [key]: value
      }];
    });
  };

  const handleSaveClick = () => {
    const row = localData[0];
    const params = {
      id: null,
      ...row
    };
    editLegend(params)
      .then((response) => {
        if (response.code && response.code === 'ERROR') {
          notification.error({
            message: `Ошибка при сохранении записи ${response.synopsis}`,
            duration: 0,
          });
        } else {
          onClose();
          updateData();
        }
      });
  };

  const record = localData[0];

  return (
    <Modal
      visible={true}
      onCancel={onClose}
      title={'Добавление записи'}
      footer={[
        <StyledButton key='back' onClick={onClose}>
                    Отменить
        </StyledButton>,

        <StyledButton key='save' htmlType="submit" onClick={handleSaveClick}>
                    Сохранить
        </StyledButton>
      ]}
      maskClosable
    >
      <Form
        onSubmit={(evt) => {
          evt.preventDefault();

          props.form.validateFields((err, vals) => {
            if (!err) {
              handleSaveClick();
            }
          });
        }}
      >

        <FormItemStyled
          label='Уровень'
          required
          validateStatus={record.level ? '' : 'error'}
          help={`${record.level ? '' : 'укажите значение'}`}
        >
          <StyledSelect
            value={record.level}
            onChange={(value) => handleChange(value, 'level')}
          >
            {
              Object.keys(levels).map((key) => {
                return <Select.Option key={key} value={key}>{levels[key]}</Select.Option>;
              })
            }
          </StyledSelect>
        </FormItemStyled>

        <FormItemStyled
          label="Сезон"
          required
          validateStatus={record.season ? '' : 'error'}
          help={`${record.level ? '' : 'укажите значение'}`}
        >
          <StyledSelect
            value={record.season}
            onChange={(value) => handleChange(value, 'season')}
          >
            {
              Object.keys(seasons).map((key) => {
                return <Select.Option key={key} value={key}>{seasons[key]}</Select.Option>;
              })
            }
          </StyledSelect>
        </FormItemStyled>

        {
          colorsColumns
            .filter((item) => !item.selectable)
            .map((item) => {
              const isEmpty = item.required && !record[item.dataIndex];
              return (
                <FormItemStyled
                  key={item.dataIndex}
                  label={item.title}
                  required={item.required}
                  validateStatus={isEmpty ? 'error' : ''}
                  help={isEmpty ? 'укажите значение' : ''}
                >
                  <Input
                    name={item.dataIndex}
                    value={record[item.dataIndex]}
                    onChange={handleInputChange}
                  />
                </FormItemStyled>
              );
            })
        }

        <FormItemStyled
          label='Символ'
        >
          <Cascader 
            options={modalEmojiOptions} 
            placeholder = "Выбрать символ"
            onChange={(value) => handleChange(value[0], 'emoji')}
          />
        </FormItemStyled>

        <FormItemStyled
          label='Отчет'
        >
          <Checkbox
            disabled={false}
            onChange={(value) => handleChange(value.target.checked, 'report')}
          />
        </FormItemStyled>

        <FormItemStyled
          label='Цвет'
        >
          <Dropdown overlay={<ColorPicker color={record.colorValue} onChange={handleColorChange} />} trigger={['click']}>
            <Color color={record.colorValue} />
          </Dropdown>
        </FormItemStyled>

      </Form>
    </Modal>
  );
};

export const EditLegend = Form.create<LegendProps>()(EditLegendComponent);