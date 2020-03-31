import * as React from 'react';
import { useLocation } from 'react-router';
import styled from 'styles';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import keyBy from 'lodash-es/keyBy';

import FlexContainer from '@next/ui/atoms/FlexContainer';
import { plural } from '@next/utils/common';
import DefectsBlock from '@next/ui/organisms/ViolationCard/DefectsBlock';
import ButtonCenterInViolation from '@next/ui/organisms/ButtonCenterInViolation';
import { selectModuleViolationCardData } from 'app/store/modules/violation_card/selectors';
import { selectDashboardObjectWidget } from 'app/store/modules/dashboard/selectors';
import { SIDEBAR_TABS } from '@next/ui/organisms/TopSidebar/constants';
import { TabId } from 'app/types';

type Props = {
  handleClose: () => void;
};

const ViolationCard: React.FC<Props> = React.memo(
  (props) => {
    const violationCardData = useSelector(selectModuleViolationCardData);
    const layersList = useSelector(selectDashboardObjectWidget);

    const layersIndexes = React.useMemo(() => keyBy(layersList, 'type'), [layersList]);

    const dashboardLocation = useLocation();

    const violationsCount = violationCardData?.violationsCount;

    return (
      <React.Fragment>
        <BlockData>
          <ViolationCardContainer>
            <ButtonClose onClick={props.handleClose} />
            <FlexContainer alignItems="baseline">
              <LeftBlock>
                <LineData>
                  <FlexContainer alignItems="end" justifyContent="space-between">
                    <div>
                      <LabelData>ID Объекта</LabelData>
                      <div>
                        <b>{violationCardData.objectId}</b>
                        &nbsp;&nbsp;
                        <b>({layersIndexes[violationCardData?.objectTypeCode]?.description ?? '-'})</b>
                      </div>
                    </div>
                    {
                      !dashboardLocation.pathname.includes(SIDEBAR_TABS[TabId.MAP].path) && (
                        <ButtonCenterInViolation violationCardData={violationCardData} />
                      )
                    }
                  </FlexContainer>
                </LineData>
                <LineData>
                  <LabelData>Адрес</LabelData>
                  <div><b>{violationCardData.address}</b></div>
                </LineData>
                <LineData>
                  <LabelData>Балансодержатель</LabelData>
                  <div><b>{violationCardData.holder}</b></div>
                </LineData>
              </LeftBlock>
              <RightBlock>
                <LineData>
                  <LabelData>Округ</LabelData>
                  <div><b>{violationCardData.okrugName}</b></div>
                </LineData>
                <LineData>
                  <LabelData>Район</LabelData>
                  <div><b>{violationCardData.districtName}</b></div>
                </LineData>
                <LineData>
                  <CountViolationContainer fontSize={3}>
                    <div><b>{violationsCount}</b> <span>{plural(violationsCount, 'Нарушение', 'Нарушения', 'Нарушений')}</span></div>
                  </CountViolationContainer>
                </LineData>
              </RightBlock>
            </FlexContainer>
            <br />
            <FlexContainer flexDirection="row" justifyContent="space-between">
              <div>
                <LabelData>Выявлено жителями</LabelData>
                <div><b>{violationCardData?.violationCitizen}</b></div>
              </div>
              <div>
                <LabelData>Выявлено органами</LabelData>
                <div><b>{violationCardData?.violationGovernment}</b></div>
              </div>
              <div>
                <LabelData>Проверено</LabelData>
                <div><b>{violationCardData?.checksCount}</b></div>
              </div>
            </FlexContainer>
          </ViolationCardContainer>
        </BlockData>
        <DefectsBlock />
      </React.Fragment>
    );
  },
);

export default ViolationCard;

const ButtonClose = styled(Button).attrs({ icon: 'close' })`
  &&& {
    position: absolute;
    right: 0;
  }
`;

const LabelData = styled.div`
  margin-bottom: 5px;
`;

const LineData = styled.div`
`;

const CountViolationContainer = styled.div<{ fontSize?: number }>`
  transform: translateY(-${({ fontSize }) => fontSize / 4}rem);
  b {
    font-size: ${({ fontSize }) => fontSize}rem;
  }
`;

const RightBlock = styled.div`
  flex: 1 1 40%;
  margin-left: 10px;

  ${LineData} {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0px;

    }
  }
`;

const LeftBlock = styled.div`
  border-right: 1px solid rgba(0, 0, 0, 0.25);
  flex: 1 1 60%;
  margin-right: 10px;
  padding-right: 10px;

  ${LineData} {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0px;

    }
  }
`;

const BlockData = styled.div`
  padding: 15px;
  box-shadow: 0px 0px 5px 0px;
`;

const ViolationCardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
