import * as React from 'react';
import styled from 'styles';
import { useSelector, useDispatch } from 'react-redux';

import Loading from '@next/ui/atoms/Loading';
import { selectModuleCarCardHasMainCarData } from 'app/store/modules/car_card/selectors';
import { resetCarCardData } from 'app/store/modules/car_card/actions';
import useLoadData from '@next/ui/organisms/CarCard/useLoadData';
import { TsInfoDTO } from 'app/swagger/model/tsInfoDTO';
import useRecord from '@next/ui/organisms/CarCard/useRecord';
import ThemeDashboardCardBlock from '@next/ui/atoms/ThemeDashboardCardBlock';

type Props = {};

const CarCard = React.lazy(() => (
  import(/* webpackChunkName: "CarCard" */ '@next/ui/organisms/CarCard/CarCard')
));

const ViolationCardWrap: React.FC<Props> = React.memo(
  () => {
    const hasMainCarData = useSelector(selectModuleCarCardHasMainCarData);
    const dispatch = useDispatch();

    const CONDITION_DIC = useRecord(
      useLoadData<TsInfoDTO[]>('api/v1/dashboard/ts/info?type=CONDITION', null),
      'value',
    );
    const STATUS_DIC = useRecord(
      useLoadData<TsInfoDTO[]>('api/v1/dashboard/ts/info?type=STATUS', null),
      'value',
    );
    const CAR_GROUP_DIC = useRecord(
      useLoadData<TsInfoDTO[]>('api/v1/dashboard/ts/info?type=CAR_GROUP', null),
      'value',
    );
    const VEHICLE_TYPE_DIC = useRecord(
      useLoadData<TsInfoDTO[]>('api/v1/dashboard/ts/info?type=VEHICLE_TYPE', null),
      'value',
    );
    const OWNER_DIC = useRecord(
      useLoadData<TsInfoDTO[]>('api/v1/dashboard/ts/info?type=OWNER', null),
      'value'
    );

    const handleClose = React.useCallback(
      () => {
        dispatch(
          resetCarCardData(),
        );
      },
      [],
    );

    return (
      <ViolationCardFormWrap isShow={Boolean(hasMainCarData)}>
        {
          hasMainCarData && (
            <CarCardFormContainer>
              <RelativeContainer>
                <React.Suspense fallback={<Loading type="new_spinner" />}>
                  <CarCard
                    handleClose={handleClose}
                    CONDITION_DIC={CONDITION_DIC}
                    STATUS_DIC={STATUS_DIC}
                    CAR_GROUP_DIC={CAR_GROUP_DIC}
                    VEHICLE_TYPE_DIC={VEHICLE_TYPE_DIC}
                    OWNER_DIC={OWNER_DIC}
                  />
                </React.Suspense >
              </RelativeContainer>

            </CarCardFormContainer>
          )
        }
      </ViolationCardFormWrap>
    );
  },
);

export default ViolationCardWrap;

const RelativeContainer = styled.div`
  position: relative;
`;

const CarCardFormContainer = styled(ThemeDashboardCardBlock)`
  pointer-events: all;
  position: relative;
  padding: 10px;

  box-shadow: 0px 8px 16px ${({ theme }) => theme.colors.dashboardCard.boxShadow};
  border-radius: 0.25rem;

  width: 100%;
`;
const ViolationCardFormWrap = styled.section<{ isShow: boolean }>`
  padding: 20px 40px 20px 0;
  position: absolute;
  z-index: 1000;
  top: 0;
  right: 0;

  width: 510px;

  transform: translateX(${({ isShow }) => isShow ? '0%' : '100%'}) scaleX(${({ isShow }) => isShow ? 1 : 0});
  opacity: ${({ isShow }) => isShow ? 1 : 0};
  transition: transform 0.5s, opacity 0.5s;

  overflow: auto;

  height: 100%;
`;
