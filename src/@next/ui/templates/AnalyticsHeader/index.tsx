import * as React from 'react';
import { MomentInput } from 'moment';

import { getFormattedDateTime } from '@next/utils/dates';
import {
  WidgetHeaderRow,
  FlexContainerRow,
  ButtonsContainer,
  CurrentTimeAndPrint,
  PrintButton,
  CurrentTime,
} from '@next/routes/AnalyticsPage/Slider/Widget/Button/styled';

type Props = {
  currentTime: MomentInput;
};

const WidgetsHeader: React.FC<Props> = React.memo(
  (props) => {
    const handlePrint = React.useCallback(
      () => {
        window.print();
      },
      [],
    );

    return (
      <WidgetHeaderRow>
        <FlexContainerRow>
          <ButtonsContainer>
            { props.children }
          </ButtonsContainer>
          <CurrentTimeAndPrint>
            <PrintButton onClick={handlePrint}>Печать</PrintButton>
            <CurrentTime>
              <span>{getFormattedDateTime(props.currentTime)}</span>
            </CurrentTime>
          </CurrentTimeAndPrint>
        </FlexContainerRow>
      </WidgetHeaderRow>
    );
  },
);

export default WidgetsHeader;
