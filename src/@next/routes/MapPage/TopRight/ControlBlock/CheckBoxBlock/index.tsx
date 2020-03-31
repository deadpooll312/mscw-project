import * as React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from 'antd';

import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { selectKGHFilter } from 'app/store/modules/semantics/selectors';
import { changeKGHFilter } from 'app/store/modules/semantics/actions';

type Props = {};

const CheckBoxBlockComponent: React.FC<Props> = React.memo(
  () => {
    const isKghOn = useSelector(selectKGHFilter);
    const dispatch = useDispatch();

    const onCheckBoxChange = React.useCallback(
      (e: CheckboxChangeEvent) => {
        dispatch(
          changeKGHFilter(e.target.checked),
        );
      },
      [],
    );

    return (
      <StyledCheckBoxBlock>
        <StyledAntdCheckbox checked={isKghOn} onChange={onCheckBoxChange}/>
        <span> Все нарушения </span>
      </StyledCheckBoxBlock>
    );
  },
);

export default CheckBoxBlockComponent;

export const StyledCheckBoxBlock = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #dee2e8;

  & > span {
    margin-left: 10px;
  };
`;

export const StyledAntdCheckbox = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner{
    background-color: #2b55e6;
  };
`;
