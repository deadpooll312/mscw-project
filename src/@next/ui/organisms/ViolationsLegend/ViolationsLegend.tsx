import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FeatureAliases } from 'app/api/types';
import { Season } from 'app/store/modules/@types';
import { getLegend } from 'app/store/modules/semantics/actions';
import { LegendState } from 'app/store/modules/semantics/types';
import { isEqualPathWithLocation } from '@next/utils/router';
import { SIDEBAR_TABS } from '@next/ui/organisms/TopSidebar/constants';
import { TabId, ViolationSource } from 'app/types';
import styled from 'styles';
import LegendButton from '@next/ui/atoms/LegendButtom/LegendButton';
import ViolationLegendList from '@next/ui/molecules/ViolationLegendList/ViolationLegendList';
import { isCurrentLevelIsDistrict, selectLegendUniqByColor } from 'app/store/modules/semantics/selectors';
import { selectModuleSidebarViolationTypeIsSys } from 'app/store/modules/sidebar/selectors';

type Props = {};

const arrDataToGetLegend: { alias: FeatureAliases | 'ts'; season: Season | 'SYS'; type: keyof LegendState }[] = [
  {
    alias: FeatureAliases.DISTRICT,
    season: Season.ALL,
    type: 'violationsLegend',
  },
  {
    alias: FeatureAliases.DISTRICT,
    season: ViolationSource.SYS,
    type: 'violationsLegendSys',
  },
  {
    alias: FeatureAliases.CITY,
    season: Season.ALL,
    type: 'regionsAndDistrictsLegend'
  },
  {
    alias: FeatureAliases.DISTRICT,
    season: Season.WINTER,
    type: 'violationsLegendWinter'
  },
  {
    alias: FeatureAliases.CITY,
    season: Season.WINTER,
    type: 'regionsAndDistrictsLegendWinter',
  },
  {
    alias: 'ts',
    season: null,
    type: 'carsLegend',
  }
];

const ViolationsLegend: React.FC<Props> = React.memo(
  (props) => {
    const [isLegendOpen, setLegendOpen] = React.useState(false);
    const dispatch = useDispatch();
    const showAllViolation = useSelector(isCurrentLevelIsDistrict);
    const violationActiveIsSys = useSelector(selectModuleSidebarViolationTypeIsSys);

    const history = useHistory();

    const legendItems = useSelector(selectLegendUniqByColor);

    React.useEffect(
      () => {
        arrDataToGetLegend.map((params) => {
          dispatch(
            getLegend(params),
          );
        });
      },
      [],
    );

    const handleClick = React.useCallback(
      () => setLegendOpen((oldState) => !oldState),
      [],
    );

    return (
      <Container>
        {
          isEqualPathWithLocation(history.location, SIDEBAR_TABS[TabId.MAP].path) && (
            <React.Fragment>
              {
                isLegendOpen && (
                  <ViolationLegendList
                    showAllViolation={showAllViolation}
                    legendData={legendItems}
                    violationActiveIsSys={violationActiveIsSys}
                  />
                )
              }
              <LegendButton onClick={handleClick}>
                {isLegendOpen ? '' : 'Критерии'}
              </LegendButton>
            </React.Fragment>
          )
        }
      </Container>
    );
  },
);

export default ViolationsLegend;

const Container = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 10;
`;
