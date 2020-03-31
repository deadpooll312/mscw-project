import * as React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { Modal, Button } from 'antd';

import { selectModalSessionExpired } from 'app/store/modules/app/selectors';
import { logoutBySessionExpiredSaga } from 'app/store/modules/app/actions';

type Props = {};

const ModalSessionExpired: React.FC<Props> = React.memo(
  () => {
    const isOpen = useSelector(selectModalSessionExpired);

    const dispatch = useDispatch();

    const onClose = React.useCallback(
      () => dispatch(logoutBySessionExpiredSaga()),
      [],
    );

    if (!isOpen) {
      return null;
    }

    return (
      <React.Fragment>
        <Modal
          title="Время сессии истекло"
          centered={true}
          visible
          onOk={onClose}
          onCancel={null}
          closable={false}
          footer={(
            <React.Fragment>
              <OkButton type="primary" key="back" onClick={onClose}>Ок</OkButton>
            </React.Fragment>
          )}
        >
          <p>Вы будете перенаправлены на страницу авторизации</p>
        </Modal>
      </React.Fragment>
    );
  },
);

export default ModalSessionExpired;

const OkButton = styled(Button)`
  && {
    background-color: #2b55e6;

    &:hover {
      background-color: #e8eefc;
      border-color: #e8eefc;
      color: #2b55e6;
    }
  }
`;
