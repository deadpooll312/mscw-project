import * as React from 'react';
import { useDispatch } from 'react-redux';

import { Container, SidebarDescription } from './styles';
import { getCurrentMomentDate } from '@next/utils/dates';
import { changeDate, resetSelectedFilters } from 'app/store/modules/analytics/actions';

type Props = {};

const TabAnalytics: React.FC<Props> = React.memo(
  (props) => {
    const dispatch = useDispatch();

    const onDateChange = React.useCallback((value) => {
      dispatch(
        changeDate(value),
      );
    }, []);

    React.useEffect(
      () => {
        onDateChange(getCurrentMomentDate());
        return () => {
          dispatch(resetSelectedFilters());
        };
      },
      [],
    );

    return (
      <Container>
        <div>
          <SidebarDescription>
            Онлайн-аналитика отражает качество содержания объектов городского хозяйства на текущий момент времени 
            накопленным итогом с начала уборочных суток, а также динамику показателей относительно аналогичного 
            периода предыдущих уборочных суток.
          </SidebarDescription>
        </div>
      </Container>
    );
  },
);

export default TabAnalytics;
