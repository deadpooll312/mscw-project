import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { StyledRadio } from 'containers/sidebar/TabContainers/TabMap/LayersSelector/styled';
import { Select } from 'antd';
import { AVAILABLE_CONTROL } from 'app/store/modules/semantics/constants';
import { selectViolationSource, selectSelectedSystemTypes, selectSystemTypesForViolationSource } from 'app/store/modules/semantics/selectors';
import { changeSelectedSystemTypes } from 'app/store/modules/semantics/actions';

type Props = {
  type: AVAILABLE_CONTROL;
  title: string;
};

const SelectOption: any = Select.Option;

const ControlRadio: React.FC<Props> = React.memo(
  (props) => {
    const violationSource = useSelector(selectViolationSource);

    const selectedSystemTypes = useSelector(selectSelectedSystemTypes);
    const systemTypesByViolationSource = useSelector(selectSystemTypesForViolationSource);

    const dispatch = useDispatch();

    const onChangeSelectedSystemTypes = React.useCallback(
      (values) => {
        dispatch(changeSelectedSystemTypes(values));
      },
      [],
    );

    return (
      <React.Fragment>
        <StyledRadio value={props.type} noBorderBottom order={0}>{props.title}</StyledRadio>
        {
          Boolean(violationSource === props.type && systemTypesByViolationSource?.length) && (
            <Select
              mode="multiple"
              onChange={onChangeSelectedSystemTypes}
              value={selectedSystemTypes}
              optionLabelProp="label"
              placeholder="Выберите источники данных"
              showArrow
            >
              {
                systemTypesByViolationSource.map((rowData) => (
                  <SelectOption
                    key={rowData.value}
                    label={rowData.name}
                    value={rowData.value}
                  >
                    {rowData.name}
                  </SelectOption>
                ))
              }
            </Select>
          )
        }
      </React.Fragment>
    );
  },
);

export default ControlRadio;
