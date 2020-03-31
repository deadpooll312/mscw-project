import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectAppThemeName } from 'app/store/modules/app/selectors';
import { changeThemeName } from 'app/store/modules/app/actions';
import InputCheckbox from '@next/ui/atoms/InputCheckbox/InputCheckbox';

const ChangeTheme: React.FC<{}> = React.memo(
  () => {
    const themeName = useSelector(selectAppThemeName);
    const dispatch = useDispatch();

    const handleChange = React.useCallback(
      () => {
        dispatch(
          changeThemeName(themeName === 'light' ? 'dark' : 'light'),
        );
      },
      [themeName],
    );

    return (
      <div>
        <InputCheckbox
          isChecked={themeName === 'dark'}
          onChange={handleChange}
        />
      </div>
    );
  }
);

export default ChangeTheme;

// export const ChangeThemeSwitch = styled(Switch)`
//   cursor: pointer;
//   &&.ant-switch-checked {
//       // background-color: ${({ theme }) => theme.colors.dashboardCard.buttonActive};
//       background-color: ${({ theme }) => theme.colors.dashboardCard.radioDate};
//   }
// `;
