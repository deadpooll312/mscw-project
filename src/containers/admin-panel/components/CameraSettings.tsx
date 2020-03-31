import * as React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Input, Button, Icon } from 'antd';
import { PropertyType } from 'app/types';

import { getCameraSettings, updateProperty } from 'app/api/admin';
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { KeyPropertyDTO } from 'app/swagger/model/keyPropertyDTO';
import { setCameraSettings } from 'app/store/modules/map/actions';

const MAX_VALUE = 2000;

const initialCameraProp: KeyPropertyDTO = {
  description:  'Радиус отображения камеры по выбранной точке',
  enabled: false,
  id: 1,
  key:  'SEARCH_RADIUS',
  type: PropertyType.CAMERA,
  value: MAX_VALUE.toString(),
};

const CameraSettings = React.memo(() => {
  const [property, setProperty] = React.useState(initialCameraProp);
  const [value, setValue] = React.useState(Number(initialCameraProp.value));
  const [enabled, setEnabled] = React.useState(initialCameraProp.enabled);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const loadSettings = async () => {
      const result = await getCameraSettings();
      const val = Number(result.data[0].value);
      setProperty(result.data[0]);
      setValue(val);
      setEnabled(result.data[0].enabled);
      dispatch(setCameraSettings(result.data[0]));
    };
    loadSettings();
  }, []);

  const onChange = React.useCallback((e) => {
    const newValue = e.target.value !== '' ? parseFloat(e.target.value) : 0;
    if (!isNaN(newValue) && newValue <= MAX_VALUE){
      setValue(newValue);
    }
  }, []);

  const onSave = React.useCallback(() => {
    const newProp = {
      id: property.id,
      enabled,
      value: value.toString(),
    };
    updateProperty(newProp);
    dispatch(setCameraSettings(newProp));
  }, [value, enabled]);

  const onCheckboxChange = React.useCallback((e: CheckboxChangeEvent) => {
    setEnabled(e.target.checked);
  }, []);

  return property && (
    <CameraSettingsBlock>
      <SwitchBlock>
        <span>Включить настройку</span>
        <StyledAntdCheckbox checked={enabled} onChange={onCheckboxChange}/>
      </SwitchBlock>
      <div>
        <span>
          {property.description}
          <Icon type="info-circle" title="Радиус отображения должен быть не более 2 000 метров"/>
        </span>
        <Input value={value} onChange={onChange} disabled={!enabled}/>
      </div>
      <Button onClick={onSave}>Сохранить</Button>
    </CameraSettingsBlock>
  );
});

const CameraSettingsBlock = styled.div`
  display: inline-block;

  & > div > span {
    margin-right: 5px;
  }
  & i {
    margin: 0 20px 20px 5px;
  }

  & input {
    width: 300px;
    margin-right: 20px;
    margin-bottom: 20px;
  };
`;

const StyledAntdCheckbox = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner{
    background-color: #2b55e6;
  };
`;

const SwitchBlock = styled.div`
  margin-bottom: 20px;
`;

export default CameraSettings;
