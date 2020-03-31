import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ExpiredCredentialsForm } from './expired-credentials';
import { fetchPasswordSettings, updateCredentials } from 'app/store/modules/app/actions';
import { selectPasswordPolicy, selectError } from 'app/store/modules/app/selectors';
import { CredentialsData } from 'app/api/rest';
import { isString } from 'util';

type Props = {};

const ExpiredCredentialsComponentWrap: React.FC<Props> = React.memo(
  () => {
    const passwordPolicy = useSelector(selectPasswordPolicy);
    const error = useSelector(selectError);

    const dispatch = useDispatch();

    const onSubmit = React.useCallback(
      (data: CredentialsData) => dispatch(updateCredentials(data)),
      [],
    );
    const onGetPasswordPolicy = React.useCallback(
      () => dispatch(fetchPasswordSettings()),
      [],
    );

    return (
      <ExpiredCredentialsForm
        passwordPolicy={passwordPolicy}
        error={error}
        onSubmit={onSubmit}
        onGetPasswordPolicy={onGetPasswordPolicy}
        errorMessage={error ? <div>{`Ошибка. ${isString(error) ? error : ''}`}</div> : ''}
      />
    );
  },
);

export default ExpiredCredentialsComponentWrap;
