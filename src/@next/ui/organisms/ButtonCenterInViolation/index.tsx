import * as React from 'react';
import styled from 'styles';
import { Button } from 'antd';
import useSetSearchAndParams from '@next/hooks/useSearch/useSetSearchAndParams';
import { ViolationCardState } from 'app/store/modules/violation_card/types';
import { SIDEBAR_TABS } from '@next/ui/organisms/TopSidebar/constants';
import { TabId } from 'app/types';

type Props = {
  violationCardData: ViolationCardState['data'];
};

const icons = {
  pinMoveToViolation: require('static/pin-move-to-violation.png'),
};

const ConatinerButton = styled(Button)`
  &&& {
    padding: 5px;

    &:hover {
      transform: scale(1.05, 1.05);
    }

    transition: transform 0.5s;
  }
`;

const MoveIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${icons.pinMoveToViolation});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const ButtonCenterInViolation: React.FC<Props> = React.memo(
  (props) => {
    const {
      handleSetSearchAndParams,
    } = useSetSearchAndParams();

    const handleShowViolationInfo = React.useCallback(
      () => {
        handleSetSearchAndParams({
          path: SIDEBAR_TABS[TabId.MAP].path,
          search: {
            violationPartialData: {
              objectTypeCode: props.violationCardData.objectTypeCode,
              featureId: props.violationCardData.featureId,

              okrugName: props.violationCardData.okrugName,
              districtName: props.violationCardData.districtName,
            }
          }
        });
      },
      [props.violationCardData, handleSetSearchAndParams],
    );

    return (
      <ConatinerButton onClick={handleShowViolationInfo}>
        <MoveIcon />
      </ConatinerButton>

    );
  },
);

export default ButtonCenterInViolation;
